"""adjusted joined tables

Revision ID: eba2469cf422
Revises: c2f3ab365787
Create Date: 2020-12-31 02:42:23.531578

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'eba2469cf422'
down_revision = 'c2f3ab365787'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('following_followed_user_id_fkey', 'following', type_='foreignkey')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_foreign_key('following_followed_user_id_fkey', 'following', 'users', ['followed_user_id'], ['id'])
    # ### end Alembic commands ###
