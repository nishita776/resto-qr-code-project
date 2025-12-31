from django.db import models


class MenuItem(models.Model):
    CATEGORY_CHOICES = [
        ("Starters", "Starters"),
        ("Mains", "Mains"),
        ("Desserts", "Desserts"),
        ("Drinks", "Drinks"),
    ]

    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES
    )

    image = models.URLField(
        blank=True,
        null=True
    )

    def __str__(self):
        return self.name
