---
title: "LeetCode Quest: DSA — Heap (Sequence Valley)"
date: 2026-06-06
tags: ["leetcode", "algorithms", "heap", "typescript", "dsa"]
excerpt: "Last Stone Weight: from a sort-each-iteration brute force to building a max-heap from scratch in TypeScript, with every bug and lesson along the way."
draft: false
series: "leetcode-quest-dsa"
---

The Heap unit opens with a problem that's easy enough to solve naively — and it is. But the naive solution hides a subtle bug, and the efficient solution requires building a data structure TypeScript doesn't ship with. Here's both.

---

## Q1. Last Stone Weight

> You have a pile of stones. Each turn, pick the two heaviest and smash them together. If equal, both are destroyed; if not, the difference survives. Return the weight of the last stone, or `0` if none remain.

### First Attempt — Sort Each Iteration

Sort the array, grab the two largest from the end, apply the smash rule, repeat.

```typescript
function lastStoneWeight(stones: number[]): number {
    while (stones.length > 1) {
        stones.sort((a, b) => a - b);
        const n = stones.length - 1;
        stones[n - 1] = stones[n - 1]; // bug: assigns to itself, no-op
        stones.pop();
    }
    return stones[0] || 0;
}
```

The bug is subtle: `stones[n - 1] = stones[n - 1]` does nothing. The second-heaviest stone needs to become the *difference*, and the heaviest gets popped:

```typescript
stones[n - 1] = stones[n] - stones[n - 1]; // fix
stones.pop();
```

This gets accepted. But each iteration re-sorts the whole array — O(n log n) per iteration across O(n) iterations: **O(n² log n)** total. Every re-sort throws away the ordering information we already had.

### The Heap Approach

The bottleneck is clear: we only ever need the two largest elements, but we're sorting everything to find them. A **max-heap** solves this precisely:

- `extractMax()` — largest element in O(log n)
- `insert()` — add an element in O(log n)

Why a *max*-heap specifically? Because each turn demands the two *heaviest* stones. The max-heap invariant — the root is always the maximum — delivers that in O(log n) instead of O(n log n) per iteration. Total: **O(n log n)**.

JavaScript and TypeScript have no built-in priority queue, so I built one from scratch.

### Building a Max-Heap in TypeScript

**The array representation**

A heap is a complete binary tree stored as a 1-indexed array (index 0 holds a dummy value). For any node at index `i`:

```
Parent:      Math.floor(i / 2)
Left child:  2 * i
Right child: 2 * i + 1
```

The 1-indexed trick keeps the parent/child arithmetic clean — no off-by-one corrections anywhere.

For `stones = [2, 7, 4, 1, 8, 1]`, after inserting all values the heap looks like:

```
         8
        / \
       7   4
      / \ /
     1  2 1

Array: [_, 8, 7, 4, 1, 2, 1]
Index:  0  1  2  3  4  5  6
```

**The two core operations**

`insert(val)`: append to the end, then **bubble up** — swap with parent while the value exceeds its parent.

`extractMax()`: save the root, move the last element to the root, pop the last slot, then **bubble down** — swap with the larger child repeatedly until the heap property is restored.

**The implementation**

```typescript
class MyMaxHeap {
    private heap: number[];

    constructor() {
        this.heap = [0]; // 1-indexed; index 0 is a dummy
    }

    private parent(i: number) { return Math.floor(i / 2); }
    private leftChild(i: number) { return 2 * i; }
    private rightChild(i: number) { return 2 * i + 1; }

    private swap(i: number, j: number): void {
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }

    private bubbleUp(i: number): void {
        if (i > 1 && this.heap[i] > this.heap[this.parent(i)]) {
            this.swap(i, this.parent(i));
            this.bubbleUp(this.parent(i));
        }
    }

    private bubbleDown(i: number): void {
        let largest = i;
        const left = this.leftChild(i);
        const right = this.rightChild(i);

        if (left < this.heap.length && this.heap[left] > this.heap[largest]) {
            largest = left;
        }
        if (right < this.heap.length && this.heap[right] > this.heap[largest]) {
            largest = right;
        }
        if (largest !== i) {
            this.swap(i, largest);
            this.bubbleDown(largest);
        }
    }

    insert(val: number): void {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
    }

    extractMax(): number {
        if (this.heap.length <= 1) return 0;
        const max = this.heap[1];
        this.heap[1] = this.heap[this.heap.length - 1];
        this.heap.pop();
        this.bubbleDown(1);
        return max;
    }

    size(): number {
        return this.heap.length - 1;
    }
}
```

**Bugs I hit along the way**

`bubbleDown` — missing bounds check. My first version compared against children without checking whether they existed. Reading past `this.heap.length` gives `undefined`, and `undefined > number` is `false` in JS — so nodes silently stayed in place when they should have moved. Fix: guard every child comparison with `left < this.heap.length`.

`bubbleDown` — swapping with the wrong child. I had two independent `if` statements instead of tracking `largest`. If both children exceed the current node, you *must* swap with the *larger* one — swapping with the smaller child can still violate the heap property at the next level.

`bubbleUp` — missing the `i > 1` base case. Without it, the recursion compares against `this.heap[0]` (the dummy at index 0), which could incorrectly trigger a swap at the root.

`for...in` vs `for...of`. When populating the heap I wrote:

```typescript
for (const stone in stones) { // wrong — gives string indices "0", "1", ...
    heap.insert(stone);
}
```

`for...in` was designed for objects — it iterates over enumerable property *keys*, which for arrays are string indices as strings. TypeScript caught it immediately:

> `Argument of type 'string' is not assignable to parameter of type 'number'`

In plain JavaScript this would silently insert strings and corrupt numeric comparisons with no error at runtime. The fix is `for...of`, which gives the values:

```typescript
for (const stone of stones) {
    heap.insert(stone);
}
```

### The Final Solution

```typescript
function lastStoneWeight(stones: number[]): number {
    const heap = new MyMaxHeap();

    for (const stone of stones) {
        heap.insert(stone);
    }

    while (heap.size() > 1) {
        const y = heap.extractMax(); // heaviest
        const x = heap.extractMax(); // second heaviest

        if (y !== x) {
            heap.insert(y - x);
        }
    }

    return heap.size() === 1 ? heap.extractMax() : 0;
}
```

**Complexity**: O(n log n) time — n inserts and up to n extract pairs, each O(log n). O(n) space for the heap.

---

## Key Takeaways

- **`for...in` gives string indices; `for...of` gives values.** TypeScript catches this at compile time; JavaScript won't — a silent bug that's easy to carry into production.
- **`bubbleDown` must always swap with the *larger* child**, not just any child that exceeds the current node. One wrong swap can leave the heap invalid at the next level.
- **Building a heap by inserting n elements one by one is O(n log n).** There's a smarter O(n) bottom-up algorithm (Floyd's heapify) that builds a valid heap in a single pass over the array — worth knowing for large inputs, though the constraints here (30 stones max) make it irrelevant.
- **JS/TS ships with no built-in priority queue.** In a real interview, knowing how to implement one is a genuine differentiator.

| Approach | Time | Space |
|---|---|---|
| Sort each iteration | O(n² log n) | O(1) |
| Max-heap | O(n log n) | O(n) |

This was my first heap problem, and building one from scratch made the internals click in a way that using a library never would have.
