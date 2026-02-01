class NhaHang:
    def __init__(self, ten_nh, dia_chi, email, so_dien_thoai, id_nh=None):
        self.id_nh = id_nh
        self.ten_nh = ten_nh
        self.dia_chi = dia_chi
        self.email = email
        self.so_dien_thoai = so_dien_thoai # Dùng tên này để thống nhất với Service