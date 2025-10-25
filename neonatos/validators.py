import re
from typing import Optional

from django.core.exceptions import ValidationError

RUT_BODY_MESSAGE = "El RUT debe contener números antes del guion."
RUT_DV_MESSAGE = "El dígito verificador no coincide para el RUT ingresado."
RUT_FORMAT_MESSAGE = "El RUT debe incluir un guion y el dígito verificador (ej: 12.345.678-5)."

_MOBILE_REGEX = re.compile(r"^\+569\d{8}$")
_FIXED_REGEX = re.compile(r"^\+56(?:2\d{7}|[3-9]\d{8})$")


def _calcular_dv(cuerpo: str) -> str:
    factores = [2, 3, 4, 5, 6, 7]
    suma = 0
    for indice, digito in enumerate(reversed(cuerpo)):
        suma += int(digito) * factores[indice % len(factores)]
    resto = 11 - (suma % 11)
    if resto == 11:
        return "0"
    if resto == 10:
        return "K"
    return str(resto)


def normalizar_rut(value: str) -> str:
    """Retorna el RUT normalizado (con puntos y guion) o lanza ValidationError."""
    if value is None:
        raise ValidationError(RUT_FORMAT_MESSAGE)
    value = str(value).strip().upper()
    if not value:
        raise ValidationError("Debes ingresar un RUT.")
    if "-" not in value:
        raise ValidationError(RUT_FORMAT_MESSAGE)

    limpio = value.replace(".", "").replace("-", "")
    if len(limpio) < 2:
        raise ValidationError(RUT_FORMAT_MESSAGE)

    cuerpo, dv = limpio[:-1], limpio[-1]
    if not cuerpo.isdigit():
        raise ValidationError(RUT_BODY_MESSAGE)

    dv_calculado = _calcular_dv(cuerpo)
    if dv_calculado != dv:
        raise ValidationError(RUT_DV_MESSAGE)

    cuerpo_formateado = f"{int(cuerpo):,}".replace(",", ".")
    return f"{cuerpo_formateado}-{dv_calculado}"


def rut_chile_validator(value: str) -> None:
    """Valida que el RUT chileno sea correcto."""
    try:
        normalizar_rut(value)
    except ValidationError as error:
        raise ValidationError(error.message)


def telefono_chile_validator(value: str) -> None:
    """Valida el formato de teléfono móvil chileno +569XXXXXXXX."""
    if not value:
        raise ValidationError("El teléfono móvil es obligatorio.")
    value = str(value).strip()
    if not _MOBILE_REGEX.match(value):
        raise ValidationError(
            "El teléfono móvil debe tener el formato +569XXXXXXXX (8 dígitos finales)."
        )


def telefono_fijo_chile_validator(value: Optional[str]) -> None:
    """Valida el formato del teléfono fijo chileno si es que viene informado."""
    if not value:
        return
    value = str(value).strip()
    if not _FIXED_REGEX.match(value):
        raise ValidationError(
            "El teléfono fijo debe incluir código de país +56 y un código de área válido."
        )