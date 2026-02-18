import json, os, secrets, uuid
from datetime import datetime
import app.services.database.redis.redis as redis_client


class SessionManager:
    def __init__(self):
        self.redis_cache = redis_client.RedisCache()
        self.default_timeout = int(os.environ.get("REDIS_EXPIRATION", 3600))
        self.remember_timeout = 60 * 60 * 24 * 30

    # Create a new session for a user
    def create_session(self, user_id: int, remember_me: bool = False):
        # Check if user has a session
        existing_session_id = self.redis_cache.read_redis(f"user_map:{user_id}")
        if existing_session_id:
            self.delete_session(existing_sid)

        # Init datas
        session_id = str(uuid.uuid4())
        token = secrets.token_urlsafe(32)
        created_at = datetime.now().isoformat()
        expiration = self.remember_timeout if remember_me else self.default_timeout

        if self.read_session(user_id):
            raise RuntimeError(f"User with id {user_id} already logged in")

        # Merge cookie data
        session_data = {
            "user_id": user_id,
            "session_id": session_id,
            "token": token,
            "remember_me": remember_me,
            "created_at": created_at,
        }

        self.redis_cache.create_redis(session_id, json.dumps(session_data), expiration)
        self.redis_cache.create_redis(f"user_map:{user_id}", session_id, expiration)
        return {"session_id": session_id, "token": token}

    # Read session data for a user
    def read_session(self, user_id: int):
        session_id = self.redis_cache.read_redis(f"user_map:{user_id}")
        if not session_id:
            return None

        data = self.redis_cache.read_redis(session_id)
        return json.loads(data) if data else None

    # Update session data
    def update_session(self, session_id):
        raw_data = self.redis_cache.read_redis(session_id)
        if not raw_data:
            raise RuntimeError("Session expired or invalid")

        data = json.loads(raw_data)
        user_id = data.get("user_id")
        remember_me = data.get("remember_me", False)

        # Generate a fresh token
        new_token = secrets.token_urlsafe(32)
        expiration = self.remember_timeout if remember_me else self.default_timeout

        # Update data object
        data["token"] = new_token
        data["updated_at"] = datetime.now().isoformat()

        # Save back to Redis
        self.redis_cache.create_redis(session_id, json.dumps(data), expiration)
        self.redis_cache.update_redis(f"user_map:{user_id}", session_id, expiration)

        return {"session_id": session_id, "token": new_token}

    # Delete session data
    def delete_session(self, session_id):
        data = self.redis_cache.read_redis(session_id)
        if data:
            session_data = json.loads(data)
            uid = session_data.get("user_id")
            self.redis_cache.delete_redis(f"user_map:{uid}")

        self.redis_cache.delete_redis(session_id)
        return True
