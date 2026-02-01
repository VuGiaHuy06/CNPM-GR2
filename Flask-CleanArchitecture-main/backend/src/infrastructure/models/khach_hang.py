from sqlalchemy import Column, Integer, String, ForeignKey
from infrastructure.databases.base import Base

class CustomerModel(Base):
    __tablename__ = "khach_hang"

    id_kh = Column("id_kh", Integer, primary_key=True)
    ten_kh = Column("ten_kh", String(100))
    sdt = Column("so_dien_thoai", String(20))
    email = Column(String(100))
    id_nd = Column("id_nd", Integer, ForeignKey("nguoi_dung.id_nd"))