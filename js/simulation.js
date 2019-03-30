/* Randomly populate an array between a set of limits with a uniform distribution */
function randUni(upper, lower, n) {
  let popMat, popArr;

  popMat = math.random([n, 1], lower, upper);
  popArr = popMat.flat(); // Flattens matrix to array

  return popArr;
}

/* Randomly populate an array using a normal uniform distribution up to a limit */
function randNorm(lower, upper, n) {
  let popMat, popNorm, popArr;
  let degree = 6;
  let limit = (upper - lower)/2;
  let shift = lower + limit;

  // Approxiate mate a normal distirbution from a uniform one up to the degree, d
  // [(d * U(0,1) - d/2) / (d/2)] * limit
  popMat = math.random([n, degree]);

  popNorm = math.add(math.multiply(math.divide(math.subtract(math.sum(popMat, 1), degree/2), degree/2), limit), shift);

  popArr = popNorm.flat(); // Flattens matrix

  return popArr;
}

/* Stackup simulation method */
function stackup(units, custom) {
  let tolWell, tolPoor;
  let tolWellMean, tolWellSTD, tolPoorMean, tolPoorSTD;

  let layout = {
    //autosize: true,
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
      t: 30,
      pad: 5
    },

    showlegend: true,
    legend: {
      x: 0.7,
      y: 0.95
    },

    plot_bgcolor: 'rgba(0,0,0,0)',
    paper_bgcolor: 'rgba(0,0,0,0)'
  };

  if (custom) {
    var bounds = {};
    let i = 0;
    let traceSet1 = {type: 'histogram'};
    let traceSet2 = {type: 'histogram'};

    $("form input").each(function() {
      bounds[i] = parseFloat($(this).val());
      i++;
    });

    // Mapping bounds to standard sets
    set1 = [bounds[1], bounds[0], bounds[3], bounds[2], bounds[5], bounds[4]];
    set2 = [bounds[7], bounds[6], bounds[9], bounds[8], bounds[11], bounds[10]];

    // Rejection criteria
    let rej = parseFloat($("#reject-custom").val());

    // Zero check function
    function zeroCheck(val) {
      return val == 0;
    }

    if (!set1.every(zeroCheck)) {
      // Tolerance set 1
      let tolSet1 = math.add(randNorm(set1[0], set1[1], units),
                              randNorm(set1[2], set1[3], units),
                                randNorm(set1[4], set1[5], units));

      traceSet1 = {
        x: tolSet1,
        type: 'histogram',
        name: 'Set 1',
        marker: {
          color: 'rgba(41, 72, 102, 0.8)'
        },
      };

      // Update table with statistics
      tableData('data-row1-custom', tolSet1, rej);
    }

    if (!set2.every(zeroCheck)) {
      // Tolerance set 2
      let tolSet2 = math.add(randNorm(set2[0], set2[1], units),
                              randNorm(set2[2], set2[3], units),
                                randNorm(set2[4], set2[5], units));

      traceSet2 = {
        x: tolSet2,
        type: 'histogram',
        name: 'Set 2',
        marker: {
          color: 'rgba(247, 151, 95, 0.8)'
        },
      };

      // Update table with statistics
      tableData('data-row2-custom', tolSet2, rej);
    }

    let data = [traceSet1, traceSet2];

    Plotly.newPlot('simulation-plot-custom', data, layout, {displayModeBar: false});
  }
  else {
    var direction = $('input[name=Direction]:checked').val();
    var datumVal = $('input[name=Datum-P]:checked').val();
    var fastVal = $('input[name=Datum-H]:checked').val();

    switch (direction) {
      case 'axial':
        // Well designed tolerance contribution (unaffected by datum)
        tolWell = math.add(randNorm(-0.1, 0.1, units), randNorm(-0.1, 0.1, units), randNorm(-0.1, 0.1, units));

        // Poorly designed tolerance contribution (directed by datum)
        tolPoor = math.add(randNorm(-0.1, 0.1, units), randNorm(-0.1, 0.1, units), randNorm(-0.1, 0.1, units),  // Locating grooves
                            randNorm(-0.06, 0, units), randNorm(-0.06, 0, units), randNorm(-0.06, 0, units),    // Internal circlips
                              randNorm(0, 0.14, units), randNorm(0, 0.14, units), randNorm(0, 0.14, units),     // Internal groove size
                                randNorm(-0.06, 0, units), randNorm(-0.06, 0, units),         // External circlips
                                  randNorm(0, 0.14, units), randNorm(0, 0.14, units),         // External groove size
                                    randNorm(-0.1, 0.1, units), randNorm(-0.1, 0.1, units));  // Housing lip

        // Add additional tolerances for datum A
        if (datumVal === 'a' ) {
          tolPoor = math.add(tolPoor, randNorm(-0.1, 0.1, units), randNorm(-0.06, 0, units), randNorm(0, 0.14, units)); // Additional circlip and grooves
        }

        // Update table with statistics
        tableData('data-row1', tolWell, 0.1);
        tableData('data-row2', tolPoor, 0.1);
      break

      case 'radial':
        // Well designed tolerance contribution
        tolWell = math.add(randNorm(-0.004, 0.009, units),  // Shaft contribution
                            randNorm(-0.1, 0.1, units), randNorm(0, 0.025, units));  // Housing contribution

        // Poorly designed tolerance contribution
        tolPoor = math.add(randNorm(-0.004, 0.009, units),  // Shaft contribution
                            randNorm(-0.1, 0.1, units), randNorm(-0.1, 0.1, units), randNorm(0, 0.025, units)); // Housing contribution (hole location and bearing bore)

        // Add additional tolerances for bolt fasteners
        if (fastVal === 'b' ) {
          tolPoor = math.add(tolPoor, randNorm(-0.1, 0.1, units), randNorm(-0.1, 0.1, units)); // Bore contribution
        }

        // Update table with statistics
        tableData('data-row1', tolWell, 0.05);
        tableData('data-row2', tolPoor, 0.05);
      break
    }

    /* Histogram plot */
    // Simulated data
    let traceWell = {
          x: tolWell,
          type: 'histogram',
          name: 'Well Designed',
          marker: {
            color: 'rgba(41, 72, 102, 0.8)'
          },
        };

    let tracePoor = {
          x: tolPoor,
          type: 'histogram',
          name: 'Poorly Designed',
          marker: {
            color: 'rgba(247, 151, 95, 0.8)'
          },
        };

    let data = [traceWell, tracePoor];

    Plotly.newPlot('simulation-plot', data, layout,  {displayModeBar: false});
  }
}

/* Calculate data and update table */
function tableData(id, tolData, limit) {
  let tolMean, tolSTD, tolUnits, rejected;

  // Mean and standard deviation in um (2dp)
  tolMean = math.round(math.mean(tolData) * 1000, 2);
  tolSTD = math.round(math.std(tolData) * 1000, 2);

  // Calculate number of rejected units
  rejLarger = math.larger(tolData, limit).filter(Boolean).length;
  rejSmaller = math.smaller(tolData, -limit).filter(Boolean).length;
  rejPercent = math.round(((rejLarger + rejSmaller) / tolData.length) * 100, 2);

  $("#" + id).find("td").eq(0).html(tolMean);
  $("#" + id).find("td").eq(1).html(tolSTD);
  $("#" + id).find("td").eq(2).html(rejPercent + " %" );
}
