from flask import Blueprint, request, jsonify
from services.voucher_service import VoucherService
from infrastructure.repositories.voucher_repository import VoucherRepository
from api.schemas.voucher import VoucherRequestSchema, VoucherResponseSchema
#from infrastructure.databases.mssql import session  
bp = Blueprint('voucher', __name__, url_prefix='/voucher')

service = VoucherService(VoucherRepository())
req = VoucherRequestSchema()
res = VoucherResponseSchema()


@bp.route('/', methods=['GET'])
def list_all():
    """
    Lấy danh sách voucher
    ---
    get:
      tags:
        - Voucher
      responses:
        200:
          description: Danh sách voucher
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/VoucherResponse'
    """
    return jsonify(res.dump(service.list(), many=True)), 200


@bp.route('/<int:id>', methods=['GET'])
def get(id):
    """
    Lấy voucher theo ID
    ---
    get:
      tags:
        - Voucher
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        200:
          description: Thành công
        404:
          description: Voucher không tồn tại
    """
    voucher = service.get(id)
    if not voucher:
        return jsonify({"error": "Voucher không tồn tại"}), 404
    return jsonify(res.dump(voucher)), 200


@bp.route('/', methods=['POST'])
def create():
    """
    Tạo voucher mới
    ---
    post:
      tags:
        - Voucher
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/VoucherRequest'
      responses:
        201:
          description: Tạo thành công
        400:
          description: Dữ liệu không hợp lệ
    """
    data = request.get_json()
    errors = req.validate(data)
    if errors:
        return jsonify(errors), 400

    voucher = service.create(
        mo_ta=data['mo_ta'],
        phan_tram=data['phan_tram'],
        so_ma=data['so_ma'],
        so_luong=data['so_luong']
    )
    return jsonify(res.dump(voucher)), 201


@bp.route('/<int:id>', methods=['PUT'])
def update(id):
    """
    Cập nhật voucher
    ---
    put:
      tags:
        - Voucher
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
              $ref: '#/components/schemas/VoucherRequest'
      responses:
        200:
          description: Cập nhật thành công
        404:
          description: Voucher không tồn tại
    """
    data = request.get_json()
    errors = req.validate(data)
    if errors:
        return jsonify(errors), 400

    voucher = service.update(
        id=id,
        mo_ta=data['mo_ta'],
        phan_tram=data['phan_tram'],
        so_ma=data['so_ma'],
        so_luong=data['so_luong']
    )
    if not voucher:
        return jsonify({"error": "Voucher không tồn tại"}), 404
    return jsonify(res.dump(voucher)), 200


@bp.route('/<int:id>', methods=['DELETE'])
def delete(id):
    """
    Xóa voucher
    ---
    delete:
      tags:
        - Voucher
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
        return jsonify({"error": "Voucher không tồn tại"}), 404
    return '', 204





