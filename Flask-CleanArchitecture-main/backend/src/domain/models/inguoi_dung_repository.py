from abc import ABC, abstractmethod
from typing import Optional, List
from .nguoi_dung import NguoiDung

class INguoiDungRepository(ABC):

    @abstractmethod
    def list(self) -> List[NguoiDung]:
        """Lấy toàn bộ danh sách người dùng"""
        pass

    @abstractmethod
    def add(self, nguoi_dung: NguoiDung) -> NguoiDung:
        """Thêm người dùng mới"""
        pass

    @abstractmethod
    def get_by_id(self, id_nd: int) -> Optional[NguoiDung]:
        """Tìm người dùng theo ID (Khớp với ID_ND trong ERD)"""
        pass

    @abstractmethod
    def get_by_email(self, email: str) -> Optional[NguoiDung]:
        """Tìm người dùng theo Email (Dùng cho đăng nhập)"""
        pass

    @abstractmethod
    def update(self, id_nd: int, nguoi_dung: NguoiDung) -> Optional[NguoiDung]:
        """
        Cập nhật thông tin người dùng. 
        Nên nhận ID riêng biệt để tránh lỗi 'not mapped' như bên Món Ăn.
        """
        pass

    @abstractmethod
    def delete(self, id_nd: int) -> bool:
        """Xóa người dùng và trả về trạng thái thành công"""
        pass