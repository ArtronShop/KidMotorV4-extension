from machine import Pin, I2C
from time import sleep_ms
import os

ADDR = 0x08
MODE_INPUT = 0
MODE_OUTPUT = 1

machine = os.uname().machine
if ("KidBright32" in machine) or ("KidMotor V4" in machine):
    i2c1 = I2C(1, scl=Pin(5), sda=Pin(4), freq=400000)
elif "Mbits" in machine:
    i2c1 = I2C(0, scl=Pin(21), sda=Pin(22), freq=400000)
else:
    i2c1 = I2C(0, scl=Pin(22), sda=Pin(21), freq=400000)

def write(address, data):
  try:
    i2c1.writeto_mem(ADDR, address, bytes([ data ]))
  except:
    print("Write to KidMotor Error")

def writeByte(address, data):
  try:
    i2c1.writeto_mem(ADDR, address, data)
  except:
    print("Write to KidMotor Error")

def read(address):
  try:
    return i2c1.readfrom_mem(ADDR, address, 1)[0]
  except:
    print("Read from KidMotor Error")
  return 0

def read_bytes(address, n):
  try:
    return i2c1.readfrom_mem(ADDR, address, n)
  except:
    print("Read from KidMotor Error")
  return b""

def setMotor(ch, dir, speed):
  ch = int(ch - 1)
  if speed > 100:
    speed = 100
  speed = int(speed * (80.0 / 100.0))
  write(0x00 if ch == 0 else 0x01, (int(dir) << 7) | (int(speed) & 0x7F))

mode_tmp = 0
def mode(ch, mode):
  global mode_tmp
  ch = int(ch - 1)
  if mode == 1:
    mode_tmp |= 1 << ch
  else:
    mode_tmp &= ~(1 << ch)
  write(0x02, mode_tmp)

out_tmp = 0
def setOutput(ch, val):
  mode(ch, MODE_OUTPUT)
  global out_tmp
  ch = int(ch - 1)
  if val:
    out_tmp |= 1 << ch
  else:
    out_tmp &= ~(1 << ch)
  write(0x04, out_tmp)

def getInput(ch):
  mode(ch, MODE_INPUT)
  ch = int(ch - 1)
  return 1 if (read(0x03) & (1 << ch)) else 0

def getADC(ch):
  ch = int(ch - 1)
  write(0x05, 0x80 | (ch & 0x07)) # Write ADC ch and set FLAG
  errorCount = 0
  while errorCount < 100:
    if (read(0x05) & 0x80) == 0:
      break
    else:
      sleep_ms(1)
      errorCount = errorCount + 1
  
  if errorCount >= 100:
    return 0

  buff = read_bytes(0x06, 2)
  if len(buff) == 2:
    return (buff[0] << 8) | buff[1]
  return 0

def getADC(ch):
  ch = int(ch - 1)
  write(0x05, 0x80 | (ch & 0x07)) # Write ADC ch and set FLAG
  errorCount = 0
  while errorCount < 100:
    if (read(0x05) & 0x80) == 0:
      break
    else:
      sleep_ms(1)
      errorCount = errorCount + 1
  
  if errorCount >= 100:
    return 0

  buff = read_bytes(0x06, 2)
  if len(buff) == 2:
    return (buff[0] << 8) | buff[1]
  return 0

def setPWM(ch, val):
  ch = int(ch - 1)
  writeByte(0x10 + (ch * 2), bytes([ (val >> 8) & 0xFF, val & 0xFF ]))

def servoAngle(ch, angle):
  ch = int(ch - 1)
  write(0x20 + ch, angle)

def servoUnlock(ch):
  servoAngle(ch, 255)

def distance(trig_ch, echo_ch):
  trig_ch = int(trig_ch - 1)
  echo_ch = int(echo_ch - 1)
  write(0x30, 0x80 | ((trig_ch & 0x07) << 3) | (echo_ch & 0x07))
  errorCount = 0
  while errorCount < 100:
    if (read(0x30) & 0x80) == 0:
      break
    else:
      sleep_ms(1)
      errorCount = errorCount + 1
  
  if errorCount >= 100:
    return 0

  buff = read_bytes(0x31, 2)
  if len(buff) == 2:
    return (buff[0] << 8) | buff[1]
  return 0