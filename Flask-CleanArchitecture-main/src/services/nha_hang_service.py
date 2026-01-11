from domain.models.nha_hang import NhaHang
from domain.models.inha_hang_repository import INhaHangRepository

class NhaHangService:
    def __init__(self, repo: INhaHangRepository):
        self.repo = repo

    def create(self, ten_nh, dia_chi, email, sdt):
        return self.repo.add(NhaHang(None, ten_nh, dia_chi, email, sdt))

    def get(self, id_nh):
        return self.repo.get_by_id(id_nh)

    def list(self):
        return self.repo.list()

    def update(self, id_nh, ten_nh, dia_chi, email, sdt):
        return self.repo.update(NhaHang(id_nh, ten_nh, dia_chi, email, sdt))

    def delete(self, id_nh):
        self.repo.delete(id_nh)