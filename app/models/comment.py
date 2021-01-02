from .db import db


class Comment(db.Model):
  __tablename__ = 'comments'

  id = db.Column(db.Integer, primary_key = True)
  text = db.Column(db.String(2000), nullable = False)
  createdAt = db.Column(db.DateTime, server_default=db.func.now())

  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
  activity_id = db.Column(db.Integer, db.ForeignKey('activities.id'), nullable = False)
  
  activity = db.relationship('Activity', back_populates='comments') 
  user = db.relationship('User', back_populates='comments')
  
  
  def to_dict(self):
      return {
          "id": self.id,
          "text": self.text,
          "createdAt": self.createdAt
      }
  def to_joined_dict(self):
      return {
          "id": self.id,
          "text": self.text,
          "createdAt": self.createdAt,
          "user": self.user.to_dict()
      }