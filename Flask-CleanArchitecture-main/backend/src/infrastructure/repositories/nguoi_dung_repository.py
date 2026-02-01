from typing import Optional, List
from infrastructure.databases.mssql import session as db_session
from infrastructure.models.nguoi_dung_model import UserModel
from domain.models.nguoi_dung import NguoiDung
from domain.models.inguoi_dung_repository import INguoiDungRepository


class NguoiDungRepository(INguoiDungRepository):
    def __init__(self, session=db_session):
        self.session = session

    def add(self, nguoi_dung_domain: NguoiDung) -> UserModel:
        try:
            db_user = UserModel(
                id_nh=nguoi_dung_domain.id_nh,
                ten=nguoi_dung_domain.ten,
                email=nguoi_dung_domain.email,
                mat_khau=nguoi_dung_domain.mat_khau,
                ma_xac_thuc=nguoi_dung_domain.ma_xac_thuc,
                trang_thai=nguoi_dung_domain.trang_thai,
                vai_tro=nguoi_dung_domain.vai_tro
            )
            self.session.add(db_user)
            self.session.commit()
            self.session.refresh(db_user)
            return db_user
        except Exception as e:
            self.session.rollback()
            raise e

    def get_by_id(self, id_nd: int) -> Optional[UserModel]:
        return self.session.query(UserModel)\
            .filter(UserModel.id_nd == id_nd)\
            .first()

    def get_by_email(self, email: str) -> Optional[UserModel]:
        return self.session.query(UserModel)\
            .filter(UserModel.email == email)\
            .first()

    def list(self) -> List[UserModel]:
        return self.session.query(UserModel).all()

    def update(self, id_nd: int, nguoi_dung_domain: NguoiDung) -> Optional[UserModel]:
        try:
            db_user = self.get_by_id(id_nd)
            if not db_user:
                return None

            db_user.ten = nguoi_dung_domain.ten
            db_user.email = nguoi_dung_domain.email
            db_user.vai_tro = nguoi_dung_domain.vai_tro
            db_user.trang_thai = nguoi_dung_domain.trang_thai

            self.session.commit()
            self.session.refresh(db_user)
            return db_user
        except Exception as e:
            self.session.rollback()
            raise e

    def delete(self, id_nd: int) -> bool:
        try:
            db_user = self.get_by_id(id_nd)
            if not db_user:
                return False

            self.session.delete(db_user)
            self.session.commit()
            return True
        except Exception:
            self.session.rollback()
            return False
