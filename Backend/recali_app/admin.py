from django.contrib import admin
from .models import User, ProductCategory, Product, Cart, Admin_Recall_App, UserStats, Pickup, ContactRequests, PickupLogs, Area, AreaDateRange, Staff

class YourModelAdmin(admin.ModelAdmin):
    search_fields = ['productId', 'parent_category', 'product_type', 'material', 'size', 'color', 'name', 'made_in_uae', 'manufacturer', 'manufacturer_sku', 'quantity', 'product_impact', 'certified', 'adjuctive', 'description', 'price', 'image', 'created_at', 'category__name']


admin.site.register(User)
admin.site.register(ProductCategory)
admin.site.register(Product,YourModelAdmin)
admin.site.register(Cart)
admin.site.register(Admin_Recall_App)
admin.site.register(UserStats)
admin.site.register(Pickup)
admin.site.register(ContactRequests)
admin.site.register(PickupLogs)
admin.site.register(Area)
admin.site.register(AreaDateRange)
admin.site.register(Staff)
