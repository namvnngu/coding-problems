#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <sstream>
#include <queue>
#include <deque>
#include <bitset>
#include <iterator>
#include <list>
#include <stack>
#include <map>
#include <unordered_map>
#include <set>
#include <unordered_set>
#include <functional>
#include <numeric>
#include <utility>
#include <limits>
#include <time.h>
#include <math.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <assert.h>
using namespace std;

template<typename T1,typename T2> inline void chmin(T1 &a,T2 b){if(a>b) a=b;}
template<typename T1,typename T2> inline void chmax(T1 &a,T2 b){if(a<b) a=b;}
#define ll long long
const char newl = '\n';

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(0);

    int m, n;
    cin >> n >> m;

    vector<int> v(n);
    unordered_set<int> s;
    for(int i = 0; i < n; i++)
        cin >> v[i];
    for(int i = n-1; i >= 0; i--) {
        s.insert(v[i]);
        v[i] = int(s.size());
    }
    
    for(int i = 0; i < m; i++) {
        int num;
        cin >> num;
        cout << v[num-1] << newl;
    }
}
