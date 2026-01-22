# CNPM-GR2

1.Hướng dẫn cài đặt

Bước 1: Tải xuống và cài đặt Visual Studio Code: Visual Studio Code

Bước 2: Tải xuống và cài đặt Git: Git

Bước 3: Tải xuống và cài đặt Docker: Docker

Bước 4: Tải xuống và cài đặt Python: Python

Bước 5: Tải xuống source code (CMD): git clone https://github.com/VuGiaHuy06/CNPM-GR2.git

2.Chạy app

Bước 1: Tạo môi trường ảo co Python (phiên bản 3.x)

Windows:

py -m venv .venv
Unix/MacOS:


python3 -m venv .venv
Bước 2: Kích hoạt môi trường:

Windows:


.venv\Scripts\activate.ps1
Nếu xảy ra lỗi active .venv trên winos run powershell -->Administrator


Set-ExecutionPolicy RemoteSigned -Force
Unix/MacOS:


source .venv/bin/activate
Bước 3: Cài đặt các thư viện cần thiết

Install:


pip install -r requirements.txt
Bước 4: Chạy mã xử lý dữ liệu

Run:


python app.py
 

Truy câp http://127.0.0.1:9999 
Truy câp http://192.168.1.36:9999

Create file .env in folder /src/.env


# Flask settings
FLASK_ENV=development
SECRET_KEY=your_secret_key

# SQL Server settings
DB_USER=sa
DB_PASSWORD=Aa@123456
DB_HOST=127.0.0.1
DB_PORT=1433
DB_NAME=FlaskApiDB


DATABASE_URI = "mssql+pymssql://sa:Aa123456@127.0.0.1:1433/FlaskApiDB"


```bash
docker pull mcr.microsoft.com/mssql/server:2025-latest
```

Install MS SQL server in docker

```bash
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Aa123456" -p 1433:1433 --name sql1 --hostname sql1 -d  mcr.microsoft.com/mssql/server:2025-latest
```
 
