from sqlalchemy import Column, Integer, String, Date, ForeignKey
from infrastructure.databases.base import Base

class StaffModel(Base):
    __tablename__ = "nhan_vien"

    id_nv = Column("id_nv", Integer, primary_key=True)
    ten_nv = Column("ten_nv", String(100))
    ngay_vao_lam = Column("ngay_vao_lam", Date)
    so_dien_thoai = Column(String(20))
    chuc_vu = Column("chuc_vu", String(100))
    email = Column(String(100))
    tinh_trang = Column("tinh_trang", String(50))
    id_nd = Column("id_nd", Integer, ForeignKey("nguoi_dung.id_nd"))
    id_nh = Column("id_nh", Integer, ForeignKey("nha_hang.id_nh"))