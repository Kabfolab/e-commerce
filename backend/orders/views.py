import requests
import os
import uuid
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.core.mail import send_mail
from .models import Order

PAYSTACK_SECRET = os.getenv('PAYSTACK_SECRET_KEY')
PAYSTACK_INIT_URL = "https://api.paystack.co/transaction/initialize"
PAYSTACK_VERIFY_URL = "https://api.paystack.co/transaction/verify/"

@api_view(['POST'])
@permission_classes([AllowAny])  # FIX 1: Guest can checkout, no 403
def create_order(request):
    data = request.data

    # FIX 2: Accept BOTH frontend formats
    # New frontend: { full_name, email, phone, address }
    # Old frontend: { shipping: { name, phone, address } }
    shipping = data.get('shipping') or {}
    name = data.get('full_name') or data.get('name') or shipping.get('name') or ''
    email = data.get('email') or shipping.get('email') or ''
    phone = data.get('phone') or shipping.get('phone') or ''
    address = data.get('address') or shipping.get('address') or ''
    items = data.get('items') or []
    total = data.get('total') or 0

    # If logged in, use their email as fallback
    user = request.user if request.user.is_authenticated else None
    if not email and user:
        email = user.email
    if not name and user:
        name = user.get_full_name() or user.username

    if not email or not total:
        return Response({"error": "Email and total are required"}, status=400)

    try:
        total_float = float(total)
    except:
        return Response({"error": "Invalid total"}, status=400)

    amount_kobo = int(total_float * 100)
    ref = f"order_{uuid.uuid4().hex[:10]}"  # FIX 3: Unique ref, old one order_id_order_id was duplicate

    # Create pending order
    order = Order.objects.create(
        user=user,
        name=name,
        email=email,
        phone=phone,
        address=address,
        total=total_float,
        items=items,
        paystack_ref=ref,
        status='pending'
    )

    # Initialize Paystack
    headers = {"Authorization": f"Bearer {PAYSTACK_SECRET}"}
    paystack_payload = {
        "email": email,
        "amount": amount_kobo,
        "reference": ref,
        "callback_url": f"{os.getenv('FRONTEND_URL', 'https://e-commerce-svvy.onrender.com')}/verify-payment?reference={ref}",
        "metadata": {"order_id": order.id, "phone": phone, "address": address}
    }

    res = requests.post(PAYSTACK_INIT_URL, json=paystack_payload, headers=headers)
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

            try:
                send_mail(
                    subject=f"NEW PAID ORDER #{order.id} - {order.name}",
                    message=f"Name: {order.name}\nPhone: {order.phone}\nEmail: {order.email}\nAddress: {order.address}\nTotal: ₦{order.total}\nRef: {reference}\nItems: {order.items}",
                    from_email='idreesgoke@gmail.com',
                    recipient_list=['kabfolab@gmail.com'],
                    fail_silently=True,
                )
            except Exception as e:
                print("Email failed:", e)

            return Response({"message": "Payment verified", "order_id": order.id})
        except Order.DoesNotExist:
            return Response({"message": "Order not found"}, status=404)

    return Response({"message": "Payment not successful"}, status=400)

@api_view(['GET'])
@permission_classes([AllowAny])  # FIX 4: Admin can list without auth for now, change to IsAdminUser later
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
