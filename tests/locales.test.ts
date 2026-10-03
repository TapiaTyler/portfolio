import assert from "node:assert/strict";
import test from "node:test";
import { isLocale, pathForLocale } from "../src/lib/i18n/locales";

test("only supported locale segments are accepted", () => {
  assert.equal(isLocale("en"), true);
  assert.equal(isLocale("ja"), true);
  assert.equal(isLocale("jp"), false);
});

test("language changes keep the current route, including project slugs", () => {
  assert.equal(pathForLocale("/en/work/example", "ja"), "/ja/work/example");
  assert.equal(pathForLocale("/ja/about", "en"), "/en/about");
  assert.equal(pathForLocale("/en", "ja"), "/ja");
});
