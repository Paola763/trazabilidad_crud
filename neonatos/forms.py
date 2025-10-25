from decimal import Decimal

from django import forms
from .models import Madre, Parto, RecienNacido, Complicacion
from django.core.exceptions import ValidationError

from .models import Madre, Parto, RecienNacido
from .validators import (
    normalizar_rut,
    telefono_chile_validator,
    telefono_fijo_chile_validator,
)


class PesoDecimalField(forms.DecimalField):
    def clean(self, value):  # type: ignore[override]
        if isinstance(value, str):
            value = value.replace(",", ".")
        cleaned = super().clean(value)
        if cleaned is not None and cleaned < 0:
            raise ValidationError("El peso no puede ser negativo.")
        return cleaned


class MadreForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            widget = field.widget
            css_class = widget.attrs.get("class", "")
            if isinstance(widget, forms.Select):
                widget.attrs["class"] = f"{css_class} form-select".strip()
            else:
                widget.attrs["class"] = f"{css_class} form-control".strip()

    class Meta:
        model = Madre
        fields = "__all__"
        fields = [
            "rut",
            "nombres",
            "apellidos",
            "telefono_movil",
            "telefono_fijo",
            "direccion",
        ]
        widgets = {
            "rut": forms.TextInput(
                attrs={
                    "placeholder": "12.345.678-5",
                    "title": "RUT con guion (incluye DV)",
                }
            ),
            "nombres": forms.TextInput(
                attrs={
                    "placeholder": "María Fernanda",
                    "title": "Nombres completos (solo letras)",
                }
            ),
            "apellidos": forms.TextInput(
                attrs={
                    "placeholder": "Pérez Soto",
                    "title": "Apellidos completos (solo letras)",
                }
            ),
            "telefono_movil": forms.TextInput(
                attrs={
                    "placeholder": "+56912345678",
                    "title": "Teléfono móvil chileno con formato +569XXXXXXXX",
                }
            ),
            "telefono_fijo": forms.TextInput(
                attrs={
                    "placeholder": "+56223456789",
                    "title": "Teléfono fijo (opcional) con código de país +56",
                }
            ),
            "direccion": forms.TextInput(
                attrs={
                    "placeholder": "Av. Siempre Viva 742",
                    "title": "Dirección particular (opcional)",
                }
            ),
        }

    def clean_rut(self):
        rut = self.cleaned_data.get("rut", "")
        try:
            rut_normalizado = normalizar_rut(rut)
        except ValidationError as error:
            raise ValidationError(error.message)

        if (
            Madre.objects.exclude(pk=self.instance.pk)
            .filter(rut__iexact=rut_normalizado)
            .exists()
        ):
            raise ValidationError("Ya existe una madre registrada con este RUT.")
        return rut_normalizado

    def clean_nombres(self):
        nombres = (self.cleaned_data.get("nombres") or "").strip()
        if any(char.isdigit() for char in nombres):
            raise ValidationError("Los nombres no pueden contener números.")
        return nombres

    def clean_apellidos(self):
        apellidos = (self.cleaned_data.get("apellidos") or "").strip()
        if any(char.isdigit() for char in apellidos):
            raise ValidationError("Los apellidos no pueden contener números.")
        return apellidos

    def clean_telefono_movil(self):
        telefono = self.cleaned_data.get("telefono_movil")
        telefono_chile_validator(telefono)
        return telefono.strip()

    def clean_telefono_fijo(self):
        telefono = self.cleaned_data.get("telefono_fijo")
        telefono_fijo_chile_validator(telefono)
        return telefono.strip() if telefono else None


class PartoForm(forms.ModelForm):
    peso_materno_kg = PesoDecimalField(
        max_digits=5,
        decimal_places=2,
        min_value=Decimal("0"),
        error_messages={
            "invalid": "Ingresa un peso válido en kilogramos (usa punto o coma).",
            "min_value": "El peso no puede ser negativo.",
        },
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            widget = field.widget
            css_class = widget.attrs.get("class", "")
            if isinstance(widget, forms.Select):
                widget.attrs["class"] = f"{css_class} form-select".strip()
            else:
                widget.attrs["class"] = f"{css_class} form-control".strip()

    class Meta:
        model = Parto
        fields = "__all__"
        fields = ["madre", "fecha_parto", "peso_materno_kg", "tipo_parto"]
        widgets = {
            "madre": forms.Select(
                attrs={
                    "placeholder": "Selecciona una madre",
                    "title": "Madre asociada al parto",
                }
            ),
            "fecha_parto": forms.DateInput(
                attrs={
                    "type": "date",
                    "placeholder": "2024-05-01",
                    "title": "Fecha del parto",
                }
            ),
            "peso_materno_kg": forms.NumberInput(
                attrs={
                    "placeholder": "70.50",
                    "title": "Peso materno en kilogramos",
                    "step": "0.01",
                }
            ),
            "tipo_parto": forms.Select(
                attrs={
                    "placeholder": "Selecciona el tipo de parto",
                    "title": "Tipo de parto (Vaginal o Cesárea)",
                }
            ),
        }

    def clean(self):
        cleaned_data = super().clean()
        peso = cleaned_data.get("peso_materno_kg")
        if peso is not None and peso < 0:
            raise ValidationError({"peso_materno_kg": "El peso no puede ser negativo."})
        return cleaned_data


class RecienNacidoForm(forms.ModelForm):
    peso_kg = PesoDecimalField(
        max_digits=4,
        decimal_places=2,
        min_value=Decimal("0"),
        error_messages={
            "invalid": "Ingresa un peso válido en kilogramos (usa punto o coma).",
            "min_value": "El peso no puede ser negativo.",
        },
    )
    apgar_1min = forms.IntegerField(
        min_value=1,
        max_value=5,
        error_messages={
            "min_value": "El APGAR al minuto debe estar entre 1 y 5.",
            "max_value": "El APGAR al minuto debe estar entre 1 y 5.",
            "invalid": "Ingresa un valor numérico para el APGAR al minuto.",
        },
    )
    apgar_5min = forms.IntegerField(
        min_value=1,
        max_value=5,
        error_messages={
            "min_value": "El APGAR a los 5 minutos debe estar entre 1 y 5.",
            "max_value": "El APGAR a los 5 minutos debe estar entre 1 y 5.",
            "invalid": "Ingresa un valor numérico para el APGAR a los 5 minutos.",
        },
    )

    class Meta:
        model = RecienNacido
        fields = "__all__"
        fields = [
            "parto",
            "sexo",
            "peso_kg",
            "apgar_1min",
            "apgar_5min",
            "fecha_nacimiento",
        ]
        widgets = {
            "parto": forms.Select(
                attrs={
                    "placeholder": "Selecciona el parto",
                    "title": "Parto asociado al recién nacido",
                }
            ),
            "sexo": forms.Select(
                attrs={
                    "placeholder": "Selecciona el sexo",
                    "title": "Sexo del recién nacido",
                }
            ),
            "peso_kg": forms.NumberInput(
                attrs={
                    "placeholder": "3.20",
                    "title": "Peso del recién nacido en kilogramos",
                    "step": "0.01",
                }
            ),
            "apgar_1min": forms.NumberInput(
                attrs={
                    "placeholder": "5",
                    "title": "Apgar al primer minuto (1 a 5)",
                    "min": 1,
                    "max": 5,
                }
            ),
            "apgar_5min": forms.NumberInput(
                attrs={
                    "placeholder": "5",
                    "title": "Apgar a los cinco minutos (1 a 5)",
                    "min": 1,
                    "max": 5,
                }
            ),
            "fecha_nacimiento": forms.DateInput(
                attrs={
                    "type": "date",
                    "placeholder": "2024-05-01",
                    "title": "Fecha de nacimiento",
                }
            ),
        }

class ComplicacionForm(forms.ModelForm):
    class Meta:
        model = Complicacion
        fields = "__all__"
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for name, field in self.fields.items():
            widget = field.widget
            css_class = widget.attrs.get("class", "")
            if isinstance(widget, forms.Select):
                widget.attrs["class"] = f"{css_class} form-select".strip()
            else:
                widget.attrs["class"] = f"{css_class} form-control".strip()
        queryset = Parto.objects.filter(recien_nacido__isnull=True)
        if self.instance and self.instance.pk:
            queryset = queryset | Parto.objects.filter(pk=self.instance.parto_id)
        self.fields["parto"].queryset = queryset.distinct()

    def clean_peso_kg(self):
        peso = self.cleaned_data.get("peso_kg")
        if peso is not None and peso < 0:
            raise ValidationError("El peso no puede ser negativo.")
        return peso

    def clean(self):
        cleaned_data = super().clean()
        if cleaned_data.get("apgar_1min") is not None and not (1 <= cleaned_data["apgar_1min"] <= 5):
            self.add_error("apgar_1min", "El APGAR al minuto debe estar entre 1 y 5.")
        if cleaned_data.get("apgar_5min") is not None and not (1 <= cleaned_data["apgar_5min"] <= 5):
            self.add_error("apgar_5min", "El APGAR a los 5 minutos debe estar entre 1 y 5.")
        return cleaned_data