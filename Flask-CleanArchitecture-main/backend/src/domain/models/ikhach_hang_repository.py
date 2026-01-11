from abc import ABC, abstractmethod
from typing import Optional
from .khach_hang import KhachHang

class IKhachHangRepository(ABC):

    @abstractmethod
    def add(self, khach_hang: KhachHang) -> KhachHang:
        pass

    @abstractmethod
    def get_by_id(self, id_nh: int) -> Optional[KhachHang]:
        pass

    @abstractmethod
    def get_by_so_dien_thoai(self, so_dien_thoai: str) -> Optional[KhachHang]:
        pass

    @abstractmethod
    def get_by_email(self, email: str) -> Optional[KhachHang]:
        pass

    @abstractmethod
    def get_by_nguoi_dung_id(self, id_nd: int) -> Optional[KhachHang]:
        pass

    @abstractmethod
    def update(self, khach_hang: KhachHang) -> KhachHang:
        pass

    @abstractmethod
    def delete(self, id_kh: int) -> None:
        pass
