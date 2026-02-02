from fastapi import FastAPI, Request, Form, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, JSONResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
import os
from data.tours import tours_data
from config import (
    CONTACT_PHONE, CONTACT_EMAIL, CONTACT_ADDRESS,
    EVENT_DATE, DEPARTURE_TIME, DEPARTURE_PLACE
)

app = FastAPI(
    title="Усманка-уикенд",
    description="Активные туры выходного дня на природе Воронежской области",
    version="1.0.0"
)


os.makedirs("static/css", exist_ok=True)
os.makedirs("static/js", exist_ok=True)
os.makedirs("templates", exist_ok=True)


app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    """Главная страница со списком туров"""
    return templates.TemplateResponse("index.html", {
        "request": request, 
        "tours_data": tours_data,
        "contact_phone": CONTACT_PHONE,
        "contact_email": CONTACT_EMAIL,
        "event_date": EVENT_DATE
    })

@app.get("/tour/{tour_key}", response_class=HTMLResponse)
async def tour_page(request: Request, tour_key: str):
    """Страница конкретного тура"""
    if tour_key not in tours_data:
        raise HTTPException(status_code=404, detail="Тур не найден")
    
    return templates.TemplateResponse("tour.html", {
        "request": request,
        "tour": tours_data[tour_key],
        "tour_key": tour_key,
        "contact_phone": CONTACT_PHONE,
        "contact_email": CONTACT_EMAIL,
        "event_date": EVENT_DATE,
        "departure_place": DEPARTURE_PLACE
    })

@app.post("/api/booking")
async def create_booking(
    name: str = Form(...),
    phone: str = Form(...),
    email: str = Form(...),
    tour: str = Form(...),
    tariff: str = Form(...),
    amount: str = Form(...)
):
    """Обработка бронирования"""
    try:
        # Здесь будет интеграция с ЮKassa
        # Пока просто сохраняем заявку
        print(f"Новая заявка: {name}, {phone}, {email}, {tour}, {tariff}, {amount}")
        
        return JSONResponse({
            "status": "success",
            "message": "Заявка принята! Мы свяжемся с вами в ближайшее время.",
            "data": {
                "name": name,
                "phone": phone,
                "tour": tour,
                "tariff": tariff,
                "amount": amount
            }
        })
    except Exception as e:
        return JSONResponse({
            "status": "error",
            "message": f"Ошибка при обработке заявки: {str(e)}"
        }, status_code=500)

@app.get("/health")
async def health_check():
    """Проверка работоспособности API"""
    return {"status": "ok", "message": "Сервер работает"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )