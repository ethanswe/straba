from .db import db


class Following(db.Model):
  __tablename__ = 'following'

  id = db.Column(db.Integer, primary_key = True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
  followed_user_id = db.Column(db.Integer, nullable = False)