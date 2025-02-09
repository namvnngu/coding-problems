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
  ios_base::sync_with_stdio(false);
  cin.tie(0);

  string s;

  cin >> s;

  char selected = s[0];
  int count = 1, res = 1;

  for (int i = 1; i < int(s.length()); i++) {
    if (s[i] == selected) {
      count++;
      res = max(res, count);
    } else {
      selected = s[i];
      count = 1;
    }
  }

  cout << res;
}
