import { assertEquals } from "@std/assert";
import { determineDistance } from "./index.ts";

Deno.test(function distanceTest() {
  const a = [3, 4, 2, 1, 3, 3];

  const b = [4, 3, 5, 3, 9, 3];
  assertEquals(determineDistance(a, b), 11);
});
