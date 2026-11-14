import requests
import os
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.core.mail import send_mail
from .models import Order

PAYSTACK_SECRET = os.getenv('PAYSTACK_SECRET_KEY')
PAYSTACK_INIT_URL = "https://api.paystack.co/transaction/initialize"
PAYSTACK_VERIFY_URL = "https://api.paystack.co/transaction/verify/"

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    shipping = request.data.get('shipping')
    items = request.data.get('items')
    total = request.data.get('total')

    # Paystack needs kobo
    amount_kobo = int(float(total) * 100)

    # Create pending order
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

    # Initialize Paystack
    headers = {"Authorization": f"Bearer {PAYSTACK_SECRET}"}
    data = {
        "email": request.user.email,
        "amount": amount_kobo,
        "reference": f"order_{order.id}_{order.id}",
        "callback_url": f"{os.getenv('FRONTEND_URL')}/verify-payment?reference=order_{order.id}_{order.id}",
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
        order.delete()
        return Response({"error": "Paystack init failed", "details": paystack_data}, status=400)

@api_view(['GET'])
@permission_classes([AllowAny])
def verify_payment(request, reference):
    headers = {"Authorization": f"Bearer {PAYSTACK_SECRET}"}
    res = requests.get(f"{PAYSTACK_VERIFY_URL}{reference}", headers=headers)
    data = res.json()

    if data.get('status') and data['data']['status'] == 'success':
        try:
            order = Order.objects.get(paystack_ref=reference)
            order.status = 'paid'
            order.save()

            # SEND EMAIL TO YOU AFTER PAYMENT
            send_mail(
                subject=f"NEW PAID ORDER #{order.id} - {order.name}",
                message=f"Name: {order.name}\nPhone: {order.phone}\nEmail: {order.email}\nAddress: {order.address}\nTotal: ₦{order.total}\nRef: {reference}\nItems: {order.items}",
                from_email='orders@powerofnature.com',
                recipient_list=['YOUR_EMAIL@gmail.com'],
                fail_silently=False,
            )

            return Response({"message": "Payment verified", "order_id": order.id})
        except Order.DoesNotExist:
            return Response({"message": "Order not found"}, status=404)
    
    return Response({"message": "Payment not successful"}, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_orders(request):
    orders = Order.objects.all().order_by('-created_at')
    data = [
        {
            "id": o.id,
            "name": o.name,
            "email": o.email,
            "phone": o.phone,
            "address": o.address,
            "total": o.total,
            "ref": o.paystack_ref,
            "status": o.status,
            "items": o.items,
            "date": o.created_at
        }
        for o in orders
    ]
    return Response(data)
