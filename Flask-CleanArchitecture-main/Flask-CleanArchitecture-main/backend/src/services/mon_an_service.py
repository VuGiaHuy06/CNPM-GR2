from domain.models.mon_an import MonAn
from domain.models.imon_an_repository import IMonAnRepository

class MonAnService:
    def __init__(self, repo: IMonAnRepository):
        self.repo = repo

    def create(self, ten_mon, gia, mo_ta, hinh_anh, id_nh):
        return self.repo.add(MonAn(None, ten_mon, gia, mo_ta, hinh_anh, id_nh))

    def get(self, id_monan):
        return self.repo.get_by_id(id_monan)

    def list(self):
        return self.repo.list()

    def update(self, id_monan, ten_mon, gia, mo_ta, hinh_anh, id_nh):
        return self.repo.update(MonAn(id_monan, ten_mon, gia, mo_ta, hinh_anh, id_nh))

    def delete(self, id_monan):
        self.repo.delete(id_monan)