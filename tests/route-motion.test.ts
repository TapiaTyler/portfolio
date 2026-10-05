import assert from "node:assert/strict";
import test from "node:test";
import { bookNavigation } from "../src/lib/motion/route-transition";

test("book navigation follows chapter order and counts crossed hierarchy levels", () => {
  const url = (path: string) => new URL(path, "https://portfolio.test");
  assert.deepEqual(bookNavigation(url("/en/work"), url("/en/about")), {
    direction: "forward",
    turns: 1,
  });
  assert.deepEqual(bookNavigation(url("/en/contact"), url("/en/work")), {
    direction: "backward",
    turns: 1,
  });
  assert.deepEqual(bookNavigation(url("/en"), url("/en/work/project")), {
    direction: "forward",
    turns: 2,
  });
  assert.deepEqual(bookNavigation(url("/ja/work/project"), url("/ja")), {
    direction: "backward",
    turns: 2,
  });
  assert.deepEqual(
    bookNavigation(url("/en"), url("/en/work/project/section/deeper")),
    { direction: "forward", turns: 3 },
  );
  assert.deepEqual(
    bookNavigation(
      url("/preview/chronicle"),
      url("/preview/chronicle?project=portfolio"),
    ),
    { direction: "forward", turns: 2 },
  );
  assert.deepEqual(
    bookNavigation(
      url("/preview/chronicle?project=portfolio"),
      url("/preview/chronicle"),
    ),
    { direction: "backward", turns: 2 },
  );
});
