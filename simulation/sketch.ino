#include <WiFi.h>
#include <PubSubClient.h>
#include <cstring>

void active_mode(String msg = "off");
void active_mode_neo(String msg = "off");

const int DELAY_TIME = 1000;

const char *ssid = "Wokwi-GUEST";
const char *password = "";
// const char* mqttServer = "test.mosquitto.org";
const char *mqtt_broker = "broker.emqx.io";
const char *mqtt_username = "emqx";
const char *mqtt_password = "public";
int port = 1883;

WiFiClient espClient;
PubSubClient client(espClient);

void wifiConnect()
{
  WiFi.begin(ssid, password, 6);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println(" Connected!");
}

void setup()
{
  Serial.begin(9600);
  Serial.print("Connecting to WiFi");

  wifiConnect();

  setRGB();
  setNeopixel();
  setLcd();
  setBuzzer();
  setButton();
  setDHT();
  setUltrasonic();
  setTiltSensor();
  set7segment();
  setPotentiometer();
  setPhotoresistor();
  setServo();
  setUVS();

  client.setServer(mqtt_broker, port);
  // client.setServer(mqttServer, port);
  client.setCallback(callback);
}

void mqttReconnect()
{
  while (!client.connected())
  {
    Serial.print("Attempting MQTT connection...");
    if (client.connect("sPencaseCLC06"), mqtt_username, mqtt_password)
    {
      Serial.println(" connected");
      client.subscribe("sub/rgb");
      client.subscribe("sub/neopixel");
      client.subscribe("sub/servo");
      client.subscribe("sub/sevenSegment");
      client.subscribe("sub/buzzer");
      client.subscribe("sub/lcd");
      client.subscribe("sub/vibration");
      client.subscribe("sub/button");
    }
    else
    {
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

void callback(char *topic, byte *message, unsigned int length)
{
  Serial.println(topic);

  // Conver byte* to String
  String strMsg;
  for (int i = 0; i < length; i++)
  {
    strMsg += (char)message[i];
  }

  // Check received data
  if (strcmp(topic, "sub/rgb") == 0)
  {
    (strMsg == "on") ? active_mode(strMsg) : active_mode();
  }
  else if (strcmp(topic, "sub/lcd") == 0)
  {
    // 0: temperature, 1: humidity, 2: temperature & humidity as string, 3: error
    if (strMsg[0] == '0')
      printTempHumid(strMsg.substring(2), "");
    else if (strMsg[0] == '1')
      printTempHumid("", strMsg.substring(2));
    else if (strMsg[0] == '2')
      printLcdString(strMsg.substring(2));
    else if (strMsg[0] == '3')
    {
      (strMsg.substring(2) == "on") ? backlight_on() : backlight_off();
    }
    else
      printLcdError();
  }
  else if (strcmp(topic, "sub/neopixel") == 0)
  {
    (strMsg == "on") ? active_mode_neo(strMsg) : active_mode_neo();
  }
  else if (strcmp(topic, "sub/servo") == 0)
  {
    writeServo(strMsg.toInt());
  }
  else if (strcmp(topic, "sub/sevenSegment") == 0)
  {
    use7segment(1234);
  }
  else if (strcmp(topic, "sub/buzzer") == 0)
  {
    ((char)message[0] == '0') ? buzzer_off() : buzzer_switch_song((char)message[0]);
  }
  else if (strcmp(topic, "sub/vibration") == 0)
  {
  }
  else if (strcmp(topic, "sub/button") == 0)
  {
    if (strMsg == "clicked")
    {
      change_mode();
      active_mode("on");
    }
  }

  Serial.println(strMsg);
}

void loop()
{
  if (!client.connected())
  {
    mqttReconnect();
  }
  client.loop();

  mode_7color();
  mode_63color();

  neo_switch_mode();
  use7segment(1234); // DEBUG ONLY, DELETE WHEN DONE

  String buffer_dht = readDHT();
  String buffer_ultrasonic = readUltrasonic();
  String buffer_tilt = readTiltSensor();
  // String btnState = readButton();
  String buffer_pot = readPotentiometer();
  String buffer_photo = readPhotoresistor();
  String buffer_uvs = readUVS();

  // Serial.println(buffer_tilt);
  // Serial.println(buffer_pot);
  // Serial.println(buffer_photo);
  Serial.println(buffer_uvs);

  client.publish("pub/potentiometer", buffer_pot.c_str());
  // client.publish("pub/button", btnState.c_str());
  client.publish("pub/photoresistor", buffer_photo.c_str());
  client.publish("pub/dht", buffer_dht.c_str());
  client.publish("pub/uvSensor", buffer_uvs.c_str());
  // client.publish("pub/tiltSensor", buffer_tilt.c_str());
  client.publish("pub/ultrasonicSensor", buffer_ultrasonic.c_str());

  delay(500);
}