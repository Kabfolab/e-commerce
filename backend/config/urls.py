from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/products/', include('products.urls')),
    path('api/auth/', include('users.urls')),
    path('api/orders/', include('orders.urls')),
]

# Serve media in BOTH debug and production (Render)
# For a real store, move to Cloudinary/S3 later, but this fixes images now
urlpatterns += [
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
]
