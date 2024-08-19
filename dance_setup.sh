git clone https://github.com/unitreerobotics/unitree_legged_sdk.git
cd unitree_legged_sdk
mkdir build
cd build
pip3 install catkin_pkg
sudo apt install libmsgpack*
cmake -DPYTHON_BUILD=TRUE ..
make
