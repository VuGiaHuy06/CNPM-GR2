from abc import ABC, abstractmethod
from typing import List, Optional
from .don_hang import DonHang

class IDonHangRepository(ABC):
    def add(self, dh: DonHang) -> DonHang: pass
    def get_by_id(self, id: int) -> Optional[DonHang]: pass
    def list(self) -> List[DonHang]: pass
    def update(self, dh: DonHang) -> DonHang: pass
    def delete(self, id: int) -> None: pass
