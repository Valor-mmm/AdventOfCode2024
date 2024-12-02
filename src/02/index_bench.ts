import { assertEquals } from "@std/assert";
import { determineSafetyWithProblemDampener, parseInput } from "./index.ts";

Deno.bench({
  name: "Performance of Safety Determination with Problem Dampener",
  fn() {
    const input = parseInput("./src/02/puzzleInput");
    assertEquals(determineSafetyWithProblemDampener(input.reactorData), 354);
  },
});
