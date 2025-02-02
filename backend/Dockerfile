# Base stage for shared dependencies
FROM python:3.11-slim
WORKDIR /backend
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt


ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

COPY . .
EXPOSE 8001

# Use environment variable to determine the command
CMD if [ "$ENVIRONMENT" = "development" ]; then \
        python manage.py runserver 0.0.0.0:8001; \
    else \
        gunicorn backend.wsgi:application --bind 0.0.0.0:8001; \
    fi