from flask import Blueprint, request, jsonify
from services.ban_an_service import BanAnService
from infrastructure.repositories.ban_an_repository import BanAnRepository
from api.schemas.ban_an import BanAnRequestSchema, BanAnResponseSchema

bp = Blueprint('ban_an', __name__, url_prefix='/ban-an')

ban_an_service = BanAnService(BanAnRepository())

request_schema = BanAnRequestSchema()
response_schema = BanAnResponseSchema()

@bp.route('/', methods=['GET'])
def list_ban_an():
    data = ban_an_service.list()
    return jsonify(response_schema.dump(data, many=True)), 200

@bp.route('/<int:id>', methods=['GET'])
def get_ban_an(id):
    ban = ban_an_service.get(id)
    if not ban:
        return jsonify({'message': 'Not found'}), 404
    return jsonify(response_schema.dump(ban)), 200

@bp.route('/', methods=['POST'])
def create_ban_an():
    data = request.get_json()
    errors = request_schema.validate(data)
    if errors:
        return jsonify(errors), 400

    ban = ban_an_service.create(
        ten_ban=data['ten_ban'],
        trang_thai=data['trang_thai'],
        id_nh=data['id_nh']
    )
    return jsonify(response_schema.dump(ban)), 201

@bp.route('/<int:id>', methods=['PUT'])
def update_ban_an(id):
    data = request.get_json()
    errors = request_schema.validate(data)
    if errors:
        return jsonify(errors), 400

    ban = ban_an_service.update(
        id=id,
        ten_ban=data['ten_ban'],
        trang_thai=data['trang_thai'],
        id_nh=data['id_nh']
    )
    return jsonify(response_schema.dump(ban)), 200

@bp.route('/<int:id>', methods=['DELETE'])
def delete_ban_an(id):
    ban_an_service.delete(id)
    return '', 204
