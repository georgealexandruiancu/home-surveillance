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
	
# change these as desired - they're the pins connected from the
# SPI port on the ADC to the Cobbler
SPICLK = 18
SPIMISO = 23
SPIMOSI = 24
SPICS = 25
mq2_dpin = 26
mq2_apin = 0

#port init
def init():
         GPIO.setwarnings(False)
         GPIO.cleanup()			#clean up at the end of your script
         GPIO.setmode(GPIO.BCM)		#to specify whilch pin numbering system
         # set up the SPI interface pins
         GPIO.setup(SPIMOSI, GPIO.OUT)
         GPIO.setup(SPIMISO, GPIO.IN)
         GPIO.setup(SPICLK, GPIO.OUT)
         GPIO.setup(SPICS, GPIO.OUT)
         GPIO.setup(mq2_dpin,GPIO.IN,pull_up_down=GPIO.PUD_DOWN)

#read SPI data from MCP3008(or MCP3204) chip,8 possible adc's (0 thru 7)
def readadc(adcnum, clockpin, mosipin, misopin, cspin):
        if ((adcnum > 7) or (adcnum < 0)):
                return -1
        GPIO.output(cspin, True)	

        GPIO.output(clockpin, False)  # start clock low
        GPIO.output(cspin, False)     # bring CS low

        commandout = adcnum
        commandout |= 0x18  # start bit + single-ended bit
        commandout <<= 3    # we only need to send 5 bits here
        for i in range(5):
                if (commandout & 0x80):
                        GPIO.output(mosipin, True)
                else:
                        GPIO.output(mosipin, False)
                commandout <<= 1
                GPIO.output(clockpin, True)
                GPIO.output(clockpin, False)

        adcout = 0
        # read in one empty bit, one null bit and 10 ADC bits
        for i in range(12):
                GPIO.output(clockpin, True)
                GPIO.output(clockpin, False)
                adcout <<= 1
                if (GPIO.input(misopin)):
                        adcout |= 0x1

        GPIO.output(cspin, True)
        
        adcout >>= 1       # first bit is 'null' so drop it
        return adcout
#main ioop
def main():
         init()
         time.sleep(1)
         while True:
                  GasLevel=readadc(mq2_apin, SPICLK, SPIMOSI, SPIMISO, SPICS)
                  if GPIO.input(mq2_dpin):
                           print("Gas not leak")
                           time.sleep(2)
                  else:
                           
                           db.child("gasValue").set(str("%.2f"%((GasLevel/1024.)))+" V")
                           db.child("gasDensity").set(str("%.2f"%((GasLevel/1024.)*125))+" %")
                           time.sleep(2)

if __name__ =='__main__':
         try:
                  main()
                  pass
         except KeyboardInterrupt:
                  pass

GPIO.cleanup()
         
         
