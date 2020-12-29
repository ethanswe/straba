"""create tables

Revision ID: 0c790ff70836
Revises: 
Create Date: 2020-12-29 09:12:18.744563

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0c790ff70836'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=35), nullable=False),
    sa.Column('last_name', sa.String(length=35), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('city', sa.String(length=255), nullable=False),
    sa.Column('country', sa.String(length=255), nullable=False),
    sa.Column('avatar', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('activities',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=255), nullable=False),
    sa.Column('description', sa.String(length=2000), nullable=True),
    sa.Column('distance', sa.Float(), nullable=False),
    sa.Column('time', sa.Float(), nullable=False),
    sa.Column('gpx_file', sa.String(length=255), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('text', sa.String(length=2000), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('activity_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['activity_id'], ['activities.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('kudos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('activity_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['activity_id'], ['activities.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('kudos')
    op.drop_table('comments')
    op.drop_table('activities')
    op.drop_table('users')
    # ### end Alembic commands ###