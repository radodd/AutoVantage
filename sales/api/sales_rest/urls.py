from django.urls import path

from .views import api_list_salespeople, api_salesperson_detail, api_list_customers, api_customer_detail, api_list_sales, api_sale_detail

urlpatterns = [
    path("salespeople/", api_list_salespeople, name="api_list_salespeople"),
    path("salespeople/<int:id>/", api_salesperson_detail, name="api_salesperson_detail"),
    path("customers/", api_list_customers, name="api_list_customers"),
    path("customers/<int:id>/", api_customer_detail, name="api_customer_detail"),
    path("sales/", api_list_sales, name="api_list_sales"),
    path("sales/<int:id>/", api_sale_detail, name="api_sale_detail"),
]