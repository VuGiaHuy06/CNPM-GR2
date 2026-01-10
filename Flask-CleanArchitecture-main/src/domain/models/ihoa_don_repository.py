from abc import ABC, abstractmethod
from typing import List, Optional
from .hoa_don import HoaDon

class IHoaDonRepository(ABC):
    def add(self, hd: HoaDon) -> HoaDon: pass
    def get_by_id(self, id: int) -> Optional[HoaDon]: pass
    def list(self) -> List[HoaDon]: pass
    def update(self, hd: HoaDon) -> HoaDon: pass
    def delete(self, id: int) -> None: pass
