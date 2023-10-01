#include <limits.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
  FILE *file = fopen("input.txt", "r");

  if (file == NULL) {
    printf("Not able to open input.txt");
  }

  int MAX_CHARS = 20;
  int MAX_LINES = 1000;

  int total_of_lines = 0;

  char content[MAX_LINES][MAX_CHARS];
  for (int i = 0; fgets(content[i], MAX_CHARS, file); i++) {
    content[i][strlen(content[i]) - 1] = '\0';
    total_of_lines += 1;
  }

  int ch_length = strlen(content[0]);

  char co2_scrubber[MAX_LINES][MAX_CHARS];
  int total_co2_scrubber_lines = total_of_lines;

  char oxygen_generator[MAX_LINES][MAX_CHARS];
  int total_oxygen_generator_lines = total_of_lines;

  for (int i = 0; i < total_of_lines; i++) {
    strcpy(co2_scrubber[i], content[i]);
    strcpy(oxygen_generator[i], content[i]);
  }

  // CO2 scrubber rating
  int co2_scrubber_char_i = 0;
  while (1) {
    int zero_count = 0;
    int one_count = 0;

    for (int line = 0; line < total_co2_scrubber_lines; line++) {
      if (co2_scrubber[line][co2_scrubber_char_i] == '1')
        one_count++;
      else
        zero_count++;
    }

    char least = zero_count <= one_count ? '0' : '1';
    char temp_co2_scrubber[MAX_LINES][MAX_CHARS];

    for (int line = 0, i = 0; line < total_co2_scrubber_lines; line++) {
      if (co2_scrubber[line][co2_scrubber_char_i] != least)
        continue;
      strcpy(temp_co2_scrubber[i], co2_scrubber[line]);
      i++;
    }

    total_co2_scrubber_lines = least == '0' ? zero_count : one_count;

    for (int line = 0; line < total_co2_scrubber_lines; line++)
      strcpy(co2_scrubber[line], temp_co2_scrubber[line]);

    if (total_co2_scrubber_lines == 1)
      break;

    if (co2_scrubber_char_i == ch_length - 1)
      co2_scrubber_char_i = 0;
    else
      co2_scrubber_char_i++;
  }

  // Oxygen generator rating
  int oxygen_generator_char_i = 0;
  while (1) {
    int zero_count = 0;
    int one_count = 0;

    for (int line = 0; line < total_oxygen_generator_lines; line++) {
      if (oxygen_generator[line][oxygen_generator_char_i] == '1')
        one_count++;
      else
        zero_count++;
    }

    char most = one_count >= zero_count ? '1' : '0';
    char temp_oxygen_generator[MAX_LINES][MAX_CHARS];

    for (int line = 0, i = 0; line < total_oxygen_generator_lines; line++) {
      if (oxygen_generator[line][oxygen_generator_char_i] != most)
        continue;
      strcpy(temp_oxygen_generator[i], oxygen_generator[line]);
      i++;
    }

    total_oxygen_generator_lines = most == '0' ? zero_count : one_count;

    for (int line = 0; line < total_oxygen_generator_lines; line++)
      strcpy(oxygen_generator[line], temp_oxygen_generator[line]);

    if (total_oxygen_generator_lines == 1)
      break;

    if (oxygen_generator_char_i == ch_length - 1)
      oxygen_generator_char_i = 0;
    else
      oxygen_generator_char_i++;
  }

  int co2_scrubber_rating = 0;
  int oxygen_generator_rating = 0;
  for (int i = ch_length - 1, multiplier = 0; i >= 0; i--, multiplier++) {
    oxygen_generator_rating += (oxygen_generator[0][i] - '0') * (1 << multiplier);
    co2_scrubber_rating += (co2_scrubber[0][i] - '0') * (1 << multiplier);
  }

  printf("Answer: %d\n", oxygen_generator_rating * co2_scrubber_rating);

  fclose(file);

  return 0;
}
