from flask import Blueprint, request, jsonify
from services.nguoi_dung_service import NguoiDungService
from infrastructure.repositories.nguoi_dung_repository import NguoiDungRepository
from api.schemas.nguoi_dung import NDRequestSchema, NDResponseSchema

bp = Blueprint('nguoi_dung', __name__, url_prefix='/nguoi-dung')

service = NguoiDungService(NguoiDungRepository())
req = NDRequestSchema()
res = NDResponseSchema()

@bp.route('/', methods=['GET'])
def list_all():
    return jsonify(res.dump(service.list(), many=True)), 200

@bp.route('/<int:id>', methods=['GET'])
def get(id):
    nguoi_dung = service.get(id)
    if not nguoi_dung:
        return jsonify({"error": "Người dùng không tồn tại"}), 404
    return jsonify(res.dump(nguoi_dung)), 200

@bp.route('/', methods=['POST'])
def create():
    data = request.get_json()
    errors = req.validate(data)
    if errors:
        return jsonify(errors), 400

    nguoi_dung = service.create(
        id_nh=data['id_nh'],
        ten=data['ten'],
        email=data['email'],
        mat_khau=data['mat_khau'],
        ma_xac_thuc=data.get('ma_xac_thuc'),  
        trang_thai=data.get('trang_thai'),    
        vai_tro=data['vai_tro']
    )
    return jsonify(res.dump(nguoi_dung)), 201

@bp.route('/<int:id>', methods=['PUT'])
def update(id):
    data = request.get_json()
    errors = req.validate(data)
    if errors:
        return jsonify(errors), 400

    nguoi_dung = service.update(
        id=id,
        id_nh=data['id_nh'],
        ten=data['ten'],
        email=data['email'],
        mat_khau=data['mat_khau'],
        ma_xac_thuc=data.get('ma_xac_thuc'),
        trang_thai=data.get('trang_thai'),
        vai_tro=data['vai_tro']
    )
    if not nguoi_dung:
        return jsonify({"error": "Người dùng không tồn tại"}), 404
    return jsonify(res.dump(nguoi_dung)), 200

@bp.route('/<int:id>', methods=['DELETE'])
def delete(id):
    success = service.delete(id)
    if not success:
        return jsonify({"error": "Người dùng không tồn tại"}), 404
    return '', 204