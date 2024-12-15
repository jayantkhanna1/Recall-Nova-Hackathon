from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.mail import send_mail
from .models import User, ProductCategory, Product, Cart, Admin_Recall_App, UserStats, Pickup, ContactRequests, PickupLogs, Area, AreaDateRange, Staff, UserTransaction
from .serializer import UserSerializer, CategorySerializer, ProductSerializer, CartSerializer, AdminSerializer, UserStatsSerializer, PickupSerializer, ContactRequestsSerializer, PickupLogsSerializer, AreaSerializer, AreaDateRangeSerializer, StaffSerializer, UserTransactionSerializer
from rest_framework import status
from rest_framework import filters, generics
from rest_framework import filters, generics
from rest_framework import filters
from passlib.hash import sha512_crypt as sha512
import random
import pandas as pd
import json
import string
import os
from datetime import datetime
import stripe
from django.db.models import Sum
from dotenv import load_dotenv
load_dotenv()

class AdminView:
    @api_view(['POST'])
    def get_admin_token(request):
        if "email" not in request.data or "password" not in request.data:
            return Response({"message": "Email and Password is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        email = request.data["email"]
        password = request.data["password"]
        password=sha512.hash(password, rounds=5000,salt=os.environ.get('SALT'))
        print(password)
        if Admin_Recall_App.objects.filter(email=email, password=password).exists():
            admin = Admin_Recall_App.objects.get(email=email, password=password)
            token = ''.join(random.choices(string.ascii_uppercase + string.digits, k=100))
            admin.token = token
            admin.save()
            return Response({"message": "Token generated", "token": admin.token}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST)
        
    @api_view(['POST'])
    def get_admin_stats(request):
        if "token" not in request.data:
            return Response({"message": "Token is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        token = request.data["token"]
        if Admin_Recall_App.objects.filter(token=token).exists():
            total_users = User.objects.count()
            total_cans_recycled = UserStats.objects.all().aggregate(Sum('cans_recycled'))
            total_contact_requests = ContactRequests.objects.count()
            total_pickups = Pickup.objects.count()
            return Response({"message":"Success","total_users" : total_users, "total_cans_recycled" : total_cans_recycled, "total_contact_requests" : total_contact_requests,"total_pickups":total_pickups}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Invalid Token"}, status=status.HTTP_400_BAD_REQUEST)

    @api_view(['POST'])
    def get_all_users(request):
        if "token" not in request.data:
            return Response({"message": "Token is required"}, status=status.HTTP_400_BAD_REQUEST)

        token = request.data["token"]
        if Admin_Recall_App.objects.filter(token=token).exists():
            users = User.objects.all()
            serializer = UserSerializer(users, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Invalid Token"}, status=status.HTTP_400_BAD_REQUEST)
        
    @api_view(['POST'])
    def get_all_pickups(request):
        # if "token" not in request.data:
        #     return Response({"message": "Token is required"}, status=status.HTTP_400_BAD_REQUEST)

        # token = request.data["token"]
        # if Admin_Recall_App.objects.filter(token=token).exists():
            pickups = Pickup.objects.all()
            serializer = PickupSerializer(pickups, many=True)
            for i in range(len(serializer.data)):
                user = User.objects.get(id=serializer.data[i]["user"])
                serializer.data[i]["user"] = UserSerializer(user).data
                serializer.data[i]["user"].pop("password")
            return Response(serializer.data, status=status.HTTP_200_OK)
        # else:
        #     return Response({"message": "Invalid Token"}, status=status.HTTP_400_BAD_REQUEST)

class UserView:

    @api_view(['POST'])
    def user_signup(request):
        if "email" not in request.data or "password" not in request.data or "type_of" not in request.data:
            return Response({"message": "Email, Password, type_of is required"}, status=status.HTTP_400_BAD_REQUEST)

        email = request.data["email"]
        password = request.data["password"]
        password=sha512.hash(password, rounds=5000,salt=os.environ.get('SALT'))
        type_of = request.data["type_of"]

        if type_of != "individual" and type_of != "business":
            return Response({"message": "type_of can be 'individual' or 'business'"}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(email=email).exists():
            return Response({"message": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)
        if "name" in request.data:
            name = request.data["name"]
        else:
            name = None
        if "phone" in request.data:
            phone = request.data["phone"]
        else:
            phone = None
        if "type_of_business" in request.data:
            type_of_business = request.data["type_of_business"]
        else:
            type_of_business = None
        if "designation" in request.data:
            designation = request.data["designation"]
        else:
            designation = None
        if "organization_name" in request.data:
            organization_name = request.data["organization_name"]
        else:
            organization_name = None
        if "business_name" in request.data:
            business_name = request.data["business_name"]
        else:
            business_name = None

        if "address" in request.data:
            address = request.data["address"]
        else:
            address = None
        if "city" in request.data:
            city = request.data["city"]
        else:
            city = None
        if "state" in request.data:
            state = request.data["state"]
        else:
            state = None
        if "country" in request.data:
            country = request.data["country"]
        else:
            country = None
        if "lattitude" in request.data:
            lattitude = request.data["lattitude"]
        else:
            lattitude = None
        if "longitude" in request.data:
            longitude = request.data["longitude"]
        else:
            longitude = None
        if "area" in request.data:
            area = request.data["area"]
            if Area.objects.filter(area=area).exists():
                area = Area.objects.get(area=area)
                area = area.id
            else:
                return Response({"message": "Invalid area"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            area = None

        
        otp = random.randint(1000, 9999)
        subject="OTP for recall"
        message="Here is your OTP : "+str(otp)+". \n Please dont share with anyone"
        reciever=[email]
        send_mail(subject,message,os.environ.get('EMAIL'),reciever)
        res = {
            "message": "OTP sent to your email", 
            "otp": otp, 
            "email": email, 
            "password": password, 
            "phone": phone, 
            "name": name, 
            "type_of": type_of,
            "business_name":business_name,
            "organization_name":organization_name,
            "designation":designation,
            "type_of_business":type_of_business,
            "address" : address,
            "city" : city,
            "state" : state,
            "country" : country,
            "lattitude" : lattitude,
            "longitude" : longitude,
            "area" : area
        }
        return Response(res, status=status.HTTP_200_OK)

    @api_view(['POST'])
    def signup_confirm(request):
        try:
            if "email" not in request.data or "password" not in request.data or "type_of" not in request.data:
                return Response({"message": "Email, Password, type_of, otp is required"}, status=status.HTTP_400_BAD_REQUEST)

            email = request.data["email"]
            password = request.data["password"]
            name = request.data["name"]
            type_of = request.data["type_of"]
            phone = request.data["phone"]
            type_of_business = request.data["type_of_business"]
            designation = request.data["designation"]
            organization_name = request.data["organization_name"]
            business_name = request.data["business_name"]
            address = request.data["address"]
            city = request.data["city"]
            state = request.data["state"]
            country = request.data["country"]
            lattitude = request.data["lattitude"]
            longitude = request.data["longitude"]
            area = request.data["area"]
            
            if not Area.objects.filter(area=area).exists():
                return Response({"message": "Invalid area"}, status=status.HTTP_400_BAD_REQUEST)
            
            area = Area.objects.get(area=area)
            if type_of != "individual" and type_of != "business":
                return Response({"message": "type_of can be 'individual' or 'business'"}, status=status.HTTP_400_BAD_REQUEST)
            
            if User.objects.filter(email=email).exists():
                return Response({"message": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)
            
            private_key = ''.join(random.choices(string.ascii_uppercase + string.digits, k=15))
            user = User.objects.create(email=email, password=password, name=name, type_of=type_of, phone=phone, private_key=private_key,type_of_business=type_of_business,designation=designation,organization_name=organization_name,business_name=business_name, address=address, city=city, state=state, country=country, lattitude=lattitude, longitude=longitude, area=area)
            user.save()

            # Now creating a default user stats
            user_stats = UserStats.objects.create(user=user)
            user_stats.save()

            user_stats = UserStatsSerializer(user_stats).data
            user = UserSerializer(user).data
            return Response({"message": "User created successfully", "private_key": private_key,"user":user,"user_stats" : user_stats}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({"message": "Something went wrong","error" : str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    
    @api_view(['POST'])
    def login(request):
        if "private_key" not in request.data:
            if "email" not in request.data or "password" not in request.data:
                return Response({"message": "Email, Password is required"}, status=status.HTTP_400_BAD_REQUEST)
            email = request.data["email"]
            password = request.data["password"]
            if User.objects.filter(email=email).exists():
                user = User.objects.get(email=email)
                password = sha512.hash(password, rounds=5000,salt=os.environ.get('SALT'))
                if password == user.password:
                    private_key = ''.join(random.choices(string.ascii_uppercase + string.digits, k=15))
                    user.private_key = private_key
                    user.save()
                    
                    if UserStats.objects.filter(user=user).exists():
                        user_stats = UserStats.objects.get(user=user)
                        user_stats_serializer = UserStatsSerializer(user_stats).data
                    else:
                        user_stats = UserStats.objects.create(user=user)
                        user_stats.save()
                        user_stats_serializer = UserStatsSerializer(user_stats).data
                    if user.type_of == "individual":
                        # Get 3 random categories
                        categories = ProductCategory.objects.all().order_by('?')[:3]
                        category_serializer = CategorySerializer(categories, many=True).data
                    else:
                        categories = ProductCategory.objects.all().order_by('?')[:5]
                        category_serializer = CategorySerializer(categories, many=True).data
                    user_serializer = UserSerializer(user).data
                    # remove password
                    user_serializer.pop('password')
                    return Response({"message": "Login Successful", "private_key": str(user.private_key),'category':category_serializer,'user':user_serializer,"user_stats":user_stats_serializer}, status=status.HTTP_200_OK)
                else:
                    return Response({"message": "Incorrect Password"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"message": "Email doesn't exists"}, status=status.HTTP_400_BAD_REQUEST)
        elif "private_key" in request.data:
            private_key = request.data["private_key"]
            if User.objects.filter(private_key=private_key).exists():
                user = User.objects.get(private_key=private_key)
                if user.type_of == "individual":
                        # Get 3 random categories
                        categories = ProductCategory.objects.all().order_by('?')[:3]
                        category_serializer = CategorySerializer(categories, many=True).data
                else:
                        categories = ProductCategory.objects.all().order_by('?')[:5]
                        category_serializer = CategorySerializer(categories, many=True).data
                user_serializer = UserSerializer(user).data
                if UserStats.objects.filter(user=user).exists():
                        user_stats = UserStats.objects.get(user=user)
                        user_stats_serializer = UserStatsSerializer(user_stats).data
                else:
                        user_stats = UserStats.objects.create(user=user)
                        user_stats.save()
                        user_stats_serializer = UserStatsSerializer(user_stats).data

                # remove password
                user_serializer.pop('password')
                return Response({"message": "Login Successful", "private_key": private_key,'category':category_serializer,'user':user_serializer,"user_stats":user_stats_serializer}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Invalid private_key"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Invalid private_key or email"}, status=status.HTTP_400_BAD_REQUEST)
            
    @api_view(['POST'])
    def change_password(request):
        if "private_key" not in request.data:
            if "email" not in request.data or "password" not in request.data or "new_password" not in request.data:
                return Response({"message": "Email, Password, New password is required"}, status=status.HTTP_400_BAD_REQUEST)
            email = request.data["email"]
            password = request.data["password"]
            new_password = request.data["new_password"]
            if User.objects.filter(email=email).exists():
                user = User.objects.get(email=email)
                password = sha512.hash(password, rounds=5000,salt=os.environ.get('SALT'))
                if password == user.password:
                    new_password = sha512.hash(new_password, rounds=5000,salt=os.environ.get('SALT'))
                    user.password = new_password
                    user.save()
                    return Response({"message": "Password changed successfully"}, status=status.HTTP_200_OK)
                else:
                    return Response({"message": "Incorrect Password"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"message": "Email doesn't exists"}, status=status.HTTP_400_BAD_REQUEST)

        elif "private_key" in request.data:
            if "password" not in request.data or "new_password" not in request.data:
                return Response({"message": "Password, New password is required"}, status=status.HTTP_400_BAD_REQUEST)
            private_key = request.data["private_key"]
            password = request.data["password"]
            password = sha512.hash(password, rounds=5000,salt=os.environ.get('SALT'))
            new_password = request.data["new_password"]
            if User.objects.filter(private_key=private_key).exists():
                user = User.objects.get(private_key=private_key)
                if password == user.password:
                    new_password = sha512.hash(new_password, rounds=5000,salt=os.environ.get('SALT'))
                    user.password = new_password
                    user.save()
                    return Response({"message": "Password changed successfully"}, status=status.HTTP_200_OK)
                return Response({"error": "Incorrect password"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"error": "Invalid private_key"}, status=status.HTTP_400_BAD_REQUEST)

    @api_view(['PUT'])
    def update_profile(request):
        if "private_key" not in request.data:
            return Response({"error": "Invalid private_key"}, status=status.HTTP_400_BAD_REQUEST)
        private_key = request.data["private_key"]
        if User.objects.filter(private_key=private_key).exists():
            user = User.objects.get(private_key=private_key)
            if "name" in request.data:
                user.name = request.data["name"]
            if "email" in request.data:
                user.email = request.data["email"]
            if "phone" in request.data:
                user.phone = request.data["phone"]
            if "address" in request.data:
                user.address = request.data["address"]
            if "city" in request.data:
                user.city = request.data["city"]
            if "state" in request.data:
                user.state = request.data["state"]
            if "zip" in request.data:
                user.zip = request.data["zip"]
            if "country" in request.data:
                user.country = request.data["country"]
            if "business_name" in request.data:
                user.business_name = request.data["business_name"]
            if "organization_name" in request.data:
                user.organization_name = request.data["organization_name"]
            if "designation" in request.data:
                user.designation = request.data["designation"]
            if "type_of_business" in request.data:
                user.type_of_business = request.data["type_of_business"]
            user.save()
            user = User.objects.get(private_key=private_key)
            user_serializer = UserSerializer(user).data
            user_serializer.pop('password')
            return Response({"message": "Profile updated successfully","user" : user_serializer}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid private_key"}, status=status.HTTP_400_BAD_REQUEST)

    @api_view(['DELETE'])
    def delete_profile(request):
        if "private_key" not in request.data or "password" not in request.data:
            return Response({"error": "Private key and Password are required"}, status=status.HTTP_400_BAD_REQUEST)
        private_key = request.data["private_key"]
        password = request.data["password"]
        password = sha512.hash(password, rounds=5000,salt=os.environ.get('SALT'))
        if User.objects.filter(private_key=private_key,password=password).exists():
            user = User.objects.get(private_key=private_key)
            user_stats = UserStats.objects.get(user=user)
            user_stats.delete()
            user.delete()
            return Response({"message": "Profile deleted successfully"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid private_key or password"}, status=status.HTTP_400_BAD_REQUEST)

    @api_view(['POST'])
    def forgot_password(request):
        if "email" not in request.data:
            return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)
        email = request.data["email"]
        if User.objects.filter(email=email).exists():
            # Generating otp
            otp = random.randint(1000, 9999)
            subject="OTP for recall"
            message="Here is your OTP to reset password : "+str(otp)+". \n Please dont share with anyone"
            reciever=[email]
            send_mail(subject,message,os.environ.get('EMAIL'),reciever)
            return Response({"message": "Mail Sent Successfully","otp" : otp}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "User doesn't exists"}, status=status.HTTP_400_BAD_REQUEST)
    
    @api_view(['POST'])
    def reset_password(request):
        if "email" not in request.data or "password" not in request.data:
            return Response({"error": "Email, Password are required"}, status=status.HTTP_400_BAD_REQUEST)
        email = request.data["email"]
        password = request.data["password"]
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            password = sha512.hash(password, rounds=5000,salt=os.environ.get('SALT'))
            user.password = password
            user.save()
            return Response({"message": "Password reset successfully"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "User doesn't exists"}, status=status.HTTP_400_BAD_REQUEST)
        
class CategoryView:
    class CategoryList(generics.ListAPIView):
        queryset = ProductCategory.objects.all()
        serializer_class = CategorySerializer
        filter_backends = [filters.SearchFilter]
        search_fields = ['name']

    @api_view(['POST'])
    def add_category(request):
        # Checking if request is from admin or not
        if "admin_token" not in request.data:
            return Response({"error": "Admin_Recall_App token is required"}, status=status.HTTP_400_BAD_REQUEST)
        admin_token = request.data["admin_token"]
        if not Admin_Recall_App.objects.filter(token=admin_token).exists():
            return Response({"error": "Invalid admin token"}, status=status.HTTP_400_BAD_REQUEST)
        
        if "category" not in request.data:
            return Response({"error": "ProductCategory is required"}, status=status.HTTP_400_BAD_REQUEST)
        if "image" not in request.data:
            return Response({"error": "Image is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        image = request.data["image"]
        category = request.data["category"]
        if ProductCategory.objects.filter(name=category).exists():
            return Response({"error": "ProductCategory already exists"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            ProductCategory.objects.create(name=category, image=image)
            return Response({"message": "ProductCategory added successfully"}, status=status.HTTP_200_OK)
        
class ProductView:
    @api_view(['POST'])
    def add_product(request):
        # Check if admin
        if "admin_token" not in request.data:
            return Response({"error": "Admin_Recall_App token is required"}, status=status.HTTP_400_BAD_REQUEST)
        admin_token = request.data["admin_token"]
        if not Admin_Recall_App.objects.filter(token=admin_token).exists():
            return Response({"error": "Invalid admin token"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if all required fields are present
        if "product_name" not in request.data or "category" not in request.data or "price" not in request.data or "image" not in request.data and "productId" not in request.data:
            return Response({"error": "Product name, ProductCategory id, image, price, productId is required"}, status=status.HTTP_400_BAD_REQUEST)
        product_name = request.data["product_name"]
        category = request.data["category"]
        price = request.data["price"]
        image = request.data["image"]
        fields = [
            "product_type",
            "material",
            "size",
            "color",
            "name",
            "made_in_uae",
            "manufacturer",
            "manufacturer_sku",
            "quantity",
            "product_impact",
            "certified",
            "adjuctive",
            "description",
        ]

        for field in fields:
            if field in request.data:
                locals()[field] = request.data[field]
            else:
                locals()[field] = ""
        
        # Check if category exists if not create it and then create product
        if ProductCategory.objects.filter(name=category).exists():
            category = ProductCategory.objects.get(name=category)
            product = Product.objects.create(name=product_name, category=category, price=price, image=image, description=locals()['description'], product_type=locals()['product_type'], material=locals()['material'], size=locals()['size'], color=locals()['color'], made_in_uae=locals()['made_in_uae'], manufacturer=locals()['manufacturer'], manufacturer_sku=locals()['manufacturer_sku'], quantity=locals()['quantity'], product_impact=locals()['product_impact'], certified=locals()['certified'], adjuctive=locals()['adjuctive'])
            product.save()
            productserialized = ProductSerializer(product).data
            return Response({"message": "Product added successfully","product":productserialized}, status=status.HTTP_200_OK)
        else:
            # Create new category
            category = ProductCategory.objects.create(name=category)
            category.save()
            product = Product.objects.create(name=product_name,category=category,price=price,image=image,description=locals()['description'])
            product.save()
            productserialized = ProductSerializer(product).data
            return Response({"message": "Product added successfully","product":productserialized}, status=status.HTTP_200_OK)

    @api_view(['PUT'])
    def update_product(request):
        # Check if admin
        if "admin_token" not in request.data:
            return Response({"error": "Admin_Recall_App token is required"}, status=status.HTTP_400_BAD_REQUEST)
        admin_token = request.data["admin_token"]
        if not Admin_Recall_App.objects.filter(token=admin_token).exists():
            return Response({"error": "Invalid admin token"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if all required fields are present
        if "product_id" not in request.data and "id" not in request.data:
            return Response({"error": "Product id is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        product_id = request.data["product_id"]
        id = request.data["id"]
        if not Product.objects.filter(id=id, productId = product_id).exists():
            return Response({"error": "Invalid id"}, status=status.HTTP_400_BAD_REQUEST)
        
        product = Product.objects.get(id=product_id)
        if "product_name" in request.data:
            product.name = request.data["product_name"]
        if "category_id" in request.data:
            product.category = request.data["category_id"]
        if "price" in request.data:
            product.price = request.data["price"]
        if "image" in request.data:
            product.image = request.data["image"]
        if "description" in request.data:
            product.description = request.data["description"]
        if "material" in request.data:
            product.material = request.data["material"]
        if "product_type" in request.data:
            product.product_type = request.data["product_type"]
        if "material" in request.data:
            product.material = request.data["material"]
        if "size" in request.data:
            product.size = request.data["size"]
        if "color" in request.data:
            product.color = request.data["color"]
        if "name" in request.data:
            product.name = request.data["name"]
        if "made_in_uae" in request.data:
            product.made_in_uae = request.data["made_in_uae"]
        if "manufacturer" in request.data:
            product.manufacturer = request.data["manufacturer"]
        if "manufacturer_sku" in request.data:
            product.manufacturer_sku = request.data["manufacturer_sku"]
        if "quantity" in request.data:
            product.quantity = request.data["quantity"]
        if "product_impact" in request.data:
            product.product_impact = request.data["product_impact"]
        if "certified" in request.data:
            product.certified = request.data["certified"]
        if "adjuctive" in request.data:
            product.adjuctive = request.data["adjuctive"]
        if "description" in request.data:
            product.description = request.data["description"]

        product.save()
        productserialized = ProductSerializer(product).data
        return Response({"message": "Product updated successfully","product":productserialized}, status=status.HTTP_200_OK)

    @api_view(['DELETE'])
    def delete_product(request):
        if "admin_token" not in request.data:
            return Response({"error": "Admin_Recall_App token is required"}, status=status.HTTP_400_BAD_REQUEST)
        admin_token = request.data["admin_token"]
        if not Admin_Recall_App.objects.filter(token=admin_token).exists():
            return Response({"error": "Invalid admin token"}, status=status.HTTP_400_BAD_REQUEST)
        
        if "product_id" not in request.data:
            return Response({"error": "Product id is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        product_id = request.data["product_id"]
        if not Product.objects.filter(id=product_id).exists():
            return Response({"error": "Invalid product id"}, status=status.HTTP_400_BAD_REQUEST)
        
        product = Product.objects.get(id=product_id)
        product.delete()

        return Response({"message": "Product deleted successfully"}, status=status.HTTP_200_OK)
    
    @api_view(['GET'])
    def get_product(request):
        products = Product.objects.all()

        if "id" in request.GET:
            query = request.GET["id"]
            products = products.filter(id=query)
        if "product_id" in request.GET:
            query = request.GET["product_id"]
            products = products.filter(productId=query)
        if "name" in request.GET:
            query = request.GET["name"]
            products = products.filter(name__icontains=query)
        if "category_id" in request.GET:
            query = request.GET["category_id"]
            products = products.filter(category__id__icontains=query)
        if "category_name" in request.GET:
            query = request.GET["category_name"]
            category_id = ProductCategory.objects.filter(name=query)
            products = products.filter(category__name__icontains=query)
        if "price" in request.GET:
            query = request.GET["price"]
            products = products.filter(price__lte=query)
            
        user = None
        if "user_id" in request.GET: 
            if User.objects.filter(id=request.GET["user_id"]).exists(): 
                user = User.objects.get(id=request.GET["user_id"])
        if "private_token" in request.GET:
            if User.objects.filter(private_token=request.GET["private_token"]).exists():
                user = User.objects.get(private_token=request.GET["private_token"])

        products_serialized = ProductSerializer(products,many=True).data
        if user is not None:
            for product in products_serialized:
                product["is_added_to_cart"] = False
                if Cart.objects.filter(product=product["id"],user=user).exists():
                    product["is_added_to_cart"] = True
        return Response({"products":products_serialized}, status=status.HTTP_200_OK)
    
class CartView:
    @api_view(['POST'])
    def add_to_cart(request):
        if "private_key" not in request.data or "product_id" not in request.data or "quantity" not in request.data or "pack_size" not in request.data:
            return Response({"error": "Private Key, Product id, quantity, pack size is required"}, status=status.HTTP_400_BAD_REQUEST) 
        
        private_key = request.data["private_key"]
        product_id = request.data["product_id"]
        quantity = request.data["quantity"]
        pack_size = request.data["pack_size"]

        if int(pack_size) != 12 and int(pack_size) != 50 and int(pack_size) != 100 and int(pack_size) !=500 and int(pack_size) != 1000:
            return Response({"error": "Invalid pack_size"}, status=status.HTTP_400_BAD_REQUEST) 
        

        if User.objects.filter(private_key = private_key).exists():
            user = User.objects.get(private_key = private_key)
        else:
            return Response({"error": "User doesn't exists"}, status=status.HTTP_400_BAD_REQUEST) 
        if not Product.objects.filter(id = product_id).exists():
            return Response({"error": "Product doesn't exists"}, status=status.HTTP_400_BAD_REQUEST) 
        
        product = Product.objects.get(id = product_id)
        Cart.objects.create(user = user,product = product,quantity= quantity,pack_size=pack_size)
        cart = Cart.objects.filter(user = user)
        cart = CartSerializer(cart,many=True).data
        return Response({"message":"Added to User Cart","cart":cart}, status=status.HTTP_200_OK)

    @api_view(['GET'])
    def get_cart(request):
        if "private_key" in request.GET:
            if User.objects.filter(private_key=request.GET["private_key"]).exists():
                user = User.objects.get(private_key=request.GET["private_key"])
                cart = Cart.objects.filter(user = user)
                cart = CartSerializer(cart,many=True).data

                # to the cart data also add the product data
                for cart_item in cart:
                    product = Product.objects.get(id = cart_item["product"])
                    product = ProductSerializer(product).data
                    cart_item["product"] = product
                    for x in cart_item["product"]["price"]:
                        if cart_item["pack_size"] in x["size"]:
                            cart_item["product"]["price"] = x["price"]
                    
                return Response({"message":"Get request successful","cart":cart}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "User doesn't exists"}, status=status.HTTP_400_BAD_REQUEST)
            
        if "user_id" not in request.GET:
            return Response({"error": "User id is required in query params"}, status=status.HTTP_400_BAD_REQUEST) 
        
        user = request.GET["user_id"]

        if User.objects.filter(id = user).exists():
            user = User.objects.get(id = user)
        else:
            return Response({"error": "User doesn't exists"}, status=status.HTTP_400_BAD_REQUEST) 
        cart = Cart.objects.filter(user = user)
        cart = CartSerializer(cart,many=True).data
        # to the cart data also add the product data
        for cart_item in cart:
            product = Product.objects.get(id = cart_item["product"])
            product = ProductSerializer(product).data
            cart_item["product"] = product
    
        return Response({"message":"Get request successful","cart":cart}, status=status.HTTP_200_OK)

    @api_view(['PUT'])
    def update_cart(request):
        if "cart_id" not in request.data or "quantity" not in request.data:
            return Response({"error": "Cart id, quantity is required"}, status=status.HTTP_400_BAD_REQUEST) 
        
        cart_id = request.data['cart_id']
        quantity = request.data['quantity']
        
        if quantity == 0:
            return Response({"message": "Quantity shouldn't be 0"}, status=status.HTTP_400_BAD_REQUEST)
        if not Cart.objects.filter(id = cart_id).exists():
            return Response({"message": "Cart doesn't exists"}, status=status.HTTP_400_BAD_REQUEST)

        cart = Cart.objects.get(id = cart_id)
        cart.quantity = quantity
        cart.save()
        cart = CartSerializer(cart).data
        return Response({"message":"Cart Updated","cart":cart}, status=status.HTTP_200_OK)

    @api_view(['DELETE'])
    def delete_from_cart(request):
        if "private_key" in request.data:
            if "product_id" not in request.data:
                return Response({"error": "Product id is required"}, status=status.HTTP_400_BAD_REQUEST) 
            private_key = request.data['private_key']
            prod_id = request.data['product_id']
            if User.objects.filter(private_key = private_key).exists():
                return Response({"error": "No such user exists"}, status=status.HTTP_400_BAD_REQUEST) 
            user = User.objects.get(private_key = private_key)
            Cart.objects.delete(user=user,product=prod_id)
            return Response({"message":"Cart Updated","cart":cart}, status=status.HTTP_200_OK)
        else:
            if "cart_id" not in request.data and "product_id" not in request.data:
                return Response({"error": "Cart id, Product id is required"}, status=status.HTTP_400_BAD_REQUEST) 
            
            cart_id = request.data['cart_id']
            quantity = request.data['quantity']
            
            if quantity == 0:
                return Response({"message": "Quantity shouldn't be 0"}, status=status.HTTP_400_BAD_REQUEST)
            if not Cart.objects.filter(id = cart_id).exists():
                return Response({"message": "Cart doesn't exists"}, status=status.HTTP_400_BAD_REQUEST)

            cart = Cart.objects.get(id = cart_id)
            cart.quantity = quantity
            cart.save()
            cart = CartSerializer(cart).data
            return Response({"message":"Cart Updated","cart":cart}, status=status.HTTP_200_OK)
    
class ContactView:
    @api_view(['POST'])
    def contact(request):
        if "name" not in request.data or "email" not in request.data or "message" not in request.data and "subject" not in request.data:
            return Response({"error": "Name, Email, Message, Subject is required"}, status=status.HTTP_400_BAD_REQUEST) 
        
        name = request.data["name"]
        email = request.data["email"]
        message = request.data["message"]
        subject = request.data["subject"]
        
        contact = ContactRequests.objects.create(name=name,email=email,message=message,subject=subject)
        to_be_sent = "Hey There this user wants to contact you.\nName: "+name+"\nEmail: "+email+"\nMessage: "+message
        if "phone" in request.data:
            phone = request.data["phone"]
            to_be_sent += "\nPhone: "+phone
            contact.phone = phone
        contact.save()
        send_mail(subject,message,os.environ.get('EMAIL'),[os.environ.get('EMAIL')])
        contact = ContactRequestsSerializer(contact).data
        return Response({"message":"Message Sent","contact" : contact}, status=status.HTTP_200_OK)

class UserStatsView:
    @api_view(['GET'])
    def get_user_stats(request):
        if "private_key" in request.GET :
            if not User.objects.filter(private_key = request.GET["private_key"]).exists():
                return Response({"error": "No such user exists"}, status=status.HTTP_400_BAD_REQUEST)
            
            private_key = request.GET["private_key"]
            user = User.objects.get(private_key = private_key)
            if not User.objects.filter(private_key = private_key).exists():
                return Response({"error": "No such user exists"}, status=status.HTTP_400_BAD_REQUEST)
            if not UserStats.objects.filter(user = user).exists():
                user_stats = UserStats.objects.create(user = user)
                user_stats.save()
            user_stats = UserStats.objects.get(user = user)
            user = UserSerializer(user).data
            user_area_id = user["area"]
            user_area = Area.objects.get(id = user_area_id)
            user["area"] = user_area.area
            user_stats = UserStatsSerializer(user_stats).data
            return Response({"message":"Get request successful","user":user,"user_stats":user_stats}, status=status.HTTP_200_OK)
        elif "user_id" in request.GET:
            user_id = request.GET["user_id"]
            user = User.objects.get(id = user_id)
            if not User.objects.filter(id = user_id).exists():
                return Response({"error": "No such user exists"}, status=status.HTTP_400_BAD_REQUEST)
            if not UserStats.objects.filter(user = user).exists():
                user_stats = UserStats.objects.create(user = user)
                user_stats.save()
            user_stats = UserStats.objects.get(user = user)
            user = UserSerializer(user).data
            user_area_id = user["area"]
            user_area = Area.objects.get(id = user_area_id)
            user["area"] = user_area.area
            user_stats = UserStatsSerializer(user_stats).data
            return Response({"message":"Get request successful","user":user,"user_stats":user_stats}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Private key or User id is required"}, status=status.HTTP_400_BAD_REQUEST) 

    @api_view(['PUT'])
    def update_user_stats(request):
        if "private_key" not in request.data:
            return Response({"error": "Private key is required"}, status=status.HTTP_400_BAD_REQUEST)
    
        private_key = request.data["private_key"]
        user = User.objects.get(private_key = private_key)

        if not User.objects.filter(private_key = private_key).exists():
            return Response({"error": "No such user exists"}, status=status.HTTP_400_BAD_REQUEST)
        
        if not UserStats.objects.filter(user = user).exists():
            user_stats = UserStats.objects.create(user = user)
            user_stats.save()

        user_stats = UserStats.objects.get(user = user)
        if "total_points" in request.data:
            user_stats.total_points = user_stats.total_points+request.data["total_points"]

        if "cans_recycled" in request.data:
            user_stats.cans_recycled = user_stats.cans_recycled + request.data["cans_recycled"]

        user_stats.save()
        user_stats = UserStatsSerializer(user_stats).data
        return Response({"message":"User Stats Updated","user_stats":user_stats}, status=status.HTTP_200_OK)
    
    @api_view(['PUT'])
    def IncrementUserStats(request):
        if "private_key" not in request.data:
            return Response({"error": "Private key is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        private_key = request.data["private_key"]
        user = User.objects.get(private_key = private_key)

        if not User.objects.filter(private_key = private_key).exists():
            return Response({"error": "No such user exists"}, status=status.HTTP_400_BAD_REQUEST)
        
        if not UserStats.objects.filter(user = user).exists():
            user_stats = UserStats.objects.create(user = user)
            user_stats.save()

        user_stats = UserStats.objects.get(user = user)
        # if "total_points" in request.data:
        #     user_stats.total_points = user_stats.total_points + request.data["total_points"]

        if "cans_recycled" in request.data:
            user_stats.total_points = user_stats.total_points + request.data["cans_recycled"]
            user_stats.cans_recycled = user_stats.cans_recycled + request.data["cans_recycled"]

        user_stats.save()
        user_stats = UserStatsSerializer(user_stats).data
        return Response({"message":"User Stats Updated","user_stats":user_stats}, status=status.HTTP_200_OK)

class PickupView:
    @api_view(['POST'])
    def schedule_pickup(request):
        if "private_key" in request.data:
            if "date" not in request.data:
                return Response({"error": "Date from and Date to, Pickup size is required"}, status=status.HTTP_400_BAD_REQUEST)

            private_key = request.data["private_key"]
            date_from = request.data["date"]
            pickup_size = 0
            if pickup_size in request.data:
                pickup_size = request.data["pickup_size"]
                
            if not User.objects.filter(private_key = private_key).exists():
                return Response({"error": "No such user exists"}, status=status.HTTP_400_BAD_REQUEST)
            
            user = User.objects.get(private_key = private_key)
            date_from_1 = date_from.split("-")
            date_from_ = date_from_1[2]+"-"+date_from_1[1]+"-"+date_from_1[0]
            pickup = Pickup.objects.create(user = user, date = date_from_, pickup_size = pickup_size, pickup_status = "pending")
            pickup.save()
            pickup = PickupSerializer(pickup).data
            name = user.name
            subject = "Pickup Scheduled"
            message = "User "+str(name)+" has scheduled a pickup between "+str(date_from)+" of size "+str(pickup_size)
            send_mail(subject,message,os.environ.get('EMAIL'),[os.environ.get('EMAIL')])
            log = "A pickup has been scheduled for "+str(date_from)+" of size "+str(pickup_size)+" on date "+str(datetime.today())+". Its status is pending"
            date_from = date_from
            pickup_size = pickup_size
            date_obj = datetime.strptime(date_from, '%d-%m-%Y')  # convert to datetime object
            date_from = date_obj.strftime('%Y-%m-%d')
            logs = PickupLogs.objects.create(log = log,user =  User.objects.get(private_key = private_key), date_from = date_from, pickup_size = pickup_size)
            logs.save()
            return Response({"message":"Pickup Scheduled",'pickup':pickup}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Private key is required"}, status=status.HTTP_400_BAD_REQUEST)

    @api_view(['PUT'])
    def update_pickup(request):
        if "private_key" not in request.data:
            return Response({"error": "Private key is required"}, status=status.HTTP_400_BAD_REQUEST)
        if "pickup_id" not in request.data:
            return Response({"error": "Pickup id is required"}, status=status.HTTP_400_BAD_REQUEST)
        private_key = request.data["private_key"]
        pickup_id = request.data["pickup_id"]
        if not User.objects.filter(private_key = private_key).exists():
            return Response({"error": "No such user exists"}, status=status.HTTP_400_BAD_REQUEST)
        if not Pickup.objects.filter(id = pickup_id).exists():
            return Response({"error": "No such pickup exists"}, status=status.HTTP_400_BAD_REQUEST)
        pickup = Pickup.objects.get(id = pickup_id)
        if "date" in request.data:
            date_from = request.data["date"]
            date_obj = datetime.strptime(date_from, '%d-%m-%Y')  # convert to datetime object
            date_from = date_obj.strftime('%Y-%m-%d') 
            pickup.date = date_from
            
        else:
            date_from = None
        if "pickup_size" in request.data:
            pickup.pickup_size = request.data["pickup_size"]

        if "pickup_status" in request.data:
            status_ = request.data["pickup_status"]
            if status_ != "pending" and status_ != "completed" and status_ != "confirmed" and status_ != "toBeCollected" and status_ != "collected":
                return Response({"error": "Status can only be pending, completed, confirmed, toBeCollected or collected"}, status=status.HTTP_400_BAD_REQUEST)
            pickup.pickup_status = status_
            
            if status_ == "toBeCollected":
                pickup.staff_assigned = True
        
        if "serial_id" in request.data:
            pickup.serial_id = request.data["serial_id"]       

        pickup.save()
        pickup = PickupSerializer(pickup).data
        username = User.objects.get(private_key = private_key).name
        log = "Pickup has been updated for "+str(pickup["date"])+" of size "+str(pickup["pickup_size"])+" on date "+str(datetime.today())+". Its status is "+str(pickup["pickup_status"])+". "
        pickup_size = pickup["pickup_size"]
        if date_from == None:
            date_from = pickup["date"]
        PickupLogs.objects.create(log = log,user =  User.objects.get(private_key = private_key), date_from = date_from, pickup_size = pickup_size)
        return Response({"message":"Pickup Updated","pickup":pickup}, status=status.HTTP_200_OK)

    @api_view(['GET'])
    def get_pickup_for_a_user(request):
        if "private_key" not in request.GET:
            return Response({"error": "Private key is required"}, status=status.HTTP_400_BAD_REQUEST)
        private_key = request.GET["private_key"]
        if not User.objects.filter(private_key = private_key).exists():
            return Response({"error": "No such user exists"}, status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.get(private_key = private_key)
        pickups = Pickup.objects.filter(user = user)
        pickups = PickupSerializer(pickups, many = True).data
        pickups = [dict(pickup, **{"user":UserSerializer(User.objects.get(id = pickup["user"])).data}) for pickup in pickups]
        pickups = [dict(pickup, **{"user":dict(pickup["user"], **{"password":None})}) for pickup in pickups]
        area = Area.objects.get(id = user.area.id)
        print(pickups)
        area_id = area.id
        area_name = area.area
        for x in pickups:
            x['user']['area'] = [area_id,area_name]
        return Response({"message":"Get request successful","pickups":pickups}, status=status.HTTP_200_OK)

    @api_view(['POST'])
    def update_user_confirmation(request):
        if "pickup_id" not in request.data:
            return Response({"error": "Pickup id is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        if "user_confirmation" not in request.data:
            return Response({"error": "User confirmation is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        user_confirmation = request.data["user_confirmation"]
        if user_confirmation != True and user_confirmation != False:
            return Response({"error": "User confirmation can only be true or false"}, status=status.HTTP_400_BAD_REQUEST)
        
        pickup_id = request.data["pickup_id"]
        if not Pickup.objects.filter(id = pickup_id).exists():
            return Response({"error": "No such pickup exists"}, status=status.HTTP_400_BAD_REQUEST)
        
        pickup = Pickup.objects.get(id = pickup_id)
        pickup.user_confirmed = True
        pickup.save()
        return Response({"message":"User confirmation updated"}, status=status.HTTP_200_OK)
    
    @api_view(['GET'])
    def get_user_confirmation(request):
        if "pickup_id" not in request.GET:
            return Response({"error": "Pickup ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        pickup_id = request.GET["pickup_id"]
        if not Pickup.objects.filter(id = pickup_id).exists():
            return Response({"error": "No such pickup exists"}, status=status.HTTP_400_BAD_REQUEST)
        pickup = Pickup.objects.get(id = pickup_id)
        pickup_serializer = PickupSerializer(pickup).data
        return Response({"message":"Get request successful","pickup_serializer":pickup_serializer}, status=status.HTTP_200_OK)
    
    @api_view(['POST'])
    def grant_schedule(request):
        # Check if user is admin
        if "token" not in request.data:
            return Response({"error": "Admin_Recall_App Token is required"}, status=status.HTTP_400_BAD_REQUEST)
        if "user_id" not in request.data:
            return Response({"error": "User id is required"}, status=status.HTTP_400_BAD_REQUEST)
        if "date_from" not in request.data:
            return Response({"error": "Date from is required"}, status=status.HTTP_400_BAD_REQUEST)
        if "date_to" not in request.data:
            return Response({"error": "Date to is required"}, status=status.HTTP_400_BAD_REQUEST)
        if "pickup_size" not in request.data:
            return Response({"error": "Pickup size is required"}, status=status.HTTP_400_BAD_REQUEST)
        if not Admin_Recall_App.objects.filter(token = request.data["token"]).exists():
            return Response({"error": "No such admin exists"}, status=status.HTTP_400_BAD_REQUEST)
        if not User.objects.filter(id = request.data["user_id"]).exists():
            return Response({"error": "No such user exists"}, status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.get(id = request.data["user_id"])
        date_from = request.data["date_from"]
        date_to = request.data["date_to"]
        pickup_size = request.data["pickup_size"]
        date_from = datetime.strptime(date_from, '%d-%m-%Y')  # convert to datetime object
        date_from = date_from.strftime('%Y-%m-%d')
        date_to = datetime.strptime(date_to, '%d-%m-%Y')  # convert to datetime object
        date_to = date_to.strftime('%Y-%m-%d')
        Pickup.objects.create(user = user, date_from = date_from, date_to = date_to, pickup_size = pickup_size)
        pickup = Pickup.objects.filter(user = user, date_from = date_from, date_to = date_to, pickup_size = pickup_size)
        pickup = PickupSerializer(pickup, many = True).data
        pickup = [dict(pickup, **{"user":UserSerializer(User.objects.get(id = pickup["user"])).data}) for pickup in pickup]
        pickup = [dict(pickup, **{"user":dict(pickup["user"], **{"password":None})}) for pickup in pickup]
        print(date_from, date_to)
        PickupLogs.objects.create(log = "Pickup has been created between "+str(date_from)+" and "+str(date_to)+" of size "+str(pickup_size)+" on date "+str(datetime.today())+". Its status is pending. ",user =  user, date_from = date_from, date_to = date_to, pickup_size = pickup_size)
        return Response({"message":"Pickup created","pickup":pickup}, status=status.HTTP_200_OK)
    
class HistoryView:
    @api_view(['POST'])
    def get_history(request):
        # Send all pickup logs to the user sorted by date
        if "private_key" not in request.data:
            return Response({"message": "Private key is required"}, status=status.HTTP_400_BAD_REQUEST)

        private_key = request.data["private_key"]
        if not User.objects.filter(private_key=private_key).exists():
            return Response({"message": "No such user exists"}, status=status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.get(private_key=private_key)
        history = PickupLogs.objects.filter(user=user)
        history = PickupLogsSerializer(history, many=True).data
        return Response({"message": "Get request successful", "history": history}, status=status.HTTP_200_OK)

class AreaView:
    @api_view(['GET'])
    def get_all_area(request):
        areas = AreaDateRange.objects.all()
        areas_data = AreaDateRangeSerializer(areas, many=True).data
        area_ids = [area["area"] for area in areas_data]
        areas = Area.objects.filter(id__in=area_ids)
        area_names = {area.id: area.area for area in areas}
        for area in areas_data:
            area["area"] = area_names[area["area"]]
        return Response({"message": "Get request successful", "areas": areas_data}, status=status.HTTP_200_OK)

    @api_view(['POST'])
    def add_new_area(request):
        if "area_name" not in request.data and "date" not in request.data and "admin_token" not in request.data:
            return Response({"message": "Area name, date_from and date_range is required"}, status=status.HTTP_400_BAD_REQUEST)
        area_name = request.data["area_name"]
        date_from = request.data["date"]
        admin_token = request.data["admin_token"]
        if not Admin_Recall_App.objects.filter(token=admin_token).exists():
            return Response({"message": "No such admin exists"}, status=status.HTTP_400_BAD_REQUEST)
        date_from = datetime.strptime(date_from, '%d-%m-%Y')  # convert to datetime object
        date_from = date_from.strftime('%Y-%m-%d')
        if Area.objects.filter(area = area_name).exists():
            return Response({"message": "Area already exists"}, status=status.HTTP_400_BAD_REQUEST)
        area = Area.objects.create(area=area_name)
        area.save()
        area_date_range = AreaDateRange.objects.create(area=area, date=date_from)
        area_date_range.save()
        area_date_range = AreaDateRangeSerializer(area_date_range).data
        return Response({"message": "Area added successfully","area":area_date_range}, status=status.HTTP_200_OK)
    
    @api_view(['PUT'])
    def update_area(request):
        if "area_id" and "admin_token" not in request.data:
            return Response({"message": "Area ID and admin_token is required"}, status=status.HTTP_400_BAD_REQUEST)
        area_id = request.data["area_id"]
        admin_token = request.data["admin_token"]
        if not Admin_Recall_App.objects.filter(token=admin_token).exists():
            return Response({"message": "No such admin exists"}, status=status.HTTP_400_BAD_REQUEST)
        if not Area.objects.filter(id=area_id).exists():
            return Response({"message": "No such area exists"}, status=status.HTTP_400_BAD_REQUEST)
        area = Area.objects.get(id=area_id)
        if not AreaDateRange.objects.filter(area=area).exists():
            return Response({"message": "No such area exists"}, status=status.HTTP_400_BAD_REQUEST)
        area_date_range = AreaDateRange.objects.get(area=area_id)
        if "area_name" in request.data:
            area.area = request.data["area_name"]
        if "date" in request.data:
            date = request.data["date"]
            date = datetime.strptime(date, '%d-%m-%Y')  # convert to datetime object
            date = date.strftime('%Y-%m-%d')
            area_date_range.date = date
        area_date_range.save()
    
        return Response({"message": "Area updated successfully"}, status=status.HTTP_200_OK)

    @api_view(['DELETE'])
    def delete_area(request):
        if "area_id" and "admin_token" not in request.data:
            return Response({"message": "Area ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        admin_token = request.data["admin_token"]
        if not Admin_Recall_App.objects.filter(token=admin_token).exists():
            return Response({"message": "No such admin exists"}, status=status.HTTP_400_BAD_REQUEST)
        area_id = request.data["area_id"]
        if not Area.objects.filter(id=area_id).exists():
            return Response({"message": "No such area exists"}, status=status.HTTP_400_BAD_REQUEST)
        area = Area.objects.get(id=area_id)
        if not AreaDateRange.objects.filter(area=area).exists():
            return Response({"message": "No such area exists"}, status=status.HTTP_400_BAD_REQUEST)
        area_date_range = AreaDateRange.objects.get(area=area_id)
        area_date_range.delete()
        area.delete()
        return Response({"message": "Area deleted successfully"}, status=status.HTTP_200_OK)

class StaffView:
    @api_view(['POST'])
    def staff_login(request):
        if "email" not in request.data or "password" not in request.data:
            return Response({"message": "Email and password is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        email = request.data["email"]
        password = request.data["password"]
        if not Staff.objects.filter(email=email).exists():
            return Response({"message": "No such staff exists"}, status=status.HTTP_400_BAD_REQUEST)
        
        staff = Staff.objects.get(email=email)
        if staff.password != password:
            return Response({"message": "Incorrect password"}, status=status.HTTP_400_BAD_REQUEST)
        
        staff = StaffSerializer(staff).data
        lst = []
        for x in staff['area_allotted']:
            area = Area.objects.get(id = x)
            t = (
                x,area.area
            )
            lst.append(t)
        staff['area_allotted'] = lst
        return Response({"message": "Staff logged in successfully", "staff": staff}, status=status.HTTP_200_OK)
    
    @api_view(['GET'])
    def get_staff(request):
        staff = Staff.objects.none()
        if "area_allotted_ids" in request.GET:
            area_allotted = request.GET["area_allotted_ids"]
            area_alloted = json.loads(area_allotted)
            for x in area_alloted:
                staff_temp = Staff.objects.filter(area_allotted = x)
            staff = staff | staff_temp
        else:
            staff = Staff.objects.all()

        staff = StaffSerializer(staff, many=True).data
        lst = []
        for x in staff:
            for y in x['area_allotted']:
                area = Area.objects.get(id = y)
                t = (
                    y,area.area
                )
                lst.append(t)
            x['area_allotted'] = lst
        return Response({"message": "Get request successful", "staff": staff}, status=status.HTTP_200_OK)
    
    @api_view(['PUT'])
    def update_staff(request):
        if "staff_id" not in request.data:
            return Response({"message": "Staff ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        staff_id = request.data["staff_id"]
        if not Staff.objects.filter(id=staff_id).exists():
            return Response({"message": "No such staff exists"}, status=status.HTTP_400_BAD_REQUEST)
        
        staff = Staff.objects.get(id=staff_id)
        if "name" in request.data:
            staff.name = request.data["name"]
        if "email" in request.data:
            staff.email = request.data["email"]
        if "phone" in request.data:
            staff.phone = request.data["phone"]
        if "area_allotted_ids" in request.data:
            area_allotted = request.data["area_allotted_ids"]
            for x in area_allotted:
                if not Area.objects.filter(id=x).exists():
                    return Response({"message": "No such area exists"}, status=status.HTTP_400_BAD_REQUEST)
            staff.area_allotted.set(area_allotted)
        if "password" in request.data:
            staff.password = request.data["password"]
        if "type" in request.data:
            staff.type = request.data["type"]
        staff.save()
        staff = StaffSerializer(staff).data
        lst = []
        for x in staff['area_allotted']:
            area = Area.objects.get(id = x)
            t = (
                x,area.area
            )
            lst.append(t)
        staff['area_allotted'] = lst
        return Response({"message": "Staff updated successfully", "staff": staff}, status=status.HTTP_200_OK)

class CSVArea:
    @api_view(['POST'])
    def add_products(request):
        if "file" not in request.FILES:
            return Response({"error": "File Not Found"}, status=status.HTTP_400_BAD_REQUEST)

        file = request.FILES['file']
        file_name = file.name
        
        # Save the image to a folder
        file_path = f"{file_name}"
        with open(file_path, 'wb+') as destination:
            for chunk in file.chunks():
                destination.write(chunk)
        
        # open xlsx file and save its corresponding first create category then move forward
        # Read the Excel file into a DataFrame
        df = pd.read_excel(file_path)
        prod_cat_data = df['Product Category'].tolist()
        
        for x in prod_cat_data:
            if not ProductCategory.objects.filter(name = x).exists():
                ProductCategory.objects.create(name = x)
        
        for index, row in df.iterrows():
            # Process the data in the row
            for value in range(0,len(row)):
                # remove nan values
                try:
                # Perform your desired operations on each value

                    product_id = row[0]
                    prod_name = row[1]
                    prod_cat = row[2]
                    # parent_cat = row[3]
                    prod_type = row[3]
                    material = row[4]
                    size = row[5]
                    color = row[6]
                    if row[7] == None:
                        made_in_uae = False
                    else:
                        made_in_uae = True
                    manufacturer = row[8]
                    manufactuter_SKU = row[9]
                    quantity  = row[10]
                    price = [
                        {
                            'size':'Per item Size',
                            'price' : row[11]
                        },
                        {
                            'size':'100 Count Pack Price(AED)',
                            'price' : ""
                        },
                        {
                            'size':'250 Count Pack Price',
                            'price' : ""
                        },
                        {
                            'size':'500 Count Pack Price',
                            'price' : ""
                        },
                        {
                            'size':'1000 Count Pack Price',
                            'price' : ""
                        }
                    ]
                    prod_impact = row[16]
                    certified = row[17]
                    adjuctive = row[18]
                    prod_description = row[19] 
                    prod_category = ProductCategory.objects.get(name=prod_cat)
                    if not Product.objects.filter(productId = product_id).exists():
                        Product.objects.create(description=prod_description,adjuctive=adjuctive,productId = product_id,name=prod_name, product_type= prod_type,material=material,size=size,color=color,made_in_uae=made_in_uae,manufacturer=manufacturer,manufacturer_sku=manufactuter_SKU,quantity=quantity,price=price,product_impact=prod_impact,certified=certified,category= prod_category)
                except Exception as e:
                    print(e)
        return Response({"message": "Files added successfully"}, status=status.HTTP_200_OK)
        
class StripeView:
    @api_view(['POST'])
    def post(request):
        products = request.data["products"]
        stripe.api_key = os.environ.get('STRIPE_API_KEY')
        
        line_items = [
            {
                "price_data": {
                    "currency": "aed",
                    "product_data": {
                        "name": product.get("product", {}).get("product_type"),
                        "images": [],
                    },
                    "unit_amount": 200,
                },
                "quantity": 2,
            }
            for product in products
        ]

        checkout_session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=line_items,
            mode="payment",
            success_url="https://store.recalluae.com/payment_success",
            cancel_url="https://store.recalluae.com/payment_failed",
        )
        user_id = products[0]['user']
        UserTransaction.objects.create(user = User.objects.get(id = user_id),product = products)
        return Response({"sessionId": checkout_session["id"]}, status=status.HTTP_200_OK)
    
class UserTransactionViews:
    @api_view(['GET'])
    def getUserTransaction(request):
        if "user_id" not in request.GET:
            return Response({"error": "User id is required"}, status=status.HTTP_400_BAD_REQUEST)
        user_id = request.GET["user_id"]
        if not User.objects.filter(id = user_id).exists():
            return Response({"error": "No such user exists"}, status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.get(id = user_id)
        if not UserTransaction.objects.filter(user = user).exists():
            return Response({"error": "No such user exists"}, status=status.HTTP_400_BAD_REQUEST)
        user_transaction = UserTransaction.objects.filter(user = user)
        user_transaction = UserTransactionSerializer(user_transaction, many = True).data
        return Response({"message": "Get request successful", "user_transaction": user_transaction}, status=status.HTTP_200_OK)