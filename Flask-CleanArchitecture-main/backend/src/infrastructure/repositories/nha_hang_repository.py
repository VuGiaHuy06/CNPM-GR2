from infrastructure.models.nha_hang_model import RestaurantModel 
from domain.models.inha_hang_repository import INhaHangRepository
from infrastructure.databases.mssql import session as db_session
from typing import List, Optional

class NhaHangRepository(INhaHangRepository):
    def __init__(self, session = db_session):
        self.session = session

    def get_by_email(self, email: str):
        return self.session.query(RestaurantModel).filter_by(email=email).first()

    def get_by_sdt(self, sdt: str):
        return self.session.query(RestaurantModel).filter_by(so_dien_thoai=sdt).first()

    def list(self):
        return self.session.query(RestaurantModel).all()
    
    # def get_by_id(self, id: int) -> Optional[RestaurantModel]:
    #     return self.session.query(RestaurantModel).filter_by(id_nh=id).first()

    def add(self, nha_hang_domain) -> RestaurantModel:
        try:
            # Sử dụng hàm vars() hoặc kiểm tra kỹ tên thuộc tính của nha_hang_domain
            # Nếu lớp Domain NhaHang định nghĩa là .name, hãy đổi thành nha_hang_domain.name
            db_restaurant = RestaurantModel(
                ten_nh=getattr(nha_hang_domain, 'ten_nh', getattr(nha_hang_domain, 'name', None)),
                dia_chi=getattr(nha_hang_domain, 'dia_chi', getattr(nha_hang_domain, 'address', None)),
                email=nha_hang_domain.email,
                so_dien_thoai=getattr(nha_hang_domain, 'so_dien_thoai', getattr(nha_hang_domain, 'phone', None))
            )
            self.session.add(db_restaurant)
            self.session.commit()
            self.session.refresh(db_restaurant)
            return db_restaurant
        except Exception as e:
            self.session.rollback()
            raise e

    def update(self, nha_hang_domain) -> Optional[RestaurantModel]:
        """Cập nhật bản ghi từ dữ liệu Domain"""
        try:
            # Tìm bản ghi cũ trong DB
            db_restaurant = self.get_by_id(nha_hang_domain.id_nh)
            if db_restaurant:
                db_restaurant.ten_nh = nha_hang_domain.ten_nh
                db_restaurant.dia_chi = nha_hang_domain.dia_chi
                db_restaurant.email = nha_hang_domain.email
                db_restaurant.so_dien_thoai = nha_hang_domain.so_dien_thoai
                
                self.session.commit()
                return db_restaurant
            return None
        except Exception as e:
            self.session.rollback()
            raise e

# Sửa tên tham số từ id thành id_nh cho khớp với Interface
    def get_by_id(self, id_nh: int) -> Optional[RestaurantModel]:
        return self.session.query(RestaurantModel).filter_by(id_nh=id_nh).first()

    # Sửa tên tham số từ id thành id_nh
    def delete(self, id_nh: int) -> bool:
        try:
            self.session.expire_all() 
            # Sử dụng tham số id_nh vừa sửa
            restaurant = self.session.query(RestaurantModel).filter_by(id_nh=id_nh).first()
            
            if restaurant:
                self.session.delete(restaurant)
                self.session.commit()
                return True
            return False
        except Exception as e:
            self.session.rollback()
            return False