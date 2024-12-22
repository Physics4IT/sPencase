const int UVS_PIN = 33;

void setUVS() {
  pinMode(UVS_PIN, INPUT);
}

String readUVS() {
  int value = analogRead(UVS_PIN);
  return "{\"value\": " + String(value) + "}";
}