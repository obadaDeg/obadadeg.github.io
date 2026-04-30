---
title: "LeetCode Quest: DSA — Array I (Linear Shoal)"
date: 2026-04-30
tags: ["leetcode", "algorithms", "arrays", "typescript", "dsa"]
excerpt: "Working through the Array I unit of LeetCode's Data Structures & Algorithms Quest — concatenation, interleaving, and streak-counting, with a look at when a two-pointer is cleaner than a for-loop."
draft: false
series: "leetcode-quest-dsa"
---

LeetCode's [Quest feature](https://leetcode.com/quest/data-structures-and-algorithms-quest/) turns DSA practice into a structured progression — units unlock in sequence, each one building on the last. The first unit of the *Linear Shoal* chapter is **Array I**: three easy problems that sharpen your intuition for indexing, pointer movement, and state tracking.

They're easy, but easy problems are where you build the mechanical fluency that makes harder problems tractable. Here's the full walkthrough.

---

## Q1. Concatenation of Array

> Given `nums` of length `n`, return an array of length `2n` where `ans[i] = nums[i]` and `ans[i + n] = nums[i]`.

### The Insight

This is a test of how well you know your language's array primitives. The problem is literally asking for `nums` twice, so the cleanest solution is a spread:

```typescript
function getConcatenation(nums: number[]): number[] {
    return [...nums, ...nums];
}
```

**Complexity**: O(n) time, O(n) space. No tricks needed here.

The explicit loop version (`ans[i] = nums[i]; ans[i + n] = nums[i]`) is equivalent but longer — worth knowing as a fallback when spread syntax isn't available, but idiomatic TypeScript prefers the spread.

---

## Q2. Shuffle the Array

> Given `[x1, x2, ..., xn, y1, y2, ..., yn]`, interleave into `[x1, y1, x2, y2, ..., xn, yn]`.

### The Insight

The input is two arrays concatenated end-to-end. You need to zip them together. Two pointers starting at index `0` and `n` naturally model this:

```typescript
function shuffle(nums: number[], n: number): number[] {
    let p1 = 0, p2 = n;
    const ans: number[] = [];

    while (p1 < n) {
        ans.push(nums[p1++]);
        ans.push(nums[p2++]);
    }

    return ans;
}
```

**Comparing two approaches I tried:**

The first version used a `counter` variable to track iterations:

```typescript
// Version 1 — counter variable
let counter = 0;
while (counter < 2 * n) {
    ans.push(nums[p1++]);
    ans.push(nums[p2++]);
    counter += 2;
}
```

The second switched to in-place index assignment:

```typescript
// Version 2 — index-based assignment
while (counter < nums.length) {
    ans[counter++] = nums[p1++];
    ans[counter++] = nums[p2++];
}
```

Both are O(n) and correct. Version 2 is marginally more efficient (avoids `push` overhead), but the simpler `while (p1 < n)` guard I settled on is the cleanest — you already know exactly when to stop.

**Complexity**: O(n) time, O(n) space.

---

## Q3. Max Consecutive Ones

> Given a binary array, return the length of the longest run of `1`s.

### The Insight

Track a live counter that resets to zero when you hit a `0`, updating a max at each reset. The subtle trap: **you must also check after the loop ends** — if the array ends in a streak of ones, the counter never triggers the reset branch.

```typescript
function findMaxConsecutiveOnes(nums: number[]): number {
    let max = 0, curr = 0;

    for (const num of nums) {
        if (num === 0) {
            max = Math.max(max, curr);
            curr = 0;
        } else {
            curr++;
        }
    }

    return Math.max(max, curr); // ← catch trailing streak
}
```

Missing that final `Math.max(max, curr)` is the classic off-by-one for this pattern — `[1,1,1]` would return `0` without it.

**C++ version** (useful when you need to avoid the off-by-one trap in a more explicit style):

```cpp
int findMaxConsecutiveOnes(vector<int>& nums) {
    int maxConsOnes = 0, counter = 0;

    for (int ptr = 0; ptr < nums.size(); ++ptr) {
        if (nums[ptr] == 1) {
            counter++;
        } else {
            maxConsOnes = max(maxConsOnes, counter);
            counter = 0;
        }
    }

    return max(maxConsOnes, counter); // same trailing check
}
```

**Complexity**: O(n) time, O(1) space.

---

## Takeaways from Array I

- **Spread beats manual loops** when you're just duplicating or combining arrays.
- **Two pointers + clear termination condition** makes interleaving problems readable.
- **State-tracking loops** (streak counters, running max) always need a post-loop check for the final window.
