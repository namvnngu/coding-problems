#include <stdio.h>
#include <stdlib.h>

int main(void) {
  FILE* fp = fopen("input.txt", "r");
  if(fp == NULL) {
    printf("Not able to open input.txt");
  }

  int result = 0;

  char line[100];
  int line_num = 0;

  int prev_window_sum = 0;
  int curr_window_sum = 0;
  const int WINDOW_SIZE = 3;

  int holders[3];

  while(fgets(line, 100, fp)) {
    line_num++;

    int num = atoi(line);

    if(line_num <= WINDOW_SIZE) {
      holders[line_num - 1] = num;
      prev_window_sum += num;
      continue;
    };

    holders[0] = holders[1];
    holders[1] = holders[2];
    holders[2] = num;
    curr_window_sum = holders[0] + holders[1] + holders[2];

    if(curr_window_sum > prev_window_sum) result++;
    prev_window_sum = curr_window_sum;
    curr_window_sum = 0;
  }

  printf("Answer: %d\n", result);

  fclose(fp);

  return 0;
}
