from marshmallow import Schema, fields


class HoaDonRequestSchema(Schema):
    id_dh = fields.Integer(required=True)
    id_voucher = fields.Integer(required=True)
    id_ban_an = fields.Integer(required=True)
    ngay_in_hoa_don = fields.String(required=True)
    tong_tien = fields.Float(required=True)

class HoaDonResponseSchema(Schema):
    id_hd = fields.Integer(dump_only=True)
    id_dh = fields.Integer()
    id_voucher = fields.Integer()
    id_ban_an = fields.Integer()
    ngay_in_hoa_don = fields.String()
    tong_tien = fields.Float()