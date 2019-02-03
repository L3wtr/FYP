/* Randomly populate an array between a set of limits */
function randPop(upper, lower, n) {
  let popMat, popArr;

  popMat = math.random([n, 1], lower, upper);
  popArr = popMat.flat(); // Flattens matrix to array

  return popArr;
}

/* Stackup simulation method */
function stackup() {
  let tol = math.add(randPop(5, 10, 10000), randPop(5, 15, 10000), randPop(-10, 10, 10000), randPop(-5, 0, 10000));

  /* Histogram plot */
  let trace = {
        x: tol,
        type: 'histogram',
        marker: {
          color: 'rgba(41, 72, 102, 0.9)',
        }
      };

  let data = [trace];

  let layout = {
    title: {
      text: '<b>Stackup Distribution</b>',
        font: {
          size: 16,
        }
    },
    xaxis: {
      title: '<b>Total Misalignment (mm)</b>',
      showgrid: false,
      fixedrange: true,
      zeroline: false
    },
    yaxis: {
      title: '<b>Number of Units</b>',
      showline: false,
      fixedrange: true
    },
    margin: {
      t: 70,
      pad: 5
    }
  };

  Plotly.newPlot('simulation-plot', data, layout,  {displayModeBar: false});
}