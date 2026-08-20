import assert from "node:assert/strict";
import test from "node:test";
import { canSimulateExperience, experienceForHostname, normalizeHostname, requestedExperience } from "../lib/experience.ts";

test("normalizes forwarded hosts and ports", () => {
  assert.equal(normalizeHostname("WWW.ParablePath.com:443"), "www.parablepath.com");
  assert.equal(normalizeHostname("parablepath.app, proxy.internal"), "parablepath.app");
});

test("routes .com hosts to popular", () => {
  assert.equal(experienceForHostname("parablepath.com"), "popular");
  assert.equal(experienceForHostname("www.parablepath.com"), "popular");
});

test("routes .app hosts to formation", () => {
  assert.equal(experienceForHostname("parablepath.app"), "formation");
  assert.equal(experienceForHostname("www.parablepath.app"), "formation");
});

test("preview and localhost default to formation but permit an explicit override", () => {
  assert.equal(canSimulateExperience("localhost:3000"), true);
  assert.equal(canSimulateExperience("branch-house-of-stories.vercel.app"), true);
  assert.equal(requestedExperience("localhost:3000"), "formation");
  assert.equal(requestedExperience("localhost:3000", "popular"), "popular");
  assert.equal(requestedExperience("branch-house-of-stories.vercel.app", "popular"), "popular");
});

test("production query strings cannot override the hostname", () => {
  assert.equal(requestedExperience("parablepath.com", "formation"), "popular");
  assert.equal(requestedExperience("parablepath.app", "popular"), "formation");
});
