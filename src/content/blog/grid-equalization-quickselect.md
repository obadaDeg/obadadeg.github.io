---
title: "Optimizing Grid Equalization with Quickselect"
date: 2026-04-29
tags: ["algorithms", "typescript", "quickselect", "leetcode"]
excerpt: "How modular arithmetic determines feasibility and why Quickselect finds the optimal target in O(n) average time — beating the naive sort approach."
---

## The Problem

Given a 2D grid of integers and a value `x`, we want to make all elements equal by repeatedly adding or subtracting `x`. The goal is to find the **minimum number of operations** to do so, or return `-1` if it's impossible.

---

## Why It's Sometimes Impossible

This is rooted in modular arithmetic. Each operation adds or subtracts `x`, so it only moves a number within its **residue class mod x** — its "bucket" of numbers sharing the same remainder when divided by `x`.

If two numbers have different remainders mod `x`, no sequence of `±x` steps can ever make them equal. Formally, if `a ≡ r₁ (mod x)` and `b ≡ r₂ (mod x)` with `r₁ ≠ r₂`, then making them equal would require:

```
a + k·x = b + m·x  →  x | (a - b)  →  r₁ = r₂   // contradiction
```

So the first thing we check is whether all elements share the same remainder mod `x`. If not, return `-1`.

---

## Why the Median Minimizes Operations

Once we know equalization is possible, we need to pick a **target value** that minimizes the total number of `±x` steps. The number of steps to move element `v` to target `t` is `|v - t| / x`, so we're minimizing:

```
∑ |arr[i] - t| / x
```

This is a classic result: the value of `t` that minimizes the sum of absolute differences is the **median** of the array.

---

## The Naive Approach (and Its Bug)

A natural first pass sorts the array and picks the middle element:

```typescript
function minOperations(grid: number[][], x: number): number {
    let flattedGrid = grid.flat().sort(); // ❌ lexicographic sort!
    let mod = flattedGrid[0] % x;
    let n = flattedGrid.length;

    for (let i = 1; i < n; i++) {
        if (flattedGrid[i] % x != mod) return -1;
    }

    let median = flattedGrid[n / 2]; // ❌ fractional index when n is even!
    let steps = 0;

    for (let i = 0; i < n; i++) {
        steps += Math.abs(flattedGrid[i] - median) / x;
    }

    return steps;
}
```

This has two bugs:

1. **`.sort()` is lexicographic** — `[1, 10, 2]` stays `[1, 10, 2]` instead of becoming `[1, 2, 10]`, corrupting the median entirely.
2. **`n / 2` can be fractional** — when `n` is even, `arr[n/2]` returns `undefined`, which the runtime serializes as `null`, causing a type error.

Both are fixed easily, but the sort itself is still `O(n log n)` — and we don't actually need the array sorted. We only need the median.

---

## The Optimized Approach: Quickselect

**Quickselect** finds the k-th smallest element in **O(n) average time** without fully sorting the array. It works like Quicksort, but after partitioning around a pivot, it recurses into only **one** half — the side the target index falls on — discarding the other.

### Partition with Median-of-Three Pivot

A naive "pick last element as pivot" strategy degrades to O(n²) on sorted or adversarial input. Instead, we use **median-of-three**: pick the median of `arr[left]`, `arr[mid]`, and `arr[right]` as the pivot. This avoids worst-case behavior in practice.

```typescript
function partition(arr: number[], left: number, right: number): number {
    let mid = Math.floor((left + right) / 2);

    // Sort left, mid, right so median ends up at mid
    if (arr[left] > arr[mid])  [arr[left], arr[mid]]  = [arr[mid],  arr[left]];
    if (arr[left] > arr[right]) [arr[left], arr[right]] = [arr[right], arr[left]];
    if (arr[mid]  > arr[right]) [arr[mid],  arr[right]] = [arr[right], arr[mid]];

    let pivot = arr[mid];
    [arr[mid], arr[right - 1]] = [arr[right - 1], arr[mid]]; // stash pivot
    let storeIdx = left;

    for (let i = left; i < right; i++) {
        if (arr[i] <= pivot) {
            [arr[i], arr[storeIdx]] = [arr[storeIdx], arr[i]];
            storeIdx++;
        }
    }

    [arr[storeIdx], arr[right]] = [arr[right], arr[storeIdx]]; // restore pivot
    return storeIdx;
}
```

### Quickselect

After partitioning, the pivot is at its final sorted position. If that position is our target index `k`, we're done. Otherwise, recurse into the relevant half:

```typescript
function quickselect(arr: number[], left: number, right: number, k: number): number {
    if (left === right) return arr[left];

    let pivotIdx = partition(arr, left, right);

    if (k === pivotIdx)       return arr[pivotIdx];
    else if (k < pivotIdx)    return quickselect(arr, left, pivotIdx - 1, k);
    else                      return quickselect(arr, pivotIdx + 1, right, k);
}
```

### Final Solution

```typescript
function minOperations(grid: number[][], x: number): number {
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

function quickselect(arr: number[], left: number, right: number, k: number): number {
    if (left === right) return arr[left];
    let pivotIdx = partition(arr, left, right);
    if (k === pivotIdx)    return arr[pivotIdx];
    else if (k < pivotIdx) return quickselect(arr, left, pivotIdx - 1, k);
    else                   return quickselect(arr, pivotIdx + 1, right, k);
}

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

---

## Complexity Summary

| Step | Naive | Optimized |
|---|---|---|
| Feasibility check | O(n) | O(n) |
| Finding the median | O(n log n) | **O(n) avg** |
| Counting steps | O(n) | O(n) |
| **Total** | **O(n log n)** | **O(n) avg** |

Space complexity drops from O(n) (sort auxiliary) to O(log n) (recursive call stack).

---

## Key Takeaways

- **Modular arithmetic as invariant** — if two numbers differ in their residue mod `x`, no sequence of `±x` operations can equalize them.
- **Median minimizes absolute deviations** — a classic result that makes the target value obvious once we know equalization is possible.
- **Quickselect over sort** — when you only need one order statistic (like the median), Quickselect gives linear average time instead of `O(n log n)`.
- **Median-of-three pivot** — a small change to pivot selection that eliminates the quadratic worst case on sorted or patterned input.
