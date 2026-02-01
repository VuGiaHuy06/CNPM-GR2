from abc import ABC, abstractmethod
from typing import List, Optional
from .chi_tiet_hoa_don import ChiTietHoaDon

class IChiTietHoaDonRepository(ABC):

    @abstractmethod
    def add(self, chi_tiet_hoa_don: ChiTietHoaDon) -> ChiTietHoaDon:
        pass

    @abstractmethod
    def get_by_id(self, id_cthd: int) -> Optional[ChiTietHoaDon]:
        pass

    @abstractmethod
    def list_by_hoa_don(self, id_hd: int) -> List[ChiTietHoaDon]:
        pass

    @abstractmethod
    def update(self, chi_tiet_hoa_don: ChiTietHoaDon) -> ChiTietHoaDon:
        pass

    @abstractmethod
    def delete(self, id_cthd: int) -> None:
        pass
