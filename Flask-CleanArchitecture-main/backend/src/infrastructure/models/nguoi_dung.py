from sqlalchemy import Column, Integer, String, ForeignKey
from infrastructure.databases.base import Base

class UserModel(Base):
    __tablename__ = "nguoi_dung"

    id_nd = Column("id_nd", Integer, primary_key=True)
    id_nh = Column("id_nh", Integer, ForeignKey("nha_hang.id_nh"))
    ten = Column(String(100))
    email = Column(String(100))
    mat_khau = Column("mat_khau", String(255))
    ma_xac_thuc = Column("ma_xac_thuc", String(50))
    trang_thai = Column("trang_thai", String(50))
    vai_tro = Column("vai_tro", String(50))