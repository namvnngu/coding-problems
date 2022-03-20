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


ll form_number(vector<int> &v) {
    ll num = 0;
    for (int i = int(v.size()) - 1; i >= 0; i--) {
        num += v[i] * pow(10, i);
    }

    return num;
}

void solution() {
    ll n;
    cin >> n;
    ll result = LLONG_MAX;


    vector<int> v;
    ll temp = n;
    while (temp > 0) {
        v.push_back(temp % 10);
        temp = temp / 10;
    }
    v.push_back(0);

    int v_size = int(v.size());
    for (int i = v_size - 1; i >= 0; i--) {
        if (i != v_size - 1) {
            v[i+1] = v[i];
            v[i] = 0;
        }

        for(int j = 0; j <= 9; j++) {
            v[i] = j;

            if ((i != v_size - 1) || (v[i] != 0)) {
                ll formed_number = form_number(v);

                if (formed_number % 9 == 0) {
                    chmin(result, formed_number);
                }
            }
        }
    }


    cout << result << newl;
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
