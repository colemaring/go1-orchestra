import websocket
import json
import sys
import time
import math
import threading
import random

sys.path.append('../lib/python/arm64')
import robot_interface as sdk

# use robots own UDP interface?
udp_robot = sdk.UDP(0xee, 8080, "192.168.123.161", 8082)

state_robot = sdk.HighState()
cmd = sdk.HighCmd()

udp_robot.InitCmdData(cmd)

def on_message(ws, message):
    cmd.mode = 0      # 0:idle, default stand      1:forced stand     2:walk continuously
    cmd.gaitType = 0
    cmd.speedLevel = 0
    cmd.footRaiseHeight = 0
    cmd.bodyHeight = 0
    cmd.euler = [0, 0, 0]
    cmd.velocity = [0, 0]
    cmd.yawSpeed = 0.0
    cmd.reserve = 0
    print("Received message:", message)
    data = json.loads(message)
    print("Type:", data["type"])

    if data["type"] == "dance1":
        cmd.mode = 1
        cmd.euler = [-0.3, 0, 0]

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

def walking_code():
    motiontime = 0
    while True:
        time.sleep(0.002)
        motiontime = motiontime + 1

        udp_robot.Recv()
        udp_robot.GetRecv(state_robot)
        # ... (rest of the walking code remains the same)
        print("Sending cmd=",cmd.mode)
        udp_robot.SetSend(cmd)
        udp_robot.Send()

random_number = str(random.randint(10, 99))  # generate a random 2-digit number
name = "python" + random_number

ws = websocket.WebSocketApp(f"ws://143.244.157.174:8080?name={name}",
                            on_message=on_message,
                            on_error=on_error,
                            on_close=on_close,
                            on_open=on_open)

ws_thread = threading.Thread(target=ws.run_forever)
ws_thread.start()

walking_code()

