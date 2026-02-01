from typing import List, Optional
from sqlalchemy.orm import Session

from domain.models.ban_an import BanAn
from domain.models.iban_an_repository import IBanAnRepository
from infrastructure.models.ban_an_model import TableModel
from infrastructure.databases.mssql import session as db_session


class BanAnRepository(IBanAnRepository):

    def __init__(self, session: Session = db_session):
        self.session = session

    # ---------------- CREATE ----------------
    def add(self, ban_an: BanAn) -> TableModel:
        try:
            db_ban = TableModel(
                ten_ban=ban_an.ten_ban,
                trang_thai=ban_an.trang_thai,
                id_nh=ban_an.id_nh
            )
            self.session.add(db_ban)
            self.session.commit()
            self.session.refresh(db_ban)
            return db_ban
        except Exception as e:
            self.session.rollback()
            raise e

    # ---------------- GET BY ID ----------------
    def get_by_id(self, id_ban_an: int) -> Optional[TableModel]:
        return (
            self.session.query(TableModel)
            .filter_by(id_ban_an=id_ban_an)
            .first()
        )

    # ---------------- LIST ----------------
    def list(self) -> List[TableModel]:
        return self.session.query(TableModel).all()

    # ---------------- LIST BY NHA HANG ----------------
    def list_by_nha_hang(self, id_nh: int) -> List[TableModel]:
        return (
            self.session.query(TableModel)
            .filter_by(id_nh=id_nh)
            .all()
        )

    # ---------------- UPDATE ----------------
    def update(self, ban_an: BanAn) -> Optional[TableModel]:
        try:
            db_ban = self.get_by_id(ban_an.id_ban_an)
            if not db_ban:
                return None

            db_ban.ten_ban = ban_an.ten_ban
            db_ban.trang_thai = ban_an.trang_thai
            db_ban.id_nh = ban_an.id_nh

            self.session.commit()
            return db_ban
        except Exception as e:
            self.session.rollback()
            raise e

    # ---------------- DELETE ----------------
    def delete(self, id_ban_an: int) -> bool:
        try:
            db_ban = self.get_by_id(id_ban_an)
            if not db_ban:
                return False

            self.session.delete(db_ban)
            self.session.commit()
            return True
        except Exception as e:
            self.session.rollback()
            return False
