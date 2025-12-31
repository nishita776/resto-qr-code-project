from collections import Counter

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from menu.models import MenuItem
from .models import Order, OrderItem

@api_view(["POST"])
@permission_classes([AllowAny])
def place_order(request):
    phone = request.data.get("phone")
    table_number = request.data.get("table_number")
    items = request.data.get("items")  

    if not phone or not table_number or not items:
        return Response({"error": "Invalid order data"}, status=400)

   
    order = Order.objects.create(
        phone=phone,
        table_number=table_number,
        status="Pending"
    )

    item_counts = Counter(items)

    for item_id, qty in item_counts.items():
        try:
            menu_item = MenuItem.objects.get(id=item_id)
        except MenuItem.DoesNotExist:
            continue

        OrderItem.objects.create(
            order=order,
            menu_item=menu_item,
            quantity=qty
        )

    return Response({"message": "Order placed successfully"})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def list_orders(request):
    orders = Order.objects.all().order_by("-created_at")

    data = []
    for order in orders:
        data.append({
            "id": order.id,
            "table_number": order.table_number,
            "phone": order.phone,
            "status": order.status,
            "items": [
                {
                    "menu_item_name": item.menu_item.name,
                    "quantity": item.quantity
                }
                for item in order.items.all() 
            ]
        })

    return Response(data)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_order_status(request, order_id):
    try:
        order = Order.objects.get(id=order_id)
    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=404)

    status = request.data.get("status")
    if not status:
        return Response({"error": "Status required"}, status=400)

    order.status = status
    order.save()

    return Response({"message": "Status updated"})
