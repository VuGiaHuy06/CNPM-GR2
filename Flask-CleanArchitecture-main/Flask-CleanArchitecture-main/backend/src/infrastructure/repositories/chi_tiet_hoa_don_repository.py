from domain.models.chi_tiet_hoa_don import ChiTietHoaDon
from domain.models.ichi_tiet_hoa_don_repository import IChiTietHoaDonRepository
from typing import List, Optional

class ChiTietHoaDonRepository(IChiTietHoaDonRepository):
    def __init__(self):
        self._items = []
        self._id_counter = 1

    def add(self, obj: ChiTietHoaDon) -> ChiTietHoaDon:
        obj.id = self._id_counter
        self._id_counter += 1
        self._items.append(obj)
        return obj

    def get_by_id(self, id: int) -> Optional[ChiTietHoaDon]:
        for x in self._items:
            if x.id == id:
                return x
        return None

    def list(self):
        return self._items

    def update(self, obj: ChiTietHoaDon):
        for i, x in enumerate(self._items):
            if x.id == obj.id:
                self._items[i] = obj
                return obj
        raise ValueError("chi_tiet_hoa_don not found")

    def delete(self, id: int):
        self._items = [x for x in self._items if x.id != id]
