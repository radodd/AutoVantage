from django.db import models
from django.urls import reverse

# Create your models here.
class Technician(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employee_id = models.PositiveSmallIntegerField()

    def get_api_url(self):
            return reverse("api_technicians", kwargs={"pk": self.id})


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)


class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.TextField()
    status = models.BooleanField(default=False)
    vin = models.CharField(max_length=17, unique=True)
    customer = models.CharField(max_length=40)
    technician = models.ForeignKey (
        Technician,
        related_name="technicians",
        on_delete=models.CASCADE,
    )
    def get_api_url(self):
        return reverse("api_appointments", kwargs={"pk": self.id})


# class Service(models.Model):
#     technician = models.ForeignKey(
#         Technician,
#         related_name="technician",
#         on_delete=models.CASCADE
#     )
#     AutomobileVO = models.ForeignKey(
#         AutomobileVO,
#         related_name="automobile",
#         on_delete=models.CASCADE
#     )
#     appointment = models.ForeignKey(
#         Appointment,
#         related_name="appointment",
#         on_delete=models.CASCADE
#     )
