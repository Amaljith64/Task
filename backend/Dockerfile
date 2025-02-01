# Base stage for shared dependencies
FROM python:3.11-slim as base
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Single stage with environment-based configuration
FROM base
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

COPY . .
EXPOSE 8000

# Use environment variable to determine the command
CMD if [ "$ENVIRONMENT" = "development" ]; then \
        python manage.py runserver 0.0.0.0:8000; \
    else \
        gunicorn backend.wsgi:application --bind 0.0.0.0:8000; \
    fi