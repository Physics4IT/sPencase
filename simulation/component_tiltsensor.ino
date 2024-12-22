#include <Wire.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#include <math.h>

const int SDA_PIN = 5;
const int SCL_PIN = 18;
Adafruit_MPU6050 mpu;
TwoWire I2C_2 = TwoWire(1);

const float ACC_THRESHOLD = 1.5;
const float GYRO_THRESHOLD = 50;

void setTiltSensor() {
  I2C_2.begin(SDA_PIN, SCL_PIN, 10000);
  mpu.begin(0x68, &I2C_2);
}

String readTiltSensor() {
  sensors_event_t accel, gyro, temp;
  mpu.getEvent(&accel, &gyro, &temp);

  // MPU6050 đo gia tốc bằng đơn vị m/s² và tốc độ góc = rad/s
  // Phải đổi đơn vị để đồng nhất với lựa chọn trên thiết bị mô phỏng
  
  // 1 g = 9.81 m/s²
  float accelX = accel.acceleration.x / 9.81;
  float accelY = accel.acceleration.y / 9.81;
  float accelZ = accel.acceleration.z / 9.81;
  
  // 1 rad/s = 57.2957795 °/s
  float gyroX = gyro.gyro.x * 57.2957795;
  float gyroY = gyro.gyro.y * 57.2957795;
  float gyroZ = gyro.gyro.z * 57.2957795;

  float totalAccel = sqrt(accelX * accelX + accelY * accelY + accelZ * accelZ);
  float totalGyro = sqrt(gyroX * gyroX + gyroY * gyroY + gyroZ * gyroZ);
  
  bool is_moving = false;
  // Nếu có chuyển động mạnh, trả về 1, ngược lại trả về 0
  if (totalAccel > ACC_THRESHOLD || totalGyro > GYRO_THRESHOLD) {
    is_moving = true;
  }
  else {
    is_moving = false;
  }
  return String("{\"value\": ") + String(is_moving) + String("}");
}
