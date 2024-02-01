import json
from fastapi import APIRouter, WebSocket
from .service import ConnectionManager


router = APIRouter()
manager = ConnectionManager()


@router.websocket("/ws/chat/{username}")
async def global_chat_endpoint(
        websocket: WebSocket,
        username: str
        ):
    # accept connection
    await manager.connect(websocket, username)
    await manager.send_all(json.dumps({
        "from": "server_fastapi_chat_new_user",
        "data": manager.get_connections()
        }))
    try:
        # loop for receiving messages
        while True:
            # receive message
            data = await websocket.receive_text()
            print(f"Client {username} sent message: {data}")
            data = json.loads(data)
            if data is None:
                continue
            # send message
            if "to" in data:
                message = json.dumps({
                        "to": data["to"],
                        "data": {
                            "username": username,
                            "message": data["data"]["message"],
                            "timestamp": data["data"]["timestamp"],
                            }
                        })
                # send message to specific user
                await manager.send_personal_message(str(message), username)
                await manager.send_personal_message(str(message), data["to"])
            else:
                message = json.dumps({
                        "from": username,
                        "data": {
                            "username": username,
                            "message": data["data"]["message"],
                            "timestamp": data["data"]["timestamp"],
                            }
                        })
                # send message to all users
                await manager.send_all(str(message))

    except Exception as e:
        print(e)
        manager.disconnect(username)
        await manager.send_all(json.dumps({
            "from": "server_fastapi_chat_user_left",
            "data": manager.get_connections()
            }))
        print(f"Client {username} left the chat")
