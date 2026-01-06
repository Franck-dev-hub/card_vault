# Select distro
FROM python:3.13-slim

# Select working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update
RUN apt-get install -y gcc
RUN apt-get install -y g++
RUN apt-get install -y postgresql-client
RUN apt-get install -y libpq-dev
RUN rm -rf /var/lib/apt/lists/*

# Copy python requirements
COPY requirements.txt .

# Install python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Expose port
EXPOSE 8000

# Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
