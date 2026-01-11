from domain.models.don_hang import DonHang
from domain.models.idon_hang_repository import IDonHangRepository

class DonHangService:
    def __init__(self, repo: IDonHangRepository):
        self.repo = repo

    def create(self, tienmonan, soluongmonan, id_kh):
        return self.repo.add(DonHang(None, tienmonan, soluongmonan, id_kh))

    def get(self, id_dh):
        return self.repo.get_by_id(id_dh)

    def list(self):
        return self.repo.list()

    def update(self, id_dh, tienmonan, soluongmonan, id_kh):
        return self.repo.update(DonHang(id_dh, tienmonan, soluongmonan, id_kh))

    def delete(self, id_dh):
        self.repo.delete(id_dh)