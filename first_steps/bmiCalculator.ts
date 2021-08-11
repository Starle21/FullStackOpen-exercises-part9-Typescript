interface BmiValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;
  // console.log(bmi);

  switch (true) {
    case bmi < 18.5:
      return "Underweight (unhealthy weight)";
    case 18.5 <= bmi && bmi < 25:
      return "Normal (healthy weight)";
    case 25 <= bmi:
      return "Overweight (unhealthy weight)";
    default:
      throw new Error("You did not provide relevant data");
  }
};

// console.log(calculateBmi(170, 50));
if (require.main === module) {
  try {
    const { value1, value2 } = parseArguments(process.argv);
    console.log(calculateBmi(value1, value2));
  } catch (e) {
    console.log("Error, something bad happened, message: ", e.message);
  }
}
// npm run calculateBmi 180 91
// xx 0 1 2 3
