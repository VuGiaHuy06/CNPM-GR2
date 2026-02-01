from abc import ABC, abstractmethod
from typing import List, Optional
from .hoa_don import HoaDon

class IHoaDonRepository(ABC):

    @abstractmethod
    def add(self, hoa_don: HoaDon) -> HoaDon:
        pass

    @abstractmethod
    def get_by_id(self, id_hd: int) -> Optional[HoaDon]:
        pass

    @abstractmethod
    def get_by_don_hang(self, id_dh: int) -> Optional[HoaDon]:
        pass

    @abstractmethod
    def update(self, hoa_don: HoaDon) -> HoaDon:
        pass

    @abstractmethod
    def delete(self, id_hd: int) -> None:
        pass
