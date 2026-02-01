from abc import ABC, abstractmethod
from typing import List, Optional
from .nhan_vien import NhanVien

class INhanVienRepository(ABC):

    @abstractmethod
    def add(self, nhan_vien: NhanVien) -> NhanVien:
        pass

    @abstractmethod
    def get_by_id(self, id_nv: int) -> Optional[NhanVien]:
        pass

    @abstractmethod
    def get_by_email(self, email: str) -> Optional[NhanVien]:
        pass

    @abstractmethod
    def get_by_sdt(self, so_dien_thoai: str) -> Optional[NhanVien]:
        pass

    @abstractmethod
    def get_by_nguoi_dung(self, id_nd: int) -> Optional[NhanVien]:
        pass

    @abstractmethod
    def list_by_nha_hang(self, id_nh: int) -> List[NhanVien]:
        pass

    @abstractmethod
    def update(self, nhan_vien: NhanVien) -> NhanVien:
        pass

    @abstractmethod
    def delete(self, id_nv: int) -> None:
        pass
