function calculateRoverPath(map) {
  const fs = require("fs");
  let startPoint;
  let currentPoint;
  let steps = 0;
  let fuel = 0;
  let iPointVariation = 0;
  let jPointVariation = 0;
  let finishPointJ;
  let finishPointI;
  let finishPoint;
  let result = [];

  map.map(function (curr, ind, arr) {
    // console.log(curr);
    // console.log('length i = ' + arr.length)
    // console.log('length j = ' + curr.length)
    startPoint = arr[0][0];
    currentPoint = startPoint;
    finishPointJ = curr.length - 1;
    finishPointI = arr.length - 1;
    finishPoint = arr[finishPointI][finishPointJ];
  });

  // console.log('старт значение = ' + startPoint)
  // console.log('текущее значение = ' + currentPoint)
  // console.log('финиш значение = ' + finishPoint + ' с координатами ' + 'i = ' + finishPointI + ' j = ' + finishPointJ)

  function iIndex() {
    i += 1;
    if (i == finishPointI) {
      // console.log('finish')
    }
    if (i > finishPointI) {
      // console.log('1000 I' + iPointVariation)
      iPointVariation = 1000;
      return iPointVariation;
    }
    iPointVariation = map[i][j];
    // result.push(`[${i}][${j}]`)
    // console.log('iIndex ' + iPointVariation)
    return iPointVariation;
  }

  function jIndex() {
    j += 1;
    if (j >= finishPointJ) {
      // console.log('finish')
    }
    if (j > finishPointJ) {
      // console.log(jPointVariation)
      jPointVariation = 1000;
      return jPointVariation;
    }
    jPointVariation = map[i - 1][j];
    // console.log('jIndex ' + jPointVariation)
    return jPointVariation;
  }

  let i = 0;
  let j = 0;

  function rover() {
    // && currentPoint != finishPoint
    //  && map[i][j]!= arr[finishPointI][finishPointJ]

    while (
      i != finishPointI ||
      j != finishPointJ ||
      currentPoint != finishPoint
    ) {
      result.push(`[${i}][${j}]`);

      iIndex();
      jIndex();

      steps += 1;
      fuel += 1;
      if (currentPoint >= jPointVariation) {
        if (iPointVariation / currentPoint >= jPointVariation / currentPoint) {
          i = i - 1;
          fuel += +Math.abs(currentPoint - jPointVariation);
          currentPoint = jPointVariation;
        } else {
          j = j - 1;
          fuel += +Math.abs(currentPoint - iPointVariation);
          currentPoint = iPointVariation;
        }
      } else {
        if (iPointVariation >= jPointVariation) {
          i = i - 1;
          fuel += +Math.abs(currentPoint - jPointVariation);
          currentPoint = jPointVariation;
        } else {
          j = j - 1;
          fuel += +Math.abs(currentPoint - iPointVariation);
          currentPoint = iPointVariation;
        }
      }
      // console.log('fuel = ' + fuel)
      // console.log('вариант J = ' + jPointVariation);
      // console.log('вариант I = ' + iPointVariation);
      // console.log('выбрано знач +++++++++++++++ ' + currentPoint)
    }
  }

  rover();

  result = result.join("->");
  // console.log('счётчик = ' + steps)

  fs.writeFileSync(
    "path-plan.txt",
    `${result}->[${finishPointI}][${finishPointJ}]
  steps: ${steps}
  fuel: ${fuel}`
  );

  //   return `path-plan.txt
  // ${result}->[${finishPointI}][${finishPointJ}]
  // steps: ${steps}
  // fuel: ${fuel}`;

  //   console.log(`path-plan.txt
  // ${result}->[${finishPointI}][${finishPointJ}]
  // steps: ${steps}
  // fuel: ${fuel}`);
}

module.exports = {
  calculateRoverPath,
};
