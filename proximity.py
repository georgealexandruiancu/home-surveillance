import RPi.GPIO as GPIO
import time
import pyrebase

config = {
  "apiKey": "AIzaSyALCt4Kjh-IUhFHIn7z57S7j8HJ4YVgcP8",
  "authDomain": "proiectunitbv-4c182.firebaseapp.com",
  "databaseURL": "https://proiectunitbv-4c182.firebaseio.com",
  "projectId": "proiectunitbv-4c182",
  "storageBucket": "proiectunitbv-4c182.appspot.com",
  "messagingSenderId": "486158175268",
  "appId": "1:486158175268:web:0709fb63895983fe331cb1"
}

firebase = pyrebase.initialize_app(config)
db = firebase.database()

GPIO.setmode(GPIO.BOARD)

TRIG = 11
ECHO = 13
i=0

GPIO.setup(TRIG,GPIO.OUT)
GPIO.setup(ECHO,GPIO.IN)

GPIO.output(TRIG, False)
time.sleep(2)

try:
    while True:
       GPIO.output(TRIG, True)
       time.sleep(0.00001)
       GPIO.output(TRIG, False)

       while GPIO.input(ECHO)==0:
          pulse_start = time.time()

       while GPIO.input(ECHO)==1:
          pulse_end = time.time()

       pulse_duration = pulse_end - pulse_start

       distance = pulse_duration * 17150

       distance = round(distance+1.15, 2)

       db.child("distance").set(str("%.2f"%((distance)))+" cm")

       time.sleep(2)

except KeyboardInterrupt:
     GPIO.cleanup()