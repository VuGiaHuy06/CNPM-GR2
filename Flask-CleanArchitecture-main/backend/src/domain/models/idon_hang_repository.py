from abc import ABC, abstractmethod
from typing import List, Optional
from .don_hang import DonHang

class IDonHangRepository(ABC):

    @abstractmethod
    def add(self, don_hang: DonHang) -> DonHang:
        pass

    @abstractmethod
    def get_by_id(self, id_dh: int) -> Optional[DonHang]:
        pass

    @abstractmethod
    def list_by_khach_hang(self, id_kh: int) -> List[DonHang]:
        pass

    @abstractmethod
    def list_by_nha_hang(self, id_nh: int) -> List[DonHang]:
        pass

    @abstractmethod
    def update(self, don_hang: DonHang) -> DonHang:
        pass

    @abstractmethod
    def delete(self, in_dh: int) -> None:
        pass
