interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercise = (args: Array<number>): Result => {
  const target: Array<number> = [2, 0.5, 2.5, 0, 0, 3, 0]
  const targetTotal: number = target.reduce((a, b) => a + b, 0)
  const doneTotal: number = args.reduce((a, b) => a + b, 0)

  const dayReducer = (total: number, value: number) => {
    if (value > 0) {
      return total += 1;
    }
    return total;
  }

  const rating = (done: number): number => {
    switch (true) {
      case (done < 5):
        return 1;
      case (done <= 10):
        return 3;
      default:
        return 2;
    }
  }

  const feedback = (done: number): string => {
    switch (true) {
      case (done < 2):
        return 'Do something';
      case (done <= 3):
        return 'Barely a start!';
      case (done <= 5):
        return 'Thats a start!';
      case (done <= 7):
        return 'Try harder';
      case (done <= 9):
        return 'Well done';
      case (done <= 12):
        return 'Feeling good!';
      case (done > 12):
        return 'Superb'
      default:
        return 'Keep mooving!'
    }
  }

  return {
    periodLength: args.length,
    trainingDays: args.reduce(dayReducer, 0),
    success: (doneTotal > targetTotal),
    rating: rating(doneTotal),
    ratingDescription: feedback(doneTotal),
    target: targetTotal,
    average: doneTotal / args.length
  }
}

console.log(calculateExercise([2, 1, 0, 5, 1, 0, 0]))