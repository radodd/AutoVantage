from common.json import ModelEncoder

from .models import Technician

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
    ]

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
