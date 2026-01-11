from domain.models.chi_tiet_hoa_don import ChiTietHoaDon
from domain.models.ichi_tiet_hoa_don_repository import IChiTietHoaDonRepository

class ChiTietHoaDonService:
    def __init__(self, repo: IChiTietHoaDonRepository):
        self.repo = repo

    def create(self, id_hd, vat, so_luong, id_mon_an):
        return self.repo.add(ChiTietHoaDon(None, id_hd, vat, so_luong, id_mon_an))

    def get(self, id_cthd):
        return self.repo.get_by_id(id_cthd)

    def list(self):
        return self.repo.list()

    def update(self, id_cthd, id_hd, vat, so_luong, id_mon_an):
        return self.repo.update(ChiTietHoaDon(id_cthd, id_hd, vat, so_luong, id_mon_an))

    def delete(self, id_cthd):
        self.repo.delete(id_cthd)