#include <TM1637Display.h>

// Define TM1637 pins
#define CLK 33 // Clock pin
#define DIO 32 // Data pin

TM1637Display display(CLK, DIO);

void set7segment()
{
    // Initialize the TM1637 display
    display.setBrightness(0x0F); // Set maximum brightness
}

void use7segment(int num)
{
    display.showNumberDec(num);
}