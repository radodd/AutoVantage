from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from .models import Sale, Salesperson
from django.http import JsonResponse
from common.json import ModelEncoder
import json
# Create your views here.

class SalespersonListEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id"
    ]


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
