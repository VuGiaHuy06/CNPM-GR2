from flask import Blueprint, request, jsonify
from services.chi_tiet_hoa_don_service import ChiTietHoaDonService
from infrastructure.repositories.chi_tiet_hoa_don_repository import ChiTietHoaDonRepository
from api.schemas.chi_tiet_hoa_don import CTRequestSchema, CTResponseSchema

bp = Blueprint('cthd', __name__, url_prefix='/chi-tiet-hoa-don')

service = ChiTietHoaDonService(ChiTietHoaDonRepository())
req = CTRequestSchema()
res = CTResponseSchema()

@bp.route('/', methods=['POST'])
def create():
    data = request.get_json()
    errors = req.validate(data)
    if errors:
        return jsonify(errors), 400

    ct = service.create(
        id_hd=data['id_hd'],
        id_mon_an=data['id_mon_an'],
        so_luong=data['so_luong'],
        vat=data['vat']
    )
    return jsonify(res.dump(ct)), 201