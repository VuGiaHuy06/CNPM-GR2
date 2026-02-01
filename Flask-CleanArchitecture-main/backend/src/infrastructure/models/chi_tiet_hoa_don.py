from sqlalchemy import Column, Integer, Float, ForeignKey
from infrastructure.databases.base import Base

class InvoiceDetailModel(Base):
    __tablename__ = "chi_tiet_hoa_don"

    id_cthd = Column("id_cthd", Integer, primary_key=True)
    id_hoa_don = Column("id_hd", Integer, ForeignKey("hoa_don.id_hd"))
    id_mon_an = Column("id_monan", Integer, ForeignKey("mon_an.id_monan"))
    so_luong = Column("so_luong", Integer)
    vat = Column(Float)