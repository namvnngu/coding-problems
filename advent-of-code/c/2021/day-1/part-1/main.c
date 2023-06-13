#include <stdio.h>

int main() {
  FILE* fp = fopen("input.txt", "r");
  if(fp == NULL) {
    printf("Not able to open input.txt");
  }

  char line[10];
  while(fgets(line, 10, fp)) {
    print("%s", line);
  }

  fclose(fp);

  return 0;
}
