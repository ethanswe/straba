from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Following, User, db
from sqlalchemy.exc import SQLAlchemyError

following_routes = Blueprint('following', __name__)

@following_routes.route('/<int:user_id>')
def following(user_id):
    try:
        follows = Following.query.filter(Following.followed_user_id == user_id).all()
        followers = Following.query.filter(Following.user_id == user_id).all()
        follows_dict = [follows.to_dict() for person in follows]
        followers_dict = [followers.to_dict() for person in followers]
        following_json = jsonify({
            'followers': followers_dict,
            'following': follows_dict
        })
        return following_json
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        print(error)
        return {'errors': ['An error occurred while retrieving the data']}, 500