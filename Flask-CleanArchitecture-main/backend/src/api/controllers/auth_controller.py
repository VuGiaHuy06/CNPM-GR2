# from flask import Blueprint, request, jsonify # 'request' sẽ được sử dụng bên dưới

# auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

# @auth_bp.route('/login', methods=['POST'])
# def login():
#     """
#     Đăng nhập hệ thống
#     ---
#     post:
#       summary: Đăng nhập để lấy Token
#       tags:
#         - Auth
#       requestBody:
#         content:
#           application/json:
#             schema:
#               type: object
#               properties:
#                 username: {type: string}
#                 password: {type: string}
#       responses:
#         200:
#           description: Đăng nhập thành công
#     """
#     # Sử dụng 'request' để lấy dữ liệu từ client gửi lên
#     data = request.get_json() 
    
#     username = data.get('username')
#     password = data.get('password')

#     # Logic kiểm tra đăng nhập giả lập
#     if username == "admin" and password == "123456":
#         return jsonify({
#             "status": "success",
#             "token": "secret-jwt-token-for-admin"
#         }), 200
        
#     return jsonify({"error": "Sai tài khoản hoặc mật khẩu"}), 401

# @auth_bp.route('/register', methods=['POST'])
# def register():
#     """
#     Đăng ký tài khoản
#     ---
#     post:
#       summary: Tạo tài khoản người dùng mới
#       tags:
#         - Auth
#       responses:
#         201:
#           description: Đăng ký thành công
#     """
#     data = request.get_json() # Sử dụng 'request' ở đây nữa
#     return jsonify({
#         "message": f"Tài khoản {data.get('username')} đã được tạo!"
#     }), 201


import jwt
from flask import Blueprint, request, jsonify, current_app
from datetime import datetime, timedelta
from infrastructure.models.user_model import UserModel
from infrastructure.databases.mssql import session

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

@auth_bp.route('/login', methods=['POST'])
def login():
    """
    Đăng nhập hệ thống
    ---
    post:
      summary: Đăng nhập hệ thống
      tags: [Auth]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                user_name: {type: string, example: "admin"}
                password: {type: string, example: "123"}
      responses:
        200: { description: Thành công }
        401: { description: Sai tài khoản hoặc mật khẩu }
    """
    data = request.get_json()
    
    # Tìm kiếm user trong database
    user = session.query(UserModel).filter_by(
        user_name=data.get('user_name'), 
        password=data.get('password')
    ).first()

    if not user:
        return jsonify({'error': 'Invalid credentials'}), 401

    # Tạo Token JWT
    payload = {
        'user_id': user.id,
        'exp': datetime.utcnow() + timedelta(hours=2)
    }
    secret = current_app.config.get('SECRET_KEY', 'your-secret-key')
    
    # Mã hóa JWT
    token = jwt.encode(payload, secret, algorithm='HS256')
    
    # KHẮC PHỤC LỖI "Expected a string value"
    # Đảm bảo token luôn là chuỗi văn bản (string) trước khi gửi về client
    if isinstance(token, bytes):
        token = token.decode('utf-8')

    return jsonify({'token': token})

@auth_bp.route('/register', methods=['POST'])
def register():
    """
    Đăng ký tài khoản
    ---
    post:
      summary: Đăng ký tài khoản
      tags: [Auth]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                user_name: {type: string, example: "admin"}
                password: {type: string, example: "123"}
      responses:
        201: { description: Đăng ký thành công }
        400: { description: Tài khoản đã tồn tại }
    """
    data = request.get_json()
    
    # Kiểm tra user tồn tại
    existing_user = session.query(UserModel).filter_by(user_name=data.get('user_name')).first()
    if existing_user:
        return jsonify({'error': 'Username already exists'}), 400

    # Khởi tạo user với các trường bắt buộc để fix lỗi NULL Database
    new_user = UserModel(
        user_name=data.get('user_name'),
        password=data.get('password'),
        status=1,  # Gán giá trị mặc định cho cột status
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    try:
        session.add(new_user)
        session.commit()
        return jsonify({'message': 'User registered successfully'}), 201
    except Exception as e:
        session.rollback()
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    """
    Quên mật khẩu
    ---
    post:
      summary: Quên mật khẩu
      tags: [Auth]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                email: {type: string, example: "user@example.com"}
      responses:
        200: { description: Đã gửi mã reset }
    """
    return jsonify({'message': 'Reset email sent'})

@auth_bp.route('/reset-password', methods=['POST'])
def reset_password():
    """
    Đặt lại mật khẩu mới
    ---
    post:
      summary: Đặt lại mật khẩu mới
      tags: [Auth]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                token: {type: string}
                new_password: {type: string}
      responses:
        200: { description: Thành công }
    """
    return jsonify({'message': 'Password reset success'})