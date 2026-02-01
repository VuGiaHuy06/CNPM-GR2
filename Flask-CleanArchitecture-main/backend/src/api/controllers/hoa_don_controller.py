from flask import Blueprint, request, jsonify
from services.hoa_don_service import HoaDonService
from infrastructure.repositories.hoa_don_repository import HoaDonRepository
from api.schemas.hoa_don import HoaDonRequestSchema, HoaDonResponseSchema

bp = Blueprint('hoa_don', __name__, url_prefix='/hoa-don')

service = HoaDonService(HoaDonRepository())
req = HoaDonRequestSchema()
res = HoaDonResponseSchema()


@bp.route('/', methods=['GET'])
def list_all():
    """
    Lấy danh sách hóa đơn
    ---
    get:
      summary: Danh sách hóa đơn
      tags:
        - Hóa đơn
      responses:
        200:
          description: OK
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/HoaDonResponse'
    """
    return jsonify(res.dump(service.list(), many=True)), 200


@bp.route('/', methods=['POST'])
def create():
    """
    Tạo hóa đơn mới
    ---
    post:
      summary: Tạo hóa đơn
      tags:
        - Hóa đơn
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/HoaDonRequest'
      responses:
        201:
          description: Tạo thành công
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/HoaDonResponse'
        400:
          description: Dữ liệu không hợp lệ
    """
    data = request.get_json()
    errors = req.validate(data)
    if errors:
        return jsonify(errors), 400

    hoa_don = service.create(
        id_dh=data['id_dh'],
        id_voucher=data['id_voucher'],
        id_ban_an=data['id_ban_an'],
        ngay_in_hoa_don=data['ngay_in_hoa_don'],
        tong_tien=data['tong_tien']
    )
    return jsonify(res.dump(hoa_don)), 201
