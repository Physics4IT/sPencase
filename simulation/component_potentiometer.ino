const int POTENTIOMETER = 14;

void setPotentiometer() {
  pinMode(POTENTIOMETER, INPUT);
}

String readPotentionmeter() {
  int value = analogRead(POTENTIOMETER);
  return "{\"value\": " + String(value) + "}";
}