import subprocess
import sys
from threading import Thread

subprocess.Popen(["python3", "/home/pi/Desktop/home-surveillance/proximity.py"] + sys.argv[1:])
subprocess.Popen(["python3", "/home/pi/Desktop/home-surveillance/mq2.py"] + sys.argv[1:])
