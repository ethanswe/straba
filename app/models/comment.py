from .db import db


class Comment(db.Model):
  __tablename__ = 'comments'

  id = db.Column(db.Integer, primary_key = True)
  text = db.Column(db.String(2000), nullable = False)
  createdAt = db.Column(db.DateTime, server_default=db.func.now())

  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
  activity_id = db.Column(db.Integer, db.ForeignKey('activities.id'), nullable = False)
  
