const int BUZZER = 16;
unsigned long buzzer_prevTime = 0;
bool on_sounding = false;
String alarmList[20] = {};
int alarmLength = 0;

void setBuzzer() {
  pinMode(BUZZER, OUTPUT);
}

void handleAddAlarm(String msg) {
  alarmLength = msg.length() / 5;
  for (int i = 0; i < alarmLength; i++) {
    alarmList[i] = msg.substring(i * 5, (i + 1) * 5);
    Serial.println(alarmList[i]);
  }
}

bool compareAlarm(String msg) {
  for (int i = 0; i < alarmLength; i++) {
    if (alarmList[i] == msg) {
      return true;
    }
  }
  return false;
}

void buzzer_off() {
  noTone(BUZZER);
}

void no_song() {
  if (on_sounding && millis() - buzzer_prevTime > 5000) {
    noTone(BUZZER);
    buzzer_prevTime = millis();
    on_sounding = false;
  }
}

void song_1() {
  on_sounding = true;
  tone(BUZZER, 100);
}

void song_2() {
  on_sounding = true;
  tone(BUZZER, 200);
}

void song_3() {
  on_sounding = true;
  tone(BUZZER, 300);
}

void song_4() {
  on_sounding = true;
  tone(BUZZER, 400);
}

void song_5() {
  on_sounding = true;
  tone(BUZZER, 500);
}

void buzzer_switch_song(char num) {
  int song_num = num - '0';
  switch (song_num) {
    case 1:
      song_1();
      break;

    case 2:
      song_2();
      break;

    case 3:
      song_3();
      break;

    case 4:
      song_4();
      break;

    case 5:
      song_5();
      break;

    default:
      break;
  }
}