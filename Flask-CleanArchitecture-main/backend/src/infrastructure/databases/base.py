# from sqlalchemy.orm import declarative_base

# Base = declarative_base()


# # ORM: object relational mapping base class
# # OOP : object oriented programming

# # ERD --> class relational
# # Lập trinhf hướng đối tượng (logic) mapping class -> table (database)



from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# 1. Khai báo Base để các Model kế thừa
Base = declarative_base()
 
#DATABASE_URL = "mssql+pymssql://sa:123456@localhost/NhaHangDB?driver=ODBC+Driver+17+for+SQL+Server"
# DATABASE_URL = (
#     "mssql+pyodbc://sa:123456@localhost/NhaHangDB"
#     "?driver=ODBC+Driver+17+for+SQL+Server"
# )

# DATABASE_URL = "mssql+pymssql://sa:Aa123456@localhost:1433/NhaHangDB"
DATABASE_URL = "mssql+pymssql://sa:Aa123456@localhost:1433/FlaskApiDB"
engine = create_engine(DATABASE_URL, echo=True)

# 3. Tạo SessionLocal - Đây chính là thứ mà Repository đang tìm
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)