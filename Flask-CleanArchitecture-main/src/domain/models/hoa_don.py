class HoaDon:
    def __init__(self, ID_HD: int = None, ID_DH: int = None, ID_Voucher: int = None, 
                 ID_BanAn: int = None, NgayInHoaDon: str = "", TongTien: float = 0.0):
        self.ID_HD = ID_HD
        self.ID_DH = ID_DH
        self.ID_Voucher = ID_Voucher
        self.ID_BanAn = ID_BanAn
        self.NgayInHoaDon = NgayInHoaDon
        self.TongTien = TongTien