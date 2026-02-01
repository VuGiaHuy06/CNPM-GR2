from marshmallow import Schema, fields

class NHRequestSchema(Schema):
    ten_nh = fields.String(required=True)
    dia_chi = fields.String(required=True)
    email = fields.String(required=False, allow_none=True)
    # Sửa từ so_dien_thoai thành sdt để khớp với JSON gửi từ Swagger
    sdt = fields.String(required=False, allow_none=True)

class NHResponseSchema(Schema):
    id_nh = fields.Integer(dump_only=True)
    ten_nh = fields.String()
    dia_chi = fields.String()
    email = fields.String()
    # Sửa ở đây luôn để khi trả về dữ liệu (GET) tên trường cũng thống nhất
    sdt = fields.String()