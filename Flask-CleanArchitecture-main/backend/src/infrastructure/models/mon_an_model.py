from sqlalchemy import Column, Integer, String, ForeignKey, Float
from infrastructure.databases.base import Base

class MonAnModel(Base):
    __tablename__ = "mon_an"

   
    
    id_mon = Column(Integer, primary_key=True, autoincrement=True)
    ten_mon = Column(String(255), nullable=False)
    gia = Column(Float, nullable=False)
    mo_ta = Column(String(500))
    id_nh = Column(Integer, ForeignKey("nha_hang.id_nh"), nullable=False)