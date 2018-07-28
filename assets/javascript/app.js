
$(document).ready(function() {


   //HIDE THE APP
   $(".container-all").hide();

   //HIDE VIDEO SHOW APP!!
   $("#startapp").click(function()
    {
      $(".container-all").show();
      $(".container-first").hide();
      
    });





    // array containing buttons in the on the page
    var thingsToLookFor =   [
    "WTF", "INSANE", "LOVE IT", "NO WAY", "CRAZY",
    "NO", "YES", "BUT WHY", "NOOOO", "F THAT", "DISGUST", "GROSS", "ANGRY",
    "MORE", "ADD SAUCE", "FOR YOU", "I DONT THINK SO", "NOPE"
    ]

    //to add more its the value of what you type in the search box.
    //

   
    
    function emptyDivs(){
        $("#gifs-appear-here").empty();
    }

    createButtons();

    //for buttons to display gifs!
    function getGifs() {

       // alert("new");
        emptyDivs();
        //var newElement = $("#user-input").val().trim();
      
        var newElement = $(this).attr("data-name") || $("#user-input").val().trim();
        
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        newElement +  "&api_key=dIxq1DvCzPUzR76t4chDHIftkUWTFibP&limit=10";

         
  
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            var results = response.data;
  
            for (var i = 0; i < results.length; i++) {
              var gifDiv = $("<div class='item'>");
                  console.log(results)
                
                
              var rating = results[i].rating;

              
              var gifURL = results[i].embed_url;



              var l = $("<p>").html("Share:<br>"  + gifURL);
              var p = $("<p>").text("Rating: " + rating);
              
  
              var gifImage = $("<img>");
              gifImage.attr("class", "gif");

              gifImage.attr("src", results[i].images.fixed_height_still.url);
              gifImage.attr("data-still", results[i].images.fixed_height_still.url);
              gifImage.attr("data-animate", results[i].images.fixed_height.url);
              gifImage.attr("data-state", "still");
  
              gifDiv.prepend(p);
              gifDiv.prepend(l);
              gifDiv.prepend(gifImage);
  
              $("#gifs-appear-here").prepend(gifDiv);

              //try some
              

              ///FUnctions HAS TO BE INSIDE THE RESPONSE FUNCTION OTHERWISE IT WONT TARGET IT
              $(".gif").on("click", function() {
                // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                var state = $(this).attr("data-state");
                console.log(state);
                // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                // Then, set the image's data-state to animate
                // Else set src to the data-still value
                if (state === "still") {
                  $(this).attr("src", $(this).attr("data-animate"));
                  $(this).attr("data-state", "animate");
                } else {
                  $(this).attr("src", $(this).attr("data-still"));
                  $(this).attr("data-state", "still");
                }



              });
              
            }
          });
      };


          //create buttons!!
    function createButtons(){


        $(".button-container").empty();

        //goes through array!!!
        for( var i = 0; i < thingsToLookFor.length; i+=1){
           console.log(thingsToLookFor[i]);
         
        
         var a = $("<button>");
         //a.attr("id");
   
         a.attr("data-name", thingsToLookFor [i]);
   
         a.attr("class", "btn btn-info");
   
         a.text(thingsToLookFor [i]);
   
         $(".button-container").append(a);
         

        
   
       }

       
   }
   
       // add new search
       $("#add-search").on("click", function(event) {
       
       event.preventDefault();
   
       var newElement = $("#user-input").val().trim();
       
       
       thingsToLookFor.push(newElement);
       console.log(thingsToLookFor);
       createButtons();
       $("#user-input").val("");

       //SCROLL BACK UP
       $(window).scrollTop(0);
       
       });


       $(document).on("click", ".btn-info", getGifs);

     
    
      



});