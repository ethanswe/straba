from .db import db


class Activity(db.Model):
  __tablename__ = 'activities'

  id = db.Column(db.Integer, primary_key = True)
  title = db.Column(db.String(255), nullable = False)
  description = db.Column(db.String(2000))
  distance = db.Column(db.Float, nullable = False)
  time = db.Column(db.Float, nullable = False)
  gpx_file = db.Column(db.String(255))
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
  createdAt = db.Column(db.DateTime, server_default=db.func.now())
  
  kudos = db.relationship('Kudos', back_populates='activity', lazy=True, cascade="all, delete-orphan")
  comments = db.relationship('Comment', back_populates='activity', lazy=True, cascade="all, delete-orphan")
  user = db.relationship("User", back_populates="activities")

  def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'distance': self.distance,
            'time': self.time,
            'gpx_file': self.gpx_file,
            'createdAt': self.createdAt,
            'user_id': self.user_id
        }
  
  def to_user_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'distance': self.distance,
            'time': self.time,
            'gpx_file': self.gpx_file,
            'createdAt': self.createdAt,
            'user_id': self.user_id,
            "user": self.user.to_dict()
        }

  def to_joined_dict(self):
         return {
             'id': self.id,
         'title': self.title,
         'description': self.description,
         'distance': self.distance,
         'time': self.time,
         'gpx_file': self.gpx_file,
         'createdAt': self.createdAt,
         'user_id': self.user_id,
         "user": self.user.to_dict(),
         "comments": [comment.to_dict() for comment in self.comments],
         "kudos": [kudos.to_dict() for kodos in kudoses]
     }