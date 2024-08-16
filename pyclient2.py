import websocket
import json
import sys
import time
import math

sys.path.append('../lib/python/arm64')
import robot_interface as sdk

# use robots own UDP interface?
udp_robot = sdk.UDP(0xee, 8080, "192.168.123.161", 8082)

state_robot = sdk.HighState()
cmd_robot = sdk.HighCmd()

udp_robot.InitCmdData(cmd_robot)

def on_message(ws, message):
    print("Received message:", message)
    data = json.loads(message)
    print("Type:", data["type"])

    if data["type"] == "dance1":
        cmd.mode = 12
        cmd.gaitType = 1
        cmd.velocity = [0.0, 0]  # Dance 1 command

    elif data["type"] == "dance2":
        cmd.mode = 13
        cmd.gaitType = 1
        cmd.velocity = [0.0, 0]  # Dance 2 command

def on_error(ws, error):
    print("Error occurred:", error)

def on_close(ws, *args, **kwargs):
    print("Connection closed")

def on_open(ws):
    print("Connected to the WebSocket server")
    ws.send(json.dumps({"type": "getConnectedClients"}))

random_number = str(random.randint(10, 99))  # generate a random 2-digit number
name = "python" + random_number

ws = websocket.WebSocketApp(f"ws://143.244.157.174:8080?name={name}",
                            on_message=on_message,
                            on_error=on_error,
                            on_close=on_close,
                            on_open=on_open)
ws.run_forever()

while True:
    time.sleep(0.01)
    udp_robot.Recv()
    udp_robot.GetRecv(state_robot)
