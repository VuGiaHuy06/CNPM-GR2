from abc import ABC, abstractmethod
from typing import List, Optional
from .nhan_vien import NhanVien

class INhanVienRepository(ABC):
    @abstractmethod
    def add(self, nv: NhanVien) -> NhanVien: pass
    @abstractmethod
    def get_by_id(self, id: int) -> Optional[NhanVien]: pass
    @abstractmethod
    def list(self) -> List[NhanVien]: pass
    @abstractmethod
    def update(self, nv: NhanVien) -> NhanVien: pass
    @abstractmethod
    def delete(self, id: int) -> None: pass
