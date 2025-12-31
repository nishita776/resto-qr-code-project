from django.urls import path
from .views import place_order, list_orders, update_order_status

urlpatterns = [
    path("place/", place_order),
    path("", list_orders),
    path("<int:order_id>/", update_order_status),
]
