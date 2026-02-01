from abc import ABC, abstractmethod
from typing import List, Optional
from .mon_an import MonAn

class IMonAnRepository(ABC):

    @abstractmethod
    def add(self, mon_an: MonAn) -> MonAn:
        pass

    @abstractmethod
    def get_by_id(self, id_mon_an: int) -> Optional[MonAn]:
        pass

    @abstractmethod
    def list_by_nha_hang(self, id_nh: int) -> List[MonAn]:
        pass

    @abstractmethod
    def update(self, mon_an: MonAn) -> MonAn:
        pass

    @abstractmethod
    def delete(self, id_mon_an: int) -> None:
        pass
