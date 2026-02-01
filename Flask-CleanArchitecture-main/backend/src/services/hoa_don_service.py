from domain.models.hoa_don import HoaDon
from domain.models.ihoa_don_repository import IHoaDonRepository

class HoaDonService:
    def __init__(self, repo: IHoaDonRepository):
        self.repo = repo

    def create(self, id_dh, id_voucher, id_banan, ngayinhoadon, tongtien):
        return self.repo.add(HoaDon(None, id_dh, id_voucher, id_banan, ngayinhoadon, tongtien))

    def get(self, id_hd):
        return self.repo.get_by_id(id_hd)

    def list(self):
        return self.repo.list()

    def update(self, id_hd, id_dh, id_voucher, id_ban_an, ngay_in_hoa_don, tong_tien):
        return self.repo.update(HoaDon(id_hd, id_dh, id_voucher, id_ban_an, ngay_in_hoa_don, tong_tien))

    def delete(self, id_hd):
        self.repo.delete(id_hd)