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

ll sum_v(vector<int> v) {
    ll result = 0;
    for(int i :v) {
        result += i;
    }

    return result;
}

ll multiply_v(vector<int> v) {
    ll result = 1;
    for(int i :v) {
        result *= i;
    }

    return result;
}

vector<int> produce_vector_int(ll num) {
    vector<int> v;
    while (num > 0) {
        v.push_back(num % 10);
        num = num / 10;
    }

    return v;
}

void solution() {
    ll lower, upper;
    int count = 0;
    cin >> lower;
    cin >> upper;


    for (ll i = lower; i <= upper; i++) {
        vector<int> v = produce_vector_int(i);

        if (multiply_v(v) % sum_v(v) == 0) {
            count++;
        }
    }

    cout << count << newl;
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
