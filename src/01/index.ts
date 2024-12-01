export function determineDistance(a: number[], b: number[]): number {
  const sortedA = a.sort();
  const sortedB = b.sort();

  return sortedA.reduce((accumulator, currentValue, currentIndex) => {
    const bValue = sortedB[currentIndex];
    const difference = Math.abs(currentValue - bValue);
    return accumulator + difference;
  }, 0);
}

interface Puzzle1Input {
  a: number[];
  b: number[];
}

function parseInput(path: string): Puzzle1Input {
  const file = Deno.readTextFileSync(path);

  const a: number[] = [];
  const b: number[] = [];

  file.split("\n").forEach((line) => {
    const [aNumber, bNumber] = line.split(" ").filter(Boolean);
    a.push(parseInt(aNumber));
    b.push(parseInt(bNumber));
  });

  return {
    a,
    b,
  };
}

if (import.meta.main) {
  const input = parseInput("./src/01/puzzleInput");
  console.log("Distance between a & b = ", determineDistance(input.a, input.b));
}
