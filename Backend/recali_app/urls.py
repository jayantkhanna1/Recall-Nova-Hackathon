"""recali_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from . import views
from django.urls import path

urlpatterns = [
    # Admin paths
    path('getAdminToken', views.AdminView.get_admin_token, name='getAdminToken'),
    path('getAdminStats', views.AdminView.get_admin_stats, name='admin_list'),
    path('getAllUsers', views.AdminView.get_all_users, name='user_list'),
    path('getAllPickups', views.AdminView.get_all_pickups, name='product_list'),

    # User paths
    path('signup', views.UserView.user_signup, name='userSignup'),
    path('signup_confirm', views.UserView.signup_confirm, name='signup_confirm'),
    path('login', views.UserView.login, name='userLogin'),
    path('change_password', views.UserView.change_password, name='userLogout'),
    path('updateUser', views.UserView.update_profile, name='updateUser'),
    path('deleteUser', views.UserView.delete_profile, name='deleteUser'),
    path('forgotPassword', views.UserView.forgot_password, name='forgot_password'),
    path('resetPassword', views.UserView.reset_password, name='reset_password'),

    # ProductCategory paths
    path('getAllCategories', views.CategoryView.CategoryList.as_view(), name='category_list'),
    path('addCategory', views.CategoryView.add_category, name='addCategory'),

    # Product paths
    path('addProduct', views.ProductView.add_product, name='addProduct'),
    path('getProduct', views.ProductView.get_product, name='getProduct'),
    path('updateProduct', views.ProductView.update_product, name='updateProduct'),
    path('deleteProduct', views.ProductView.delete_product, name='deleteProduct'),

    # Cart paths
    path('addToCart', views.CartView.add_to_cart, name='addToCart'),
    path('updateCart', views.CartView.update_cart, name='updateCart'),
    path('deleteFromCart', views.CartView.delete_from_cart, name='deleteFromCart'),
    path('getCart', views.CartView.get_cart, name='getCart'),

    # Contact paths
    path('contact', views.ContactView.contact, name='contact'),

    # Pickup paths
    path('schedulePickup', views.PickupView.schedule_pickup, name='pickup'),
    path('getUserPickup', views.PickupView.get_pickup_for_a_user, name='getPickup'),
    path('updatePickup', views.PickupView.update_pickup, name='updatePickup'),
    path('grantPickup', views.PickupView.grant_schedule, name='grantPickup'),
    path('updateUserConfirmation', views.PickupView.update_user_confirmation, name='updateUserConfirmation'),
    path('getUserConfirmation', views.PickupView.get_user_confirmation, name='getUserConfirmation'),

    # User stats
    path('getStats', views.UserStatsView.get_user_stats, name='getStats'),
    path('updateStats', views.UserStatsView.update_user_stats, name='updateStats'),
    path('IncrementUserStats', views.UserStatsView.IncrementUserStats, name='IncrementUserStats'),

    # History
    path('recallHistory', views.HistoryView.get_history, name='getHistory'),

    #Areas
    path('getAllAreas', views.AreaView.get_all_area, name='getAreas'),
    path('addArea', views.AreaView.add_new_area, name='addArea'),
    path('updateArea', views.AreaView.update_area, name='updateArea'),
    path('deleteArea', views.AreaView.delete_area, name='deleteArea'),

    # Staff paths
    path('getStaff', views.StaffView.get_staff, name='getStaff'),
    path('updateStaff', views.StaffView.update_staff, name='updateStaff'),
    path('loginStaff', views.StaffView.staff_login, name='deleteStaff'),

    # add prod using csv
    path('addProductsCSV', views.CSVArea.add_products, name='addProductsCSV'),

    # path for stripe
    path('api/create-checkout-session', views.StripeView.post, name='create-checkout-session'),

    # Path for usertransaction
    path('getUserTransaction', views.UserTransactionViews.getUserTransaction, name='userTransaction'),
]

