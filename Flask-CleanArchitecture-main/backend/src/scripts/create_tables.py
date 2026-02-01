from infrastructure.databases.mysql import engine
from infrastructure.databases.base import Base

from backend.src.infrastructure.models.nha_hang_model import NhaHang
from backend.src.infrastructure.models.nguoi_dung_model import NguoiDung
from infrastructure.models.khach_hang import KhachHang
from infrastructure.models.nhan_vien import NhanVien
from backend.src.infrastructure.models.ban_an_model import BanAn
from backend.src.infrastructure.models.mon_an_model import MonAn
from backend.src.infrastructure.models.voucher_model import Voucher
from backend.src.infrastructure.models.don_hang_model import DonHang
from infrastructure.models.hoa_don import HoaDon
from infrastructure.models.chi_tiet_hoa_don import ChiTietHoaDon

Base.metadata.create_all(bind=engine)
