from flask import Blueprint, request
from sqlalchemy.exc import IntegrityError
from app.models import db, Kudos

kudos_routes = Blueprint('kudos', __name__)


@kudos_routes.route('/create', methods=['POST'])
def createKudos():
    req_data = request.get_json()
    activity_id = req_data['activity_id']
    user_id = req_data['user_id']

    try:

        kudos = Kudos(
            activity_id=activity_id,
            user_id=user_id,
        )

        db.session.add(kudos)
        db.session.commit()
        return {'kudos': kudos.to_dict()}
    except IntegrityError:
        return {'errors': 'User already kudos'}, 404


@kudos_routes.route('/delete', methods=['DELETE'])
def deleteKudos():
    req_data = request.get_json()
    activity_id = req_data['activity_id']
    user_id = req_data['user_id']

    kudos = Kudos.query.filter(Kudos.activity_id == activity_id).filter(Kudos.user_id == user_id).one()

    db.session.delete(kudos)
    db.session.commit()
    return {'message': 'successfully deleted'}, 200


# This route will return the number of kudos for a user
@kudos_routes.route('/<int:activity_id>', methods=['GET'])
def getActivityKudos(activity_id):
    kudos = Kudos.query.filter(Kudos.activity_id == activity_id).all()
    if kudos_routes:
        return {'kudos': [kudo.to_dict() for kudo in kudos]}
    else:
        return {'kudos': []}


# This route will return a boolean whether or not if a user kudos a post
@kudos_routes.route('/<int:userId>/activity/<int:postId>', methods=['GET'])
def getUserKudos(user_id, activity_id):
    kudos = Kudos.query.filter(Kudos.activity_id == activity_id).filter(Kudos.user_id == user_id).count()
    if kudos > 0:
        return {'kudos': True}
    else:
        return {'kudos': False}