from .db import db


class Comment(db.Model):
  __tablename__ = 'comments'

  id = db.Column(db.Integer, primary_key = True)
  user_id = db.Column(db.Integer, nullable = False, db.ForeignKey('users.id'))
  activity_id = db.Column(db.Integer, nullable = False, db.ForeignKey('activities.id'))