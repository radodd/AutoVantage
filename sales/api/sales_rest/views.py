from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from .models import Sale, Salesperson, Customer, AutomobileVO
from django.http import JsonResponse
from common.json import ModelEncoder
import json
# Create your views here.
class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
    ]

class SalespersonListEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id"
    ]

class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "phone_number",
        "address",
        "id",
    ]

class SalesListEncoder(ModelEncoder):
    model = Sale
    properties = [
        "automobile",
        "customer",
        "salesperson",
        "price",
        "id",
    ]
    encoders= {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalespersonListEncoder(),
        "customer": CustomerListEncoder(),
    }

@require_http_methods(["GET", "POST"])
def api_list_salespeople(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder=SalespersonListEncoder,
        )
    else:
        content = json.loads(request.body)
        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(
            {"salesperson": salesperson}, encoder=SalespersonListEncoder, safe=False
        )

@require_http_methods(["GET", "DELETE"])
def api_salesperson_detail(request, id):
    if request.method == "DELETE":
        count,_ = Salesperson.objects.filter(id=id).delete()
        return JsonResponse({"delete": count > 0})
    elif request.method == "GET":
        salesperson = Salesperson.objects.get(id=id)
        return JsonResponse(
            salesperson,
            encoder=SalespersonListEncoder,
            safe=False
        )

@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerListEncoder,
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            {"customer": customer}, 
            encoder=CustomerListEncoder,
            safe=False
        )

@require_http_methods(["GET", "DELETE"])
def api_customer_detail(request, id):
    if request.method == "DELETE":
        count,_ = Customer.objects.filter(id=id).delete()
        return JsonResponse({"delete": count > 0})
    elif request.method == "GET":
        customer = Customer.objects.get(id=id)
        return JsonResponse(
            {"customer":customer},
            encoder=CustomerListEncoder,
            safe=False
            )

@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SalesListEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            vin = content["automobile"]
            automobile = AutomobileVO.objects.get(vin=vin)
            if automobile.sold:
                return JsonResponse(
                    {"message": "This Automobile Has Already Been Sold."},
                    status=400
                )
            content["automobile"] = automobile
            automobile.sold = True
            automobile.save()

        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid VIN"},
                status=400
            )
        try:
            id = content["salesperson"]
            salesperson = Salesperson.objects.get(id=id)
            content["salesperson"] = salesperson

        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Salesperson Does Not Exist"},
                status=400
            )
        try:
            id = content["customer"]
            customer = Customer.objects.get(id=id)
            content["customer"] = customer
        
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer Does Not Exist, or Has Not Been Registered Yet"},
                status=400
            )
        sale = Sale.objects.create(**content)
        return JsonResponse(
            {"sale": sale},
            encoder=SalesListEncoder,
            safe=False
        )

@require_http_methods(["GET", "DELETE"])
def api_sale_detail(request, id):
    if request.method == "DELETE":
        count,_ = Sale.objects.filter(id=id).delete()
        return JsonResponse(
            {"delete": count > 0}
        )
    elif request.method == "GET":
        sale = Sale.objects.get(id=id)
        return JsonResponse(
            {"sale":sale},
            encoder=SalesListEncoder,
            safe=False
            )
