#include <TM1637Display.h>
#include <time.h>

#define CLK 14
#define DIO 13

TM1637Display display(CLK, DIO);

void set7segment()
{
  display.setBrightness(0x0F);
}
void display7segment(String timeDisplay)
{
  display.showNumberDecEx(timeDisplay.toInt(), 0b01000000, true);
}