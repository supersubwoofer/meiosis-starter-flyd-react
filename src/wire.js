import flyd from 'flyd';

const element = document.getElementById("app");

const total = 4;

for (let n = 1; n <= total; n++) {
  element.innerHTML = element.innerHTML +
  "<div id='stream" + n + "'>Stream " + n + " values:</div>";
}

const log = number => value => {
  const streamElement = document.getElementById("stream" + number);
  streamElement.innerHTML = streamElement.innerHTML + " " + value;
};

const accumStreamOfValues = () => {
  const amounts = flyd.stream();
  const add = (total, next) => total + next;

  const stream3 = flyd.scan(add, 0, amounts);
  const log3 = log(3);
  stream3.map(log3);

  amounts(2);
  amounts(3);
  amounts(9);
};

const loggingStreams = () => {
  const stream1 = flyd.stream();
  const log1 = log(1);
  stream1.map(log1);

  const log2 = log(2);
  const stream2 = stream1.map(x => x * 10);
  stream2.map(log2);
  
  stream1(5);
  stream1(11)
  stream1(4);
  stream1(8);
};

/* Accumulate by operators */
const applyOperation = (total, nextOperation) => {
  if (nextOperation.operation === "add") {
    total = total + nextOperation.value;
  }
  else if (nextOperation.operation === "sub") {
    total = total - nextOperation.value;
  }
  return total;
};

const accumStreamOfValuesByOperators = () => {
  const operations = flyd.stream();
  const stream4 = flyd.scan(applyOperation, 0, operations);
  const log4 = log(4);
  stream4.map(log4);

  operations({ operation: "add", value: 4 });
  operations({ operation: "sub", value: 6 });
  operations({ operation: "add", value: 10 });
  operations({ operation: "add", value: 9 });
}

export default function wire() {
  loggingStreams();
  accumStreamOfValues();
  accumStreamOfValuesByOperators();
}