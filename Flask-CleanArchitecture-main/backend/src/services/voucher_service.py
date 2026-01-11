from domain.models.voucher import Voucher
from domain.models.ivoucher_repository import IVoucherRepository

class VoucherService:
    def __init__(self, repo: IVoucherRepository):
        self.repo = repo

    def create(self, mo_ta, phan_tram, so_ma, so_luong):
        return self.repo.add(Voucher(None, mo_ta, phan_tram, so_ma, so_luong))

    def get(self, id_voucher):
        return self.repo.get_by_id(id_voucher)

    def list(self):
        return self.repo.list()

    def update(self, id_voucher, mo_ta, phan_tram, so_ma, so_luong):
        return self.repo.update(Voucher(id_voucher, mo_ta, phan_tram, so_ma, so_luong))

    def delete(self, id_voucher):
        self.repo.delete(id_voucher)
