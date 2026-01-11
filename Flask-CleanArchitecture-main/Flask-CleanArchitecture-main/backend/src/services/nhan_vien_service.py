from typing import List, Optional
from domain.models.nhan_vien import NhanVien
from domain.models.inhan_vien_repository import INhanVienRepository

class NhanVienService:
    def __init__(self, repo: INhanVienRepository):
        self.repo = repo

    def create(self, ten_nv, ngay_vao_lam, so_dien_thoai, chuc_vu, email, tinh_trang, id_nd, id_nh):
        return self.repo.add(NhanVien(None, ten_nv, ngay_vao_lam, so_dien_thoai, chuc_vu, email, tinh_trang, id_nd, id_nh))

    def get(self, id_nv):
        return self.repo.get_by_id(id_nv)

    def list(self):
        return self.repo.list()

    def update(self, id_nv, ten_nv, ngay_vao_lam, so_dien_thoai, chuc_vu, email, tinh_trang, id_nd, id_nh):
        return self.repo.update(NhanVien(id_nv, ten_nv, ngay_vao_lam, so_dien_thoai, chuc_vu, email, tinh_trang, id_nd, id_nh))

    def delete(self, id_nv):
        self.repo.delete(id_nv)
