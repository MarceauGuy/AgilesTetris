$(document).ready(function(){
    $("#title").click(function(){
      $(this).hide();
    });
  });

  $(document).ready(function(){
    $("#btn1").click(function(){
      alert("Text: " + $("#test").text());
    });
    $("#btn2").click(function(){
      alert("HTML: " + $("#test").html());
    });
  });