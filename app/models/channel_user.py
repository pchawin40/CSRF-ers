from .db import db

class ChannelUser(db.Model):
    __tablename__ = "channel_users"

    channel_id = db.Column("channel_id", db.ForeignKey("channels.id"), primary_key=True)
    user_id = db.Column("user_id", db.ForeignKey("users.id"), primary_key=True)

    def to_dict(self):
        return {
            'channel_id': self.channel_id,
            'user_id': self.user_id
        }
