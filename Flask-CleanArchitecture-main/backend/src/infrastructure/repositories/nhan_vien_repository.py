from typing import List, Optional
from sqlalchemy.orm import Session

from domain.models.nhan_vien import NhanVien
from domain.models.inhan_vien_repository import INhanVienRepository
from infrastructure.models.nhan_vien import StaffModel
from infrastructure.databases.mssql import session as db_session


class NhanVienRepository(INhanVienRepository):

    def __init__(self, session: Session = db_session):
        self.session = session

    # ---------------- CREATE ----------------
    def add(self, nhan_vien: NhanVien) -> StaffModel:
        try:
            db_nv = StaffModel(
                ten_nv=nhan_vien.ten_nv,
                ngay_vao_lam=nhan_vien.ngay_vao_lam,
                so_dien_thoai=nhan_vien.so_dien_thoai,
                chuc_vu=nhan_vien.chuc_vu,
                email=nhan_vien.email,
                tinh_trang=nhan_vien.tinh_trang,
                id_nd=nhan_vien.id_nd,
                id_nh=nhan_vien.id_nh
            )
            self.session.add(db_nv)
            self.session.commit()
            self.session.refresh(db_nv)
            return db_nv
        except Exception as e:
            self.session.rollback()
            raise e

    # ---------------- GET BY ID ----------------
    def get_by_id(self, id_nv: int) -> Optional[StaffModel]:
        return (
            self.session.query(StaffModel)
            .filter_by(id_nv=id_nv)
            .first()
        )

    # ---------------- LIST ----------------
    def list(self) -> List[StaffModel]:
        return self.session.query(StaffModel).all()

    # ---------------- UPDATE ----------------
    def update(self, nhan_vien: NhanVien) -> Optional[StaffModel]:
        try:
            db_nv = self.get_by_id(nhan_vien.id_nv)
            if not db_nv:
                return None

            db_nv.ten_nv = nhan_vien.ten_nv
            db_nv.ngay_vao_lam = nhan_vien.ngay_vao_lam
            db_nv.so_dien_thoai = nhan_vien.so_dien_thoai
            db_nv.chuc_vu = nhan_vien.chuc_vu
            db_nv.email = nhan_vien.email
            db_nv.tinh_trang = nhan_vien.tinh_trang
            db_nv.id_nd = nhan_vien.id_nd
            db_nv.id_nh = nhan_vien.id_nh

            self.session.commit()
            return db_nv
        except Exception as e:
            self.session.rollback()
            raise e

    # ---------------- DELETE ----------------
    def delete(self, id_nv: int) -> bool:
        try:
            db_nv = self.get_by_id(id_nv)
            if not db_nv:
                return False

            self.session.delete(db_nv)
            self.session.commit()
            return True
        except Exception:
            self.session.rollback()
            return False

    # ---------------- CUSTOM QUERY ----------------
    def get_by_email(self, email: str) -> Optional[StaffModel]:
        return (
            self.session.query(StaffModel)
            .filter_by(email=email)
            .first()
        )

    def get_by_nguoi_dung(self, id_nd: int) -> Optional[StaffModel]:
        return (
            self.session.query(StaffModel)
            .filter_by(id_nd=id_nd)
            .first()
        )

    def get_by_sdt(self, sdt: str) -> Optional[StaffModel]:
        return (
            self.session.query(StaffModel)
            .filter_by(so_dien_thoai=sdt)
            .first()
        )

    def list_by_nha_hang(self, id_nh: int) -> List[StaffModel]:
        return (
            self.session.query(StaffModel)
            .filter_by(id_nh=id_nh)
            .all()
        )
