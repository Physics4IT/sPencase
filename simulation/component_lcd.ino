#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27,16,2); 
String temperature = "", humidity = "";

void setLcd() {
  Wire.begin(21, 22);
  lcd.init();                    
  lcd.backlight();
}

void backlight_on() {
  lcd.backlight();
}

void backlight_off() {
  lcd.noBacklight();
}

void printTempHumid(String temp, String humid) {
  lcd.clear();
  if (temp != "") temperature = temp;
  if (humid != "") humidity = humid;

  lcd.setCursor(0, 0);
  lcd.print("Temp: ");
  lcd.setCursor(12, 0);
  lcd.print(temperature);
  lcd.setCursor(0, 1);
  lcd.print("Humid: ");
  lcd.setCursor(12, 1);
  lcd.print(humidity);
}

void printLcdString(String lcdString) {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print(lcdString.substring(0, 16));
  lcd.setCursor(0, 1);
  lcd.print(lcdString.substring(16));
}

void printLcdError() {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Oops, an error");
  lcd.setCursor(0, 1);
  lcd.print("happened");
}

void clearScreen() {
  lcd.clear();
}