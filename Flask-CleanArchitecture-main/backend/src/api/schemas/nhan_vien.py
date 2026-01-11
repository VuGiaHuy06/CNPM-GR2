from marshmallow import Schema, fields


class NhanVienRequestSchema(Schema):
    ten_nv = fields.String(required=True)
    ngay_vao_lam = fields.String(required=True)
    so_dien_thoai = fields.String(required=False, allow_none=True)                # SDT
    chuc_vu = fields.String(required=True)
    email = fields.String(required=False, allow_none=True)              # Email
    tinh_trang = fields.String(required=True)
    id_nd = fields.Integer(required=False, allow_none=True)             # ID_ND (FK)
    id_nh = fields.Integer(required=True)

class NhanVienResponseSchema(Schema):
    id_nv = fields.Integer(dump_only=True)
    ten_nv = fields.String()
    ngay_vao_lam = fields.String()
    so_dien_thoai = fields.String()
    chuc_vu = fields.String()
    email = fields.String()
    tinh_trang = fields.String()
    id_nd = fields.Integer()
    id_nh = fields.Integer()
