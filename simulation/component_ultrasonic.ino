// TRIG: phát tín hiệu
// ECHO: thu tín hiệu
const int TRIGPIN = 26;
const int ECHOPIN = 25;

void setUltrasonic()
{
  pinMode(TRIGPIN, OUTPUT);
  pinMode(ECHOPIN, INPUT);
  Serial.begin(9600);
}

long getDistance()
{
  digitalWrite(TRIGPIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIGPIN, HIGH);
  delayMicroseconds(5);
  digitalWrite(TRIGPIN, LOW);

  long duration = pulseIn(ECHOPIN, HIGH);
  long distanceCm = duration * 0.034 / 2;
  return distanceCm;
}

String readUltrasonic()
{
  return String("{\"value\": ") + String(getDistance()) + String("}");
}