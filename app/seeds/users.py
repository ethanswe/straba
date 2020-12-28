from werkzeug.security import generate_password_hash
from app.models import db, User, Activity, Kudos, Comment

# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(first_name='Demo', last_name='User', email='demo@aa.io',
                password='password', city='Chicago',
                country='USA')

    db.session.add(demo)

    db.session.commit()

def seed_activities():

    activity = Activity(title='Running in the park', 
                description='It was really nice outside.',
                distance=5.1, time=56.3,
                user_id=1)

    db.session.add(activity)

    db.session.commit()

def seed_kudos():

    kudos = Kudos(user_id=1, activity_id=1)

    db.session.add(kudos)

    db.session.commit()

def seed_comments():

    comment = Comment(text='Wow! You did a really great job.', user_id=1, activity_id=1)

    db.session.add(comment)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users;')
    db.session.commit()

def undo_activities():
    db.session.execute('TRUNCATE activities;')
    db.session.commit()

def undo_kudos():
    db.session.execute('TRUNCATE kudos;')
    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments;')
    db.session.commit()
