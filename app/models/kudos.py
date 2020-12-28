from .db import db


class Kudos(db.Model):
  __tablename__ = 'kudos'

  id = db.Column(db.Integer, primary_key = True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
  activity_id = db.Column(db.Integer, db.ForeignKey('activities.id'), nullable = False)