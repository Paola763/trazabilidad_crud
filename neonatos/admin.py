from django.contrib import admin
from .models import Madre, Parto, RecienNacido, Complicacion

admin.site.register(Madre)
admin.site.register(Parto)
admin.site.register(RecienNacido)
admin.site.register(Complicacion)