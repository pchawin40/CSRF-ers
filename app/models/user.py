from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime
# from .channel import ChannelUser


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40))
    last_name = db.Column(db.String(40))
    username = db.Column(db.String(40), nullable=True)
    email = db.Column(db.String(255), unique=True)
    hashed_password = db.Column(db.String(255))
    profile_image = db.Column(db.String(255), default="https://ca.slack-edge.com/T0266FRGM-U015ZPLDZKQ-gf3696467c28-512")
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    # join memberships
    channel_member = db.relationship("ChannelUser", backref="channel_member", cascade="all, delete")
    dmr_member = db.relationship("DMRUser", backref="dmr_member", cascade="all,delete")

    __mapper_args__ = {
        'polymorphic_identity' : 'user',
        'with_polymorphic' : '*'
    }

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name':self.first_name,
            'last_name':self.last_name,
            'display_name': self.username,
            'email': self.email,
            'profile_image': self.profile_image,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
