from django.core.validators import MaxValueValidator, MinValueValidator, RegexValidator
from django.db import models

from .validators import (
    rut_chile_validator,
    telefono_chile_validator,
    telefono_fijo_chile_validator,
)


class Madre(models.Model):
    id_madre = models.AutoField(primary_key=True)
    rut = models.CharField(max_length=12)
    nombre_completo = models.CharField(max_length=100)
    edad = models.IntegerField()
    nacionalidad = models.CharField(max_length=50)
    pueblo_originario = models.BooleanField(default=False)
    discapacidad = models.BooleanField(default=False)
    privada_libertad = models.BooleanField(default=False)
    rut = models.CharField(
        "RUT",
        max_length=12,
        unique=True,
        validators=[rut_chile_validator],
        help_text="Formato 12.345.678-5",
    )
    nombres = models.CharField(
        max_length=100,
        validators=[
            RegexValidator(
                regex=r"^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$",
                message="Los nombres solo pueden contener letras y espacios.",
            )
        ],
    )
    apellidos = models.CharField(
        max_length=100,
        validators=[
            RegexValidator(
                regex=r"^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$",
                message="Los apellidos solo pueden contener letras y espacios.",
            )
        ],
    )
    telefono_movil = models.CharField(
        max_length=12,
        validators=[telefono_chile_validator],
    )
    telefono_fijo = models.CharField(
        max_length=13,
        blank=True,
        null=True,
        validators=[telefono_fijo_chile_validator],
    )
    direccion = models.CharField(max_length=200, blank=True, null=True)
    telefono_contacto = models.CharField(max_length=15, blank=True, null=True)
    controles_prenatales = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.nombre_completo} ({self.rut})"
    class Meta:
        ordering = ["apellidos", "nombres"]

    def __str__(self) -> str:
        return f"{self.nombres} {self.apellidos} ({self.rut})"


class Parto(models.Model):
    TIPO_PARTO = [
        ("vaginal", "Vaginal"),
        ("instrumental", "Instrumental"),
        ("cesarea_electiva", "Cesárea electiva"),
        ("cesarea_urgencia", "Cesárea urgencia"),
        ("domicilio", "Domicilio"),
        ("prehospitalario", "Prehospitalario"),
    ]
    INICIO_PARTO = [("espontaneo", "Espontáneo"), ("inducido", "Inducido")]
    ANALGESIA = [
        ("neuroaxial", "Neuroaxial"),
        ("endovenosa", "Endovenosa"),
        ("oxido_nitroso", "Óxido nitroso"),
        ("general", "General"),
        ("local", "Local"),
        ("no_farmacologica", "No farmacológica"),
    ]
    ACOMPANAMIENTO = [
        ("ninguno", "Ninguno"),
        ("trabajo_parto", "Trabajo de parto"),
        ("expulsivo", "Expulsivo")]
    TIPO_PARTO_VAGINAL = "vaginal",
    TIPO_PARTO_CESAREA = "cesarea",
    TIPO_PARTO_CHOICES = [
        (TIPO_PARTO_VAGINAL, "Vaginal"),
        (TIPO_PARTO_CESAREA, "Cesárea"),
    ]

    id_parto = models.AutoField(primary_key=True)
    madre = models.ForeignKey(Madre, on_delete=models.CASCADE)
    madre = models.ForeignKey(
        Madre,
        on_delete=models.CASCADE,
        related_name="partos",
    )
    fecha_parto = models.DateField()
    tipo_parto = models.CharField(max_length=20, choices=TIPO_PARTO)
    inicio_parto = models.CharField(max_length=10, choices=INICIO_PARTO)
    analgesia = models.CharField(max_length=20, choices=ANALGESIA)
    acompanamiento = models.CharField(max_length=20, choices=ACOMPANAMIENTO)
    episiotomia = models.BooleanField(default=False)
    oxitocina = models.BooleanField(default=False)
    plan_parto = models.BooleanField(default=False)
    contacto_piel_piel = models.BooleanField(default=False)
    alojamiento_conjunto = models.BooleanField(default=False)
    cesarea_programada = models.BooleanField(default=False)
    edad_gestacional = models.IntegerField(help_text="Semanas")
    complicaciones = models.BooleanField(default=False)
    observaciones = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Parto #{self.id_parto} - Madre: {self.madre}"
    peso_materno_kg = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        validators=[MinValueValidator(0, message="El peso no puede ser negativo.")],
    )
    tipo_parto = models.CharField(
        max_length=10,
        choices=TIPO_PARTO_CHOICES,
    )

    class Meta:
        ordering = ["-fecha_parto"]

    def __str__(self) -> str:
        return f"Parto de {self.madre} el {self.fecha_parto:%d-%m-%Y}"


class RecienNacido(models.Model):
    SEXO = [("M", "Masculino"), ("F", "Femenino"), ("NB", "No binarie")]
    REANIMACION = [("ninguna", "Ninguna"), ("basica", "Básica"), ("avanzada", "Avanzada")]
    TIPO_FALLEC = [("aborto", "Aborto"), ("mortinato", "Mortinato"), ("mortineonato", "Mortineonato")]
    MET_ALIM = [
        ("LME", "LME"),
        ("mixta", "Mixta"),
        ("formula", "Fórmula"),
        ("no_amamantado", "No amamantado"),
        ("HTLV_VIH", "HTLV/VIH"),
        ("Ley21155", "Ley 21.155")],
    SEXO_FEMENINO = "F"
    SEXO_MASCULINO = "M"
    SEXO_CHOICES = [
        (SEXO_FEMENINO, "Femenino"),
        (SEXO_MASCULINO, "Masculino"),
    ]

    id_rn = models.AutoField(primary_key=True)
    parto = models.ForeignKey(Parto, on_delete=models.CASCADE)
    sexo = models.CharField(max_length=2, choices=SEXO)
    peso_nacer = models.DecimalField(max_digits=5, decimal_places=1, help_text="Gramos (ej. 3500.0)")
    apgar_1 = models.IntegerField()
    apgar_5 = models.IntegerField()
    anomalias_congenitas = models.BooleanField(default=False)
    profilaxis_hepatitisb = models.BooleanField(default=False)
    profilaxis_ocular = models.BooleanField(default=False)
    reanimacion = models.CharField(max_length=10, choices=REANIMACION)
    asfixia_neonatal = models.BooleanField(default=False)
    tamizaje_metabolico = models.BooleanField(default=False)
    tamizaje_auditivo = models.BooleanField(default=False)
    tamizaje_cardiaco = models.BooleanField(default=False)
    fallecido = models.BooleanField(default=False)
    tipo_fallecimiento = models.CharField(max_length=20, choices=TIPO_FALLEC, blank=True, null=True)
    metodo_alimentacion = models.CharField(max_length=20, choices=MET_ALIM)

    def __str__(self):
        return f"RN #{self.id_rn} (Parto {self.parto_id})"
    parto = models.OneToOneField(
        Parto,
        on_delete=models.CASCADE,
        related_name="recien_nacido",
    )
    sexo = models.CharField(max_length=1, choices=SEXO_CHOICES)
    peso_kg = models.DecimalField(
        max_digits=4,
        decimal_places=2,
        validators=[MinValueValidator(0, message="El peso no puede ser negativo.")],
    )
    apgar_1min = models.PositiveSmallIntegerField(
        validators=[
            MinValueValidator(1, message="El APGAR debe ser al menos 1."),
            MaxValueValidator(5, message="El APGAR no puede ser superior a 5."),
        ]
    )
    apgar_5min = models.PositiveSmallIntegerField(
        validators=[
            MinValueValidator(1, message="El APGAR debe ser al menos 1."),
            MaxValueValidator(5, message="El APGAR no puede ser superior a 5."),
        ]
    )
    fecha_nacimiento = models.DateField()

    class Meta:
        ordering = ["-fecha_nacimiento"]

    def __str__(self) -> str:
        return f"RN de parto {self.parto_id} ({self.get_sexo_display()})"


class Complicacion(models.Model):
    id_complicacion = models.AutoField(primary_key=True)
    rn = models.ForeignKey(RecienNacido, on_delete=models.CASCADE)
    hemorragia_postparto = models.BooleanField(default=False)
    preeclampsia_eclampsia = models.BooleanField(default=False)
    sepsis = models.BooleanField(default=False)
    otras_complicaciones = models.TextField(blank=True, null=True)
    transfusion_sanguinea = models.BooleanField(default=False)
    histerectomia = models.BooleanField(default=False)
    traslado_uci = models.BooleanField(default=False)

    def __str__(self):
        return f"Complicación #{self.id_complicacion} de RN {self.rn_id}"
    rn = models.ForeignKey(RecienNacido, on_delete=models.CASCADE, related_name="complicaciones")
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self) -> str:
        return f"Complicación asociada al RN {self.rn_id}"