import { assertEquals } from "@std/assert";
import { extractMul } from "./index.ts";

Deno.test(function extractMulTest() {
  const memory =
    "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";

  assertEquals(extractMul(memory), 161);
});
