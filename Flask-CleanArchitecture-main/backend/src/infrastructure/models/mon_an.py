from sqlalchemy import Column, Integer, String, Float, ForeignKey
from infrastructure.databases.base import Base

class FoodModel(Base):
    __tablename__ = "mon_an"

    id_mon_an = Column("id_monan", Integer, primary_key=True)
    id_nh = Column("id_nh", Integer, ForeignKey("nha_hang.id_nh"))
    ten_mon = Column("ten_mon", String(100))
    gia = Column(Float)
    mo_ta = Column("mo_ta", String(255))
    hinh_anh = Column("hinh_anh", String(255))