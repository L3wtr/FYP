/* Randomly populate an array between a set of limits */
function randPop(upper, lower, n) {
  let popMat, popArr;

  popMat = math.random([n, 1], lower, upper);
  popArr = popMat.flat(); // Flattens matrix to array

  return popArr;
}

/* Stackup simulation method */
function stackup(units) {
  let tol = math.add(randPop(5, 10, units), randPop(-5, 5, units), randPop(-10, 10, units), randPop(-5, 0, units));

  /* Histogram plot */
  let trace = {
        x: tol,
        type: 'histogram',
        marker: {
          color: 'rgba(41, 72, 102, 1)',
        }
      };

  let data = [trace];

  let layout = {
    /*
    title: {
      text: '<b>Stackup Distribution</b>',
        font: {
          size: 16,
        }
    },*/
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
      t: 30,
      pad: 5
    },
    plot_bgcolor: 'rgba(0,0,0,0)',
    paper_bgcolor: 'rgba(0,0,0,0)'
  };

  Plotly.newPlot('simulation-plot', data, layout,  {displayModeBar: false});
}
