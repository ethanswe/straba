from flask import Blueprint, jsonify, request
from sqlalchemy.exc import IntegrityError
from app.models import db, Comment, User

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/create', methods=['POST'])
def createComment():
    data = request.json
    comment = Comment(
        text=data['text'],
        user_id=data['user_id'],
        activity_id=data['activity_id'])
    db.session.add(comment)
    db.session.commit()
    return 'Done', 201


@comment_routes.route('/activity/<int:activity_id>', methods=['GET'])
def getComments(activity_id):
    comments = Comment.query.join(User).filter(Comment.activity_id == activity_id).order_by(Comment.createdAt.desc()).all()
    return {'comments': [comment.to_joined_dict() for comment in comments]}


@comment_routes.route('/<int:id>', methods=['DELETE'])
def deleteComment(id):
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return {'message': 'successfully deleted comment'}, 200

