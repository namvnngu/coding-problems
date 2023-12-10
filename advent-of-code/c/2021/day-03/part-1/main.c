#include <limits.h>
#include <stdio.h>
#include <stdlib.h>

struct BinaryCount {
  int one;
  int zero;
};

int main(void) {
  FILE *file = fopen("input.txt", "r");

  if (file == NULL) {
    printf("Not able to open input.txt");
  }

  int MAX_CHARS = 20;

  struct BinaryCount binary_counts[MAX_CHARS];
  for (int j = 0; j < MAX_CHARS; j++) {
    binary_counts[j].zero = 0;
    binary_counts[j].one = 0;
  }

  char line[MAX_CHARS];
  while (fgets(line, MAX_CHARS, file)) {

    for (int j = 0; line[j] != '\0'; j++) {
      if (line[j] == '0')
        binary_counts[j].zero += 1;
      else if (line[j] == '1')
        binary_counts[j].one += 1;
    }
  }

  int gamma_rate = 0;
  int epsilon_rate = 0;
  for (int i = MAX_CHARS - 1, multiple_2 = 1; i >= 0; i--) {
    int zero_count = binary_counts[i].zero;
    int one_count = binary_counts[i].one;

    if (zero_count == 0 && one_count == 0)
      continue;

    int common_int = 0;
    int less_common_int = 1;
    if (zero_count < one_count) {
      common_int = 1;
      less_common_int = 0;
    }

    gamma_rate += common_int * multiple_2;
    epsilon_rate += less_common_int * multiple_2;

    multiple_2 *= 2;
  }

  printf("Answer: %d\n", gamma_rate * epsilon_rate);

  fclose(file);

  return 0;
}
