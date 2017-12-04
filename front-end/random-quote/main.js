
function getRandomRGB(num){
  var r = 0;
  var b = 0;
  var g = 0;
  var sum = r+b+g;
  
  do{
    r = Math.floor(Math.random()*255);
    b = Math.floor(Math.random()*255);
    g = Math.floor(Math.random()*255);
  }while(sum % g < 30);
  
  var rr = 255 - r;
  var rg = 255 - g;
  var rb = 255 - b;
  
  return ['rgb('+r+','+g+','+b+')', 'rgb('+rr+','+rg+','+rb+')'];
}

function randomBackgroundColor(){
  var rgbArr = getRandomRGB();
  var rgb = rgbArr[0]
  var inverse_rgb = rgbArr[1];
  
  $("body").css('background', rgb);
  $("h5").css('color', rgb);
  $(".quote").css('color', rgb);
  $("#gen").css('background', rgb);
  $("#tweet").css('background', rgb); 
  $(".fa-heart").css('color', inverse_rgb);
}

$(document).ready(function() {
  randomBackgroundColor();
  $("#gen").on("click", function(e) {
    var quote = "";
    var author = "";
    e.preventDefault();
    $.ajax( {
      url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      success: function(data) {
        var post = data.shift();
        author = post.title;
        quote = (post.content);

        //Random colors 
        randomBackgroundColor(); 
        
        quote = '"'+$(quote).text()+'"';
        var tweet = quote+" -"+author;
        var hashtag = "quotes";
        var related = "freecodecamp";

        //tweeter button
        $("#tweet").attr('href', 'https://twitter.com/intent/tweet?hashtags='+hashtag+'&related='+related+'&text=' + (tweet));

        //quote fading
        $("#quote, #author").fadeOut(function() {
          $("#quote").html(quote).fadeIn(750);
          $("#author").html(author).fadeIn(750);
        });
      },
      cache: false
    });
  });
});
