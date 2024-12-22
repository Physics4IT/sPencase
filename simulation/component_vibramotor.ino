const int VIBRAMOTOR = 32;

void setVibramotor() {
  pinMode(VIBRAMOTOR, OUTPUT);
}

void vibrate(bool on) {
  if (on) {
    digitalWrite(VIBRAMOTOR, HIGH);
  }
  else {
    digitalWrite(VIBRAMOTOR, 0);
  }
}