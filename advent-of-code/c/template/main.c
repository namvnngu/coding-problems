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

  while (fgets(line, 100, fp)) {
    printf("%s", line);
    result++;
  }

  printf("Answer: %d\n", result);

  fclose(fp);

  return 0;
}
