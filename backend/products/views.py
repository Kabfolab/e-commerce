from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .models import Product
from .serializers import ProductSerializer

class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer
    # This line allows file upload - without it, image file is rejected
    parser_classes = [MultiPartParser, FormParser, JSONParser]

class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    # Same here - for editing product with new image
    parser_classes = [MultiPartParser, FormParser, JSONParser]
