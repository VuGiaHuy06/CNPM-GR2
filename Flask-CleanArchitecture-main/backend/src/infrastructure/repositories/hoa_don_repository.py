from domain.models.hoa_don import HoaDon
from domain.models.ihoa_don_repository import IHoaDonRepository
from typing import Optional

class HoaDonRepository(IHoaDonRepository):
    def __init__(self):
        self._items = []
        self._id_counter = 1

    def add(self, obj: HoaDon):
        obj.id = self._id_counter
        self._id_counter += 1
        self._items.append(obj)
        return obj

    def get_by_id(self, id: int) -> Optional[HoaDon]:
        for x in self._items:
            if x.id == id:
                return x
        return None

    def list(self):
        return self._items

    def update(self, obj: HoaDon):
        for i, x in enumerate(self._items):
            if x.id == obj.id:
                self._items[i] = obj
                return obj
        raise ValueError("hoa_don not found")

    def delete(self, id: int):
        self._items = [x for x in self._items if x.id != id]
