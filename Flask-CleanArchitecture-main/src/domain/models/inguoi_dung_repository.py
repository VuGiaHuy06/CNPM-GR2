from abc import ABC, abstractmethod
from typing import List, Optional
from .nguoi_dung import NguoiDung

class INguoiDungRepository(ABC):
    def add(self, nd: NguoiDung) -> NguoiDung: pass
    def get_by_id(self, id: int) -> Optional[NguoiDung]: pass
    def list(self) -> List[NguoiDung]: pass
    def update(self, nd: NguoiDung) -> NguoiDung: pass
    def delete(self, id: int) -> None: pass
