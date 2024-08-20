  # go1-orchestra
Using websockets to synchronize multiple Go1 robots.

server setup on Digital Ocean: <br>
git clone <br>
cd into server  <br>
npm i  <br>
node server  <br> <br>

robot setup: <br>


Notes: <br>
Moving sideways left <br>
cmd.mode = 2; <br>
cmd.gaitType = 1; <br>
cmd.velocity[1] = 0.3f; <br>
cmd.footRaiseHeight = 0.1; <br> <br>
        
Moving sideways right <br>
 cmd.mode = 2; <br>
cmd.gaitType = 1; <br>
cmd.velocity[1] = -0.3f; <br>
cmd.footRaiseHeight = 0.1; <br> <br>

Moving forwards <br>
cmd.mode = 2; <br>
 cmd.gaitType = 1; <br>
cmd.velocity[0] = 0.3f; <br>
cmd.footRaiseHeight = 0.1; <br> <br>

Rotate left <br>
cmd.mode = 2; <br>
cmd.gaitType = 1; <br>
cmd.velocity[0] = 0.0f; <br>
cmd.footRaiseHeight = 0.1; <br>
cmd.yawSpeed = -0.5; <br> <br>

Rotate right  <br>
cmd.mode = 2; <br>
cmd.gaitType = 1; <br>
cmd.velocity[0] = 0.0f; <br>
cmd.footRaiseHeight = 0.1; <br>
cmd.yawSpeed = 0.5;




