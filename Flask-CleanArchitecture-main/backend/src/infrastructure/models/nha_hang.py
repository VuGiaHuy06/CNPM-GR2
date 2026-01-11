from sqlalchemy import Column, Integer, String
from infrastructure.databases.base import Base

class RestaurantModel(Base):
    __tablename__ = "nha_hang"

    id_nh = Column("id_nh", Integer, primary_key=True)
    ten_nh = Column("ten_nh", String(255))
    dia_chi = Column("dia_chi", String(255))
    email = Column(String(100))
    so_dien_thoai = Column(String(20))