from abc import ABC, abstractmethod
from typing import Optional
from .nguoi_dung import NguoiDung

class INguoiDungRepository(ABC):

    @abstractmethod
    def add(self, nguoi_dung: NguoiDung) -> NguoiDung:
        pass

    @abstractmethod
    def get_by_id(self, id_nd: int) -> Optional[NguoiDung]:
        pass

    @abstractmethod
    def get_by_email(self, email: str) -> Optional[NguoiDung]:
        pass

    @abstractmethod
    def update(self, nguoi_dung: NguoiDung) -> NguoiDung:
        pass

    @abstractmethod
    def delete(self, id_nd: int) -> None:
        pass
