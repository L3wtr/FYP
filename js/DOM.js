/* Document Ready ----------------------------------------------------------- */
$(document).ready(function() {

  // Set default navbar tab
  location.hash = '#introduction';
  $(".nav li").removeClass('active');
  $("#introduction-tab").addClass('active');

  // Update checkbox disable state
  checkChecked.change();

  // Enable tooltip
  $(function() {
    $('.tooltip-wrapper').tooltip({position: "bottom"});
  });
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

/* Dropdown button selection ------------------------------------------------ */
$(".dropdown-item").click(function() {

  // Button group ID
  var btnID = $(this).parent().parent().attr('id');

  // Filter through button types ()
  if ($(this).parent().hasClass('blue')) {

    $('#' + btnID + ' button').html('&Oslash ' + $(this).val().substring(5) + ' ');
  }
  else {
    if ($(this).parent().hasClass('red-plus')) {

      $('#' + btnID + ' button').html('+ ' + $(this).val() + '.0 ');
    }
    else if ($(this).parent().hasClass('red-minus')) {

      $('#' + btnID + ' button').html('&#8211 ' + $(this).val().substring(1) + '.0 ');
    }
  }
});

/* Select all checkbox event ------------------------------------------------ */
$(".tol-all").click(function() {

  // Checks all boxes if select is checked
  $("input:checkbox").not(this).prop('checked', this.checked);

});

/* Toggle select all checkbox check */
$(".tol-single").click(function() {

  // Checks to see if all tolerance options are selected
  if ($("input:checkbox").not(".tol-all").not(':checked').length == 0) {

    $(".tol-all").prop('checked', true);
  }
  else {

    $(".tol-all").prop('checked', false);
  }
});

/* Disable run button if no checkboxes selected ----------------------------- */
var checkChecked = $(".form-check-input");

checkChecked.change(function () {
  $('#sim-button').prop('disabled', checkChecked.filter(':checked').length < 1);

  // Toggles tool tip based on disabled state
  if (checkChecked.filter(':checked').length < 1) {

    $(".tooltip-wrapper").attr('data-original-title', "Please select a tolerance to include");
  }
  else {

    $(".tooltip-wrapper").attr('data-original-title', "");
  }
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

  var units = $('input[name=Units]:checked').val();

  // Simulate stackup model
  stackup(units);
  $("#simulation-plot").hide();

  $("#simulation-settings").fadeOut(250).promise().done( function() {
      $("#simulation-plot").fadeTo(250,100);
      $("#simulation-again").fadeIn(250);
  });
});

/* Simulation run again onclick event --------------------------------------- */
$("#sim-button-again").on('click', function() {

  var units = $('input[name=Units]:checked').val();

  // Simulate stackup model
  stackup(units);
});

/* Simulation reset onclick event ------------------------------------------- */
$("#sim-button-reset").on('click', function() {

  $("#simulation-plot").fadeTo(250,0).promise().done( function() {
    $("#simulation-plot").empty();
  });

  $("#simulation-again").fadeOut(250).promise().done( function() {
    $("#simulation-settings").fadeIn(250);
  });
});
