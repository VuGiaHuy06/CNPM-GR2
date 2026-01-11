from domain.models.nhan_vien import NhanVien
from domain.models.inhan_vien_repository import INhanVienRepository

class NhanVienRepository(INhanVienRepository):
    def __init__(self):
        self._items = []
        self._id_counter = 1

    def add(self, obj):
        obj.id = self._id_counter
        self._id_counter += 1
        self._items.append(obj)
        return obj

    def get_by_id(self, id):
        for x in self._items:
            if x.id == id:
                return x
        return None

    def list(self):
        return self._items

    def update(self, obj):
        for i, x in enumerate(self._items):
            if x.id == obj.id:
                self._items[i] = obj
                return obj
        raise ValueError("nhan_vien not found")

    def delete(self, id):
        self._items = [x for x in self._items if x.id != id]
