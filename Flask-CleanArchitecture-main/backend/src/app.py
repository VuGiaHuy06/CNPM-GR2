from flask import Flask, jsonify, render_template
from api.swagger import spec
from api.controllers.todo_controller import bp as todo_bp
#from api.controllers.nha_hang_controller import restaurant_bp # Import đúng file của bạn
from api.controllers.nha_hang_controller import bp as restaurant_bp
from api.controllers.nguoi_dung_controller import bp as nguoi_dung_bp
from api.controllers.ban_an_controller import bp as ban_an_bp
from api.controllers.don_hang_controller import bp as don_hang_bp
from api.controllers.nhan_vien_controller import bp as nhan_vien_bp
from api.controllers.hoa_don_controller import bp as hoa_don_bp
from api.controllers.khach_hang_controller import bp as khach_hang_bp
from api.controllers.voucher_controller import bp as voucher_bp




from api.middleware import middleware
from infrastructure.databases import init_db
#from flasgger import Swagger
from flask_swagger_ui import get_swaggerui_blueprint


from api.controllers.mon_an_controller import mon_an_bp
from api.controllers.auth_controller import auth_bp

def create_app():
    # 1. Khởi tạo App
    app = Flask(__name__, 
                static_folder='static', 
                template_folder='templates')
    
    # 2. Khởi tạo Swagger cơ bản
   # Swagger(app)
    
    # 3. Đăng ký Blueprints (Quan trọng: phải có cả 2)
    app.register_blueprint(todo_bp) 
    app.register_blueprint(restaurant_bp)
    app.register_blueprint(mon_an_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(nguoi_dung_bp)
    app.register_blueprint(ban_an_bp)
    app.register_blueprint(don_hang_bp)
    app.register_blueprint(nhan_vien_bp)
    app.register_blueprint(hoa_don_bp)
    app.register_blueprint(khach_hang_bp)
    app.register_blueprint(voucher_bp)






    # 4. Cấu hình Swagger UI giao diện /docs
    SWAGGER_URL = '/docs'
    API_URL = '/swagger.json'
    swaggerui_blueprint = get_swaggerui_blueprint(
        SWAGGER_URL,
        API_URL,
        config={'app_name': "Babyshark dododododododo"}
    )
    app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

    # 5. Khởi tạo Database
    try:
        init_db(app)
    except Exception as e:
        print(f"Error initializing database: {e}")

    # 6. Đăng ký Middleware
    middleware(app)

    # 7. Route trang chủ
    @app.route('/')
    def index():
        return render_template('index.html')

    # 8. QUAN TRỌNG: Quét các endpoint để đẩy vào swagger.json
    with app.test_request_context():
        for rule in app.url_map.iter_rules():
            # Thêm 'restaurant.' vào danh sách kiểm tra
            if rule.endpoint.startswith(('todo.', 'user.', 'restaurant.','mon_an.','auth.','ban_an.','nguoi_dung.','don_hang.','nhan_vien.','hoa_don.','khach_hang.','voucher.')):
                view_func = app.view_functions[rule.endpoint]
                print(f"Adding path: {rule.rule} -> {view_func}")
                spec.path(view=view_func)

    @app.route("/swagger.json")
    def swagger_json():
        return jsonify(spec.to_dict())

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=9999, debug=True)