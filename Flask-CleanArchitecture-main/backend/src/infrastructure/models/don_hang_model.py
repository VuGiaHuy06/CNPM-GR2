from sqlalchemy import Column, Integer, String, ForeignKey
from infrastructure.databases.base import Base

class DonHangModel(Base):
    __tablename__ = 'don_hang'   # ✅ đặt tên nhất quán

    id_dh = Column(Integer, primary_key=True, autoincrement=True)
    trang_thai = Column(String(50))
    tien_mon_an = Column(Integer)
    so_luong_mon_an = Column(Integer)

    # ✅ FOREIGN KEY PHẢI TRÙNG __tablename__
    id_ban = Column(Integer, ForeignKey('ban_an.id_ban_an'))
    id_kh  = Column(Integer, ForeignKey('nguoi_dung.id_nd'))
