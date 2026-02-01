from flask import Blueprint, request, jsonify
from services.nha_hang_service import NhaHangService
from infrastructure.repositories.nha_hang_repository import NhaHangRepository
from api.schemas.nha_hang import NHRequestSchema, NHResponseSchema

# Blueprint đặt tên là 'restaurant' để app.py quét được
bp = Blueprint('restaurant', __name__, url_prefix='/nha-hang')

service = NhaHangService(NhaHangRepository())
req = NHRequestSchema()
res = NHResponseSchema()

@bp.route('/', methods=['GET'])
def list_all():
    """
    Lấy danh sách nhà hàng
    ---
    get:
      summary: Lấy tất cả nhà hàng
      tags:
        - Nhà hàng
      responses:
        200:
          description: OK
    """
    # Trả về bọc trong object "restaurants" cho giống mẫu báo cáo của bạn
    data = service.list()
    return jsonify({
        "status": "success",
        "restaurants": res.dump(data, many=True)
    }), 200

@bp.route('/<int:id>', methods=['GET'])
def get(id):
    """
    Lấy chi tiết nhà hàng
    ---
    get:
      summary: Lấy nhà hàng theo ID
      tags:
        - Nhà hàng
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        200:
          description: Chi tiết nhà hàng
        404:
          description: Không tìm thấy
    """
    nha_hang = service.get(id)
    if not nha_hang:
        return jsonify({"error": "Nhà hàng không tồn tại"}), 404
    return jsonify(res.dump(nha_hang)), 200

@bp.route('/', methods=['POST'])
def create():
    """
    Tạo nhà hàng mới
    ---
    post:
      summary: Thêm một nhà hàng mới
      tags:
        - Nhà hàng
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                ten_nh: {type: string}
                dia_chi: {type: string}
                email: {type: string}
                sdt: {type: string}
      responses:
        201:
          description: Đã tạo thành công
    """
    data = request.get_json()
    errors = req.validate(data)
    if errors:
        return jsonify(errors), 400

    # QUAN TRỌNG: Đổi 'sdt' từ request thành 'so_dien_thoai' để khớp với NhaHangService
    nha_hang = service.create(
        ten_nh=data.get('ten_nh'),
        dia_chi=data.get('dia_chi'),
        email=data.get('email'),
        so_dien_thoai=data.get('sdt') # Service nhận 'so_dien_thoai', không nhận 'sdt'
    )
    return jsonify(res.dump(nha_hang)), 201


@bp.route('/<int:id>', methods=['PUT'])
def update(id):
    """
    Cập nhật nhà hàng
    ---
    put:
      summary: Cập nhật thông tin nhà hàng
      tags:
        - Nhà hàng
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      requestBody:  # THÊM ĐOẠN NÀY
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                ten_nh: {type: string}
                dia_chi: {type: string}
                email: {type: string}
                sdt: {type: string}
      responses:
        200:
          description: Cập nhật thành công
    """
    data = request.get_json()
    errors = req.validate(data)
    if errors:
        return jsonify(errors), 400

    # Tương tự như hàm create, đổi tên trường ở đây
    nha_hang = service.update(
        id_nh=id,
        ten_nh=data.get('ten_nh'),
        dia_chi=data.get('dia_chi'),
        email=data.get('email'),
        so_dien_thoai=data.get('sdt')
    )
    if not nha_hang:
        return jsonify({"error": "Nhà hàng không tồn tại"}), 404
    return jsonify(res.dump(nha_hang)), 200

@bp.route('/<int:id>', methods=['DELETE'])
def delete(id):
    """
    Xóa nhà hàng
    ---
    delete:
      summary: Xóa nhà hàng theo ID
      tags:
        - Nhà hàng
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        204:
          description: Đã xóa thành công
    """
    success = service.delete(id_nh=id)
    if not success:
        return jsonify({"error": "Nhà hàng không tồn tại"}), 404
    return '', 204