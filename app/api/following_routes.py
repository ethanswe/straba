from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Following, User, db
from sqlalchemy.exc import SQLAlchemyError

following_routes = Blueprint('following', __name__)


def fetchingUser(person):
    id = person["followed_user_id"]
    user = User.query.get(id)
    return user.to_dict()


# GET to check if the currentUser follows another user
@following_routes.route('/<int:user_id>/<int:curr_user>')
def check_following(user_id, curr_user):
    try:
        follows = Following.query.filter(
            Following.user_id == curr_user,
            Following.followed_user_id == user_id
        ).first()
        if follows:
            return {'follows': True}
        return {'follows':False}
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        print(error)
        return {'errors': ['An error occurred while retrieving the data']}, 500


# GET all followers and followings for a user
@following_routes.route('/users/<int:user_id>')
def following(user_id):
    try:
        followed = Following.query.filter(Following.followed_user_id == user_id).all()
        followers = Following.query.filter(Following.user_id == user_id).all()
        follows_dict = [person.to_dict() for person in followed]
        followers_dict = [person.to_dict() for person in followers]
        followed_users = list(map(fetchingUser, followers_dict))
        following_json = jsonify({
            'followed': follows_dict,
            'following': followers_dict,
            'following_users': followed_users
        })
        return following_json
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        print(error)
        return {'errors': ['An error occurred while retrieving the data']}, 500


# POST a new follow
@following_routes.route('/<int:user_id>', methods=["POST"])
def post_following(user_id):
    data = request.json
    follow = Following(
        user_id=data['userId'],
        followed_user_id=user_id
    )
    db.session.add(follow)
    db.session.commit()
    return {'message': 'Done'}, 201


# DELETE a follow
@following_routes.route('/<int:user_id>', methods=["DELETE"])
def delete_following(user_id):
    data = request.json
    delete_follow = Following.query.filter(Following.followed_user_id == user_id, Following.user_id == data['userId']).first()
    if delete_follow:
        db.session.delete(delete_follow)
        db.session.commit()
        return {'message': 'Unfollowed'}
    else:
        return {'errors': ['Error with unfollowing.']}, 404