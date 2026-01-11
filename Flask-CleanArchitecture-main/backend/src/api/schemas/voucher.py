from marshmallow import Schema, fields


class VoucherRequestSchema(Schema):
    mo_ta = fields.String(required=True)
    phan_tram = fields.Float(required=True)
    so_ma = fields.String(required=True)
    so_luong = fields.Integer(required=True)

class VoucherResponseSchema(Schema):
    id_voucher = fields.Integer(dump_only=True)
    mo_ta = fields.String()
    phan_tram = fields.Float()
    so_ma = fields.String()
    so_luong = fields.Integer()