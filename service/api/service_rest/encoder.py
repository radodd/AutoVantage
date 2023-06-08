from common.json import ModelEncoder

from .models import Technician, Appointment

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id",
    ]

class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "date_time",
        "reason",
        "vin",
        "customer",
        "status",
        "technician",
    ]
    encoders = {
       "technician": TechnicianEncoder(),
    }

# class ManufacturerEncoder(ModelEncoder):
#     model = Manufacturer
#     properties = [
#         "id",
#         "name",
#     ]


# class VehicleModelEncoder(ModelEncoder):
#     model = VehicleModel
#     properties = [
#         "id",
#         "name",
#         "picture_url",
#         "manufacturer",
#     ]
#     encoders = {
#         "manufacturer": ManufacturerEncoder(),
#     }


# class AutomobileEncoder(ModelEncoder):
#     model = Automobile
#     properties = [
#         "id",
#         "color",
#         "year",
#         "vin",
#         "model",
#         "sold",
#     ]
#     encoders = {
#         "model": VehicleModelEncoder(),
#     }
