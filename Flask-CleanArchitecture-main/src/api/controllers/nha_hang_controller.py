from flask import Blueprint, request, jsonify
from services.nha_hang_service import NhaHangService
from infrastructure.repositories.nha_hang_repository import NhaHangRepository
from api.schemas.nha_hang import NHRequestSchema, NHResponseSchema

bp = Blueprint('nha_hang', __name__, url_prefix='/nha-hang')

service = NhaHangService(NhaHangRepository())
req = NHRequestSchema()
res = NHResponseSchema()

@bp.route('/', methods=['GET'])
def list_all():
    return jsonify(res.dump(service.list(), many=True)), 200

@bp.route('/<int:id>', methods=['GET'])
def get(id):
    nha_hang = service.get(id)
    if not nha_hang:
        return jsonify({"error": "Nhà hàng không tồn tại"}), 404
    return jsonify(res.dump(nha_hang)), 200

@bp.route('/', methods=['POST'])
def create():
    data = request.get_json()
    errors = req.validate(data)
    if errors:
        return jsonify(errors), 400

    nha_hang = service.create(
        ten_nh=data['ten_nh'],
        dia_chi=data['dia_chi'],
        email=data['email'],
        sdt=data['sdt']
    )
    return jsonify(res.dump(nha_hang)), 201

@bp.route('/<int:id>', methods=['PUT'])
def update(id):
    data = request.get_json()
    errors = req.validate(data)
    if errors:
        return jsonify(errors), 400

    nha_hang = service.update(
        id=id,
        ten_nh=data['ten_nh'],
        dia_chi=data['dia_chi'],
        email=data['email'],
        sdt=data['sdt']
    )
    if not nha_hang:
        return jsonify({"error": "Nhà hàng không tồn tại"}), 404
    return jsonify(res.dump(nha_hang)), 200

@bp.route('/<int:id>', methods=['DELETE'])
def delete(id):
    success = service.delete(id)
    if not success:
        return jsonify({"error": "Nhà hàng không tồn tại"}), 404
    return '', 204