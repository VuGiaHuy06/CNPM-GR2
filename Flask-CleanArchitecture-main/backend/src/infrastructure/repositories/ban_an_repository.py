from domain.models.ban_an import BanAn
from domain.models.iban_an_repository import IBanAnRepository
from typing import List, Optional

class BanAnRepository(IBanAnRepository):
    def __init__(self):
        self._items = []
        self._id_counter = 1

    def add(self, obj: BanAn) -> BanAn:
        obj.id = self._id_counter
        self._id_counter += 1
        self._items.append(obj)
        return obj

    def get_by_id(self, id: int) -> Optional[BanAn]:
        for x in self._items:
            if x.id == id:
                return x
        return None

    def list(self) -> List[BanAn]:
        return self._items

    def update(self, obj: BanAn) -> BanAn:
        for i, x in enumerate(self._items):
            if x.id == obj.id:
                self._items[i] = obj
                return obj
        raise ValueError("ban_an not found")

    def delete(self, id: int) -> None:
        self._items = [x for x in self._items if x.id != id]
