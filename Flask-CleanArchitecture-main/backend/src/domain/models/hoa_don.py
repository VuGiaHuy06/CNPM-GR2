class HoaDon:
    def __init__(self, id_hd: int = None, id_dh: int = None, id_voucher: int = None, 
                 id_ban_an: int = None, ngay_in_hoa_don: str = "", tong_tien: float = 0.0):
        self.id_hd = id_hd
        self.id_dh = id_dh
        self.id_voucher = id_voucher
        self.id_ban_an = id_ban_an
        self.ngay_in_hoa_don = ngay_in_hoa_don
        self.tong_tien = tong_tien