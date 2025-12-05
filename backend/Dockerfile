FROM python:3.13-slim
WORKDIR /app
RUN apt-get update
RUN apt-get install -y --no-install-recommends build-essential gcc
RUN rm -rf /var/lib/apt/lists/*
RUN pip install --no-cache-dir fastapi uvicorn
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
