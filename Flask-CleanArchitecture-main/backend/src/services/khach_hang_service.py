from typing import List, Optional
from domain.models.khach_hang import KhachHang
from domain.models.ikhach_hang_repository import IKhachHangRepository

class KhachHangService:
    def __init__(self, repo: IKhachHangRepository):
        self.repo = repo

    def create(self, ten_kh, so_dien_thoai, email, id_nd):
        return self.repo.add(
            KhachHang(None, ten_kh, so_dien_thoai, email, id_nd)
        )

    def get(self, id_kh):
        return self.repo.get_by_id(id_kh)

    def list(self):
        return self.repo.list()

    def update(self, id_kh, ten_kh, so_dien_thoai, email, id_nd):
        return self.repo.update(
            KhachHang(id_kh, ten_kh, so_dien_thoai, email, id_nd)
        )

    def delete(self, id_kh):
        self.repo.delete(id_kh)
