from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable = False)
  city = db.Column(db.String(255), nullable = False)
  country = db.Column(db.String(255), nullable = False)
  avatar = db.Column(db.String(255))
  
  activities = db.relationship('Activity', backref='user', lazy=True)


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
      "username": self.username,
      "email": self.email
    }


# class Activity(db.Model):
#   __tablename__ = 'activities'

#   id = db.Column(db.Integer, primary_key = True)
#   title = db.Column(db.String(255), nullable = False)
#   description = db.Column(db.String(2000))
#   distance = db.Column(db.Integer, nullable = False)
#   time = db.Column(db.Integer, nullable = False)
#   gpx_file = db.Column(db.String(255))
#   user_id = db.Column(db.Integer, nullable = False, db.ForeignKey('user.id', ondelete="cascade"))