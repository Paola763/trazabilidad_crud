from django.db import models

class Madre(models.Model):
    id_madre = models.AutoField(primary_key=True)
    rut = models.CharField(max_length=12)
    nombre_completo = models.CharField(max_length=100)
    edad = models.IntegerField()
    nacionalidad = models.CharField(max_length=50)
    pueblo_originario = models.BooleanField(default=False)
    discapacidad = models.BooleanField(default=False)
    privada_libertad = models.BooleanField(default=False)
    direccion = models.CharField(max_length=200, blank=True, null=True)
    telefono_contacto = models.CharField(max_length=15, blank=True, null=True)
    controles_prenatales = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.nombre_completo} ({self.rut})"

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
        ("expulsivo", "Expulsivo"),
    ]

    id_parto = models.AutoField(primary_key=True)
    madre = models.ForeignKey(Madre, on_delete=models.CASCADE)
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
        ("Ley21155", "Ley 21.155"),
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