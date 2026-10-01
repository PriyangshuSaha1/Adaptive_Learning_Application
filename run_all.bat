@echo off
cd /d "%~dp0"
echo Starting Adaptive Learning Platform...
echo Starting MongoDB...
start "MongoDB" /MIN "C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" --dbpath "%~dp0mongodb_data"
echo Starting Backend...
cd backend
start cmd /k "npm run dev"
cd ..
echo Starting ML Service...
cd ml
start cmd /k "call .venv\Scripts\activate.bat && uvicorn src.app:app --host 127.0.0.1 --port 8000 --reload"
cd ..
echo Starting Frontend...
cd frontend
start cmd /k "npm start"
cd ..
echo All services started in separate windows.
pause
