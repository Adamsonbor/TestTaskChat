from fastapi import WebSocket

class ConnectionManager:
    def __init__(self):
        self.active_connections = {}


    async def connect(self, websocket: WebSocket, username: str):
        await websocket.accept()
        self.active_connections[username] = websocket


    def disconnect(self, username: str):
        try:
            self.active_connections.pop(username)
        except KeyError:
            pass


    async def send_personal_message(self, message: str, username: str):
        try:
            await self.active_connections[username].send_text(message)
        except KeyError:
            pass


    async def send_all(self, message: str):
        for websocket in self.active_connections.values():
            await websocket.send_text(message)


    def get_connections(self):
        return [{"username": username} for username in self.active_connections.keys()]


#    receive_message: {
#        "to"?: string (username),
#        "data": {
#             "username": string,
#             "message": string,
#             "timestamp": string,
#        }
#    }
#    send_message: {
#        "from": string (username or [server]),
#        "data": {
#             "username": string,
#             "message": string,
#             "timestamp": string,
#             },
#    }
#
# server:
#
#    endpoint /ws/chat/{username}:
#    - add connection to connection manager
#    - if message has "to" field, send message to specific user
#    - if message has no "to" field, send message to all users
#    - if connection is closed, remove connection from connection manager
#    

# client:
#   HomeView:
#   - Chat component (list of messages) global chat by default
#       - Input component (input field and send button)

#   - Friends component (list of users) (click on user to open chat with user) global chat by default
#

#   - connect to /ws/chat/{username}
#   - listen for messages
#   - if message from server_fastapi_chat_new_user, add user to user list
#   - if message from server_fastapi_chat_user_left, remove user from user list

