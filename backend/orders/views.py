import requests, os
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import Order
from django.conf import settings

PAYSTACK_SECRET = os.getenv('PAYSTACK_SECRET_KEY')
PAYSTACK_INIT_URL = "https://api.paystack.co/transaction/initialize"
PAYSTACK_VERIFY_URL = "https://api.paystack.co/transaction/verify/"

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    shipping = request.data.get('shipping')
    items = request.data.get('items')
    total = request.data.get('total') # From frontend, e.g. 5000

    # Paystack expects kobo (5000 naira = 500000 kobo)
    amount_kobo = int(float(total) * 100)

    # 1. Create PENDING order in Neon
    order = Order.objects.create(
        user=request.user,
        name=shipping['name'],
        email=request.user.email,
        phone=shipping['phone'],
        address=shipping['address'],
        total=total,
        items=items,
        paystack_ref='PENDING',
        status='pending'
    )

    # 2. Initialize Paystack
    headers = {"Authorization": f"Bearer {PAYSTACK_SECRET}"}
    data = {
        "email": request.user.email,
        "amount": amount_kobo,
        "reference": f"order_{order.id}_{order.id}", # Unique ref
        "callback_url": f"{os.getenv('FRONTEND_URL')}/verify-payment?order_id={order.id}",
        "metadata": {
            "order_id": order.id,
            "phone": shipping['phone'],
            "address": shipping['address']
        }
    }
    
    res = requests.post(PAYSTACK_INIT_URL, json=data, headers=headers)
    paystack_data = res.json()

    if paystack_data.get('status'):
        order.paystack_ref = paystack_data['data']['reference']
        order.save()
        return Response({
            "authorization_url": paystack_data['data']['authorization_url'],
            "reference": paystack_data['data']['reference'],
            "order_id": order.id
        })
    else:
        return Response({"error": "Paystack init failed", "details": paystack_data}, status=400)

@api_view(['GET'])
@permission_classes([AllowAny])
def verify_payment(request, reference):
    headers = {"Authorization": f"Bearer {PAYSTACK_SECRET}"}
    res = requests.get(f"{PAYSTACK_VERIFY_URL}{reference}", headers=headers)
    data = res.json()

    if data.get('status') and data['data']['status'] == 'success':
        # Find order and mark paid
        order = Order.objects.get(paystack_ref=reference)
        order.status = 'paid'
        order.save()
        return Response({"message": "Payment verified", "order_id": order.id})
    
    return Response({"message": "Payment not successful"}, status=400)
