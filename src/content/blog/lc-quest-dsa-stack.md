---
title: "LeetCode Quest: DSA — Stack (Linear Shoal)"
date: 2026-04-30
tags: ["leetcode", "algorithms", "stack", "typescript", "dsa"]
excerpt: "The Stack unit of LeetCode's DSA Quest — simulating stack operations on a stream, evaluating Reverse Polish Notation three ways, and tracking exclusive CPU time with an interval-accounting stack."
draft: false
series: "leetcode-quest-dsa"
---

The Stack unit is where the data structure earns its name. All three problems here have a brute-force solution you could write with arrays — but the *elegant* solution in each case is a stack that makes the problem's logic explicit and the code inevitable.

---

## Q1. Build an Array With Stack Operations

> Given a stream of integers `[1..n]` and a target array, return the Push/Pop sequence that builds the target on a stack.

### The Insight

The stream arrives in order. Each number is either in the target (Push and keep) or not (Push then Pop). Walk the stream in lockstep with a pointer into `target`:

```typescript
function buildArray(target: number[], n: number): string[] {
    const res: string[] = [];
    let i = 0; // pointer into target

    for (let num = 1; num <= n; num++) {
        if (i === target.length) break; // target fully built

        res.push("Push");

        if (num === target[i]) {
            i++; // keep it — advance target pointer
        } else {
            res.push("Pop"); // discard it
        }
    }

    return res;
}
```

The early `break` when `i === target.length` is important — the problem says to stop reading the stream once the target is achieved, so we must not continue pushing/popping after the last target element is matched.

**Complexity**: O(max(target[last], target.length)) — we stop at the largest target value or when the target is complete, whichever comes first.

---

## Q2. Evaluate Reverse Polish Notation

> Evaluate an arithmetic expression given in postfix (RPN) form.

### The Insight

RPN naturally maps to a stack: push operands, and when you see an operator, pop two operands, compute, push the result. The stack *is* the call stack that parentheses would otherwise express.

**Three implementations I tried:**

**Version 1** — using a custom `Stack<string>` class with a `switch` inside a helper:

```typescript
function evalRPN(tokens: string[]): number {
    const stack = new Stack<string>();
    const symbols = ['+', '-', '*', '/'];

    function applyOperation(a: number, b: number, op: string) {
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return Math.trunc(a / b);
        }
    }

    for (const token of tokens) {
        if (!symbols.includes(token)) {
            stack.push(token);
        } else {
            const b = parseInt(stack.pop());
            const a = parseInt(stack.pop());
            stack.push(String(applyOperation(a, b, token)));
        }
    }
    return parseInt(stack.pop());
}
```

**Version 2** — using a native `number[]` array as the stack and a lookup table for ops:

```typescript
function evalRPN(tokens: string[]): number {
    const stack: number[] = [];

    const ops: Record<string, (a: number, b: number) => number> = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => Math.trunc(a / b),
    };

    for (const token of tokens) {
        if (token in ops) {
            const b = stack.pop()!;
            const a = stack.pop()!;
            stack.push(ops[token](a, b));
        } else {
            stack.push(Number(token));
        }
    }

    return stack.pop()!;
}
```

**Version 2 is strictly better**: no string↔number conversion on every push/pop, `token in ops` is O(1) vs `symbols.includes(token)` which is O(4), and the ops lookup table eliminates the switch. The native `number[]` as a stack (using `.push` / `.pop`) is idiomatic TypeScript — no need for a custom class.

**The critical ordering**: `b = pop()` before `a = pop()`. In RPN, the second-popped value is the *left* operand. Getting this backwards silently breaks subtraction and division.

**Complexity**: O(n) time, O(n) space (stack depth bounded by input length).

---

## Q3. Exclusive Time of Functions

> Given CPU function logs (`id:start|end:timestamp`), return the exclusive execution time for each function.

### The Insight

This is the hardest of the three. Functions nest (via recursive calls), so the exclusive time of a function is its total elapsed time *minus* any time stolen by functions it called. A stack naturally models the call stack; the key is tracking **intervals** rather than absolute timestamps.

```typescript
function exclusiveTime(n: number, logs: string[]): number[] {
    const res = new Array<number>(n).fill(0);
    const stack: number[] = [];
    let prevTime = 0;

    for (const log of logs) {
        const [idStr, status, timeStr] = log.split(":");
        const id = Number(idStr);
        const timestamp = Number(timeStr);

        if (status === "start") {
            // Credit elapsed time to whatever was running (top of stack)
            if (stack.length > 0) {
                res[stack[stack.length - 1]] += timestamp - prevTime;
            }
            stack.push(id);
            prevTime = timestamp;
        } else {
            // Function ends: credit it for [prevTime, timestamp] inclusive (+1)
            res[stack.pop()!] += timestamp - prevTime + 1;
            prevTime = timestamp + 1; // next interval starts after this timestamp
        }
    }

    return res;
}
```

**Why `+ 1` on end events?** Timestamps are discrete units. A function that starts at `t=2` and ends at `t=5` ran for units `{2, 3, 4, 5}` — that's 4 units, not 3. `end - start + 1 = 5 - 2 + 1 = 4`. ✓

**Why `prevTime = timestamp + 1` after an end?** When a nested function returns, the parent resumes at the *next* timestamp. If we used `prevTime = timestamp`, the parent would double-count the end timestamp.

**Walking through Example 1**: `["0:start:0","1:start:2","1:end:5","0:end:6"]`

| Event | Stack | prevTime | Action |
|---|---|---|---|
| `0:start:0` | `[0]` | 0 | Push fn0, prevTime=0 |
| `1:start:2` | `[0,1]` | 2 | fn0 gets `2-0=2` units, push fn1 |
| `1:end:5` | `[0]` | 6 | fn1 gets `5-2+1=4` units, prevTime=6 |
| `0:end:6` | `[]` | 7 | fn0 gets `6-6+1=1` unit |

Result: `[2+1, 4] = [3, 4]` ✓

**Complexity**: O(L) time where L = number of log entries, O(n) space for the result and stack.

---

## Takeaways from the Stack Unit

- **Native array as stack** (`push`/`pop`) is idiomatic and avoids unnecessary abstraction.
- **Operator lookup tables** (`Record<string, fn>`) beat `switch` statements for dispatch — O(1), extensible, and cleaner.
- **Interval accounting** with `prevTime` is the core pattern for scheduling/CPU problems: charge each interval to whoever was running when it started, then update `prevTime` to mark where the next interval begins.
