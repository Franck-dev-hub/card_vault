import json, os, secrets, uuid
from datetime import datetime
import app.services.database.redis.redis as redis_client


class SessionManager:
    def __init__(self):
        self.redis_cache = redis_client.RedisCache()
        self.session_timeout = int(os.environ.get("REDIS_EXPIRATION", 3600))

    # Create a new session for a user
    def create_session(self, user_id: int):
        # Init data
        user_id = int(user_id)
        session_id = str(uuid.uuid4())
        token = secrets.token_urlsafe(32)
        created_at = datetime.now()

        if self.read_session(user_id):
            raise RuntimeError(f"User with id {user_id} already logged in")

        # Merge cookie data
        session_data = {
            "user_id": user_id,
            "session_id": session_id,
            "token": token,
            "created_at": created_at.isoformat(),
            "updated_at": created_at.isoformat()
        }

        self.redis_cache.create_redis(session_id, json.dumps(session_data), self.session_timeout)
        return {"session_id": session_id, "token": token}

    # Read session data for a user
    def read_session(self, user_id: int):
        # Find existing session
        try:
            # Search Redis for sessions with this user_id
            keys = self.redis_cache.redis_client.keys("*")
            for key in keys:
                session_data = self.redis_cache.read_redis(key)
                if session_data:
                    data = json.loads(session_data)
                    if data.get("user_id") == user_id:
                        return data
        except Exception as e:
            raise RuntimeError(f"Can't find user session with user id: {user_id}. {e}")

    # Update session data
    def update_session(self, session_id):
        # Check if session exists
        if not self.redis_cache.read_redis(session_id):
            raise RuntimeError(f"Session with id {session_id} does not exist")

        # Get current data and re-store with new expiration
        session_data = self.redis_cache.read_redis(session_id)
        self.redis_cache.update_redis(session_id, session_data, self.session_timeout)
        return True

    # Delete session data
    def delete_session(self, session_id):
        self.redis_cache.delete_redis(session_id)
        return True
