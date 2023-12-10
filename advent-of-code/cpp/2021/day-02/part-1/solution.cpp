#include <algorithm>
#include <assert.h>
#include <bitset>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits.h>
#include <list>
#include <map>
#include <math.h>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <string>
#include <time.h>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
#include <fstream>
using namespace std;

template <typename T1, typename T2> inline void chmin(T1 &a, T2 b) {
  if (a > b)
    a = b;
}
template <typename T1, typename T2> inline void chmax(T1 &a, T2 b) {
  if (a < b)
    a = b;
}
#define ll long long
#define newl '\n'

int main() {
  string line;
  ifstream input_file("input.in");
  int depth = 0;
  int horizontal = 0;

  while(getline(input_file, line)) {
    char first_letter = line[0];

    switch (first_letter) {
      case 'f':
        horizontal += stoi(line.substr(8));
        break;
      case 'u':
        depth -= stoi(line.substr(3));
        break;
      case 'd':
        depth += stoi(line.substr(5));
        break;
    }
  }

  cout << depth * horizontal;

  input_file.close();
}
