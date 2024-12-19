const int PHOTORESISTOR = 13;

void setPhotoresistor() {
  pinMode(PHOTORESISTOR, INPUT);
}

String readPhotoresistor() {
  int value = analogRead(PHOTORESISTOR);
  return "{\"value\": " + String(value) + "}";
}