from sqlalchemy import Column, Integer, DateTime, Float, ForeignKey
from infrastructure.databases.base import Base

class InvoiceModel(Base):
    __tablename__ = "hoa_don"

    id_hd = Column("id_hd", Integer, primary_key=True)
    id_dh = Column("id_dh", Integer, ForeignKey("don_hang.id_dh"))
    id_voucher = Column("id_voucher", Integer, ForeignKey("voucher.id_voucher"))
    id_ban_an = Column("id_banan", Integer, ForeignKey("ban_an.id_banan"))
    ngay_in_hoa_don = Column("ngay_in_hoa_don", DateTime)
    tong_tien = Column("tong_tien", Float)