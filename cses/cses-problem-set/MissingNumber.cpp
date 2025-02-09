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

  long long n, m, res;
  cin >> n;

  res = (n + 1) * n / 2;

  for (long i = 0; i < n - 1; i++) {
    cin >> m;
    res -= m;
  }

  cout << res;
}
