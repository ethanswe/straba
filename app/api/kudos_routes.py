from flask import Blueprint, request
from sqlalchemy.exc import IntegrityError
from app.models import db, Kudos, User

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
def deleteKudos(activity_id, user_id):
   

    kudos = Kudos.query.filter(Kudos.activity_id == activity_id).filter(Kudos.user_id == user_id).one()

    db.session.delete(kudos)
    db.session.commit()
    return {'message': 'successfully deleted'}, 200


# This route will return the number of kudos for a user
@kudos_routes.route('/activity/<int:activity_id>', methods=['GET'])
def getActivityKudos(activity_id):
    # kudos = Kudos.query.filter(Kudos.activity_id == activity_id).all()
    # if kudos_routes:
    #     return {'kudos': [kudo.to_joined_dict() for kudo in kudos]}
    # else:
    #     return {'kudos': []}
    kudos = Kudos.query.join(User).filter(Kudos.activity_id == activity_id).all()
    return {'kudos': [kudo.to_joined_dict() for kudo in kudos]}


# This route will return a boolean whether or not if a user kudos a post
@kudos_routes.route('/<int:user_id>/activity/<int:activity_id>', methods=['GET'])
def getUserKudos(user_id, activity_id):
    kudos = Kudos.query.filter(Kudos.activity_id == activity_id).filter(Kudos.user_id == user_id).count()
    if kudos > 0:
        return {'kudos': True}
    else:
        return {'kudos': False}


# @kudos_routes.route('/activity/<int:activity_id>/user/int:user_id>', methods=['DELETE'])
# def deleteKudos(activity_id, user_id):
#     kudos = Kudos.query.filter(Kudos.activity_id == activity_id).filter(Kudos.user_id == user_id).one()
#     db.session.delete(kudos)
#     db.session.commit()
#     return {'message': 'successfully deleted comment'}, 200


# @kudos_routes.route('/<int:id>', methods=['DELETE'])
# def deleteKudos(id):
#     kudos = Kudos.query.get(id)
#     db.session.delete(kudos)
#     db.session.commit()
#     return {'message': 'successfully deleted comment'}, 200