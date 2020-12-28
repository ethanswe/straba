from flask.cli import AppGroup
from .users import seed_users, undo_users, seed_activities, undo_activities, seed_kudos, undo_kudos, seed_comments, undo_comments

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    # Add other seed functions here
    seed_activities()
    seed_kudos()
    seed_comments()
# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
    undo_activities()
    undo_kudos()
    undo_comments()
