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
    return jsonify(res.dump(service.list(), many=True)), 200

@bp.route('/<int:id>', methods=['GET'])
def get(id):
    khach_hang = service.get(id)
    if not khach_hang:
        return jsonify({"error": "Khách hàng không tồn tại"}), 404
    return jsonify(res.dump(khach_hang)), 200

@bp.route('/', methods=['POST'])
def create():
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
    success = service.delete(id)
    if not success:
        return jsonify({"error": "Khách hàng không tồn tại"}), 404
    return '', 204