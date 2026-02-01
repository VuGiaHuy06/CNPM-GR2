from sqlalchemy import Column, Integer, String, Float
from infrastructure.databases.base import Base

class VoucherModel(Base):
    __tablename__ = "voucher"

    id_voucher = Column("id_voucher", Integer, primary_key=True)
    mo_ta = Column("mo_ta", String(255))
    phan_tram = Column("phan_tram", Float)
    so_ma = Column("so_ma", String(50))
    so_luong = Column("so_luong", Integer)