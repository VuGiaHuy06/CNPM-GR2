from infrastructure.databases.mysql import engine
from infrastructure.databases.base import Base

from infrastructure.models.nha_hang import NhaHang
from infrastructure.models.nguoi_dung import NguoiDung
from infrastructure.models.khach_hang import KhachHang
from infrastructure.models.nhan_vien import NhanVien
from infrastructure.models.ban_an import BanAn
from infrastructure.models.mon_an import MonAn
from infrastructure.models.voucher import Voucher
from infrastructure.models.don_hang import DonHang
from infrastructure.models.hoa_don import HoaDon
from infrastructure.models.chi_tiet_hoa_don import ChiTietHoaDon

Base.metadata.create_all(bind=engine)
