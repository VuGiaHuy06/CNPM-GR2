from flask import Blueprint, request, jsonify
from services.ban_an_service import BanAnService
from infrastructure.repositories.ban_an_repository import BanAnRepository
from api.schemas.ban_an import BanAnRequestSchema, BanAnResponseSchema

bp = Blueprint('ban_an', __name__, url_prefix='/ban-an')

service = BanAnService(BanAnRepository())
req = BanAnRequestSchema()
res = BanAnResponseSchema()


@bp.route('/', methods=['GET'])
def list_ban_an():
    """
    Lấy danh sách bàn ăn
    ---
    get:
      summary: Danh sách bàn ăn
      tags:
        - Bàn ăn
      responses:
        200:
          description: Danh sách bàn ăn
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/BanAnResponse'
    """
    data = service.list()
    return jsonify(res.dump(data, many=True)), 200


@bp.route('/<int:id>', methods=['GET'])
def get_ban_an(id):
    """
    Lấy thông tin bàn ăn theo ID
    ---
    get:
      summary: Lấy bàn ăn theo ID
      tags:
        - Bàn ăn
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        200:
          description: Thành công
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BanAnResponse'
        404:
          description: Không tìm thấy
    """
    ban = service.get(id)
    if not ban:
        return jsonify({'message': 'Not found'}), 404
    return jsonify(res.dump(ban)), 200


@bp.route('/', methods=['POST'])
def create_ban_an():
    """
    Tạo bàn ăn mới
    ---
    post:
      summary: Tạo bàn ăn
      tags:
        - Bàn ăn
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/BanAnRequest'
      responses:
        201:
          description: Tạo thành công
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BanAnResponse'
        400:
          description: Dữ liệu không hợp lệ
    """
    data = request.get_json()
    errors = req.validate(data)
    if errors:
        return jsonify(errors), 400

    ban = service.create(
        ten_ban=data['ten_ban'],
        trang_thai=data['trang_thai'],
        id_nh=data['id_nh']
    )
    return jsonify(res.dump(ban)), 201


@bp.route('/<int:id>', methods=['PUT'])
def update_ban_an(id):
    """
    Cập nhật bàn ăn
    ---
    put:
      summary: Cập nhật bàn ăn
      tags:
        - Bàn ăn
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/BanAnRequest'
      responses:
        200:
          description: Cập nhật thành công
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BanAnResponse'
        400:
          description: Dữ liệu không hợp lệ
    """
    data = request.get_json()
    errors = req.validate(data)
    if errors:
        return jsonify(errors), 400

    ban = service.update(
        id_ban_an=id,
        ten_ban=data['ten_ban'],
        trang_thai=data['trang_thai'],
        id_nh=data['id_nh']
    )
    return jsonify(res.dump(ban)), 200


@bp.route('/<int:id>', methods=['DELETE'])
def delete_ban_an(id):
    """
    Xóa bàn ăn
    ---
    delete:
      summary: Xóa bàn ăn
      tags:
        - Bàn ăn
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        204:
          description: Xóa thành công
    """
    service.delete(id)
    return '', 204
