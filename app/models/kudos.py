from .db import db


class Kudos(db.Model):
  __tablename__ = 'kudos'

  id = db.Column(db.Integer, primary_key = True)
  user_id = db.Column(db.Integer, nullable = False, db.ForeignKey('users.id'))
  activity_id = db.Column(db.Integer, nullable = False, db.ForeignKey('activities.id'))