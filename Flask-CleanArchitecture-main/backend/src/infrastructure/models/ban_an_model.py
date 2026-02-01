from sqlalchemy import Column, Integer, String, ForeignKey
from infrastructure.databases.base import Base

class TableModel(Base):
    __tablename__ = "ban_an"

    id_ban_an = Column(Integer, primary_key=True, autoincrement=True)
    ten_ban = Column(String(100))
    trang_thai = Column(String(50))
    id_nh = Column(Integer, ForeignKey("nha_hang.id_nh"))