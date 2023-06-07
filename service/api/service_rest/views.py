from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Technician, Appointment
from .encoder import TechnicianEncoder, AppointmentEncoder
import json

# Create your views here.
@require_http_methods(["GET", "POST"])
def api_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            employee_id = content["employee_id"]
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create technician"}
            )
            response.status_code = 400
            return response

@require_http_methods(["GET", "DELETE"])
def api_technician_detail(request, employee_id):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(employee_id=employee_id)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Technician ID does not exist"})
            response.status_code = 404
            return response
    else:
        if request.method == "DELETE":
            try:
                count, _ = Technician.objects.filter(employee_id=employee_id).delete()
                return JsonResponse({"delete": count > 0})
            except Technician.DoesNotExist:
                return JsonResponse({"message": "Technician does not exist"})

@require_http_methods(["GET", "POST"])
def api_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            employee_id = content["technician"]
            technician = Technician.objects.get(id=employee_id)
            content["technician"] = technician
            appointment = Appointment.objects.create(**content)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create appointment"}
            )
            response.status_code = 400
            return response
