from flask import Blueprint, request, jsonify
from services.nhan_vien_service import NhanVienService
from infrastructure.repositories.nhan_vien_repository import NhanVienRepository
from api.schemas.nhan_vien import NhanVienRequestSchema, NhanVienResponseSchema

bp = Blueprint('nhan_vien', __name__, url_prefix='/nhan-vien')

service = NhanVienService(NhanVienRepository())
req = NhanVienRequestSchema()
res = NhanVienResponseSchema()

@bp.route('/', methods=['GET'])
def list_all():
    return jsonify(res.dump(service.list(), many=True)), 200

@bp.route('/<int:id>', methods=['GET'])
def get(id):
    nhan_vien = service.get(id)
    if not nhan_vien:
        return jsonify({"error": "Nhân viên không tồn tại"}), 404
    return jsonify(res.dump(nhan_vien)), 200

@bp.route('/', methods=['POST'])
def create():
    data = request.get_json()
    errors = req.validate(data)
    if errors:
        return jsonify(errors), 400

    nhan_vien = service.create(
        ten_nv=data['ten_nv'],
        ngay_vao_lam=data['ngay_vao_lam'],
        sdt=data['sdt'],
        chuc_vu=data['chuc_vu'],
        email=data['email'],
        tinh_trang=data.get('tinh_trang'),
        id_nd=data['id_nd'],
        id_nh=data['id_nh']
    )
    return jsonify(res.dump(nhan_vien)), 201

@bp.route('/<int:id>', methods=['PUT'])
def update(id):
    data = request.get_json()
    errors = req.validate(data)
    if errors:
        return jsonify(errors), 400

    nhan_vien = service.update(
        id=id,
        ten_nv=data['ten_nv'],
        ngay_vao_lam=data['ngay_vao_lam'],
        sdt=data['sdt'],
        chuc_vu=data['chuc_vu'],
        email=data['email'],
        tinh_trang=data.get('tinh_trang'),
        id_nd=data['id_nd'],
        id_nh=data['id_nh']
    )
    if not nhan_vien:
        return jsonify({"error": "Nhân viên không tồn tại"}), 404
    return jsonify(res.dump(nhan_vien)), 200

@bp.route('/<int:id>', methods=['DELETE'])
def delete(id):
    success = service.delete(id)
    if not success:
        return jsonify({"error": "Nhân viên không tồn tại"}), 404
    return '', 204