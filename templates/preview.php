<?php
// From: http://papermashup.com/css-and-javascript-mobile-ui-preview-tool/
?>

<!DOCTYPE html>
<html >
  <head>
    <meta charset="UTF-8">
    <title>ProudCity Service Center Preview</title>
        <style>
          /*! normalize.css v3.0.2 | MIT License | git.io/normalize */html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block;vertical-align:baseline}audio:not([controls]){display:none;height:0}[hidden],template{display:none}a{background-color:transparent}a:active,a:hover{outline:0}abbr[title]{border-bottom:1px dotted}b,strong{font-weight:bold}dfn{font-style:italic}h1{font-size:2em;margin:0.67em 0}mark{background:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-0.5em}sub{bottom:-0.25em}img{border:0}svg:not(:root){overflow:hidden}figure{margin:1em 40px}hr{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;height:0}pre{overflow:auto}code,kbd,pre,samp{font-family:monospace, monospace;font-size:1em}button,input,optgroup,select,textarea{color:inherit;font:inherit;margin:0}button{overflow:visible}button,select{text-transform:none}button,html input[type="button"],input[type="reset"],input[type="submit"]{-webkit-appearance:button;cursor:pointer}button[disabled],html input[disabled]{cursor:default}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}input{line-height:normal}input[type="checkbox"],input[type="radio"]{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:0}input[type="number"]::-webkit-inner-spin-button,input[type="number"]::-webkit-outer-spin-button{height:auto}input[type="search"]{-webkit-appearance:textfield;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box}input[type="search"]::-webkit-search-cancel-button,input[type="search"]::-webkit-search-decoration{-webkit-appearance:none}fieldset{border:1px solid #c0c0c0;margin:0 2px;padding:0.35em 0.625em 0.75em}legend{border:0;padding:0}textarea{overflow:auto}optgroup{font-weight:bold}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}          
        </style>
        <style>
          @import url(https://fonts.googleapis.com/css?family=Open+Sans:400,600,300);

  html{
    height:100%;
  }

  body {
    font-family: 'Open Sans', sans-serif;
    height:100%;
    color:#fff;
/* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#4c4c4c+0,2c2c2c+0,1c1c1c+0,2b2b2b+53,131313+100 */
background: #fff;/*#1b1b1b; /* Old browsers */
  }
  /*Basic Phone styling*/
  #wrapper {
    background: url(file:///home/jeff/Downloads/facebook.png) center top no-repeat;
  }
  .phone {
    position:relative;
    border: 40px solid #121212;
    border-width: 55px 7px;
    border-radius: 40px;
    margin: 50px auto;
    overflow: hidden;
    -webkit-transition: all 0.5s ease;
    transition: all 0.5s ease;
   -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
       -moz-animation: fadein 2s; /* Firefox < 16 */
        -ms-animation: fadein 2s; /* Internet Explorer */
         -o-animation: fadein 2s; /* Opera < 12.1 */
            animation: fadein 2s;
}
  
  .phone iframe {
    border: 0;
    width: 100%;
    height: 100%;
    background-color:#000;
  }
  /*Different Perspectives*/
  
  .phone.view_1 {
    -webkit-transform: rotateX(50deg) rotateY(0deg) rotateZ(-30deg);
            transform: rotateX(50deg) rotateY(0deg) rotateZ(-30deg);
    box-shadow: -3px 3px 0 #000, -6px 6px 0 #000, -9px 9px 0 #000, -12px 12px 0 #000, -14px 10px 20px #000;
  }
  
  .phone.view_2 {
    -webkit-transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
            transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    box-shadow: 0px 3px 0 #000, 0px 4px 0 #000, 0px 5px 0 #000, 0px 7px 0 #000, 0px 10px 20px #000;
  }


@-webkit-keyframes rotate {

    0%{-webkit-transform: rotateX(50deg) rotateY(0deg) rotateZ(-30deg);}
    50%{-webkit-transform: rotateX(50deg) rotateY(0deg) rotateZ(-40deg);}
    100%{-webkit-transform: rotateX(50deg) rotateY(0deg) rotateZ(-30deg);}
}

.view_1.rotate
{
    -webkit-animation-name:             rotate; 
    -webkit-animation-duration:         15s; 
    -webkit-animation-iteration-count:  infinite;
    -webkit-animation-timing-function: linear;
}


  /*Controls*/
  
  #controls {
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 0.9em;
    color: #333;
  }
  
  #controls div {
    margin: 10px;
  }
  
  #controls div label {
    width: 120px;
    display: block;
    float: left;
    color: #fff;
  }

  #phone-controls{
    position: absolute;
    top: 20px;
    right: 20px;
    width: 200px;
  }

  #phones {
    border-top:1px solid #fff;
    margin-top:20px;
    padding-top:20px;
  }

  #phones button {
    outline: none;
    width: 198px;
    border: 1px solid #016aa0;
    border-radius:5px;
    -moz-border-radius:5px;
    -webkit-border-radius:5px;
    -o-border-radius:5px;
    background-color: #016aa0;
    height: 40px;
    margin: 10px 0;
    color: #fff;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
  }
  
  #phones button:hover {
    color: #444;
    background-color: #eee;
  }
  
  #views button {
    outline: none;
    width: 198px;
    border: 1px solid #00a8ff;
    border-radius:5px;
    -moz-border-radius:5px;
    -webkit-border-radius:5px;
    -o-border-radius:5px;
    background-color: #00a8ff;
    height: 40px;
    margin: 10px 0;
    color: #fff;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
  }
  
  #views button:hover {
    color: #444;
    background-color: #eee;
  }
  
  @media (max-width:900px) {
    #wrapper {
      -webkit-transform: scale(0.8, 0.8);
              transform: scale(0.8, 0.8);
    }
  }
  
  @media (max-width:700px) {
    #wrapper {
      -webkit-transform: scale(0.6, 0.6);
              transform: scale(0.6, 0.6);
    }
  }
  
  @media (max-width:500px) {
    #wrapper {
      -webkit-transform: scale(0.4, 0.4);
              transform: scale(0.4, 0.4);
    }
  }

#loader {
  margin: 60px auto;
  font-size: 10px;
  position: absolute;
  left:34%;
  top:30%;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(255, 255, 255, 0.2);
  border-right: 1.1em solid rgba(255, 255, 255, 0.2);
  border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
  border-left: 1.1em solid #ffffff;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
#loader,
#loader:after {
  border-radius: 50%;
  width: 10em;
  height: 10em;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}


@keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Firefox < 16 */
@-moz-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Internet Explorer */
@-ms-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Opera < 12.1 */
@-o-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}
</style>
  </head>

  <body>

    <!--The Main Thing-->
<div id="wrapper">
<div class="phone view_2" id="phone_1">
  <div id="loader">Loading...</div>
  <iframe src="<?php print $url ?>" id="frame_1"></iframe>
</div>
</div>

<!--Controls etc.-->
<div id="controls" style="display: none;">
    <!--Idea by /u/aerosole-->
  <div>
    <label for="iframePerspective">Add perspective:</label>
    <input type="checkbox" id="iframePerspective"  checked="true" />
  </div>

</div>

<div id="phone-controls">

  <div id="views">
      <button value="1">Table View</button>
      <button value="2">Front View</button>
  </div>

  <div id="phones">
      <button value="1">iPhone 6</button>
      <button value="2">Samsing Galaxy Note</button>
      <button value="3">Microsoft Lumia 1020</button>
      <button value="4">HTC One</button>
      <button value="5">iPad Mini</button>
  </div>

</div>

    
        <script>
          /*Only needed for the controls*/
  phone = document.getElementById("phone_1"),
  iframe = document.getElementById("frame_1");


/*View*/
function updateView(view) {
  if (view) {
    phone.className = "phone view_" + view;
  }
}

/*Controls*/
function updateIframe() {

  // preload iphone width and height
  phone.style.width = "375px";
  phone.style.height = "667px";

  /*Idea by /u/aerosole*/
  document.getElementById("wrapper").style.perspective = (
    document.getElementById("iframePerspective").checked ? "1300px" : "none"
  );

}

updateIframe();

/*Events*/
document.getElementById("controls").addEventListener("change", function() {
  updateIframe();
});

document.getElementById("views").addEventListener("click", function(evt) {
  updateView(evt.target.value);
});

document.getElementById("phones").addEventListener("click", function(evt) {

  if(evt.target.value == 1){
    // iphone 6
    width = 375;
    height = 667; 
  }

  if(evt.target.value == 2){
    // samsung
    width = 400;
    height = 640; 
  }

  if(evt.target.value == 3){
    // microsoft
    width = 320;
    height = 480;  
  }

  if(evt.target.value == 4){
    // htc
    width = 360;
    height = 640; 
  }

  if(evt.target.value == 5){
    // ipad mini
    width = 768;
    height = 1024; 
  }

    phone.style.width = width + "px";
    phone.style.height = height + "px"; 

});


 iframe = document.getElementById('frame_1');

  if (iframe.attachEvent){
      iframe.attachEvent("onload", function(){
          afterLoading();
      });
  } else {
      iframe.onload = function(){
          afterLoading();
      };
  }

function afterLoading(){

    setTimeout(function() {
        phone.className = "phone view_1";
        setTimeout(function() {
            // do second thing
            phone.className = "phone view_1 rotate";
            document.getElementById('loader').style.display = 'none';
        }, 1000);
    }, 1000);

}

        </script>    
  </body>
</html>
