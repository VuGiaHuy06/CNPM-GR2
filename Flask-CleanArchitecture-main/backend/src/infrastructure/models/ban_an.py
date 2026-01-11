from sqlalchemy import Column, Integer, String, ForeignKey
from infrastructure.databases.base import Base

class TableModel(Base):
    __tablename__ = "ban_an"

    id_banan = Column("id_banan", Integer, primary_key=True)
    ten_ban = Column("ten_ban", String(100))
    trang_thai = Column("trang_thai", String(50))
    id_nha_hang = Column("id_nh", Integer, ForeignKey("nha_hang.id_nh"))