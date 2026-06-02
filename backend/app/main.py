from fastapi import FastAPI

from api.health_api import router as health_router
from api.route_api import router as route_router
from api.user_api import router as user_router
from utils.response import ApiError, api_error_handler


app = FastAPI(title="RouteLog API")

app.add_exception_handler(ApiError, api_error_handler)
app.include_router(health_router)
app.include_router(route_router)
app.include_router(user_router)
