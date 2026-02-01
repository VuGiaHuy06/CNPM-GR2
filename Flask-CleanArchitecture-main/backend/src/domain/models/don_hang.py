class DonHang:
    def __init__(
        self,
        id_dh: int = None,
        trang_thai: str = None,
        tien_mon_an: float = 0.0,
        so_luong_mon_an: int = 0,
        id_ban: int = None,
        id_kh: int = None
    ):
        self.id_dh = id_dh
        self.trang_thai = trang_thai
        self.tien_mon_an = tien_mon_an
        self.so_luong_mon_an = so_luong_mon_an
        self.id_ban = id_ban
        self.id_kh = id_kh
