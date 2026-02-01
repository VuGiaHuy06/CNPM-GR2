from marshmallow import Schema, fields


class CTRequestSchema(Schema):
    id_hd = fields.Integer(required=True)
    id_monan = fields.Integer(required=True)
    vat = fields.Float(required=True)
    so_luong = fields.Integer(required=True)

class CTResponseSchema(Schema):
    id_cthd = fields.Integer(dump_only=True)
    id_hd = fields.Integer()
    id_monan = fields.Integer()
    vat = fields.Float()
    so_luong = fields.Integer()