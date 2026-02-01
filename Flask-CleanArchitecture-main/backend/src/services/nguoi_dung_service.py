from domain.models.nguoi_dung import NguoiDung
from domain.models.inguoi_dung_repository import INguoiDungRepository

class NguoiDungService:
    def __init__(self, repo: INguoiDungRepository):
        self.repo = repo

    def create(self, id_nh, ten, email, mat_khau, ma_xac_thuc, trang_thai, vai_tro):
        # Khởi tạo đối tượng Domain và thêm vào DB
        new_user = NguoiDung(None, id_nh, ten, email, mat_khau, ma_xac_thuc, trang_thai, vai_tro)
        return self.repo.add(new_user)

    def get(self, id_nd):
        # Lấy người dùng theo ID_ND từ ERD
        return self.repo.get_by_id(id_nd)

    def list(self):
        return self.repo.list()

    def update(self, id_nd, id_nh, ten, email, mat_khau, ma_xac_thuc, trang_thai, vai_tro):
        # Tạo đối tượng domain chứa thông tin mới
        user_domain = NguoiDung(id_nd, id_nh, ten, email, mat_khau, ma_xac_thuc, trang_thai, vai_tro)
        # SỬA: Truyền id_nd riêng để Repository xử lý session.merge hoặc update
        return self.repo.update(id_nd, user_domain)

    def delete(self, id_nd):
        # Trả về kết quả từ repo để Controller biết xóa thành công hay không
        return self.repo.delete(id_nd)