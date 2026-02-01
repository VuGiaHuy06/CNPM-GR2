from infrastructure.models.voucher_model import VoucherModel
from domain.models.voucher import Voucher
from domain.models.ivoucher_repository import IVoucherRepository
from infrastructure.databases.mssql import session as db_session
from typing import Optional, List

class VoucherRepository(IVoucherRepository):
    def __init__(self, session=db_session):
        self.session = session

    def add(self, voucher: Voucher) -> VoucherModel:
        try:
            db_voucher = VoucherModel(
                mo_ta=voucher.mo_ta,
                phan_tram=voucher.phan_tram,
                so_ma=voucher.so_ma,
                so_luong=voucher.so_luong
                # ❌ KHÔNG map so_luong_da_dung vì DB không có cột
            )
            self.session.add(db_voucher)
            self.session.commit()
            self.session.refresh(db_voucher)
            return db_voucher
        except Exception as e:
            self.session.rollback()
            raise e

    def get_by_id(self, id_voucher: int) -> Optional[VoucherModel]:
        return self.session.query(VoucherModel)\
            .filter_by(id_voucher=id_voucher)\
            .first()

    def get_by_code(self, so_ma: str) -> Optional[VoucherModel]:
        return self.session.query(VoucherModel)\
            .filter_by(so_ma=so_ma)\
            .first()

    def list(self) -> List[VoucherModel]:
        return self.session.query(VoucherModel).all()

    def update(self, voucher: Voucher) -> Optional[VoucherModel]:
        try:
            db_voucher = self.get_by_id(voucher.id_voucher)
            if not db_voucher:
                return None

            db_voucher.mo_ta = voucher.mo_ta
            db_voucher.phan_tram = voucher.phan_tram
            db_voucher.so_ma = voucher.so_ma
            db_voucher.so_luong = voucher.so_luong
            # ❌ KHÔNG đụng tới so_luong_da_dung

            self.session.commit()
            return db_voucher
        except Exception as e:
            self.session.rollback()
            raise e

    def delete(self, id_voucher: int) -> bool:
        try:
            db_voucher = self.get_by_id(id_voucher)
            if not db_voucher:
                return False
            self.session.delete(db_voucher)
            self.session.commit()
            return True
        except Exception:
            self.session.rollback()
            return False
