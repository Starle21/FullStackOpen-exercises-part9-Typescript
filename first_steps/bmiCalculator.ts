const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;
  console.log(bmi);

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

console.log(calculateBmi(170, 50));
