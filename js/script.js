jQuery(document).ready(function(r){r("#process_html").LineProgressbar({percentage:55,fillBackgroundColor:"#1abc9c"}),r("#process_css").LineProgressbar({percentage:55,fillBackgroundColor:"#1abc9c"}),r("#process_js").LineProgressbar({percentage:49,fillBackgroundColor:"#1abc9c"}),r("#process_php").LineProgressbar({percentage:30,fillBackgroundColor:"#1abc9c"}),r("#process_pts").LineProgressbar({percentage:35,fillBackgroundColor:"#1abc9c"}),r("#process_gg").LineProgressbar({percentage:49,fillBackgroundColor:"#1abc9c"}),r(".product").hover(function(){$heightImg=r(this).find(".product__thumb img").height(),$heightThumb=r(this).find(".product__thumb").height(),$indexStop=$heightThumb-$heightImg,r(this).find(".product__thumb img").css("transform","translateY("+$indexStop+"px)")},function(){r(this).find(".product__thumb img").css("transform","translateY(0)")})});