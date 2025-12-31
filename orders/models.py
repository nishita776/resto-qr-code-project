from django.db import models
from menu.models import MenuItem

class Order(models.Model):
    phone = models.CharField(max_length=15)
    table_number = models.IntegerField()
    status = models.CharField(max_length=20, default="Pending")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id} - Table {self.table_number}"


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order,
        related_name="items",   
        on_delete=models.CASCADE
    )
    menu_item = models.ForeignKey(MenuItem, on_delete=models.CASCADE)
    quantity = models.IntegerField()

    def __str__(self):
        return f"{self.menu_item.name} x {self.quantity}"
