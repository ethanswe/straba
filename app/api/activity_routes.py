from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Activity, User, db
from sqlalchemy.exc import SQLAlchemyError


activity_routes = Blueprint('activities', __name__)

# GET all activities for a specific user and whom they follow
#activity.user_id == user.id and activity.user_id == 

# GET all activities for a specific user
@activity_routes.route('/users/<int:user_id>/activities', methods=['GET'])
@login_required
def get_activities(user_id):
    try:
        activities = Activity.query.filter(Activity.user_id == user_id).all()
        activity_dicts = [activity.to_dict() for activity in activities]
        activity_json = jsonify({'activities': activity_dicts})
        return activity_json
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        print(error)
        return {'errors': ['An error occurred while retrieving the data']}, 500


# GET a specific activity
@activity_routes.route('/activities/<int:activity_id>', methods=['GET'])
@login_required
def get_activity(activity_id):
    try:
        activity = Activity.query.filter(Activity.id == activity_id).first()
        activity_json = jsonify({'activities': activity_id.to_dict()})
        return activity_json
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        print(error)
        return {'errors': ['An error occurred while retrieving the data']}, 500


# POST a new activity for a specific user
@activity_routes.route('/users/<int:user_id>/activities', methods=['POST'])
@login_required
def post_activity(user_id):
    data = request.json
    activity = Activity(
        user_id=user_id,
        title=data['title'],
        description=data['description'],
        distance=data['distance'],
        time=data['time'],
        gpx_file=data['gpx_file'],
    try:
        db.session.add(activity)
        db.session.commit()
        activity_json = jsonify({'activities': activity.to_dict()})
        return activity_json
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        print(error)
        db.session.rollback()
        return {'errors': ['An error occurred while creating data']}, 500


# DELETE an activity
@activity_routes.route('/activities/<int:activity_id>', methods=['DELETE'])
@login_required
def activity(activity_id):
    delete_activity = Activity.query.get(activity_id)
    if delete_activity:
        db.session.delete(delete_activity)
        db.session.commit()
        return {'message': 'Activity was successfully deleted'}
    else:
        return {'errors': [f'Activity Id: {activity_id} was not found']}, 404