from marshmallow import Schema, fields

class NDRequestSchema(Schema):
    # Các trường bắt buộc khi tạo/cập nhật người dùng
    id_nh = fields.Integer(required=True, metadata={"example": 1})
    ten = fields.String(required=True, metadata={"example": "Nguyen Van A"})
    email = fields.Email(required=True, metadata={"example": "a@gmail.com"}) # Dùng fields.Email để validate định dạng
    mat_khau = fields.String(required=True, load_only=True) # load_only: chỉ dùng khi nhận data, không trả về trong JSON

    # Các trường tùy chọn hoặc có giá trị mặc định
    ma_xac_thuc = fields.String(required=False, allow_none=True)
    trang_thai = fields.String(required=False, load_default="Active")
 # Mặc định là Active nếu không truyền
    vai_tro = fields.String(required=True, metadata={"example": "Admin"})

class NDResponseSchema(Schema):
    # Dùng đúng tên id_nd theo sơ đồ ERD (image_36fd76.png)
    id_nd = fields.Integer(dump_only=True) 
    id_nh = fields.Integer()
    ten = fields.String()
    email = fields.String()
    ma_xac_thuc = fields.String(dump_only=False, load_only=True)
    trang_thai = fields.String()
    vai_tro = fields.String()
    # Không trả về mat_khau ở đây để đảm bảo bảo mật