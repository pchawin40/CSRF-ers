from .db import db

class DMRUser(db.Model):
    __tablename__ = "dmr_users"

    dmr_id = db.Column("dmr_id", db.ForeignKey("direct_message_rooms.id"), primary_key=True)
    user_id = db.Column("user_id", db.ForeignKey("users.id"), primary_key=True)

    def to_dict(self):
        return {
            'dmr_id': self.dmr_id,
            'user_id': self.user_id
        }
