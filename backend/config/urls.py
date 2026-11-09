from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/products/', include('products.urls')),  # Your products: /api/products/
    path('api/auth/', include('users.urls')),         # Signup/Login: /api/auth/register/ , /api/auth/login/
    path('api/orders/', include('orders.urls')),       # Orders: /api/orders/
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
