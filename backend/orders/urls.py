from django.urls import path
from .views import create_order, list_orders, verify_payment

urlpatterns = [
    path('', create_order, name='create_order'),  # POST /api/orders/
    path('list/', list_orders, name='list_orders'), # GET /api/orders/list/
    path('verify/<str:reference>/', verify_payment, name='verify_payment'), # GET /api/orders/verify/<ref>/
]
