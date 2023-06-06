from django.urls import path

from .views import (
    api_technicians,
    api_technician_detail,
)

urlpatterns = [
    path("technicians/", api_technicians, name="api_technicians"),
    path("technicians/<int:employee_id>/", api_technician_detail, name="api_technician")
]
