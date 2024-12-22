// Wokwi Custom Chip - For docs and examples see:
// https://docs.wokwi.com/chips-api/getting-started
//
// SPDX-License-Identifier: MIT
// Copyright 2023 Ronald Jamison

#include "wokwi-api.h"
#include <stdio.h>
#include <stdlib.h>

typedef struct {
  pin_t pin_in;
  pin_t pin_out;
} chip_state_t;

static void chip_timer_event(void *user_data);

void chip_init() {
  chip_state_t *chip = malloc(sizeof(chip_state_t));
  chip->pin_in = pin_init("IN", INPUT);
  chip->pin_out = pin_init("OUT", OUTPUT);

  const timer_config_t timer_config = {
    .callback = chip_timer_event,
    .user_data = chip,
  };
  timer_t timer_id = timer_init(&timer_config);
  timer_start(timer_id, 1000, true);
}

void chip_timer_event(void *user_data) {
  chip_state_t *chip = (chip_state_t*)user_data;
  int value = pin_read(chip->pin_in);
  printf("%d", value);
  pin_write(chip->pin_out, value);
}