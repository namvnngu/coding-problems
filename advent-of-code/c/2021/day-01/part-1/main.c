#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

int main(void) {
  FILE* fp = fopen("input.txt", "r");
  if(fp == NULL) {
    printf("Not able to open input.txt");
  }

  int count = 0;
  char line[100];
  int prev = INT_MAX;

  while(fgets(line, 100, fp)) {
    int curr = atoi(line);
    if(curr > prev) count++;
    prev = curr;
  }

  printf("Answer: %d\n", count);

  fclose(fp);

  return 0;
}
