import json
import os
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

os.system("curl  http://localhost:4040/api/tunnels > tunnels.json")

with open('tunnels.json') as data_file:    
    datajson = json.load(data_file)


for i in datajson['tunnels']:
  msg = i['public_url']

db.child("httpCamServer").set(msg)