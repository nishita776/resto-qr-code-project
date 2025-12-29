from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import MenuItem
from .serializers import MenuItemSerializer


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_menu_item(request):
    serializer = MenuItemSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def list_menu_items(request):
    items = MenuItem.objects.filter(is_available=True)
    serializer = MenuItemSerializer(items, many=True)
    return Response(serializer.data)
