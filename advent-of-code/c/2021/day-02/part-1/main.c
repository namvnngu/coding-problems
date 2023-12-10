#include <limits.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int get_num(char *line) {
  int count = 0;
  int num = 0;
  size_t len = strlen(line);

  for (int i = len - 1; i >= 0; i--) {
    char c = line[i];
    if (c < '0' || c > '9')
      continue;
    num += 10 * count + atoi(&c);
    count++;
  }
  return num;
}

int main(void) {
  FILE *fp = fopen("input.txt", "r");
  if (fp == NULL) {
    printf("Not able to open input.txt");
  }

  int depth = 0;
  int horizontal = 0;
  char line[10];

  while (fgets(line, 10, fp)) {
    char first_letter = line[0];
    int num = get_num(line);
    switch (first_letter) {
    case 'f':
      horizontal += num;
      break;
    case 'u':
      depth -= num;
      break;
    case 'd':
      depth += num;
      break;
    }
  }

  printf("Answer: %d\n", depth * horizontal);

  fclose(fp);

  return 0;
}
