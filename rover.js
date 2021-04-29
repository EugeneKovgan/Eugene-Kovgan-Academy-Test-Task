function calculateRoverPath(map) {
  let startPoint;
  let currentPoint;
  let steps = 0;
  let fuel = 0;
  let iPointVariation = 0;
  let jPointVariation = 0;
  let finishPointJ;
  let finishPointI;
  let finishPoint;

  map.map(function (curr, ind, arr) {
    startPoint = arr[0][0];
    currentPoint = startPoint;
    finishPointJ = curr.length - 1;
    finishPointI = arr.length - 1;
    finishPoint = arr[finishPointI][finishPointJ];
  });

  function iIndex() {
    i += 1;
    if (i == finishPointI) {
    }
    if (i > finishPointI) {
      iPointVariation = 1000;
      return iPointVariation;
    }
    iPointVariation = map[i][j];
    return iPointVariation;
  }
  function jIndex() {
    j += 1;

    if (j > finishPointJ) {
      jPointVariation = 1000;
      return jPointVariation;
    }
    jPointVariation = map[i - 1][j];
    return jPointVariation;
  }

  let i = 0;
  let j = 0;

  function rover() {
    while (
      i != finishPointI ||
      j != finishPointJ ||
      currentPoint != finishPoint
    ) {
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
    }
  }
  rover();
}

module.exports = {
  calculateRoverPath,
};
