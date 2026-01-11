class Voucher:
    def __init__(self, id_voucher: int = None, mo_ta: str = "", phan_tram: float = 0.0, 
                 so_ma: int = 0, so_luong: int = 0):
        self.id_voucher = id_voucher
        self.mo_ta = mo_ta
        self.phan_tram = phan_tram
        self.so_ma = so_ma
        self.so_luong = so_luong