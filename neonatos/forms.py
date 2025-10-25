from django import forms
from .models import Madre, Parto, RecienNacido, Complicacion

class MadreForm(forms.ModelForm):
    class Meta:
        model = Madre
        fields = "__all__"

class PartoForm(forms.ModelForm):
    class Meta:
        model = Parto
        fields = "__all__"

class RecienNacidoForm(forms.ModelForm):
    class Meta:
        model = RecienNacido
        fields = "__all__"

class ComplicacionForm(forms.ModelForm):
    class Meta:
        model = Complicacion
        fields = "__all__"