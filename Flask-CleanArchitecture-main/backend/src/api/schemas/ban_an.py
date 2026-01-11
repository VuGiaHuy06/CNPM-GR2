from marshmallow import Schema, fields


class BanAnRequestSchema(Schema):
    ten_ban = fields.String(required=True)
    trang_thai = fields.String(required=True)
    id_nh = fields.Integer(required=True)

class BanAnResponseSchema(Schema):
    id_ban_an = fields.Integer(dump_only=True)
    ten_ban = fields.String()
    trang_thai = fields.String()
    id_nh = fields.Integer()