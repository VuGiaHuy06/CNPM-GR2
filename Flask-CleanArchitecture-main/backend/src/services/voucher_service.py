from domain.models.voucher import Voucher
from domain.models.ivoucher_repository import IVoucherRepository


class VoucherService:
    def __init__(self, repo: IVoucherRepository):
        self.repo = repo

    def create(self, mo_ta, phan_tram, so_ma, so_luong):
        """
        Tạo voucher mới
        so_luong_da_dung mặc định = 0
        """
        voucher = Voucher(
            id_voucher=None,
            mo_ta=mo_ta,
            phan_tram=phan_tram,
            so_ma=so_ma,
            so_luong=so_luong,
            so_luong_da_dung=0
        )
        return self.repo.add(voucher)

    def get(self, id_voucher):
        return self.repo.get_by_id(id_voucher)

    def list(self):
        return self.repo.list()

    def update(self, id_voucher, mo_ta, phan_tram, so_ma, so_luong):
        """
        Update KHÔNG cho sửa so_luong_da_dung
        """
        old_voucher = self.repo.get_by_id(id_voucher)
        if not old_voucher:
            return None

        voucher = Voucher(
            id_voucher=id_voucher,
            mo_ta=mo_ta,
            phan_tram=phan_tram,
            so_ma=so_ma,
            so_luong=so_luong,
            so_luong_da_dung=old_voucher.so_luong_da_dung
        )
        return self.repo.update(voucher)

    def delete(self, id_voucher):
        return self.repo.delete(id_voucher)
