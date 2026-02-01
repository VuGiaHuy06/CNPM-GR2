from marshmallow import Schema, fields


class KhachHangRequestSchema(Schema):
    ten_kh = fields.String(required=True)
    so_dien_thoai = fields.String(required=True)
    email = fields.String(required=True)
    id_nd = fields.Integer(required=True)

class KhachHangResponseSchema(Schema):
    id_kh = fields.Integer(dump_only=True)
    ten_kh = fields.String()
    so_dien_thoai = fields.String()
    email = fields.String()
    id_nd = fields.Integer()