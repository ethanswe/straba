"""create tables2

Revision ID: c2f3ab365787
Revises: 0c790ff70836
Create Date: 2020-12-29 09:13:47.132475

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c2f3ab365787'
down_revision = '0c790ff70836'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('following',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('followed_user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['followed_user_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('following')
    # ### end Alembic commands ###
