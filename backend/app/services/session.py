import secrets
from app.models.session import Session
from datetime import datetime, timedelta

class SessionManager:
    @staticmethod
    def create_session_token(user_id: int, db: Session, expires_in_hours: int = 24) -> str:
        # Generate random token
        token = secrets.token_urlsafe(32)

        # Calculate expiration time
        expires_at = datetime.now() + timedelta(hours=expires_in_hours)

        # Create session in database
        db_session = Session(
            user_id=user_id,
            token=token,
            expires_at=expires_at
        )
        db.add(db_session)
        db.commit()

        return token

    @staticmethod
    def validate_session_token(token: str, db: Session) -> int | None:
        db_session = db.query(Session).filter(Session.token == token).first()

        if not db_session:
            return None

        if datetime.now() > db_session.expires_at:
            db.delete(db_session)
            db.commit()
            return None

        return db_session.user_id

    @staticmethod
    def invalidate_session_token(token: str, db: Session) -> bool:
        db_session = db.query(Session).filter(Session.token == token).first()

        if db_session:
            db.delete(db_session)
            db.commit()
            return True

        return False

    @staticmethod
    def cleanup_expired_sessions(db: Session) -> int:
        result = db.query(Session).filter(
            Session.expires_at < datetime.utcnow()
        ).delete()
        db.commit()
        return result
