const int BUTTON = 17;

void setButton() {
  pinMode(BUTTON, INPUT);
}

int readButton() {
  return digitalRead(BUTTON);
}