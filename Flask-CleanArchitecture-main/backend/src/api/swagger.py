from apispec import APISpec
from apispec.ext.marshmallow import MarshmallowPlugin
from apispec_webframeworks.flask import FlaskPlugin
from api.schemas.todo import TodoRequestSchema, TodoResponseSchema
from api.schemas.nhan_vien import (
    NhanVienRequestSchema,
    NhanVienResponseSchema
)
from api.schemas.ban_an import (
    BanAnRequestSchema,
    BanAnResponseSchema
)
from api.schemas.hoa_don import HoaDonRequestSchema, HoaDonResponseSchema
from api.schemas.khach_hang import KhachHangRequestSchema, KhachHangResponseSchema
from api.schemas.voucher import (
    VoucherRequestSchema,
    VoucherResponseSchema
)
from api.schemas.don_hang import DonHangRequestSchema, DonHangResponseSchema



spec = APISpec(
    title="Todo API",
    version="1.0.0",
    openapi_version="3.0.2",
    plugins=[FlaskPlugin(), MarshmallowPlugin()],
)

# ===== NHÂN VIÊN =====
spec.components.schema(
    
    "NhanVienRequest",
    schema=NhanVienRequestSchema
)

spec.components.schema(
    "NhanVienResponse",
    schema=NhanVienResponseSchema
)

# ===== BÀN ĂN =====
spec.components.schema(
    "BanAnRequest",
    schema=BanAnRequestSchema
)

spec.components.schema(
    "BanAnResponse",
    schema=BanAnResponseSchema
)

spec.components.schema("HoaDonRequest", schema=HoaDonRequestSchema)
spec.components.schema("HoaDonResponse", schema=HoaDonResponseSchema)


# Đăng ký schema để tự động sinh model
spec.components.schema("TodoRequest", schema=TodoRequestSchema)
spec.components.schema("TodoResponse", schema=TodoResponseSchema)

spec.components.schema("KhachHangRequest", schema=KhachHangRequestSchema)
spec.components.schema("KhachHangResponse", schema=KhachHangResponseSchema)
# ===== VOUCHER =====
spec.components.schema(
    "VoucherRequest",
    schema=VoucherRequestSchema
)

spec.components.schema(
    "VoucherResponse",
    schema=VoucherResponseSchema
)
# ===== ĐƠN HÀNG =====
spec.components.schema(
    "DonHangRequest",
    schema=DonHangRequestSchema
)

spec.components.schema(
    "DonHangResponse",
    schema=DonHangResponseSchema
)
