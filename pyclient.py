import websocket
import json
import random

def on_message(ws, message):
    print("Received message:", message)

def on_error(ws, error):
    print("Error occurred:", error)

def on_close(ws, *args, **kwargs):
    print("Connection closed")

def on_open(ws):
    print("Connected to the WebSocket server")
    ws.send(json.dumps({"type": "getConnectedClients"}))

# to make the name unique
random_number = str(random.randint(0, 9999))
name = "python" + random_number

ws = websocket.WebSocketApp(f"ws://143.244.157.174:8080?name={name}",
                            on_message=on_message,
                            on_error=on_error,
                            on_close=on_close,
                            on_open=on_open)

ws.run_forever()
