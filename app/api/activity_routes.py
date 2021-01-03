from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Activity, User, db
from sqlalchemy.exc import SQLAlchemyError


activity_routes = Blueprint('activities', __name__)

# GET all activities for a specific user and whom they follow
@activity_routes.route('/')
# @login_required
def activities():
    try:
        activities = Activity.query.order_by(Activity.createdAt.desc()).all()
        activity_dicts = [activity.to_user_dict() for activity in activities]
        # filter by following and date descending max 15 (.all().order_by(Activity.created_date.desc()))
        activity_json = jsonify({'activities': activity_dicts})
        return activity_json
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        print(error)
        return {'errors': ['An error occurred while retrieving the data']}, 500

# GET all activities for a specific user
@activity_routes.route('/users/<int:user_id>', methods=['GET'])
# @login_required
def get_activities(user_id):
    try:
        activities = Activity.query.filter(Activity.user_id == user_id).all()
        activity_dicts = [activity.to_dict() for activity in activities]
        activity_json = jsonify({'activities': activity_dicts})
        return activity_json
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        print(error)
        return {'errors': ['hit An error occurred while retrieving the data']}, 500


# GET a specific activity
@activity_routes.route('/<int:activity_id>', methods=['GET'])
# @login_required
def get_activity(activity_id):
    try:
        activity = Activity.query.filter(Activity.id == activity_id).first()
        activity_json = jsonify({'activities': activity.to_user_dict()})
        # pull kudos and comments
        return activity_json
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        print(error)
        return {'errors': ['An error occurred while retrieving the data']}, 500


# POST a new activity for a specific user
@activity_routes.route('/new/<int:user_id>', methods=['POST'])
# @login_required
def post_activity(user_id):
    data = request.json
    activity = Activity(
        user_id=user_id,
        title=data['title'],
        description=data['description'],
        distance=float(data['distance']),
        time=float(data['time']),
        gpx_file=data['gpx_file'])
    db.session.add(activity)
    db.session.commit()
    return 'Done', 201
    


# DELETE an activity
@activity_routes.route('/activity/<int:activity_id>', methods=['DELETE'])
# @login_required
def activity(activity_id):
    activity = Activity.query.filter(Activity.id == activity_id).first()
    db.session.delete(activity)
    db.session.commit()
    return {'message': 'Activity was successfully deleted'}, 200