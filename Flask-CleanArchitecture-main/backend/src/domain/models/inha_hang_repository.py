from abc import ABC, abstractmethod
from typing import Optional
from .nha_hang import NhaHang

class INhaHangRepository(ABC):

    @abstractmethod
    def add(self, nha_hang: NhaHang) -> NhaHang:
        pass

    @abstractmethod
    def get_by_id(self, id_nh: int) -> Optional[NhaHang]:
        pass

    @abstractmethod
    def get_by_email(self, email: str) -> Optional[NhaHang]:
        pass

    @abstractmethod
    def get_by_sdt(self, so_dien_thoai: str) -> Optional[NhaHang]:
        pass

    @abstractmethod
    def update(self, nha_hang: NhaHang) -> NhaHang:
        pass

    @abstractmethod
    def delete(self, id_nh: int) -> None:
        pass
