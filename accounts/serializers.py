from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class StaffTokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
       
        token['restaurant_id'] = user.restaurant.id if user.restaurant else None
        return token
