from marshmallow import Schema, fields

class DonHangRequestSchema(Schema):
    tong_tien = fields.Float(required=True)
    so_luong = fields.Integer(required=True)
    khach_hang_id = fields.Integer(required=True)

class DonHangResponseSchema(Schema):
    id = fields.Integer()
    tong_tien = fields.Float()
    so_luong = fields.Integer()
    khach_hang_id = fields.Integer()
