from flask import Blueprint, jsonify, request
from sqlalchemy.exc import IntegrityError
from app.models import db, Comment, User

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/create', methods=['POST'])
def createComment(user_id, text, activity_id):
    data = request.json
    print(data)
    comment = Comment(
        user_id=user_id,
        text=data['text'],
        activity_id=data['activity_id'])
    db.session.add(comment)
    db.session.commit()
    return 'Done', 201


@comment_routes.route('/activity/<int:activity_id>', methods=['GET'])
def getComments(activity_id):
    comments = Comment.query.join(User).filter(Comment.activity_id == activity_id).order_by(Comment.createdAt.desc()).all()
    return {'comments': [comment.to_joined_dict() for comment in comments]}