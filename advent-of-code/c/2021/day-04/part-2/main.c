#include <limits.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int BOARD_SIZE = 5;

struct Cell {
  int num;
  int marked;
};

int convertToInt(char *str) {
  int num = 0;
  for (int i = 0; i < (int)strlen(str); i++) {
    if (str[i] == '\0' || str[i] == ' ' || str[i] == '\n') {
      continue;
    }
    num = num * 10 + (str[i] - '0');
  }
  return num;
}

int main(void) {
  FILE *fp = fopen("input.txt", "r");
  if (fp == NULL) {
    printf("Not able to open input.txt");
  }

  // Prepare
  char line[1000];
  int numbers[600];
  int numbers_count = 0;
  int total_board_rows_count = 0;
  struct Cell boards[1000][BOARD_SIZE];

  for (int row = 0; fgets(line, sizeof(line), fp); row++) {
    char numeric_str[3];

    if (row == 0) {
      for (int n_char = 0, char_count = 0; n_char < (int)strlen(line);
           n_char++, char_count++) {
        if (line[n_char] == ',') {
          numbers[numbers_count] = convertToInt(numeric_str);
          char_count = -1;
          numbers_count++;
          memset(numeric_str, '\0', sizeof(numeric_str));
        } else {
          numeric_str[char_count] = line[n_char];
        }
      }
      numbers[numbers_count++] = convertToInt(numeric_str);
      continue;
    }
    if (row == 1) {
      continue;
    }
    if (*line == '\n') {
      continue;
    }

    for (int n_char = 0, char_count = 0, column = 0; n_char < (int)strlen(line);
         n_char++, char_count++) {
      if (char_count == 2) {
        struct Cell cell = {.num = convertToInt(numeric_str), .marked = 0};
        boards[total_board_rows_count][column] = cell;
        char_count = -1;
        column++;
        memset(numeric_str, '\0', sizeof(numeric_str));
      } else {
        numeric_str[char_count] = line[n_char];
      }
    }

    total_board_rows_count++;
  }

  // Logic
  int last_called_number = 0;
  int unmarked_sum = 0;
  int bingo = 0;
  int total_boards = total_board_rows_count / BOARD_SIZE;
  int boards_has_bingo[total_boards];
  memset(boards_has_bingo, 0, total_boards * sizeof(int));

  for (int n = 0; n < numbers_count; n++) {
    last_called_number = numbers[n];
    /* printf("Last called number: %d\n", last_called_number); */
    for (int r = 0; r < total_board_rows_count; r++) {
      for (int c = 0; c < BOARD_SIZE; c++) {
        if (boards[r][c].num == last_called_number) {
          boards[r][c].marked = 1;
        }
      }

      if ((r + 1) % BOARD_SIZE == 0) {
        for (int i = 0; i < BOARD_SIZE; i++) {
          int vertical_bingo = 1;
          int horizontal_bingo = 1;

          for (int j = 0; j < BOARD_SIZE; j++) {
            vertical_bingo = vertical_bingo && boards[r - j][i].marked;
            horizontal_bingo = horizontal_bingo && boards[r - i][j].marked;

            if (!boards[r - i][j].marked) {
              unmarked_sum = unmarked_sum + boards[r - i][j].num;
            }
          }
          if (!bingo && (vertical_bingo || horizontal_bingo)) {
            bingo = 1;
            boards_has_bingo[((r + 1) / BOARD_SIZE) - 1] = 1;
          }
        }

        if (bingo) {
          int bingo_board_count = 0;
          for (int i = 0; i < total_boards; i++) {
            bingo_board_count = bingo_board_count + boards_has_bingo[i];
          }
          if (bingo_board_count == total_boards) {
            goto jump;
          }
        }

        bingo = 0;
        unmarked_sum = 0;
      }
    }
  }

jump:
  /* for (int r = 0; r < total_board_rows_count; r++) { */
  /*   for (int c = 0; c < BOARD_SIZE; c++) { */
  /*     if (boards[r][c].marked) { */
  /*       printf("x "); */
  /*     } else { */
  /*       printf("%d ", boards[r][c].num); */
  /*     } */
  /**/
  /*     if ((c + 1) == BOARD_SIZE) { */
  /*       printf("\n"); */
  /*     } */
  /*   } */
  /**/
  /*   if ((r + 1) % BOARD_SIZE == 0) { */
  /*     printf("\n"); */
  /*   } */
  /* } */
  printf("Answer: %d\n", last_called_number * unmarked_sum);

  fclose(fp);

  return 0;
}
