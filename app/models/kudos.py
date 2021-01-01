from .db import db


class Kudos(db.Model):
  __tablename__ = 'kudos'

  id = db.Column(db.Integer, primary_key = True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
  activity_id = db.Column(db.Integer, db.ForeignKey('activities.id'), nullable = False)

  __table_args__ = (db.UniqueConstraint('activity_id', 'user_id', name='unique'), )

  activity = db.relationship("Activity", back_populates="kudos")
  user = db.relationship("User", back_populates="kudos")

  def to_dict(self):
      return {
          "id": self.id
      }  
  def to_joined_dict(self):
      return {
          "id": self.id,
          "activity": self.activity.to_dict(),
          "user": self.user.to_dict()
      }