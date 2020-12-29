from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, FloatField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Activity


class ActivityForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    description = TextAreaField('description')
    distance = FloatField('distance', validators=[DataRequired()])
    time = FloatField('time', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired()])
    gpx_file = StringField('gpx_file')