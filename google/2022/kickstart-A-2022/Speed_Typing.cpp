#include <algorithm>
#include <assert.h>
#include <bitset>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
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

void solution() {
    string I, P;
    cin >> I;
    cin >> P;

    int I_length = I.length();
    int P_length = P.length();
    int I_pointer = 0;

    for (int i = 0; i < P_length; i++) {
        if (P[i] == I[I_pointer]) {
            I_pointer++;
        }
    }

    if (I_pointer == I_length) {
        cout << P_length - I_length << newl;
    } else {
        cout << "IMPOSSIBLE" << newl;
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin >> t;
    for (int i = 1; i <= t; ++i) {
        cout << "Case #" << i << ": ";
        solution();
    }
}
