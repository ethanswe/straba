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
  
  kudos = db.relationship('Kudos', backref='activity', lazy=True)
  comments = db.relationship('Comment', backref='activity', lazy=True)

  def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'distance': self.distance,
            'time': self.time,
            'gpx_file': self.gpx_file,
            'user_id': self.user_id
        }