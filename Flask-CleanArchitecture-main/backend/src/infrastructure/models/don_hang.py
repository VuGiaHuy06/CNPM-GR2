from sqlalchemy import Column, Integer, Float, ForeignKey
from infrastructure.databases.base import Base

class OrderModel(Base):
    __tablename__ = "don_hang"

    id_dh = Column("id_dh", Integer, primary_key=True)
    id_kh = Column("id_kh", Integer, ForeignKey("khach_hang.id_kh"))
    tien_mon_an = Column("tien_mon_an", Float)
    so_luong = Column("so_luong_mon_an", Integer)