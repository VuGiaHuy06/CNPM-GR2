from flask import Blueprint, request, jsonify
from services.don_hang_service import DonHangService
from infrastructure.repositories.don_hang_repository import DonHangRepository
from api.schemas.don_hang import DonHangRequestSchema, DonHangResponseSchema

bp = Blueprint('don_hang', __name__, url_prefix='/don-hang')

service = DonHangService(DonHangRepository())
req = DonHangRequestSchema()
res = DonHangResponseSchema()

@bp.route('/', methods=['GET'])
def list_all():
    return jsonify(res.dump(service.list(), many=True)), 200

@bp.route('/', methods=['POST'])
def create():
    data = request.get_json()
    errors = req.validate(data)
    if errors:
        return jsonify(errors), 400

    dh = service.create(
        tien_mon_an=data['tien_mon_an'],
        so_luong_mon_an=data['so_luong_mon_an'],
        id_kh=data['id_kh']
    )
    return jsonify(res.dump(dh)), 201
