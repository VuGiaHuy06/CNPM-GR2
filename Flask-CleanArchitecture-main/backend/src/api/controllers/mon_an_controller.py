from flask import Blueprint, request, jsonify
from services.mon_an_service import MonAnService
from infrastructure.repositories.mon_an_repository import MonAnRepository
from api.schemas.mon_an import MonAnRequestSchema, MonAnResponseSchema

bp = Blueprint('mon_an', __name__, url_prefix='/mon-an')

service = MonAnService(MonAnRepository())
req = MonAnRequestSchema()
res = MonAnResponseSchema()

@bp.route('/', methods=['GET'])
def list_all():
    return jsonify(res.dump(service.list(), many=True)), 200

@bp.route('/<int:id>', methods=['GET'])
def get(id):
    mon_an = service.get(id)
    if not mon_an:
        return jsonify({"error": "Món ăn không tồn tại"}), 404
    return jsonify(res.dump(mon_an)), 200

@bp.route('/', methods=['POST'])
def create():
    data = request.get_json()
    errors = req.validate(data)
    if errors:
        return jsonify(errors), 400

    mon_an = service.create(
        ten_mon=data['ten_mon'],
        gia=data['gia'],
        mo_ta=data['mo_ta'],
        hinh_anh=data['hinh_anh'],
        id_nh=data['id_nh']
    )
    return jsonify(res.dump(mon_an)), 201

@bp.route('/<int:id>', methods=['PUT'])
def update(id):
    data = request.get_json()
    errors = req.validate(data)
    if errors:
        return jsonify(errors), 400

    mon_an = service.update(
        id=id,
        ten_mon=data['ten_mon'],
        gia=data['gia'],
        mo_ta=data['mo_ta'],
        hinh_anh=data['hinh_anh'],
        id_nh=data['id_nh']
    )
    if not mon_an:
        return jsonify({"error": "Món ăn không tồn tại"}), 404
    return jsonify(res.dump(mon_an)), 200

@bp.route('/<int:id>', methods=['DELETE'])
def delete(id):
    success = service.delete(id)
    if not success:
        return jsonify({"error": "Món ăn không tồn tại"}), 404
    return '', 204