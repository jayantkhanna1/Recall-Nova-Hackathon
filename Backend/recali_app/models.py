from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=100,null=True,blank=True)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=1000)
    phone = models.CharField(max_length=100,null=True,blank=True)
    zip = models.CharField(max_length=100,null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True,null=True,blank=True)
    type_of = models.CharField(max_length=100)
    type_of_business = models.CharField(max_length=100,null=True,blank=True)
    designation = models.CharField(max_length=100,null=True,blank=True)
    organization_name = models.CharField(max_length=100,null=True,blank=True)
    business_name = models.CharField(max_length=100,null=True,blank=True)
    private_key = models.CharField(max_length=100,null=True,blank=True)
    discount = models.IntegerField(default=0)
    area = models.ForeignKey('Area', on_delete=models.CASCADE,null=True,blank=True)
    address = models.CharField(max_length=100,null=True,blank=True)
    city = models.CharField(max_length=100,null=True,blank=True)
    state = models.CharField(max_length=100,null=True,blank=True)
    country = models.CharField(max_length=100,null=True,blank=True)
    lattitude = models.CharField(max_length=100,null=True,blank=True)
    longitude = models.CharField(max_length=100,null=True,blank=True)
    date_selected = models.CharField(max_length=100,null=True,blank=True)


class ProductCategory(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='images/',null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Product(models.Model):
    productId = models.CharField(max_length=10000)
    parent_category =  models.CharField(max_length=1000,null=True,blank=True)
    product_type = models.CharField(max_length=1000,null=True,blank=True)
    material = models.CharField(max_length=1000,null=True,blank=True)
    size = models.CharField(max_length=1000,null=True,blank=True)
    color = models.CharField(max_length=1000,null=True,blank=True)
    name = models.CharField(max_length=1000,null=True,blank=True)
    made_in_uae = models.BooleanField(default=False)
    manufacturer = models.CharField(max_length=1000,null=True,blank=True)
    manufacturer_sku = models.CharField(max_length=1000,null=True,blank=True)
    quantity = models.CharField(max_length=1000,null=True,blank=True)
    product_impact = models.CharField(max_length=1000,null=True,blank=True)
    certified = models.CharField(max_length=1000,null=True,blank=True)
    adjuctive = models.CharField(max_length=1000,null=True,blank=True)
    description = models.CharField(max_length=10000,null=True,blank=True)
    price = models.JSONField()
    image = models.ImageField(upload_to='images/',null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(ProductCategory, on_delete=models.CASCADE)

class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    pack_size = models.CharField(max_length=100)

class Admin_Recall_App(models.Model):
    token = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=1000)

class UserStats(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total_points = models.IntegerField(default=0)
    cans_recycled = models.IntegerField(default=0)

class Pickup(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    pickup_size = models.IntegerField(null=True,blank=True,help_text="in Kilo Grams")
    pickup_status = models.CharField(max_length=100,null=True,blank=True,choices=(('pending','pending'),('completed','completed'),('confirmed','confirmed'),('toBeCollected','toBeCollected'),('collected','collected')))
    user_confirmed = models.BooleanField(default=False)
    serial_id = models.CharField(max_length=100,null=True,blank=True)
    staff_assigned = models.BooleanField(default=False)

class ContactRequests(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    message = models.CharField(max_length=1000)
    subject = models.CharField(max_length=100)
    phone = models.CharField(max_length=100,null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class PickupLogs(models.Model):
    log = models.CharField(max_length=10000)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date_from = models.DateField(null=True,blank=True)
    date_to = models.DateField(null=True,blank=True)
    pickup_size = models.IntegerField(default=0,null=True,blank=True)
    points = models.IntegerField(default=0,null=True,blank=True)

class Area(models.Model):
    area = models.CharField(max_length=100)
    
class AreaDateRange(models.Model):
    area = models.ForeignKey(Area, on_delete=models.CASCADE)
    date = models.DateField()

class Staff(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=1000)
    phone = models.CharField(max_length=100,null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    area_allotted = models.ManyToManyField(Area,blank=True)
    type = models.CharField(max_length=100,null=True,blank=True,choices=(('ctype','ctype'),('stype','stype')))

class UserTransaction(models.Model):
    product = models.JSONField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    