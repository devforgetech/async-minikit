<p align="center">
  <img src="./logo.svg" width="220" alt="async-minikit logo"/>
</p>

<h1 align="center">async-minikit</h1>

<p align="center">
  A tiny zero-dependency async toolkit for Node.js, Bun, Deno, and Browsers.
  <br/>
  Fast. Typed. Minimal. (~1.5 kB)
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/async-minikit">
    <img src="https://img.shields.io/npm/v/async-minikit?color=38bdf8&style=for-the-badge" />
  </a>
  <a href="https://www.npmjs.com/package/async-minikit">
    <img src="https://img.shields.io/npm/dm/async-minikit?color=22c55e&style=for-the-badge" />
  </a>
  <a href="https://github.com/devforgetech/async-minikit/stargazers">
    <img src="https://img.shields.io/github/stars/devforgetech/async-minikit?color=facc15&style=for-the-badge" />
  </a>
  <a href="https://github.com/devforgetech/async-minikit/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" />
  </a>
</p>

---

## ✨ Features

- `sleep(ms)` – delay execution
- `sleepUntil(condition)` – wait until a condition becomes true
- `retry(fn, options)` – retry failed async operations
- `timeout(promise, ms)` – enforce a timeout on a promise
- `debounceAsync(fn, ms)` – debounce async functions
- `throttleAsync(fn, ms)` – throttle async functions
- Zero dependencies
- Works everywhere (Node, Bun, Deno, Browser)
- Fully typed (TypeScript)

Perfect for backends, scripts, workers, SDKs, UI logic, and automation tools.

---

## 📦 Installation

```sh
npm install async-minikit
```

Or:

```sh
yarn add async-minikit
pnpm add async-minikit
bun add async-minikit
```

---

# 🚀 Quick Examples

## 1. Sleep

```ts
import { sleep } from 'async-minikit';

await sleep(500);
console.log('500ms passed');
```

---

## 2. Sleep until condition

```ts
import { sleepUntil } from 'async-minikit';

let ready = false;
setTimeout(() => (ready = true), 1000);

await sleepUntil(() => ready, 100);
console.log('Ready!');
```

---

## 3. Retry async logic

```ts
import { retry } from 'async-minikit';

const result = await retry(() => fetch('https://api.example.com/data'), { retries: 3, delay: 200 });
```

---

## 4. Timeout a promise

```ts
import { timeout, sleep } from 'async-minikit';

await timeout(sleep(5000), 1000); // throws after 1s
```

---

## 5. Debounce async function

```ts
import { debounceAsync } from 'async-minikit';

const save = debounceAsync(async () => {
  console.log('Saving...');
}, 300);

save();
save();
save(); // Only one call executes
```

---

## 6. Throttle async function

```ts
import { throttleAsync } from 'async-minikit';

const load = throttleAsync(async () => {
  console.log('Loading...');
}, 1000);

setInterval(load, 200);
```

---

# 📚 API Reference

## `sleep(ms: number): Promise<void>`

Waits N milliseconds.

---

## `sleepUntil(condition, interval?)`

Polls until condition becomes true.

```ts
await sleepUntil(() => userLoggedIn, 100);
```

---

## `retry(fn, { retries, delay })`

Retries an async function until it succeeds.

Defaults:

```ts
retries: 3;
delay: 100;
```

---

## `timeout(promise, ms)`

Rejects if the promise doesn’t resolve before `ms`.

---

## `debounceAsync(fn, ms)`

Ensures the wrapped function only runs **after** no calls occur for `ms`.

---

## `throttleAsync(fn, ms)`

Runs the function at most once per `ms`.

---

# 🛠️ TypeScript Support

Everything is strongly typed:

```ts
import type { AsyncFn } from 'async-minikit';
```

Includes `.d.ts` type declarations with tsup.

---

# 🧪 Running Tests

```sh
npm test
```

Uses **Vitest**.

---

# 🔨 Build

```sh
npm run build
```

Builds ESM + CJS outputs into `/dist`.

---

# 🤝 Contributing

PRs, issues, and ideas are welcome!

Star the repo ⭐ to support development.

---

# 📄 License

MIT © 2025

---

# 🚀 Spread the Word

If you like this library:

- ⭐ Star the GitHub repo
- Share it on Twitter/X
- Write a blog post
- Use it in your side projects

Thank you! 🙌
