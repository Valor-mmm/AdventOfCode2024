export function determineDistance(a: number[], b: number[]): number {
  const sortedA = a.sort();
  const sortedB = b.sort();

  return sortedA.reduce((accumulator, currentValue, currentIndex) => {
    const bValue = sortedB[currentIndex];
    const difference = Math.abs(currentValue - bValue);
    return accumulator + difference;
  }, 0);
}

function countOccurrences(list: number[]): Map<number, number> {
  const sortedB = list.sort();
  const countedValues: Map<number, number> = new Map();
  let currentValue: undefined | number = undefined;
  let currentCount: number = 0;
  sortedB.forEach((value) => {
    if (currentValue === undefined) {
      currentValue = value;
      currentCount = 1;
    } else if (currentValue !== value) {
      countedValues.set(currentValue, currentCount);
      currentValue = value;
      currentCount = 1;
    } else {
      currentCount += 1;
    }
  });

  return countedValues;
}

export function determineSimilarity(a: number[], b: number[]) {
  const countedValues = countOccurrences(b);

  return a.reduce((accumulator, currentValue) => {
    const bCount = countedValues.get(currentValue) ?? 0;
    return accumulator + (bCount * currentValue);
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
  console.time("Parsing input");
  const input = parseInput("./src/01/puzzleInput");
  console.timeEnd("Parsing input");

  console.time("Calculating Distance");
  console.log("Distance between a & b = ", determineDistance(input.a, input.b));
  console.timeEnd("Calculating Distance");

  console.time("Calculating Similarity");
  console.log(
    "Similarity between a & b = ",
    determineSimilarity(input.a, input.b),
  );
  console.timeEnd("Calculating Similarity");
}
