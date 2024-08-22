import websocket
import json
import sys
import time
import math
import threading

sys.path.append('../lib/python/arm64')
import robot_interface as sdk

udp_robot = sdk.UDP(0xee, 8080, "192.168.123.161", 8082)

state_robot = sdk.HighState()
cmd = sdk.HighCmd()

udp_robot.InitCmdData(cmd)

def on_message(ws, message):
    cmd.mode = 0 
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

    if data["type"] == "tilt":
        cmd.mode = 1
        cmd.euler = [-0.3, 0, 0]

    elif data["type"] == "dance":
        cmd.mode = 13
        cmd.gaitType = 1
        cmd.velocity = [0.0, 0]
    
    elif data["type"] == "walkF":
        cmd.mode = 2
        cmd.gaitType = 1
        cmd.velocity[0] = 0.3
        cmd.footRaiseHeight = 0.1

    elif data["type"] == "walkB":
        cmd.mode = 2
        cmd.gaitType = 1
        cmd.velocity[0] = -0.3
        cmd.footRaiseHeight = 0.1

    elif data["type"] == "form1":
        if name == "814":
            cmd.mode = 2
            cmd.gaitType = 1
            cmd.velocity[0] = -0.3
            cmd.footRaiseHeight = 0.1
        elif name == "514": # change robots name
            cmd.mode = 2
            cmd.gaitType = 1
            cmd.velocity[0] = 0.3
            cmd.footRaiseHeight = 0.1
        elif name == "699":
            cmd.mode = 2
            cmd.gaitType = 1
            cmd.velocity[0] = -0.3
            cmd.footRaiseHeight = 0.1

        # for 5 seconds
        start_time = time.time()
        while time.time() - start_time < 2:
            udp_robot.SetSend(cmd)
            udp_robot.Send()
            time.sleep(0.002)

        # stop formation
        cmd.mode = 0 
        cmd.gaitType = 0
        cmd.speedLevel = 0
        cmd.footRaiseHeight = 0
        cmd.bodyHeight = 0
        cmd.euler = [0, 0, 0]
        cmd.velocity = [0, 0]
        cmd.yawSpeed = 0.0
        cmd.reserve = 0

    elif data["type"] == "stop":
        cmd.mode = 0 
        cmd.gaitType = 0
        cmd.speedLevel = 0
        cmd.footRaiseHeight = 0
        cmd.bodyHeight = 0
        cmd.euler = [0, 0, 0]
        cmd.velocity = [0, 0]
        cmd.yawSpeed = 0.0
        cmd.reserve = 0
        
def on_error(ws, error):
    print("Error occurred:", error)

def on_close(ws, *args, **kwargs):
    print("Connection closed")

def on_open(ws):
    print("Connected to the WebSocket server")
    ws.send(json.dumps({"type": "getConnectedClients"}))

def walking_code():
    while True:
        time.sleep(0.002)

        udp_robot.Recv()
        udp_robot.GetRecv(state_robot)
        udp_robot.SetSend(cmd)
        udp_robot.Send()

if len(sys.argv) != 2:
        print("Error: Name not specified")
        sys.exit(1)

name = sys.argv[1]

ws = websocket.WebSocketApp(f"ws://143.244.157.174:8080?name={name}",
                            on_message=on_message,
                            on_error=on_error,
                            on_close=on_close,
                            on_open=on_open)

ws_thread = threading.Thread(target=ws.run_forever)
ws_thread.start()

walking_code()
