from django.urls import path

from .views import (
    api_technicians,
    api_technician_detail,
    api_appointments,
    api_appointment_detail
)

urlpatterns = [
    path("technicians/", api_technicians, name="api_technicians"),
    path("technicians/<int:employee_id>/", api_technician_detail, name="api_technician_detail"),
    path("appointments/", api_appointments, name="api_appointments"),
    path("appointments/<int:id>/", api_appointment_detail, name="api_appointment_detail"),
    path("appointments/<int:id>/finished/", api_appointment_detail, name="api_appointment_detail"),
    path("appointments/<int:id>/canceled/", api_appointment_detail, name="api_appointment_detail")
]
