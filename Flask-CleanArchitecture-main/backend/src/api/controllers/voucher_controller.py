from flask import Blueprint, request, jsonify
from services.voucher_service import VoucherService
from infrastructure.repositories.voucher_repository import VoucherRepository
from api.schemas.voucher import VoucherRequestSchema, VoucherResponseSchema

bp = Blueprint('voucher', __name__, url_prefix='/voucher')

service = VoucherService(VoucherRepository())
req = VoucherRequestSchema()
res = VoucherResponseSchema()

@bp.route('/', methods=['GET'])
def list_all():
    return jsonify(res.dump(service.list(), many=True)), 200

@bp.route('/<int:id>', methods=['GET'])
def get(id):
    voucher = service.get(id)
    if not voucher:
        return jsonify({"error": "Voucher không tồn tại"}), 404
    return jsonify(res.dump(voucher)), 200

@bp.route('/', methods=['POST'])
def create():
    data = request.get_json()
    errors = req.validate(data)
    if errors:
        return jsonify(errors), 400

    voucher = service.create(
        mo_ta=data['mo_ta'],
        phan_tram=data['phan_tram'],
        so_luong=data['so_luong'],
        so_luong_da_dung=data.get('so_luong_da_dung')
    )
    return jsonify(res.dump(voucher)), 201

@bp.route('/<int:id>', methods=['PUT'])
def update(id):
    data = request.get_json()
    errors = req.validate(data)
    if errors:
        return jsonify(errors), 400

    voucher = service.update(
        id=id,
        mo_ta=data['mo_ta'],
        phan_tram=data['phan_tram'],
        so_luong=data['so_luong'],
        so_luong_da_dung=data.get('so_luong_da_dung')
    )
    if not voucher:
        return jsonify({"error": "Voucher không tồn tại"}), 404
    return jsonify(res.dump(voucher)), 200

@bp.route('/<int:id>', methods=['DELETE'])
def delete(id):
    success = service.delete(id)
    if not success:
        return jsonify({"error": "Voucher không tồn tại"}), 404
    return '', 204