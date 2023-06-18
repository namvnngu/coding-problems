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
  int curr = 0, prev = 0;
  ifstream input_file("input.in");
  int i = 0, count = 0;

  while(getline(input_file, line)) {
    if(i == 0) {
      prev = stoi(line);
    }

    curr = stoi(line);

    if (curr > prev) {
      count++;
    }

    prev = curr;

    i++;
  }

  input_file.close();

  cout << count;
}
