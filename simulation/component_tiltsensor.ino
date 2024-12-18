#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#include <Wire.h>

const int SDA_PIN = 13;
const int SCL_PIN = 14;
Adafruit_MPU6050 mpu;

void setTiltSensor()
{
    Serial.begin(9600);
    Wire.begin(SDA_PIN, SCL_PIN);
    while (!mpu.begin())
    {
        Serial.println("Failed to find MPU6050 sensor! Retrying in 0.1 second...");
        delay(100); // Wait for 0.1 second before retrying
    }
    Serial.println("MPU6050 Found!");
}

sensors_event_t event;

String readTiltSensor()
{
    sensors_event_t accel, gyro, temp;
    mpu.getEvent(&accel, &gyro, &temp);

    return String("{\"value\": ") + String(0) + String("}");
}

/**
Problem:
- Không thể tìm thấy MPU6050 -> thử pin khác hay sửa lại code
- In độ nghiêng là 1 con số -> giờ có 3 trục x,y,z đến 3 số thì in kiểu gì?
**/