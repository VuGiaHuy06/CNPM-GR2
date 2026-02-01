class NguoiDung:
    def __init__(self, id_nd: int = None, id_nh: int = None, ten: str = "", 
                 email: str = "", mat_khau: str = "", ma_xac_thuc: str = "", 
                 trang_thai: str = "", vai_tro: str = ""):
        # Sửa in_nd thành id_nd để khớp với ERD (image_36fd76.png)
        self.id_nd = id_nd 
        self.id_nh = id_nh
        self.ten = ten
        self.email = email
        self.mat_khau = mat_khau
        self.ma_xac_thuc = ma_xac_thuc
        self.trang_thai = trang_thai
        self.vai_tro = vai_tro