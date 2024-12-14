const int RGB[] = {0, 2, 15};
int curMode = 0;
int on_multi_color = 0;
unsigned long rgbPrevTime = 0;

int curColor = 0, analogColor = 0;

void setRGB() {
  pinMode(RGB[0], OUTPUT);
  pinMode(RGB[1], OUTPUT);
  pinMode(RGB[2], OUTPUT);
}

void change_mode() {
  curMode = (curMode + 1) % 6;
}

void mode_off() { // Mode off
  on_multi_color = 0;

  analogWrite(RGB[0], 0);
  analogWrite(RGB[1], 0);
  analogWrite(RGB[2], 0);
}

void mode_red() { // Mode 0
  analogWrite(RGB[0], 255);
  analogWrite(RGB[1], 0);
  analogWrite(RGB[2], 0);
}

void mode_green() { // Mode 1
  analogWrite(RGB[0], 0);
  analogWrite(RGB[1], 255);
  analogWrite(RGB[2], 0);
}

void mode_blue() { // Mode 2
  analogWrite(RGB[0], 0);
  analogWrite(RGB[1], 0);
  analogWrite(RGB[2], 255);
}

void mode_white() { // Mode 3
  analogWrite(RGB[0], 255);
  analogWrite(RGB[1], 255);
  analogWrite(RGB[2], 255);
}

void mode_7color() { // Mode 4
  if ((on_multi_color == 1) && (millis() - rgbPrevTime >= 200)) {
    rgbPrevTime = millis();
    curColor = (curColor + 1) % 7 + 1;
    analogWrite(RGB[0], ((curColor >> 2) & 1) * 255);
    analogWrite(RGB[1], ((curColor >> 1) & 1) * 255);
    analogWrite(RGB[2], (curColor & 1) * 255);
  }
}

void mode_63color() { // Mode 5
  if ((on_multi_color == 2) && (millis() - rgbPrevTime >= 25)) {
    rgbPrevTime = millis();
    analogColor = (analogColor + 1) % 63 + 1;
    analogWrite(RGB[0], ((analogColor >> 4) & 3) * 64);
    analogWrite(RGB[1], ((analogColor >> 2) & 3) * 64);
    analogWrite(RGB[2], (analogColor & 3) * 64);
  }
}

void active_mode(String msg) {
  if (msg == "on") {
    switch (curMode) {
      case 0:
        {
          on_multi_color = 0;
          mode_red();
        }
        break;

      case 1:
        mode_green();
        break;

      case 2:
        mode_blue();
        break;

      case 3:
        mode_white();
        break;

      case 4:
        on_multi_color = 1;
        break;

      case 5:
        on_multi_color = 2;
        break;

      default:
        break;
    }
  } else mode_off();
}