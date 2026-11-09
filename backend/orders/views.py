from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.mail import send_mail
from .models import Order

@api_view(['POST'])
def create_order(request):
    shipping = request.data.get('shipping')
    items = request.data.get('items')
    total = request.data.get('total')
    paystack_ref = request.data.get('paystackRef')

    order = Order.objects.create(
        name=shipping['name'],
        email=shipping['email'],
        phone=shipping['phone'],
        address=shipping['address'],
        total=total,
        paystack_ref=paystack_ref,
        items=items
    )

    # Email to YOU
    send_mail(
        subject=f"NEW ORDER #{order.id} - {shipping['name']}",
        message=f"Name: {shipping['name']}\nPhone: {shipping['phone']}\nEmail: {shipping['email']}\nAddress: {shipping['address']}\nTotal: ₦{total}\nRef: {paystack_ref}\nItems: {items}",
        from_email='orders@powerofnature.com',
        recipient_list=['YOUR_EMAIL@gmail.com'],  # CHANGE THIS
    )

    return Response({"message": "Order placed", "order_id": order.id})
