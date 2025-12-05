FROM python:3.13-slim
WORKDIR /app
RUN apt-get update
RUN apt-get install -y --no-install-recommends build-essential gcc
RUN rm -rf /var/lib/apt/lists/*
RUN pip install --no-cache-dir uvicorn tensorflow
COPY . .
EXPOSE 5001
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5001"]
