from flask import Blueprint, request, jsonify
from services.khach_hang_service import KhachHangService
from infrastructure.repositories.khach_hang_repository import KhachHangRepository
from api.schemas.khach_hang import KhachHangRequestSchema, KhachHangResponseSchema

bp = Blueprint('khach_hang', __name__, url_prefix='/khach-hang')

service = KhachHangService(KhachHangRepository())
req = KhachHangRequestSchema()
res = KhachHangResponseSchema()


@bp.route('/', methods=['GET'])
def list_all():
    """
    ---
    get:
      summary: Danh sách khách hàng
      tags:
        - Khách hàng
      responses:
        200:
          description: OK
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/KhachHangResponse'
    """
    return jsonify(res.dump(service.list(), many=True)), 200


@bp.route('/<int:id>', methods=['GET'])
def get(id):
    """
    ---
    get:
      summary: Lấy khách hàng theo ID
      tags:
        - Khách hàng
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        200:
          description: OK
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/KhachHangResponse'
        404:
          description: Không tìm thấy
    """
    khach_hang = service.get(id)
    if not khach_hang:
        return jsonify({"error": "Khách hàng không tồn tại"}), 404
    return jsonify(res.dump(khach_hang)), 200


@bp.route('/', methods=['POST'])
def create():
    """
    ---
    post:
      summary: Tạo khách hàng
      tags:
        - Khách hàng
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/KhachHangRequest'
      responses:
        201:
          description: Tạo thành công
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/KhachHangResponse'
        400:
          description: Dữ liệu không hợp lệ
    """
    data = request.get_json()
    errors = req.validate(data)
    if errors:
        return jsonify(errors), 400

    khach_hang = service.create(
        ten_kh=data['ten_kh'],
        so_dien_thoai=data['so_dien_thoai'],
        email=data['email'],
        id_nd=data['id_nd']
    )
    return jsonify(res.dump(khach_hang)), 201


@bp.route('/<int:id>', methods=['PUT'])
def update(id):
    """
    ---
    put:
      summary: Cập nhật khách hàng
      tags:
        - Khách hàng
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
              $ref: '#/components/schemas/KhachHangRequest'
      responses:
        200:
          description: Cập nhật thành công
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/KhachHangResponse'
        404:
          description: Không tìm thấy
    """
    data = request.get_json()
    errors = req.validate(data)
    if errors:
        return jsonify(errors), 400

    khach_hang = service.update(
        id=id,
        ten_kh=data['ten_kh'],
        so_dien_thoai=data['so_dien_thoai'],
        email=data['email'],
        id_nd=data['id_nd']
    )
    if not khach_hang:
        return jsonify({"error": "Khách hàng không tồn tại"}), 404
    return jsonify(res.dump(khach_hang)), 200


@bp.route('/<int:id>', methods=['DELETE'])
def delete(id):
    """
    ---
    delete:
      summary: Xóa khách hàng
      tags:
        - Khách hàng
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        204:
          description: Xóa thành công
        404:
          description: Không tìm thấy
    """
    success = service.delete(id)
    if not success:
        return jsonify({"error": "Khách hàng không tồn tại"}), 404
    return '', 204
