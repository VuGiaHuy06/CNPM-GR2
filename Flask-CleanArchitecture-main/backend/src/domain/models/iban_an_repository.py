from abc import ABC, abstractmethod
from typing import List, Optional
from domain.models.ban_an import BanAn

class IBanAnRepository(ABC):

    @abstractmethod
    def add(self, ban_an: BanAn) -> BanAn:
        pass

    @abstractmethod
    def get_by_id(self, id_ban_an: int) -> Optional[BanAn]:
        pass

    @abstractmethod
    def list_by_nha_hang(self, id_nh: int) -> List[BanAn]:
        pass

    @abstractmethod
    def update(self, ban_an: BanAn) -> BanAn:
        pass

    @abstractmethod
    def delete(self, id_ban_an: int) -> None:
        pass
