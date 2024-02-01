import os
import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from chat import controller as chat_controller

load_dotenv()

app = FastAPI()
app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        )
app.include_router(chat_controller.router)


@app.get("/")
async def main():
    return {"message": "Hello World"}


if __name__ == "__main__":
    uvicorn.run("main:app",
                host=os.getenv("HOST", "localhost"),
                port=int(os.getenv("PORT", 8000)),
                reload=True)
