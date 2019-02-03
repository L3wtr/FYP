/* Document Ready ----------------------------------------------------------- */
$(document).ready(function() {

  /* Set default navbar tab*/
  location.hash = '#introduction';
  $(".nav li").removeClass('active');
  $("#introduction-tab").addClass('active');

});

/* Dynamic onhashchange event ----------------------------------------------- */
window.addEventListener("hashchange", function() {

  /* Set active navbar tab */
  var tabID = window.location.hash.concat('-tab');

  $(".nav li").removeClass('active');
  $(tabID).addClass('active');

  /* Display/hide content based on hash */
  var hashID = window.location.hash.concat('-content');

  $("#navbar-content").children().fadeOut(250).promise().done( function() {
    $(hashID).fadeIn(250);
  });

});

/* Simulation onclick event ------------------------------------------------- */
$('#sim-button').on('click', function() {

  /* Simulate stackup model */
  stackup();
});