---
title: "Grid Equalization: Median, Modular Arithmetic, and Quickselect"
date: 2026-04-29
tags: ["algorithms", "typescript", "leetcode", "sorting", "quickselect"]
excerpt: "A walkthrough of LeetCode 2033 — why modular arithmetic determines feasibility, why the median is the optimal target, and what a Quickselect-based solution would look like."
---

## The Problem

[LeetCode 2033 — Minimum Operations to Make a Uni-Value Grid](https://leetcode.com/problems/minimum-operations-to-make-a-uni-value-grid/description/)

Given a 2D grid of integers and a value `x`, you can repeatedly add or subtract `x` from any element. Return the **minimum number of operations** to make all elements equal, or `-1` if it's impossible.

---

## Two Key Observations

Before writing any code, two mathematical facts determine the entire approach.

### 1. Feasibility: Modular Arithmetic

Each operation shifts an element by `±x`, so it only ever moves within its **residue class mod x** — the set of all integers sharing the same remainder when divided by `x`.

If two elements have different remainders mod `x`, no number of `±x` steps can ever close the gap. Formally:

```
a + k·x = b  →  x | (a - b)  →  a % x = b % x
```

So: if any two elements differ in their remainder mod `x`, return `-1` immediately. Otherwise, equalization is always possible.

### 2. Optimal Target: The Median

Once equalization is confirmed, we need to choose a target value `t` that minimizes total operations. The cost to move element `v` to `t` is `|v - t| / x`, so we're minimizing:

```
∑ |arr[i] - t| / x
```

This is a well-known result: **the value that minimizes the sum of absolute differences is the median**. Any value to the left of the median increases the sum for all elements to its right more than it saves for those to its left, and vice versa.

---

## Solution

With those two facts in hand, the solution is straightforward:

1. Flatten the grid and check all remainders mod `x` — return `-1` if any differ.
2. Sort the array and pick the middle element as the median.
3. Sum `|arr[i] - median| / x` across all elements.

```typescript
function minOperations(grid: number[][], x: number): number {
    let flattedGrid = grid.flat().sort((a, b) => a - b);
    let mod = flattedGrid[0] % x;
    let n = flattedGrid.length;

    for (let i = 1; i < n; i++) {
        if (flattedGrid[i] % x != mod) {
            return -1;
        }
    }

    let median = flattedGrid[Math.floor(n / 2)];

    let steps = 0;

    for (let i = 0; i < n; i++) {
        steps += Math.abs(flattedGrid[i] - median) / x;
    }

    return steps;
}
```

**Complexity**: O(n log n) time due to sorting, O(n) space for the flattened array.

Two details worth calling out:

- **`.sort((a, b) => a - b)` is required** — the default `.sort()` is lexicographic, so `[1, 10, 2]` stays `[1, 10, 2]` instead of becoming `[1, 2, 10]`, corrupting the median entirely.
- **`Math.floor(n / 2)` is required** — without it, `n / 2` is fractional for even-length arrays, making `arr[n/2]` return `undefined`.

---

## Going Further: Quickselect

After submitting, LeetCode's code analysis tool pointed out that sorting is overkill here — we only need the median, a single order statistic. **Quickselect** finds the k-th smallest element in **O(n) average time** without sorting the full array.

It works like Quicksort: pick a pivot, partition the array around it, then recurse into only the half that contains the target index.

### Partition with Median-of-Three

A naive "pick last element" pivot degrades to O(n²) on sorted input. Median-of-three — taking the median of `arr[left]`, `arr[mid]`, and `arr[right]` — avoids this in practice.

```typescript
function partition(arr: number[], left: number, right: number): number {
    let mid = Math.floor((left + right) / 2);

    if (arr[left] > arr[mid])   [arr[left], arr[mid]]   = [arr[mid],   arr[left]];
    if (arr[left] > arr[right]) [arr[left], arr[right]] = [arr[right], arr[left]];
    if (arr[mid]  > arr[right]) [arr[mid],  arr[right]] = [arr[right], arr[mid]];

    let pivot = arr[mid];
    [arr[mid], arr[right - 1]] = [arr[right - 1], arr[mid]];
    let storeIdx = left;

    for (let i = left; i < right; i++) {
        if (arr[i] <= pivot) {
            [arr[i], arr[storeIdx]] = [arr[storeIdx], arr[i]];
            storeIdx++;
        }
    }

    [arr[storeIdx], arr[right]] = [arr[right], arr[storeIdx]];
    return storeIdx;
}
```

### Quickselect

After partitioning, the pivot lands at its final sorted index. Recurse into whichever side contains `k`:

```typescript
function quickselect(arr: number[], left: number, right: number, k: number): number {
    if (left === right) return arr[left];

    let pivotIdx = partition(arr, left, right);

    if (k === pivotIdx)    return arr[pivotIdx];
    else if (k < pivotIdx) return quickselect(arr, left, pivotIdx - 1, k);
    else                   return quickselect(arr, pivotIdx + 1, right, k);
}

function minOperationsOptimized(grid: number[][], x: number): number {
    let arr = grid.flat();
    let n = arr.length;
    let mod = arr[0] % x;

    for (let i = 1; i < n; i++) {
        if (arr[i] % x !== mod) return -1;
    }

    let median = quickselect(arr, 0, n - 1, Math.floor(n / 2));

    let steps = 0;
    for (let i = 0; i < n; i++) {
        steps += Math.abs(arr[i] - median) / x;
    }

    return steps;
}
```

---

## Complexity Comparison

| Step | Sort-based | Quickselect |
|---|---|---|
| Feasibility check | O(n) | O(n) |
| Finding the median | O(n log n) | **O(n) avg** |
| Counting steps | O(n) | O(n) |
| **Total** | **O(n log n)** | **O(n) avg** |

Space: O(n) for the flattened array in both cases; O(log n) call stack depth for Quickselect vs O(n) sort auxiliary.

---

## Key Takeaways

- **Modular arithmetic as a feasibility gate** — check remainders before doing any other work.
- **Median minimizes absolute deviations** — a classical result that makes the target value obvious once feasibility is confirmed.
- **Sort only when you need order** — if you only need one order statistic, Quickselect gets you there in linear average time.
- **Median-of-three pivot** — a small change that eliminates quadratic worst-case behavior on sorted or patterned input.
