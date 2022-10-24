from flask import Blueprint, jsonify
# from flask_login import login_required
from app.models import Channel, Message

channel_routes = Blueprint("channels", __name__)

# Get all channels
@channel_routes.route("/")
def get_all_channels():
    channels = Channel.query.all()
    return {"channels": [channel.to_dict() for channel in channels]}


# Get specfic channel, requires authentication if current user is member of channel
@channel_routes.route("/:channelId")
def get_one_channel():
    channel_id = req.args
    print(channel_id)
    specific_channel = Channel.query.get(channelId)
    return {"channel": [channel.to_dict() for channel in specific_channel]}


# Get all users of a channel, requires authentication
@channel_routes.route("/:channelId/users")
def get_channel_users():
    channel_id = req.args
    channel_users = User.query.filter_by() # requires db diagram to see how this will be linked



# Get all messages of a channel, requires authentication ?
@channel_routes.route("/:channelId/messages")
def get_channel_messages():
    channel_id = req.args
    channel_messages = Message.query.filter_by(messgeable_id == channel_id).all
    return {"channel_messages": [message.to_dict() for message in channel_messages]}


# Create a new channel
@channel_routes.route("/", methods = ["POST"])
def create_channel():
