#include <ESP32Servo.h>

Servo servo;
const int SERVOPIN = 12;

void setServo() {
  servo.attach(SERVOPIN);
}

void writeServo(int degree) {
  if (degree >= 500) return;
  servo.write(degree);
}