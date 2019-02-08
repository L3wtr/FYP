/* Randomly populate an array between a set of limits with a uniform distribution */
function randUni(upper, lower, n) {
  let popMat, popArr;

  popMat = math.random([n, 1], lower, upper);
  popArr = popMat.flat(); // Flattens matrix to array

  return popArr;
}

/* Randomly populate an array using a normal uniform distribution up to a limit */
function randNorm(limit, n) {
  let popMat, popNorm, popArr;
  let degree = 6;

  // Approxiate mate a normal distirbution from a uniform one up to the degree, d
  // [(d * U(0,1) - d/2) / (d/2)] * limit
  popMat = math.random([n, degree]);
  popNorm = math.multiply(math.divide(math.subtract(math.sum(popMat, 1), degree/2), degree/2), limit);

  popArr = popNorm.flat(); // Flattens array

  return popArr;
}

/* Stackup simulation method */
function stackup(units) {

  // JQuery fetching tolerance limits
  let limits = [0.5, 0.1, 0.1, 0.5];

  // Assign limits based on checkbox selection
  let tolIndex = $(".tol-single input:checkbox:not(:checked)").map(function() {
      return $(this).val();
    }).get();

  for (let i=0; i<tolIndex.length; i++) {
    limits[i] = 0;
  }

  // Summing arrays representing stackup
  let tol = math.add(randNorm(limits[0], units), randNorm(limits[1], units),
                      randNorm(limits[2], units), randNorm(limits[3], units));

  // Statistics Calculation (rounded to 5 dp)
  let tolMean = math.round(math.mean(tol), 5);
  let tolSTD = math.round(math.std(tol), 5);

  /* Histogram plot */
  // Simulated data
  let trace = {
        x: tol,
        type: 'histogram',
        marker: {
          color: 'rgba(41, 72, 102, 1)'
        },
        showlegend: false
      };

  // Statistics (for legend display)
  let legMean = {
        x: [0],
        name: '<b>Mean:</b> ' + tolMean + ' mm',
        opacity: 0
  }
  let legSTD = {
        x: [0],
        name: '<b>Standard Deviation:</b> ' + tolSTD + ' mm',
        opacity: 0
  }

  let data = [trace, legMean, legSTD];

  let layout = {
    //autosize: true,
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

    showlegend: true,
    legend: {
      x: -0.05,
      y: 1.15
    },

    plot_bgcolor: 'rgba(0,0,0,0)',
    paper_bgcolor: 'rgba(0,0,0,0)'
  };

  Plotly.newPlot('simulation-plot', data, layout,  {displayModeBar: false});
}
