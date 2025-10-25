# Trazabilidad Neonatal - Hospital de Ñuble (CRUD)

## Pasos rápidos
1. Crea y activa el entorno:
   ```bash
   python -m venv .venv
   # Windows
   .venv\Scripts\activate
   ```
2. Instala dependencias:
   ```bash
   pip install -r requirements.txt
   ```
3. URLs:
   - http://127.0.0.1:8000/madres/
   - http://127.0.0.1:8000/partos/
   - http://127.0.0.1:8000/rn/
   - http://127.0.0.1:8000/comp/

## Proyecto: trazabilidad
## App: neonatos

## Conexión a MySQL (más adelante)
- Instala `mysqlclient` y configura `.env` con `DB_ENGINE=mysql` y credenciales
- Ejecuta `python manage.py migrate` en el entorno correspondiente