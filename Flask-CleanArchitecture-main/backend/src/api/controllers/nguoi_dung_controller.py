from flask import Blueprint, request, jsonify
from services.nguoi_dung_service import NguoiDungService
from infrastructure.repositories.nguoi_dung_repository import NguoiDungRepository
from api.schemas.nguoi_dung import NDRequestSchema, NDResponseSchema

bp = Blueprint('nguoi_dung', __name__, url_prefix='/nguoi-dung')

service = NguoiDungService(NguoiDungRepository())
req = NDRequestSchema()
res = NDResponseSchema()

@bp.route('/', methods=['GET'])
def list_all():
    """
    Lấy danh sách người dùng
    ---
    get:
      summary: Danh sách tất cả người dùng
      tags:
        - Người dùng
      responses:
        200:
          description: OK
    """
    return jsonify(res.dump(service.list(), many=True)), 200

@bp.route('/<int:id>', methods=['GET'])
def get(id):
    """
    Chi tiết người dùng
    ---
    get:
      summary: Lấy thông tin chi tiết người dùng theo ID
      tags:
        - Người dùng
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        200:
          description: OK
        404:
          description: Không tìm thấy
    """
    nguoi_dung = service.get(id)
    if not nguoi_dung:
        return jsonify({"error": "Người dùng không tồn tại"}), 404
    return jsonify(res.dump(nguoi_dung)), 200

@bp.route('/', methods=['POST'])
def create():
    """
    Tạo người dùng mới
    ---
    post:
      summary: Thêm người dùng mới vào hệ thống
      tags:
        - Người dùng
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                id_nh: {type: integer, example: 1}
                ten: {type: string, example: "Nguyen Van A"}
                email: {type: string, example: "a@gmail.com"}
                mat_khau: {type: string, example: "123456"}
                vai_tro: {type: string, example: "Admin"}
      responses:
        201:
          description: Tạo thành công
    """
    data = request.get_json()
    errors = req.validate(data)
    if errors:
        return jsonify(errors), 400

    nguoi_dung = service.create(
        id_nh=data['id_nh'],
        ten=data['ten'],
        email=data['email'],
        mat_khau=data['mat_khau'],
        ma_xac_thuc=data.get('ma_xac_thuc'),  
        trang_thai=data.get('trang_thai'),    
        vai_tro=data['vai_tro']
    )
    return jsonify(res.dump(nguoi_dung)), 201

@bp.route('/<int:id>', methods=['PUT'])
def update(id):
    """
    Cập nhật người dùng
    ---
    put:
      summary: Cập nhật thông tin người dùng theo ID
      tags:
        - Người dùng
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                ten: {type: string}
                email: {type: string}
                vai_tro: {type: string}
      responses:
        200:
          description: Cập nhật thành công
    """
    data = request.get_json()
    errors = req.validate(data)
    if errors:
        return jsonify(errors), 400

    nguoi_dung = service.update(
        id=id,
        id_nh=data['id_nh'],
        ten=data['ten'],
        email=data['email'],
        mat_khau=data['mat_khau'],
        ma_xac_thuc=data.get('ma_xac_thuc'),
        trang_thai=data.get('trang_thai'),
        vai_tro=data['vai_tro']
    )
    if not nguoi_dung:
        return jsonify({"error": "Người dùng không tồn tại"}), 404
    return jsonify(res.dump(nguoi_dung)), 200

@bp.route('/<int:id>', methods=['DELETE'])
def delete(id):
    """
    Xóa người dùng
    ---
    delete:
      summary: Xóa người dùng khỏi hệ thống
      tags:
        - Người dùng
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        204:
          description: Xóa thành công
    """
    success = service.delete(id)
    if not success:
        return jsonify({"error": "Người dùng không tồn tại"}), 404
    return '', 204