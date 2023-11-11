#include <limits.h>
#include <stdio.h>
#include <stdlib.h>

int main(void) {
  FILE *fp = fopen("input.txt", "r");
  if (fp == NULL) {
    printf("Not able to open input.txt");
  }

  int result = 0;
  char line[100];

  for (int row = 0; fgets(line, sizeof(line), fp); row++) {
    printf("%s", line);
    result++;
  }

  printf("Answer: %d\n", result);

  fclose(fp);

  return 0;
}
