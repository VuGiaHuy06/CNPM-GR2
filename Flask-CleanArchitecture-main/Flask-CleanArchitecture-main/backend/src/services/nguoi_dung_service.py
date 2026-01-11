from domain.models.nguoi_dung import NguoiDung
from domain.models.inguoi_dung_repository import INguoiDungRepository

class NguoiDungService:
    def __init__(self, repo: INguoiDungRepository):
        self.repo = repo

    def create(self, id_nh, ten, email, mat_khau, ma_xac_thuc, trang_thai, vai_tro):
        return self.repo.add(NguoiDung(None, id_nh, ten, email, mat_khau, ma_xac_thuc, trang_thai, vai_tro))

    def get(self, id_nd):
        return self.repo.get_by_id(id_nd)

    def list(self):
        return self.repo.list()

    def update(self, id_nd, id_nh, ten, email, mat_khau, ma_xac_thuc, trang_thai, vai_tro):
        return self.repo.update(NguoiDung(id_nd, id_nh, ten, email, mat_khau, ma_xac_thuc, trang_thai, vai_tro))

    def delete(self, id_nd):
        self.repo.delete(id_nd)