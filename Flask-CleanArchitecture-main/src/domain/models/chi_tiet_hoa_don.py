class ChiTietHoaDon:
    def __init__(self, ID_CTHD: int = None, ID_HD: int = None, ID_MonAn: int = None, SoLuong: int = 0, VAT: float = 0.0):
        self.ID_CTHD = ID_CTHD
        self.ID_HD = ID_HD
        self.ID_MonAn = ID_MonAn
        self.SoLuong = SoLuong
        self.VAT = VAT