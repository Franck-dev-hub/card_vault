import os, redis
from typing import Any
from fastapi import HTTPException


class RedisCache:
    def __init__(self):
        # Choose localhost or redis
        redis_host = os.environ.get("REDIS_HOST") if os.path.exists("/.dockerenv") else "redis"
        redis_port = os.environ.get("REDIS_PORT", "6379")

        # Create the database URL
        redis_url = f"redis://redis:{redis_port}/0"

        self.redis_client = redis.from_url(
            redis_url,
            decode_responses=True
        )


    # Store data in Redis
    def store_redis(
            self,
            key: str,
            value: Any,
            expiration_time: int = int(os.environ.get("REDIS_EXPIRATION", 3600))
    ) -> None:
        try:
            self.redis_client.set(key, value, expiration_time)
        except Exception as e:
            raise RuntimeError(f"Failed to store key '{key}' in Redis. {e}")


    # Retrieve data from Redis
    def get_redis(self, key: str):
        try:
            return self.redis_client.get(key)
        except Exception as e:
            raise RuntimeError(f"Failed to retrieve key '{key}' in Redis. {e}")


    # Refresh data in Redis
    def refresh_redis(self, key: str, value: Any, expiration_time: int = None) -> None:
        if expiration_time is None:
            expiration_time = int(os.environ.get("REDIS_EXPIRATION", 3600))
        try:
            self.redis_client.set(key, value, expiration_time)
        except Exception as e:
            raise RuntimeError(f"Failed to refresh key '{key}' in Redis. {e}")


    # Delete data from Redis
    def delete_redis(self, key: str):
        try:
            self.redis_client.delete(key)
        except Exception as e:
            raise RuntimeError(f"Failed to delete key '{key}' in Redis. {e}")


    # Clear all data from Redis
    def clear_redis(self):
        try:
            self.redis_client.flushdb()
        except Exception as e:
            raise RuntimeError(f"Failed to clear Redis database. {e}")


    # Check if a key exists in Redis
    def exist_redis(self, key: str):
        try:
            return self.redis_client.exists(key) == 1
        except Exception as e:
            raise RuntimeError(f"Failed to check existence of key '{key}' in Redis. {e}")
