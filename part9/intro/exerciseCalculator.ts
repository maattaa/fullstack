interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

/* const checkArguments = (args: Array<string>): Array<number> => {
  args.forEach(a => {
    if (isNaN(Number(a))) {
      console.log(`Give only numbers - ${a}`);
    }
  });
  return args.map(a => Number(a));
}; */

const calculateExercise = (target: number, exercises: Array<number>): Result => {

  const doneTotal: number = exercises.reduce((a, b) => a + b, 0);

  const dayReducer = (total: number, value: number) => {
    if (value > 0) {
      return total += 1;
    }
    return total;
  };

  const rating = (done: Array<number>): number => {
    const score = done.reduce(dayReducer, 0) / done.length;
    switch (true) {
      case (score < 1):
        return 1;
      case (score <= 2.5):
        return 3;
      default:
        return 2;
    }
  };

  const feedback = (done: Array<number>): string => {
    const score = done.reduce(dayReducer, 0) / done.length;
    switch (true) {
      case (score < 0.2):
        return 'Do something';
      case (score <= 0.5):
        return 'Barely a start!';
      case (score <= 0.8):
        return 'Thats a start!';
      case (score <= 1):
        return 'Try harder';
      case (score <= 1.4):
        return 'Well done';
      case (score <= 2):
        return 'Feeling good!';
      case (score > 3):
        return 'Superb';
      default:
        return 'Keep mooving!';
    }
  };

  return {
    periodLength: exercises.length,
    trainingDays: exercises.reduce(dayReducer, 0),
    success: ((doneTotal / exercises.length) > target),
    rating: rating(exercises),
    ratingDescription: feedback(exercises),
    target,
    average: doneTotal / exercises.length
  };
};

export const exerciseEndpoint = (exercises: Array<number>, target: number): string => {
  //Validating for numbers has been done in index.ts
//  const numbers = checkArguments(exercises);
  const exerciseData = calculateExercise(target, exercises);
  return JSON.stringify(exerciseData);

};


//console.log(calculateExercise(checkArguments(process.argv)));
