from typing import Optional, List
from sqlalchemy.orm import Session

from domain.models.hoa_don import HoaDon
from domain.models.ihoa_don_repository import IHoaDonRepository
from infrastructure.models.hoa_don import InvoiceModel
from infrastructure.databases.mssql import session as db_session


class HoaDonRepository(IHoaDonRepository):

    def __init__(self, session: Session = db_session):
        self.session = session

    # ---------------- CREATE ----------------
    def add(self, hoa_don: HoaDon) -> InvoiceModel:
        try:
            db_hd = InvoiceModel(
                id_dh=hoa_don.id_dh,
                id_voucher=hoa_don.id_voucher,
                id_ban_an=hoa_don.id_ban_an,
                ngay_in_hoa_don=hoa_don.ngay_in_hoa_don,
                tong_tien=hoa_don.tong_tien
            )
            self.session.add(db_hd)
            self.session.commit()
            self.session.refresh(db_hd)
            return db_hd
        except Exception as e:
            self.session.rollback()
            raise e

    # ---------------- GET BY ID ----------------
    def get_by_id(self, id_hd: int) -> Optional[InvoiceModel]:
        return (
            self.session.query(InvoiceModel)
            .filter_by(id_hd=id_hd)
            .first()
        )

    # ---------------- GET BY ĐƠN HÀNG ----------------
    def get_by_don_hang(self, id_dh: int) -> List[InvoiceModel]:
        return (
            self.session.query(InvoiceModel)
            .filter_by(id_dh=id_dh)
            .all()
        )

    # ---------------- LIST ----------------
    def list(self) -> List[InvoiceModel]:
        return self.session.query(InvoiceModel).all()

    # ---------------- UPDATE ----------------
    def update(self, hoa_don: HoaDon) -> Optional[InvoiceModel]:
        try:
            db_hd = self.get_by_id(hoa_don.id_hd)
            if not db_hd:
                return None

            db_hd.id_dh = hoa_don.id_dh
            db_hd.id_voucher = hoa_don.id_voucher
            db_hd.id_ban_an = hoa_don.id_ban_an
            db_hd.ngay_in_hoa_don = hoa_don.ngay_in_hoa_don
            db_hd.tong_tien = hoa_don.tong_tien

            self.session.commit()
            return db_hd
        except Exception as e:
            self.session.rollback()
            raise e

    # ---------------- DELETE ----------------
    def delete(self, id_hd: int) -> bool:
        try:
            db_hd = self.get_by_id(id_hd)
            if not db_hd:
                return False

            self.session.delete(db_hd)
            self.session.commit()
            return True
        except Exception:
            self.session.rollback()
            return False
