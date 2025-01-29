# Pull base image
FROM python:3.10-slim

# Set environment variables

# Set work directory
WORKDIR /backend

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt


EXPOSE 8000