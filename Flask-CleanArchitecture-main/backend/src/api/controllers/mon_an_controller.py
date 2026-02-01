from flask import Blueprint, request, jsonify
from infrastructure.repositories.mon_an_repository import MonAnRepository
from services.mon_an_service import MonAnService 

mon_an_bp = Blueprint('mon_an', __name__, url_prefix='/mon-an')
repo = MonAnRepository()
service = MonAnService(repo)

@mon_an_bp.route('/', methods=['POST'])
def create_mon_an():
    """
    Tạo món ăn mới
    ---
    post:
      summary: Thêm món ăn mới vào menu
      tags:
        - Món Ăn
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                ten_mon: {type: string, example: "string"}
                gia: {type: number, example: 0}
                mo_ta: {type: string, example: "string"}
                hinh_anh: {type: string, example: "img.jpg"}
                id_nh: {type: integer, example: 000}
      responses:
        201:
          description: Tạo thành công
    """
    data = request.get_json()
    new_mon = service.create(
        ten_mon=data.get('ten_mon'),
        gia=data.get('gia'),
        mo_ta=data.get('mo_ta'),
        hinh_anh=data.get('hinh_anh', ''),
        id_nh=data.get('id_nh')
    )
    # SỬA: Trả về id_mon theo Model mới
    return jsonify({
        "message": "Đã tạo món ăn thành công",
        "id_mon": new_mon.id_mon 
    }), 201

@mon_an_bp.route('/', methods=['GET'])
def list_mon_an():
    """
    Lấy danh sách món ăn
    ---
    get:
      summary: Danh sách tất cả món ăn
      description: Trả về danh sách chi tiết các món ăn bao gồm tên, giá, mô tả và nhà hàng sở hữu.
      tags:
        - Món Ăn
      responses:
        200:
          description: OK
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    id_mon: {type: integer}
                    ten_mon: {type: string}
                    gia: {type: number}
                    mo_ta: {type: string}
                    id_nh: {type: integer}
    """
    data = service.list() 
    return jsonify([
        {
            "id_mon": m.id_mon, 
            "ten_mon": m.ten_mon, 
            "gia": m.gia,
            "mo_ta": m.mo_ta, # THÊM DÒNG NÀY
            "id_nh": m.id_nh
        } for m in data
    ]), 200

@mon_an_bp.route('/<int:id>', methods=['GET'])
def get_mon_an(id):
    """
    Lấy chi tiết món ăn
    ---
    get:
      summary: Chi tiết món ăn theo ID
      tags:
        - Món Ăn
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        200:
          description: OK
    """
    mon = service.get(id) 
    if not mon:
        return jsonify({"error": "Món ăn không tồn tại"}), 404
    # SỬA: Trả về đúng id_mon, ten_mon, gia
    return jsonify({
        "id_mon": mon.id_mon, 
        "ten_mon": mon.ten_mon, 
        "gia": mon.gia,
        "mo_ta": mon.mo_ta
    }), 200

@mon_an_bp.route('/<int:id>', methods=['PUT'])
def update_mon_an(id):
    """
    Cập nhật món ăn
    ---
    put:
      summary: Cập nhật thông tin món ăn theo ID
      tags:
        - Món Ăn
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
              type: object
              properties:
                ten_mon: {type: string}
                gia: {type: number}
                mo_ta: {type: string}
                id_nh: {type: integer}
      responses:
        200:
          description: Cập nhật thành công
    """
    data = request.get_json()
    # Gọi service xử lý
    updated_mon = service.update(
        id_monan=id,
        ten_mon=data.get('ten_mon'),
        gia=data.get('gia'),
        mo_ta=data.get('mo_ta'), # Lấy mo_ta từ JSON request
        hinh_anh='',
        id_nh=data.get('id_nh')
    )
    
    if not updated_mon:
        return jsonify({"error": "Không tìm thấy món ăn"}), 404
        
    return jsonify({
        "message": f"Đã cập nhật món ăn {id} thành công",
        "data": {
            "id_mon": updated_mon.id_mon,
            "ten_mon": updated_mon.ten_mon,
            "mo_ta": updated_mon.mo_ta # Trả về để kiểm tra trên Swagger
        }
    }), 200
@mon_an_bp.route('/<int:id>', methods=['DELETE'])
def delete_mon_an(id):
    """
    Xóa món ăn
    ---
    delete:
      summary: Xóa một món ăn khỏi hệ thống
      tags:
        - Món Ăn
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
    success = service.delete(id)
    if not success:
        return jsonify({"error": "Không tìm thấy món ăn"}), 404
    return '', 204