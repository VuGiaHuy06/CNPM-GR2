from marshmallow import Schema, fields


class NDRequestSchema(Schema):
    id_nh = fields.Integer(required=True)
    ten = fields.String(required=True)
    email = fields.String(required=True)
    mat_khau = fields.String(required=True)

    ma_xac_thuc = fields.String(required=False, allow_none=True)
    trang_thai = fields.String(required=True)
    vai_tro = fields.String(required=True)

class NDResponseSchema(Schema):
    id_nd = fields.Integer(dump_only=True)
    id_nh = fields.Integer()
    ten = fields.String()
    email = fields.String()
    ma_xac_thuc = fields.String()
    trang_thai = fields.String()
    vai_tro = fields.String()
