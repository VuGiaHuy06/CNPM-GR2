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
    return jsonify(res.dump(service.list(), many=True)), 200

@bp.route('/', methods=['POST'])
def create():
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