
from infrastructure.databases.mssql import init_mssql
from infrastructure.models import mon_an_model,nha_hang_model,nhan_vien,nguoi_dung_model,ban_an_model,don_hang_model,khach_hang,nhan_vien,hoa_don

def init_db(app):
    init_mssql(app)


from infrastructure.databases.mssql import engine,Base