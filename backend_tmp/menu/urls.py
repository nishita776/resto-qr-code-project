from django.urls import path
from .views import create_menu_item, list_menu_items

urlpatterns = [
    path("create/", create_menu_item),
    path("list/", list_menu_items),
]
