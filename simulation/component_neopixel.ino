#include <Adafruit_NeoPixel.h>

const int NEOPIXEL = 4, NUMPIXELS = 16;
int neo_restart_point = 0;
int neo_prev_color = 0, neo_cur_pixel = 0, neo_mode = 0;
int on_neomulti_color = 0;
unsigned long neo_prev_time = 0;
bool neo_is_reset = false;

int neo_1bit_color = 0, neo_2bit_color = 0;

Adafruit_NeoPixel strip(NUMPIXELS, NEOPIXEL, NEO_RGB + NEO_KHZ800);

void setNeopixel() {
  strip.begin();
  strip.show();
  strip.setBrightness(250);
}

void change_mode_neo() {
  strip.clear();
  on_neomulti_color = (on_neomulti_color % 6) + 1;
  neo_restart_point = neo_cur_pixel % NUMPIXELS;
}

void neomode_off() {
  strip.clear();
  on_neomulti_color = 0;
  neo_cur_pixel = 1;
}

void neomode_red() {
  if (on_neomulti_color == 1) {
    if (millis() - neo_prev_time > 5) {
      neo_prev_time = millis();
      if (neo_is_reset && neo_cur_pixel == neo_restart_point) {
        strip.clear();
        neo_is_reset = false;
      } else {
        if (neo_cur_pixel == neo_restart_point) neo_is_reset = true;
        strip.setPixelColor(neo_cur_pixel, 0, 255, 0);
        neo_cur_pixel = (neo_cur_pixel + 1) % NUMPIXELS;
        strip.show();
      }
    }
  }
}

void neomode_green() {
  if (on_neomulti_color == 2) {
    if (millis() - neo_prev_time > 5) {
      neo_prev_time = millis();
      if (neo_is_reset && neo_cur_pixel == neo_restart_point) {
        strip.clear();
        neo_is_reset = false;
      } else {
        if (neo_cur_pixel == neo_restart_point) neo_is_reset = true;
        strip.setPixelColor(neo_cur_pixel, 255, 0, 0);
        neo_cur_pixel = (neo_cur_pixel + 1) % NUMPIXELS;
        strip.show();
      }
    }
  }
}

void neomode_blue() {
  if (on_neomulti_color == 3) {
    if (millis() - neo_prev_time > 5) {
      neo_prev_time = millis();
      if (neo_is_reset && neo_cur_pixel == neo_restart_point) {
        strip.clear();
        neo_is_reset = false;
      } else {
        if (neo_cur_pixel == neo_restart_point) neo_is_reset = true;
        strip.setPixelColor(neo_cur_pixel, 0, 0, 255);
        neo_cur_pixel = (neo_cur_pixel + 1) % NUMPIXELS;
        strip.show();
      }
    }
  }
}

void neomode_white() {
  if (on_neomulti_color == 4) {
    if (millis() - neo_prev_time > 5) {
      neo_prev_time = millis();
      if (neo_is_reset && neo_cur_pixel == neo_restart_point) {
        strip.clear();
        neo_is_reset = false;
      } else {
        if (neo_cur_pixel == neo_restart_point) neo_is_reset = true;
        strip.setPixelColor(neo_cur_pixel, 255, 255, 255);
        neo_cur_pixel = (neo_cur_pixel + 1) % NUMPIXELS;
        strip.show();
      }
    }
  }
}

void neomode_7color() {
  if (on_neomulti_color == 5) {
    if (millis() - neo_prev_time > 5) {
      neo_prev_time = millis();
      if (neo_is_reset && neo_cur_pixel == neo_restart_point) {
        strip.clear();
        neo_is_reset = false;
      } else {
        if (neo_cur_pixel == neo_restart_point) neo_is_reset = true;
        neo_1bit_color = (neo_1bit_color + 1) % 7 + 1;
        strip.setPixelColor(neo_cur_pixel, ((neo_1bit_color >> 1) & 1) * 255, ((neo_1bit_color >> 2) & 1) * 255, (neo_1bit_color & 1) * 255);
        neo_cur_pixel = (neo_cur_pixel + 1) % NUMPIXELS;
        strip.show();
      }
    }
  }
}

void neomode_63color() {
  if (on_neomulti_color == 6) {
    if (neo_is_reset && neo_cur_pixel == neo_restart_point) {
      strip.clear();
      neo_is_reset = false;
    } else {
      if (neo_cur_pixel == neo_restart_point) neo_is_reset = true;
      neo_2bit_color = (neo_2bit_color + 1) % 63 + 1;
      strip.setPixelColor(neo_cur_pixel, ((neo_2bit_color >> 2) & 3) * 64, ((neo_2bit_color >> 4) & 3) * 64, (neo_2bit_color & 3) * 64);
      neo_cur_pixel = (neo_cur_pixel + 1) % NUMPIXELS;
      strip.show();
    }
  }
}

void active_mode_neo(String msg) {
  if (msg == "on") on_neomulti_color = 1;
  else neomode_off();
}

void neo_switch_mode() {
  switch (on_neomulti_color) {
    case 1:
      neomode_red();
      break;

    case 2:
      neomode_green();
      break;

    case 3:
      neomode_blue();
      break;

    case 4:
      neomode_white();
      break;

    case 5:
      neomode_7color();
      break;

    case 6:
      neomode_63color();
      break;

    default:
      break;
  }
}