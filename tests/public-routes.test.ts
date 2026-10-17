import assert from "node:assert/strict";
import test from "node:test";
import { publicRoute } from "../lib/public-routes.ts";
import { popularResultByRoom } from "../lib/parablepath/popular/results.ts";

test("main assessment and saved results stay in formation", () => {
  assert.equal(publicRoute("/").experience, "formation");
  assert.equal(publicRoute("/assessment").pathname, "/experiences/formation/assessment");
  assert.deepEqual(publicRoute("/results/00000000-0000-4000-8000-000000000000"), { experience: "formation", pathname: "/experiences/formation/results/00000000-0000-4000-8000-000000000000", redirect: false });
  assert.equal(publicRoute("/results").pathname, "/experiences/formation/results");
});

test("fun paths and explicit legacy experience paths retain the light journey", () => {
  for (const suffix of ["", "/assessment", "/results/lost"]) {
    assert.deepEqual(publicRoute(`/fun${suffix}`), { experience: "popular", pathname: `/experiences/popular${suffix}`, redirect: false });
  }
  assert.equal(publicRoute("/fun/").pathname, "/experiences/popular");
  assert.equal(publicRoute("/experiences/popular/assessment").experience, "popular");
  assert.equal(publicRoute("/experiences/formation/assessment").experience, "formation");
});

test("all old light-result slugs and room query links redirect without capturing saved IDs", () => {
  for (const id of Object.keys(popularResultByRoom)) {
    for (const route of [publicRoute(`/results/${id}`), publicRoute("/results", id)]) {
      assert.equal(route.pathname, `/fun/results/${id}`);
      assert.equal(route.redirect, true);
    }
  }
  assert.equal(publicRoute("/results/not-a-story").experience, "formation");
  assert.equal(publicRoute("/results", "not-a-story").redirect, false);
});
