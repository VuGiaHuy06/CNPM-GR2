from typing import Optional, List
from sqlalchemy.orm import Session

from domain.models.khach_hang import KhachHang
from domain.models.ikhach_hang_repository import IKhachHangRepository
from infrastructure.models.khach_hang import CustomerModel
from infrastructure.databases.mssql import session as db_session


class KhachHangRepository(IKhachHangRepository):

    def __init__(self, session: Session = db_session):
        self.session = session

    # ---------------- CREATE ----------------
    def add(self, kh: KhachHang) -> CustomerModel:
        try:
            db_kh = CustomerModel(
                ten_kh=kh.ten_kh,
                sdt=kh.so_dien_thoai,
                email=kh.email,
                id_nd=kh.id_nd
            )
            self.session.add(db_kh)
            self.session.commit()
            self.session.refresh(db_kh)
            return db_kh
        except Exception as e:
            self.session.rollback()
            raise e

    # ---------------- GET BY ID ----------------
    def get_by_id(self, id_kh: int) -> Optional[CustomerModel]:
        return (
            self.session.query(CustomerModel)
            .filter_by(id_kh=id_kh)
            .first()
        )

    # ---------------- LIST ----------------
    def list(self) -> List[CustomerModel]:
        return self.session.query(CustomerModel).all()

    # ---------------- UPDATE ----------------
    def update(self, kh: KhachHang) -> Optional[CustomerModel]:
        try:
            db_kh = self.get_by_id(kh.id_kh)
            if not db_kh:
                return None

            db_kh.ten_kh = kh.ten_kh
            db_kh.sdt = kh.so_dien_thoai
            db_kh.email = kh.email
            db_kh.id_nd = kh.id_nd

            self.session.commit()
            return db_kh
        except Exception as e:
            self.session.rollback()
            raise e

    # ---------------- DELETE ----------------
    def delete(self, id_kh: int) -> bool:
        try:
            db_kh = self.get_by_id(id_kh)
            if not db_kh:
                return False

            self.session.delete(db_kh)
            self.session.commit()
            return True
        except Exception:
            self.session.rollback()
            return False

    # =======================
    # 🔽 CÁC METHOD BẮT BUỘC
    # =======================

    def get_by_email(self, email: str) -> Optional[CustomerModel]:
        return (
            self.session.query(CustomerModel)
            .filter_by(email=email)
            .first()
        )

    def get_by_nguoi_dung_id(self, id_nd: int) -> Optional[CustomerModel]:
        return (
            self.session.query(CustomerModel)
            .filter_by(id_nd=id_nd)
            .first()
        )

    def get_by_so_dien_thoai(self, so_dien_thoai: str) -> Optional[CustomerModel]:
        return (
            self.session.query(CustomerModel)
            .filter_by(sdt=so_dien_thoai)
            .first()
        )
