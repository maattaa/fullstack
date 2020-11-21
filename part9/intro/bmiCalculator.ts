interface Elements {
  height: number;
  weight: number
}

const parseArguments = (args: Array<String>): Elements => {
  if (args.length < 4) throw new Error('Give height and weight')
  if (args.length > 4) throw new Error('Only give height and weight')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Give numbers only!')
  }
}

const calculateBmi = (height: number, weight: number): string => {

  const bmi = (weight / Math.pow((height/100), 2));

  switch (true) {
    case (bmi <= 15):
      return 'Very severely underweight';
    case (bmi <= 16):
      return 'Severely underweight';
    case (bmi <= 18.5):
      return 'Underweight';
    case (bmi <= 25):
      return 'Normal (healthy weight)';
    case (bmi <= 30):
      return 'Overweight';
    case (bmi <= 35):
      return 'Obese Class I (Moderately obese)';
    case (bmi <= 40):
      return 'Obese Class II (Severely obese)';
    case (bmi > 40):
      return 'Obese Class III (Very severely obese)';
    default:
      return `Something bad happened with args ${height} and ${weight}`;
  }
}

try {
  const { height, weight } = parseArguments(process.argv)
  console.log(calculateBmi(height, weight))
} catch (e) {
  console.log(`Error: ${e.message}`)
}
