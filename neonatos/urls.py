from django.urls import path

from . import views

urlpatterns = [
    path("madres/", views.MadreList.as_view(), name="madre_list"),
    path("madres/nuevo/", views.MadreCreate.as_view(), name="madre_create"),
    path("madre/nuevo/", views.MadreCreate.as_view(), name="madre_create"),
    path("madres/<int:pk>/editar/", views.MadreUpdate.as_view(), name="madre_update"),
    path("madres/<int:pk>/eliminar/", views.MadreDelete.as_view(), name="madre_delete"),

    path("partos/", views.PartoList.as_view(), name="parto_list"),
    path("partos/nuevo/", views.PartoCreate.as_view(), name="parto_create"),
    path("parto/nuevo/", views.PartoCreate.as_view(), name="parto_create"),
    path("partos/<int:pk>/editar/", views.PartoUpdate.as_view(), name="parto_update"),
    path("partos/<int:pk>/eliminar/", views.PartoDelete.as_view(), name="parto_delete"),

    path("rn/", views.RNList.as_view(), name="rn_list"),
    path("rn/nuevo/", views.RNCreate.as_view(), name="rn_create"),
    path("rn/<int:pk>/editar/", views.RNUpdate.as_view(), name="rn_update"),
    path("rn/<int:pk>/eliminar/", views.RNDelete.as_view(), name="rn_delete"),

    path("comp/", views.CompList.as_view(), name="comp_list"),
    path("comp/nuevo/", views.CompCreate.as_view(), name="comp_create"),
    path("comp/<int:pk>/editar/", views.CompUpdate.as_view(), name="comp_update"),
    path("comp/<int:pk>/eliminar/", views.CompDelete.as_view(), name="comp_delete"),

    path("buscar/", views.BuscarPorRUTView.as_view(), name="buscar_rut"),
]