from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  first_name = db.Column(db.String(35), nullable = False)
  last_name = db.Column(db.String(35), nullable = False)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable = False)
  city = db.Column(db.String(255), nullable = False)
  country = db.Column(db.String(255), nullable = False)
  avatar = db.Column(db.String(255))
  
  activities = db.relationship('Activity', back_populates='user', lazy=True)
  kudos = db.relationship('Kudos', back_populates='user', lazy=True)
  comments = db.relationship('Comment', back_populates='user', lazy=True)
  following = db.relationship('Following', back_populates='user', lazy=True)

  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)


  def to_dict(self):
    return {
      "id": self.id,
      "first_name": self.first_name,
      "last_name": self.last_name,
      "city": self.city,
      "country": self.country,
      "avatar": self.avatar,
      "email": self.email
    }

  def to_activity_dict(self):
    return {
      "id": self.id,
      "first_name": self.first_name,
      "last_name": self.last_name,
      "city": self.city,
      "country": self.country,
      "avatar": self.avatar,
      "email": self.email,
      "activities": [activity.to_dict() for activity in self.activities]
    }
