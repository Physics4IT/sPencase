#include <TM1637Display.h>
#include <time.h>

#define CLK 14
#define DIO 13

// const char* ssid = "YOUR_WIFI_SSID";
// const char* password = "YOUR_WIFI_PASSWORD";

const char *ntpServer = "pool.ntp.org";
const long gmtOffset_sec = 25200; // Replace with your GMT offset (sec)
const int daylightOffset_sec = 0; // Replace with your daylight offset

TM1637Display display(CLK, DIO);

void set7segment()
{
    display.setBrightness(0x0F);

    // Init and get the time
    configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);
}

void displayTime()
{
    struct tm timeinfo;
    if (!getLocalTime(&timeinfo))
    {
        Serial.println("Failed to obtain time");
        return;
    }

    int timeDisplay = timeinfo.tm_hour * 100 + timeinfo.tm_min;
    display.showNumberDecEx(timeDisplay, 0b01000000, true);
}

void updateTime()
{
    displayTime();
    delay(1000); // Update every second
}