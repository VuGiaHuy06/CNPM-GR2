from domain.models.nha_hang import NhaHang
from domain.models.inha_hang_repository import INhaHangRepository

class NhaHangService:
   
    def __init__(self, repo: INhaHangRepository):
        self.repo = repo

    def create(self, ten_nh, dia_chi, email, so_dien_thoai):
      
        nha_hang = NhaHang(
            ten_nh=ten_nh, 
            dia_chi=dia_chi, 
            email=email, 
            so_dien_thoai=so_dien_thoai
        )
        return self.repo.add(nha_hang)

    def update(self, id_nh, ten_nh, dia_chi, email, so_dien_thoai):
        # Tương tự, dùng keyword arguments cho an toàn
        nha_hang = NhaHang(
            id_nh=id_nh,
            ten_nh=ten_nh,
            dia_chi=dia_chi,
            email=email,
            so_dien_thoai=so_dien_thoai
        )
        return self.repo.update(nha_hang)

    def get(self, id_nh):
        return self.repo.get_by_id(id_nh)

    def list(self):
        return self.repo.list()

    # def update(self, id_nh, ten_nh, dia_chi, email, so_dien_thoai):
    #     return self.repo.update(NhaHang(id_nh, ten_nh, dia_chi, email, so_dien_thoai))

    def delete(self, id_nh):
       return self.repo.delete(id_nh)