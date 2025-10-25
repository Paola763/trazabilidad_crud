from django.urls import reverse_lazy
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from .models import Madre, Parto, RecienNacido, Complicacion
from .forms import MadreForm, PartoForm, RecienNacidoForm, ComplicacionForm

class MadreList(ListView):
    model = Madre
    template_name = "madre_list.html"

class MadreCreate(CreateView):
    model = Madre
    form_class = MadreForm
    template_name = "madre_form.html"
    success_url = reverse_lazy("madre_list")

class MadreUpdate(UpdateView):
    model = Madre
    form_class = MadreForm
    template_name = "madre_form.html"
    success_url = reverse_lazy("madre_list")

class MadreDelete(DeleteView):
    model = Madre
    template_name = "confirm_delete.html"
    success_url = reverse_lazy("madre_list")

class PartoList(ListView):
    model = Parto
    template_name = "parto_list.html"

class PartoCreate(CreateView):
    model = Parto
    form_class = PartoForm
    template_name = "parto_form.html"
    success_url = reverse_lazy("parto_list")

class PartoUpdate(UpdateView):
    model = Parto
    form_class = PartoForm
    template_name = "parto_form.html"
    success_url = reverse_lazy("parto_list")

class PartoDelete(DeleteView):
    model = Parto
    template_name = "confirm_delete.html"
    success_url = reverse_lazy("parto_list")

class RNList(ListView):
    model = RecienNacido
    template_name = "rn_list.html"

class RNCreate(CreateView):
    model = RecienNacido
    form_class = RecienNacidoForm
    template_name = "rn_form.html"
    success_url = reverse_lazy("rn_list")

class RNUpdate(UpdateView):
    model = RecienNacido
    form_class = RecienNacidoForm
    template_name = "rn_form.html"
    success_url = reverse_lazy("rn_list")

class RNDelete(DeleteView):
    model = RecienNacido
    template_name = "confirm_delete.html"
    success_url = reverse_lazy("rn_list")

class CompList(ListView):
    model = Complicacion
    template_name = "comp_list.html"

class CompCreate(CreateView):
    model = Complicacion
    form_class = ComplicacionForm
    template_name = "comp_form.html"
    success_url = reverse_lazy("comp_list")

class CompUpdate(UpdateView):
    model = Complicacion
    form_class = ComplicacionForm
    template_name = "comp_form.html"
    success_url = reverse_lazy("comp_list")

class CompDelete(DeleteView):
    model = Complicacion
    template_name = "confirm_delete.html"
    success_url = reverse_lazy("comp_list")