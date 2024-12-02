function isDataSafe(previousData: number, data: number, increasing: boolean) {
  const difference = previousData - data;
  const correctDirection = increasing ? difference < 0 : difference > 0;
  return correctDirection && Math.abs(difference) < 4;
}

function isReportSafe(report: number[]) {
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
}

export function determineSafety(reactorData: number[][]): number {
  return reactorData.map((report) => isReportSafe(report)).filter(Boolean)
    .length;
}

export function determineSafetyWithProblemDampener(
  reactorData: number[][],
): number {
  return reactorData.map((report) => {
    for (let i = 0; i < report.length; i++) {
      const dampenedReport = report.toSpliced(i, 1);
      if (isReportSafe(dampenedReport)) {
        return true;
      }
    }

    return false;
  }).filter(Boolean).length;
}

interface Puzzle2Input {
  reactorData: number[][];
}

export function parseInput(path: string): Puzzle2Input {
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

  console.time("Calculating Reactor Data Safety Without Problem Dampener");
  console.log(
    "Safety of reactor data without problem dampener: ",
    determineSafety(input.reactorData),
  );
  console.timeEnd("Calculating Reactor Data Safety Without Problem Dampener");

  console.time("Calculating Reactor Data Safety With Problem Dampener");
  console.log(
    "Safety of reactor data with problem dampener: ",
    determineSafetyWithProblemDampener(input.reactorData),
  );
  console.timeEnd("Calculating Reactor Data Safety With Problem Dampener");
}
