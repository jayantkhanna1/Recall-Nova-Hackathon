from .models import User, ProductCategory, Product, Cart, Admin_Recall_App, UserStats, Pickup, ContactRequests, PickupLogs, Area, AreaDateRange, Staff, UserTransaction
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin_Recall_App
        fields = '__all__'

class UserStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserStats
        fields = '__all__'

class PickupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pickup
        fields = '__all__'

class ContactRequestsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactRequests
        fields = '__all__'

class PickupLogsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PickupLogs
        fields = '__all__'

class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = '__all__'

class AreaDateRangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AreaDateRange
        fields = '__all__'

class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = '__all__'

class UserTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTransaction
        fields = '__all__'