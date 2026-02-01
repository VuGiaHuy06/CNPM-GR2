class NhanVien:
    def __init__(self, id_nv: int = None, ten_nv: str = "", ngay_vao_lam: str = "", 
                 so_dien_thoai: str = "", chuc_vu: str = "", email: str = "", 
                 tinh_trang: str = "", id_nd: int = None, id_nh: int = None):
        self.id_nv = id_nv
        self.ten_nv = ten_nv
        self.ngay_vao_lam = ngay_vao_lam
        self.so_dien_thoai = so_dien_thoai
        self.chuc_vu = chuc_vu
        self.email = email
        self.tinh_trang = tinh_trang
        self.id_nd = id_nd
        self.id_nh = id_nh