/* Document Ready ----------------------------------------------------------- */
$(document).ready(function() {

  // Set default navbar tab
  location.hash = '#introduction';
  $(".nav li").removeClass('active');
  $("#introduction-tab").addClass('active');

});

/* Dynamic onhashchange event ----------------------------------------------- */
window.addEventListener("hashchange", function() {

  // Set active navbar tab
  var tabID = window.location.hash.concat('-tab');

  $(".nav li").removeClass('active');
  $(tabID).addClass('active');

  // Display/hide content based on hash
  var hashID = window.location.hash.concat('-content');

  $("#navbar-content").children().fadeOut(250).promise().done( function() {
    $(hashID).fadeIn(250);
  });

});

/* Simulation radio button group event -------------------------------------- */
$("#10units, #100units, #10000units").on('click', function() {

  // Clear previously selected
  $("#10units, #100units, #10000units").removeClass('btn-info');
  $("#10units, #100units, #10000units").addClass('btn-outline-info');

  // Toggle button class for clarification
  $(this).toggleClass('btn-outline-info btn-info');

});

/* Simulation run onclick event --------------------------------------------- */
$("#sim-button").on('click', function() {

  units = $('input[name=Units]:checked').val();

  // Simulate stackup model
  stackup(units);
  $("#simulation-plot").hide();

  $("#simulation-settings").fadeOut(250).promise().done( function() {
      $("#simulation-plot, #simulation-again").fadeIn(250);
  });

});

/* Simulation run again onclick event --------------------------------------- */
$("#sim-button-again").on('click', function() {

  units = $('input[name=Units]:checked').val();

  // Simulate stackup model
  stackup(units);

});

/* Simulation reset onclick event ------------------------------------------- */
$("#sim-button-reset").on('click', function() {

  $("#simulation-plot, #simulation-again").fadeOut(250).promise().done( function() {
    $("#simulation-settings").fadeIn(250);
  });

});
