from abc import ABC, abstractmethod
from typing import Optional
from .voucher import Voucher

class IVoucherRepository(ABC):

    @abstractmethod
    def add(self, voucher: Voucher) -> Voucher:
        pass

    @abstractmethod
    def get_by_id(self, id_voucher: int) -> Optional[Voucher]:
        pass

    @abstractmethod
    def get_by_code(self, code: str) -> Optional[Voucher]:
        pass

    @abstractmethod
    def update(self, voucher: Voucher) -> Voucher:
        pass

    @abstractmethod
    def delete(self, id_voucher: int) -> None:
        pass
