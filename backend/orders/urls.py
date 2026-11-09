from django.urls import path
from .views import create_order, list_orders

urlpatterns = [
    path('', create_order, name='create_order'),  # POST /api/orders/
    path('list/', list_orders, name='list_orders'), # GET /api/orders/list/ to see all orders
]
