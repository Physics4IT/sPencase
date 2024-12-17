#include <DHT.h>
#include <cstring>

const int DHTPIN = 27;

DHT dht(DHTPIN, DHT22);

void setDHT()
{
  dht.begin();
}

String readDHT()
{
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  String result = String("{\"temperature\": ") + String(temperature) + String(", \"humidity\": ") + String(humidity) + String("}");
  return result;
}