$('#to-do_list').html("<input class='item' spellcheck='false'>".repeat(6));
var rmvstr = false,
   crsout = false,
  firstCross = true;

function add() {
   if (rmvstr) {
      remove();
   } else if (crsout) {
      crossout();
   }
   $('#to-do_list').animate({
      height: "+=38"
   }, {
      duration: 500,
      complete: function() {
         $('#to-do_list').append("<input class='item' spellcheck='false'>");
         if (rmvstr) {
            $('.item').removeClass('removeclass');
            $(".item").toggleClass('removeclass');
         }
      }
   });
}

function remove() {
     if (crsout) {
        crossout();
     }
     if (rmvstr) {
        $("#rmv").html('x');
        rmvstr = false;
        $(".item").css({
           cursor: "auto",
           "border-radius": "0",
           background: "none"
        });
     } else {
        $("#rmv").html('Tap to Remove');
        rmvstr = true;
        $(".item").css({
           cursor: "pointer",
           "border-radius": "15px",
           background: "rgba(255,0,0,.25)"
        });
       if(firstCross){
        $(document).on('click', '.item', function() {
           if (rmvstr) {
              $(this).blur();
              $(this).remove();
              $('#to-do_list').animate({
                 height: "-=38"
              }, {
                 duration: 500
              });
           }
        });
         firstCross = false;
       }
     }
}

function crossout() {
   if (rmvstr) {
      remove();
   }
   if (crsout) {
      $("#crsout").html("-");
      $("#crsout").css("transform", "translate(-50%)");
      crsout = false;
      $(".item").css("cursor", "auto");
      $(document).on('click', '.item', function() {
         $(this).focus();
         $(this).removeClass("finished");
      });
      $(document).on('mouseover', '.item', function() {
         if ($(this).hasClass("finished")) {
            $(this).css({
               opacity: "1",
               color: "red"
            });
         } else {
            $(this).css({
               opacity: "1",
               color: "#636363"
            });
         }
      });
   } else {
      $("#crsout").html("Tap to Cross Out");
      $("#crsout").css("transform", "translate(-50%)");
      crsout = true;
      $(".item").css("cursor", "pointer");
      $(document).on('click', '.item', function() {
         $(this).blur();
         $(this).toggleClass("finished");
      });
      $(document).on('mouseover', '.item', function() {
         $(this).css({
            "opacity": ".75",
            color: 'red'
         });
      });
      $(document).on('mouseout', '.item', function() {
         if ($(this).hasClass("finished")) {
            $(this).css({
               "opacity": "1",
               color: "red"
            });
         } else {
            $(this).css({
               "opacity": "1",
               color: "#636363"
            });
         }
      });
   }
}

function fullscreen() {
   if (rmvstr) {
      remove();
   } else if (crsout) {
      crossout();
   }
   if (!$wI) {
      $wI = true;
      $("#all").animate({
         width: '95%'
      }, {
         complete: function() {
            $("#flsrn").html(">-<");
         }
      });
   } else {
      $wI = false;
      $("#all").animate({
         width: '360px'
      }, {
         complete: function() {
            $("#flsrn").html("<->");
         }
      });
   }
}
$("#increase").click(function() {
   add();
});
$wI = false;
$("#flsrn").click(function() {
   fullscreen();
});
$("#rmv").click(function() {
   remove();
});
$("#crsout").click(function() {
   crossout();
});

inputs = $("#to-do_list input").keypress(function(e) {
    if(e.which == 13) {
      e.preventDefault();
      var nextInput = inputs.get(inputs.index(document.activeElement) + 1);
      if (nextInput) {
        nextInput.focus();
      }
    }
});