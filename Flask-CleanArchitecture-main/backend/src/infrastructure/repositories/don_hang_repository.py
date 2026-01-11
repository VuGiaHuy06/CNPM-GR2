from domain.models.don_hang import DonHang
from domain.models.idon_hang_repository import IDonHangRepository
from typing import List, Optional

class DonHangRepository(IDonHangRepository):
    def __init__(self):
        self._items = []
        self._id_counter = 1

    def add(self, obj: DonHang) -> DonHang:
        obj.id = self._id_counter
        self._id_counter += 1
        self._items.append(obj)
        return obj

    def get_by_id(self, id: int) -> Optional[DonHang]:
        for x in self._items:
            if x.id == id:
                return x
        return None

    def list(self):
        return self._items

    def update(self, obj: DonHang):
        for i, x in enumerate(self._items):
            if x.id == obj.id:
                self._items[i] = obj
                return obj
        raise ValueError("don_hang not found")

    def delete(self, id: int):
        self._items = [x for x in self._items if x.id != id]
