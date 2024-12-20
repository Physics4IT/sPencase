const int PHOTORESISTOR = 35;

void setPhotoresistor() {
  pinMode(PHOTORESISTOR, INPUT);
}

String readPhotoresistor() {
  int value = analogRead(PHOTORESISTOR);
  return "{\"value\": " + String(value) + "}";
}