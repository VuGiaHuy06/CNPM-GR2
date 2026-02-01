from infrastructure.models.don_hang_model import DonHangModel
from domain.models.idon_hang_repository import IDonHangRepository
from infrastructure.databases.mssql import session as db_session
from typing import List, Optional


class DonHangRepository(IDonHangRepository):
    def __init__(self, session=db_session):
        self.session = session

    def add(self, don_hang_domain) -> DonHangModel:
        try:
            db_don_hang = DonHangModel(
                tien_mon_an=don_hang_domain.tien_mon_an,
                so_luong_mon_an=don_hang_domain.so_luong_mon_an,
                id_kh=don_hang_domain.id_kh
            )
            self.session.add(db_don_hang)
            self.session.commit()
            self.session.refresh(db_don_hang)
            return db_don_hang
        except Exception as e:
            self.session.rollback()
            raise e

    def get_by_id(self, id_dh: int) -> Optional[DonHangModel]:
        return self.session.query(DonHangModel).filter_by(id_dh=id_dh).first()

    def list(self) -> List[DonHangModel]:
        return self.session.query(DonHangModel).all()

    def list_by_khach_hang(self, id_kh: int) -> List[DonHangModel]:
        return self.session.query(DonHangModel).filter_by(id_kh=id_kh).all()

    def list_by_nha_hang(self, id_nh: int) -> List[DonHangModel]:
        return self.session.query(DonHangModel).filter_by(id_nh=id_nh).all()

    def update(self, don_hang_domain) -> Optional[DonHangModel]:
        try:
            db_don_hang = self.get_by_id(don_hang_domain.id_dh)
            if not db_don_hang:
                return None

            db_don_hang.tien_mon_an = don_hang_domain.tien_mon_an
            db_don_hang.so_luong_mon_an = don_hang_domain.so_luong_mon_an
            db_don_hang.id_kh = don_hang_domain.id_kh

            self.session.commit()
            return db_don_hang
        except Exception as e:
            self.session.rollback()
            raise e

    def delete(self, id_dh: int) -> bool:
        try:
            don_hang = self.get_by_id(id_dh)
            if not don_hang:
                return False

            self.session.delete(don_hang)
            self.session.commit()
            return True
        except Exception:
            self.session.rollback()
            return False
