from abc import ABC, abstractmethod
from typing import List, Optional
from .voucher import Voucher

class IVoucherRepository(ABC):
    def add(self, v: Voucher) -> Voucher: pass
    def get_by_id(self, id: int) -> Optional[Voucher]: pass
    def list(self) -> List[Voucher]: pass
    def update(self, v: Voucher) -> Voucher: pass
    def delete(self, id: int) -> None: pass
