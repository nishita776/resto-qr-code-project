from django.contrib.auth.models import AbstractUser
from django.db import models

class StaffUser(AbstractUser):
    restaurant = models.ForeignKey(
        'restaurants.Restaurant',
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    def __str__(self):
        return self.username
