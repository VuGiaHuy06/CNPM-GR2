from sqlalchemy import Column, Integer, String, ForeignKey
from infrastructure.databases.base import Base

class UserModel(Base):
    __tablename__ = "nguoi_dung"

    # id_nd khớp với ID_ND trong ERD (image_36fd76.png)
    id_nd = Column(Integer, primary_key=True, autoincrement=True)
    
    # id_nh khớp với ID_NH trong bảng NhaHang (image_36fd76.png)
    id_nh = Column(Integer, ForeignKey("nha_hang.id_nh"), nullable=False)
    
    # Các cột khác ánh xạ chính xác theo ERD
    ten = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    mat_khau = Column(String(255), nullable=False)
    ma_xac_thuc = Column(String(50), nullable=True)
    trang_thai = Column(String(50), default="Active")
    vai_tro = Column(String(50), nullable=False)