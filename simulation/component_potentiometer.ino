const int POTENTIOMETER = 34;

void setPotentiometer() {
  pinMode(POTENTIOMETER, INPUT);
}

String readPotentiometer() {
  int value = analogRead(POTENTIOMETER);
  return "{\"value\": " + String(value) + "}";
}