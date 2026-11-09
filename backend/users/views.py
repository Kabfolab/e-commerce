from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password, check_password
import jwt
from django.conf import settings
from datetime import datetime, timedelta

User = get_user_model()

@api_view(['POST'])
def register(request):
    name = request.data.get('name')
    email = request.data.get('email')
    password = request.data.get('password')
    
    if not name or not email or not password:
        return Response({"message": "All fields required"}, status=400)
    
    if User.objects.filter(email=email).exists():
        return Response({"message": "Email already exists"}, status=400)
    
    user = User.objects.create(
        username=email,  # Django needs username
        email=email,
        first_name=name,
        password=make_password(password)
    )
    
    return Response({"message": "Account created", "user": {"id": user.id, "name": name, "email": email}}, status=201)

@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"message": "User not found"}, status=400)
    
    if not check_password(password, user.password):
        return Response({"message": "Wrong password"}, status=400)
    
    payload = {"id": user.id, "exp": datetime.utcnow() + timedelta(days=7)}
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")
    
    return Response({
        "token": token,
        "user": {"id": user.id, "name": user.first_name, "email": user.email}
    })
