const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/gm;

export function extractMul(memory: string): number {
  const matches = memory.matchAll(mulRegex);

  return matches.reduce((accumulator, currentValue) => {
    const op1 = parseInt(currentValue[1], 10);
    const op2 = parseInt(currentValue[2], 10);

    return accumulator + op1 * op2;
  }, 0);
}

interface Puzzle3Input {
  memory: string;
}

function parseInput(path: string): Puzzle3Input {
  const file = Deno.readTextFileSync(path);

  return {
    memory: file,
  };
}

if (import.meta.main) {
  console.time("Parsing input");
  const input = parseInput("./src/03/puzzleInput");
  console.timeEnd("Parsing input");

  console.time("Calculating Multiplications");
  console.log("Memory Multiplication result = ", extractMul(input.memory));
  console.timeEnd("Calculating Distance");
}
