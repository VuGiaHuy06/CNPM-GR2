from typing import List, Optional
from domain.models.ban_an import BanAn
from domain.models.iban_an_repository import IBanAnRepository

class BanAnService:
    def __init__(self, repository: IBanAnRepository):
        self.repository = repository

    def create(self, tenban, trangthai, id_nh) -> BanAn:
        ban = BanAn(None, tenban, trangthai, id_nh)
        return self.repository.add(ban)

    def get(self, id_banan: int) -> Optional[BanAn]:
        return self.repository.get_by_id(id_banan)

    def list(self) -> List[BanAn]:
        return self.repository.list()

    def update(self, id_banan, tenban, trangthai, id_nh) -> BanAn:
        ban = BanAn(id_banan, tenban, trangthai, id_nh)
        return self.repository.update(ban)

    def delete(self, id_banan: int):
        self.repository.delete(id_banan)