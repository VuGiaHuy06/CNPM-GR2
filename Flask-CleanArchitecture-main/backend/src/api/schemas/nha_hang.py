from marshmallow import Schema, fields


class NHRequestSchema(Schema):
    ten_nh = fields.String(required=True)
    dia_chi = fields.String(required=True)
    email = fields.String(required=False, allow_none=True)
    so_dien_thoai = fields.String(required=False, allow_none=True)

class NHResponseSchema(Schema):
    id_nh = fields.Integer(dump_only=True)
    ten_nh = fields.String()
    dia_chi = fields.String()
    email = fields.String()
    so_dien_thoai = fields.String()