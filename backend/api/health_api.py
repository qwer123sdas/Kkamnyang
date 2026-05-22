from fastapi import APIRouter

from utils.response import success_response


router = APIRouter(prefix="/api/v1")


@router.get("/health")
def get_health():
    return success_response({"status": "ok"})
