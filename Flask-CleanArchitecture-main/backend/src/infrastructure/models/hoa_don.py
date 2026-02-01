from sqlalchemy import Column, Integer, DateTime, Float, ForeignKey
from infrastructure.databases.base import Base

class InvoiceModel(Base):
    __tablename__ = "hoa_don"

    id_hd = Column(Integer, primary_key=True)
    id_dh = Column(Integer, ForeignKey("don_hang.id_dh"))
    id_voucher = Column(Integer, ForeignKey("voucher.id_voucher"))
    id_ban_an = Column(Integer, ForeignKey("ban_an.id_ban_an"))  
    ngay_in_hoa_don = Column(DateTime)
    tong_tien = Column(Float)
