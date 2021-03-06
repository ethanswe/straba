"""updating kudos realtionships

Revision ID: f7353ce08b82
Revises: cfc93655fe21
Create Date: 2021-01-01 07:05:03.355246

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f7353ce08b82'
down_revision = 'cfc93655fe21'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint('unique', 'kudos', ['activity_id', 'user_id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('unique', 'kudos', type_='unique')
    # ### end Alembic commands ###
