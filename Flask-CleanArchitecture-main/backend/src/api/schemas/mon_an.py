from marshmallow import Schema, fields


class MonAnRequestSchema(Schema):
    ten_mon = fields.String(required=True)
    gia = fields.Float(required=True)
    mo_ta = fields.String(required=True)
    hinh_anh = fields.String(required=True)
    id_nh = fields.Integer(required=True)

class MonAnResponseSchema(Schema):
    id_monan = fields.Integer(dump_only=True)
    ten_mon = fields.String()
    gia = fields.Float()
    mo_ta = fields.String()
    hinh_anh = fields.String()
    id_nh = fields.Integer()