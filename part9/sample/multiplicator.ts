type Operation = 'multiply' | 'add' | 'divide' | 'subtract';

interface CommandLineArgs {
  a: number;
  b: number;
  op: Operation;
}

const isOperation = (string: string): boolean => {
  return ['multiply','add','divide','subtract'].includes(string);
};

export const multiplicator = (a: number, b: number, op: Operation): number => {
  if (op == 'multiply') return a*b;
  if (op == 'add') return a+b;
  if (op == 'divide') return a/b;
  if (op == 'subtract') return a - b;

  throw new Error(`${op} is not a valid operation.`);
};

const parseArguments = (_args: Array<string>): CommandLineArgs => {
  if (process.argv.length != 5) {
    throw new Error('There should be 3 arguments: num, num, op.');
  }

  const valueOne = Number(process.argv[2]);
  const valueTwo = Number(process.argv[3]);
  const valueThree = process.argv[4];

  if (isNaN(valueOne) || isNaN(valueTwo)) {
    throw new Error('First two arguments should be numbers.');
  }

  if (!isOperation(valueThree)) {
    throw new Error('Third argument is not a valid operation.');
  }

  return {
    a: valueOne,
    b: valueTwo,
    op: valueThree as Operation
  };
};

const { a, b, op } = parseArguments(process.argv);
console.log(multiplicator(a, b, op));