#include <Wire.h>
#include <MPU6050.h>
#include <math.h>

// Create MPU6050 object
const int SDA_PIN = 5;
const int SCL_PIN = 18;
MPU6050 mpu;

// Thresholds for detecting sudden movement
const float ACC_THRESHOLD = 1.5; // Acceleration in g
const float GYRO_THRESHOLD = 50; // Gyro in °/s

void setTiltSensor()
{
    Serial.begin(115200);
    Wire.begin(SDA_PIN, SCL_PIN);
    mpu.initialize();
}

String readTiltSensor()
{
    // Read raw sensor data
    int16_t ax, ay, az;
    int16_t gx, gy, gz;
    mpu.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);

    // 1 g = 9.81 m/s²
    float accelX = ax / 9.81;
    float accelY = ay / 9.81;
    float accelZ = az / 9.81;

    // 1 rad/s = 57.2957795 deg/s
    // MPU6050 đo tốc độ góc = rad/s
    float gyroX = gx * 57.2957795;
    float gyroY = gy * 57.2957795;
    float gyroZ = gz * 57.2957795;

    // Calculate the total acceleration magnitude
    float totalAccel = sqrt(accelX * accelX + accelY * accelY + accelZ * accelZ);

    // Calculate the total gyro magnitude
    float totalGyro = sqrt(gyroX * gyroX + gyroY * gyroY + gyroZ * gyroZ);

    bool is_moving = false;
    // Check for sudden movement
    return "{\"Acceleration\": " + String(totalAccel) +
           ", \"Gyroscope\": " + String(totalGyro) + "}";
}
