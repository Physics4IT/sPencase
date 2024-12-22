const int BUTTON = 17;
bool button_prev_state = false, button_cur_state = false, button_can_send = false;

void setButton() {
  pinMode(BUTTON, INPUT);
}

String readButton() {
  button_prev_state = button_cur_state;
  button_cur_state = digitalRead(BUTTON);
  if (!button_prev_state && button_cur_state) button_can_send = true;
  // else if (button_can_send && !button_cur_state) {
  //   button_can_send = false;
  //   return "{\"value\": 1}";
  // }
  // return "{\"value\": 0}";
  // Or this one?
  if (!button_prev_state && button_cur_state) return "{\"value\": 1}";
  return "{\"value\": 0}";
}