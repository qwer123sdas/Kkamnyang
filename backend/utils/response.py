from fastapi import HTTPException
from fastapi.responses import JSONResponse


def success_response(data):
    return {
        "success": True,
        "data": data,
        "message": None,
    }


def error_response(message: str, error_code: str):
    return {
        "success": False,
        "data": None,
        "message": message,
        "error_code": error_code,
    }


class ApiError(HTTPException):
    def __init__(self, status_code: int, message: str, error_code: str):
        super().__init__(status_code=status_code, detail=message)
        self.message = message
        self.error_code = error_code


def api_error_handler(_, exc: ApiError):
    return JSONResponse(
        status_code=exc.status_code,
        content=error_response(exc.message, exc.error_code),
    )
