from django.urls import reverse_lazy
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from .models import Madre, Parto, RecienNacido, Complicacion
from .forms import MadreForm, PartoForm, RecienNacidoForm, ComplicacionForm
from django.core.exceptions import ValidationError
from django.shortcuts import get_object_or_404, redirect
from django.urls import NoReverseMatch, reverse, reverse_lazy
from django.views.generic import CreateView, DeleteView, ListView, TemplateView, UpdateView

from .forms import MadreForm, PartoForm, RecienNacidoForm
from .models import Madre, Parto, RecienNacido
from .validators import normalizar_rut


class MadreList(ListView):
    model = Madre
    template_name = "madre_list.html"


class MadreCreate(CreateView):
    model = Madre
    form_class = MadreForm
    template_name = "madre_form.html"
    success_url = reverse_lazy("madre_list")

    def form_valid(self, form):
        self.object = form.save()
        return redirect(f"{reverse('parto_create')}?madre={self.object.pk}")


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

    def dispatch(self, request, *args, **kwargs):
        self.madre = None
        madre_id = request.GET.get("madre") or request.POST.get("madre")
        if madre_id:
            self.madre = get_object_or_404(Madre, pk=madre_id)
        return super().dispatch(request, *args, **kwargs)

    def get_initial(self):
        initial = super().get_initial()
        if self.madre:
            initial["madre"] = self.madre
        return initial

    def get_form(self, form_class=None):
        form = super().get_form(form_class)
        if self.madre:
            form.fields["madre"].queryset = Madre.objects.filter(pk=self.madre.pk)
            form.fields["madre"].empty_label = None
        return form

    def form_valid(self, form):
        if self.madre:
            form.instance.madre = self.madre
        self.object = form.save()
        return redirect(f"{reverse('rn_create')}?parto={self.object.pk}")

    def get_success_url(self):
        return reverse("parto_list")


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

    def dispatch(self, request, *args, **kwargs):
        self.parto = None
        parto_id = request.GET.get("parto") or request.POST.get("parto")
        if parto_id:
            self.parto = get_object_or_404(Parto, pk=parto_id)
        return super().dispatch(request, *args, **kwargs)

    def get_initial(self):
        initial = super().get_initial()
        if self.parto:
            initial["parto"] = self.parto
        return initial

    def get_form(self, form_class=None):
        form = super().get_form(form_class)
        queryset = Parto.objects.filter(recien_nacido__isnull=True)
        if self.parto:
            queryset = queryset | Parto.objects.filter(pk=self.parto.pk)
            form.fields["parto"].empty_label = None
        form.fields["parto"].queryset = queryset.distinct()
        return form

    def form_valid(self, form):
        if self.parto:
            form.instance.parto = self.parto
        self.object = form.save()
        madre = self.object.parto.madre
        try:
            destino = reverse("madre_detail", args=[madre.pk])
        except NoReverseMatch:
            destino = reverse("madre_list")
        return redirect(destino)

    def get_success_url(self):
        return reverse("rn_list")


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
class BuscarPorRUTView(TemplateView):
    template_name = "buscar.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        query = self.request.GET.get("q", "").strip()
        context["query"] = query
        resultados = []
        error = None
        if query:
            try:
                rut_normalizado = normalizar_rut(query)
            except ValidationError as exc:
                error = exc.message
            else:
                resultados = Madre.objects.filter(rut__iexact=rut_normalizado)
        context["resultados"] = resultados
        context["error"] = error
        return context