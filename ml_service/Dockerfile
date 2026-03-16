# Select distro
FROM python:3.10-slim

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Select working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    postgresql-client \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy uv file
COPY pyproject.toml uv.lock ./

# Install python dependencies
RUN uv sync --frozen --no-dev

# Copy project files
COPY . .

# Use uv venv
ENV PATH="/app/.venv/bin:$PATH"

# Expose port
EXPOSE 5000

# Run the application
CMD ["uv", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5000"]
