from marshmallow import Schema, fields

class DonHangRequestSchema(Schema):
    tien_mon_an = fields.Integer(required=True)
    so_luong_mon_an = fields.Integer(required=True)
    id_kh = fields.Integer(required=True)

class DonHangResponseSchema(Schema):
    id_dh = fields.Integer() # Khớp với id_dh trong Repository/Interface
    tien_mon_an = fields.Integer()
    so_luong_mon_an = fields.Integer()
    id_kh = fields.Integer()