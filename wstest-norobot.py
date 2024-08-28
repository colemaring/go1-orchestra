import websocket
import json
import sys
import threading

connection_active = True

def on_message(ws, message):
    print("Received message:", message)

def on_error(ws, error):
    print("Error occurred:", error)

def on_close(ws, *args, **kwargs):
    global connection_active
    print("Connection closed")
    connection_active = False

def on_open(ws):
    print("Connected to the WebSocket server")
    ws.send(json.dumps({"type": "getConnectedClients"}))

def main():
    if len(sys.argv) != 2:
        print("Error: Name not specified")
        sys.exit(1)

    name  = sys.argv[1]

    try:
        ws = websocket.WebSocketApp(f"ws://143.244.157.174:8080?name={name}",
                                    on_message=on_message,
                                    on_error=on_error,
                                    on_close=on_close,
                                    on_open=on_open)

        ws_thread = threading.Thread(target=ws.run_forever)
        ws_thread.start()

        while connection_active:
            pass

    except (websocket.WebSocketException) as e:
        print(f"Error during WebSocket communication: {e}")
        sys.exit()

if __name__ == "__main__":
    main()
