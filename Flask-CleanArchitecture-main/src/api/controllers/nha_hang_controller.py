from flask import Blueprint, request, jsonify
from services.nha_hang_service import NhaHangService
from infrastructure.repositories.nha_hang_repository import NhaHangRepository
from api.schemas.nha_hang import NHRequestSchema, NHResponseSchema

bp = Blueprint('nha_hang', __name__, url_prefix='/nha-hang')
service = NhaHangService(NhaHangRepository())
req = NHRequestSchema()
res = NHResponseSchema()

@bp.route('/', methods=['POST'])
def create():
    d = request.json
    return jsonify(res.dump(service.create(d["ten"], d["dia_chi"]))), 201
