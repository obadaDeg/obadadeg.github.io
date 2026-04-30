---
title: "LeetCode Quest: DSA — Array II (Linear Shoal)"
date: 2026-04-30
tags: ["leetcode", "algorithms", "arrays", "typescript", "dsa", "prefix-sum"]
excerpt: "The Array II unit of LeetCode's DSA Quest — finding duplicates and missing numbers, counting smaller elements with prefix sums, and the in-place negation trick for O(1) space disappearance detection."
draft: false
series: "leetcode-quest-dsa"
---

Array II ramps up from Array I's pure indexing problems into problems that require you to *reason about the structure of the input itself*. The key theme across all three: the constraints (values in `[1, n]`, array length `n`) let you use the array as its own lookup table.

---

## Q1. Set Mismatch

> The set `[1..n]` had one number duplicated, displacing another. Find `[duplicate, missing]`.

### The Insight

The straightforward approach: scan once to find the duplicate (track seen values with a `Set`), then scan `[1..n]` to find the number that's absent.

```typescript
function findErrorNums(nums: number[]): number[] {
    const seen = new Set<number>();
    let dup = -1;

    for (const num of nums) {
        if (seen.has(num)) dup = num;
        seen.add(num);
    }

    let missing = -1;
    for (let i = 1; i <= nums.length; i++) {
        if (!seen.has(i)) { missing = i; break; }
    }

    return [dup, missing];
}
```

**Complexity**: O(n) time, O(n) space.

**Can we do O(1) space?** Yes — using math. The sum of `[1..n]` is `n*(n+1)/2`. The sum of squares is `n*(n+1)*(2n+1)/6`. From `actualSum` and `actualSumSquares`, two equations with two unknowns (`dup`, `missing`) give you both values directly. Worth knowing conceptually, but the `Set` version is cleaner in practice.

---

## Q2. How Many Numbers Are Smaller Than the Current Number

> For each `nums[i]`, count how many other values are strictly less than it.

### The Insight

The naive O(n²) approach compares every pair. The clever O(n) approach exploits the constraint `0 ≤ nums[i] ≤ 100`: build a frequency array, then convert it to a prefix sum — and `prefixSum[v - 1]` directly gives the count of values less than `v`.

```typescript
function smallerNumbersThanCurrent(nums: number[]): number[] {
    const freq = new Array(101).fill(0);

    for (const num of nums) freq[num]++;

    // prefix sum: freq[i] now = count of values ≤ i
    for (let i = 1; i <= 100; i++) freq[i] += freq[i - 1];

    // for value v, count of values < v = freq[v - 1]
    return nums.map(num => num === 0 ? 0 : freq[num - 1]);
}
```

The edge case: `num === 0` has no values less than it, so we short-circuit rather than access `freq[-1]`.

**Why prefix sum works here:** After the prefix sum pass, `freq[v]` holds the count of all elements `≤ v`. The count of elements *strictly less than* `v` is therefore `freq[v - 1]`. The constraint `nums[i] ≤ 100` is what makes the fixed-size freq array viable.

**Complexity**: O(n + 101) = O(n) time, O(101) = O(1) space (bounded by the value range, not n).

---

## Q3. Find All Numbers Disappeared in an Array

> Given `nums` where `nums[i] ∈ [1, n]`, return all integers in `[1, n]` not present in `nums`.

### The Set Approach (O(n) space)

The readable solution: stuff everything into a `Set`, then scan `[1..n]` for gaps.

```typescript
function findDisappearedNumbers(nums: number[]): number[] {
    const seen = new Set<number>(nums);
    const missing: number[] = [];

    for (let i = 1; i <= nums.length; i++) {
        if (!seen.has(i)) missing.push(i);
    }

    return missing;
}
```

### The In-Place Negation Trick (O(1) space)

The follow-up asks for O(1) auxiliary space. The key observation: since all values are in `[1, n]`, each value `v` can act as a pointer to index `v - 1`. Mark visited indices by negating their values. In the second pass, indices that remain positive were never pointed to — those indices + 1 are the missing numbers.

```cpp
vector<int> findDisappearedNumbers(vector<int>& nums) {
    for (int i = 0; i < nums.size(); i++) {
        int idx = abs(nums[i]) - 1;          // value → index
        if (nums[idx] > 0) nums[idx] = -nums[idx]; // mark as visited
    }

    vector<int> res;
    for (int i = 0; i < nums.size(); i++) {
        if (nums[i] > 0) res.push_back(i + 1); // unvisited → missing
    }

    return res;
}
```

The `abs()` in the index computation is critical — previously marked indices are already negative, so you need the absolute value to get the correct pointer.

**Complexity**: O(n) time, O(1) auxiliary space (the output array doesn't count per the problem).

---

## Takeaways from Array II

- **Value-as-index** is a recurring trick when `nums[i] ∈ [1, n]` — the array becomes its own hash map.
- **Prefix sums over bounded value ranges** turn "count elements smaller than X" from O(n²) to O(n).
- **In-place negation** is a clean O(1)-space marker when you need to annotate visited positions without extra memory.
