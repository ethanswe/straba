from .db import db


class Activity(db.Model):
  __tablename__ = 'activities'

  id = db.Column(db.Integer, primary_key = True)
  title = db.Column(db.String(255), nullable = False)
  description = db.Column(db.String(2000))
  distance = db.Column(db.Float, nullable = False)
  time = db.Column(db.Float, nullable = False)
  gpx_file = db.Column(db.String(255))
  user_id = db.Column(db.Integer, nullable = False, db.ForeignKey('users.id'))
  
  kudos = db.relationship('Kudos', backref='activity', lazy=True)
  comments = db.relationship('Comment', backref='comment', lazy=True)

