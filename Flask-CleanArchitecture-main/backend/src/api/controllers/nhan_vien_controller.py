from flask import Blueprint, request, jsonify
from services.nhan_vien_service import NhanVienService
from infrastructure.repositories.nhan_vien_repository import NhanVienRepository
from api.schemas.nhan_vien import NhanVienRequestSchema, NhanVienResponseSchema

bp = Blueprint('nhan_vien', __name__, url_prefix='/nhan-vien')

service = NhanVienService(NhanVienRepository())
req = NhanVienRequestSchema()
res = NhanVienResponseSchema()


@bp.route('/', methods=['GET'])
def list_all():
    """
    Lấy danh sách nhân viên
    ---
    get:
      summary: Danh sách nhân viên
      tags:
        - Nhân viên
      responses:
        200:
          description: Danh sách nhân viên
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/NhanVienResponse'
    """
    return jsonify(res.dump(service.list(), many=True)), 200


@bp.route('/<int:id>', methods=['GET'])
def get(id):
    """
    Lấy thông tin nhân viên theo ID
    ---
    get:
      summary: Lấy nhân viên
      tags:
        - Nhân viên
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        200:
          description: Thông tin nhân viên
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/NhanVienResponse'
        404:
          description: Không tìm thấy
    """
    nhan_vien = service.get(id)
    if not nhan_vien:
        return jsonify({"error": "Nhân viên không tồn tại"}), 404
    return jsonify(res.dump(nhan_vien)), 200


@bp.route('/', methods=['POST'])
def create():
    """
    Tạo nhân viên mới
    ---
    post:
      summary: Tạo nhân viên
      tags:
        - Nhân viên
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NhanVienRequest'
      responses:
        201:
          description: Tạo thành công
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/NhanVienResponse'
        400:
          description: Dữ liệu không hợp lệ
    """
    data = request.get_json()
    errors = req.validate(data)
    if errors:
        return jsonify(errors), 400

    nhan_vien = service.create(
        ten_nv=data['ten_nv'],
        ngay_vao_lam=data['ngay_vao_lam'],
        so_dien_thoai=data.get('so_dien_thoai'),
        chuc_vu=data['chuc_vu'],
        email=data.get('email'),
        tinh_trang=data.get('tinh_trang'),
        id_nd=data.get('id_nd'),
        id_nh=data['id_nh']
    )
    return jsonify(res.dump(nhan_vien)), 201


@bp.route('/<int:id>', methods=['PUT'])
def update(id):
    """
    Cập nhật nhân viên
    ---
    put:
      summary: Cập nhật nhân viên
      tags:
        - Nhân viên
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
              $ref: '#/components/schemas/NhanVienRequest'
      responses:
        200:
          description: Cập nhật thành công
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/NhanVienResponse'
        404:
          description: Không tìm thấy
    """
    data = request.get_json()
    errors = req.validate(data)
    if errors:
        return jsonify(errors), 400

    nhan_vien = service.update(
        id=id,
        ten_nv=data['ten_nv'],
        ngay_vao_lam=data['ngay_vao_lam'],
        sdt=data.get('so_dien_thoai'),
        chuc_vu=data['chuc_vu'],
        email=data.get('email'),
        tinh_trang=data.get('tinh_trang'),
        id_nd=data.get('id_nd'),
        id_nh=data['id_nh']
    )
    if not nhan_vien:
        return jsonify({"error": "Nhân viên không tồn tại"}), 404
    return jsonify(res.dump(nhan_vien)), 200


@bp.route('/<int:id>', methods=['DELETE'])
def delete(id):
    """
    Xóa nhân viên
    ---
    delete:
      summary: Xóa nhân viên
      tags:
        - Nhân viên
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
    nhan_vien = service.get(id)
    if not nhan_vien:
        return jsonify({"error": "Nhân viên không tồn tại"}), 404

    service.delete(id)
    return '', 204
