from typing import List, Optional
from infrastructure.models.mon_an_model import MonAnModel
from infrastructure.databases.mssql import session as db_session
from domain.models.imon_an_repository import IMonAnRepository 

class MonAnRepository(IMonAnRepository):
    def __init__(self, session = db_session):
        self.session = session

    def list(self) -> List[MonAnModel]:
        """Lấy toàn bộ danh sách món ăn"""
        return self.session.query(MonAnModel).all()

    def get_by_id(self, id: int) -> Optional[MonAnModel]:
        """Tìm món ăn theo ID thực tế trong DB (id_mon)"""
        # SỬA: Dùng id_mon theo đúng cấu trúc bảng thực tế bạn đã chụp
        return self.session.query(MonAnModel).filter(MonAnModel.id_mon == id).first()

    def list_by_nha_hang(self, id_nh: int) -> List[MonAnModel]:
        """Lấy danh sách món ăn thuộc về một nhà hàng cụ thể"""
        return self.session.query(MonAnModel).filter_by(id_nh=id_nh).all()

    def add(self, mon_an_domain) -> MonAnModel:
        """Thêm món ăn mới và commit vào SQL Server"""
        try:
            db_mon = MonAnModel(
                # Map đúng tên cột trong DB: id_mon, ten_mon, gia
                ten_mon=mon_an_domain.ten_mon,
                gia=mon_an_domain.gia,
                mo_ta=mon_an_domain.mo_ta,
                id_nh=mon_an_domain.id_nh
            )
            self.session.add(db_mon)
            self.session.commit()  # Xác nhận lưu dữ liệu xuống ổ cứng
            self.session.refresh(db_mon)
            return db_mon
        except Exception as e:
            self.session.rollback()
            raise e

    def update(self, id: int, mon_an_domain) -> Optional[MonAnModel]:
        try:
            # 1. Tìm đối tượng Model thực sự từ Database bằng id_mon
            db_mon = self.get_by_id(id)
            if not db_mon:
                return None
            
            # 2. Cập nhật các trường từ Domain vào Model (bao gồm mo_ta)
            db_mon.ten_mon = mon_an_domain.ten_mon
            db_mon.gia = mon_an_domain.gia
            db_mon.mo_ta = mon_an_domain.mo_ta  
            db_mon.id_nh = mon_an_domain.id_nh
            
            # 3. Commit và làm mới dữ liệu
            self.session.commit()
            self.session.refresh(db_mon)
            return db_mon
        except Exception as e:
            self.session.rollback()
            raise e

    def delete(self, id: int) -> bool:
        """Xóa món ăn theo ID"""
        try:
            mon = self.get_by_id(id)
            if mon:
                self.session.delete(mon)
                self.session.commit()
                return True
            return False
        except Exception as e:
            self.session.rollback()
            return False