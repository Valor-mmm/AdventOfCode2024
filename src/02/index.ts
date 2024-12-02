function isDataSafe(previousData: number, data: number, increasing: boolean) {
  const difference = previousData - data;
  const correctDirection = increasing ? difference < 0 : difference > 0;
  return correctDirection && Math.abs(difference) < 4;
}

export function determineSafety(reactorData: number[][]): number {
  return reactorData.map((report) => {
    let reportIsSafe = true;
    let increasing: boolean | undefined;
    let previousData: number | undefined;

    for (const data of report) {
      // first iteration
      if (previousData === undefined) {
        previousData = data;
        continue;
      }

      // second iteration
      if (typeof increasing === "undefined") {
        increasing = previousData < data;
      }

      if (!isDataSafe(previousData, data, increasing)) {
        reportIsSafe = false;
        break;
      }
      previousData = data;
    }

    return reportIsSafe;
  }).filter(Boolean).length;
}

interface Puzzle2Input {
  reactorData: number[][];
}

function parseInput(path: string): Puzzle2Input {
  const file = Deno.readTextFileSync(path);

  const reactorData: number[][] = file.split("\n").map((line) =>
    line.split(" ").map((value) => parseInt(value, 10))
  );

  return {
    reactorData,
  };
}

if (import.meta.main) {
  console.time("Parsing input");
  const input = parseInput("./src/02/puzzleInput");
  console.timeEnd("Parsing input");

  console.time("Calculating Reactor Data Safety");
  console.log("Safety of reactor data: ", determineSafety(input.reactorData));
  console.timeEnd("Calculating Reactor Data Safety");
}
