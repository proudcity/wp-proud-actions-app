<?php
// From: http://papermashup.com/css-and-javascript-mobile-ui-preview-tool/
?>

<!DOCTYPE html>
<html >
  <head>
    <meta charset="UTF-8">
    <link href="https://my.proudcity.com/images/favicon.png" rel="shortcut icon"/>
    <title>ProudCity Service Center Preview</title>
        <style>
          /*! normalize.css v3.0.2 | MIT License | git.io/normalize */html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block;vertical-align:baseline}audio:not([controls]){display:none;height:0}[hidden],template{display:none}a{background-color:transparent}a:active,a:hover{outline:0}abbr[title]{border-bottom:1px dotted}b,strong{font-weight:bold}dfn{font-style:italic}h1{font-size:2em;margin:0.67em 0}mark{background:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-0.5em}sub{bottom:-0.25em}img{border:0}svg:not(:root){overflow:hidden}figure{margin:1em 40px}hr{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;height:0}pre{overflow:auto}code,kbd,pre,samp{font-family:monospace, monospace;font-size:1em}button,input,optgroup,select,textarea{color:inherit;font:inherit;margin:0}button{overflow:visible}button,select{text-transform:none}button,html input[type="button"],input[type="reset"],input[type="submit"]{-webkit-appearance:button;cursor:pointer}button[disabled],html input[disabled]{cursor:default}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}input{line-height:normal}input[type="checkbox"],input[type="radio"]{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:0}input[type="number"]::-webkit-inner-spin-button,input[type="number"]::-webkit-outer-spin-button{height:auto}input[type="search"]{-webkit-appearance:textfield;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box}input[type="search"]::-webkit-search-cancel-button,input[type="search"]::-webkit-search-decoration{-webkit-appearance:none}fieldset{border:1px solid #c0c0c0;margin:0 2px;padding:0.35em 0.625em 0.75em}legend{border:0;padding:0}textarea{overflow:auto}optgroup{font-weight:bold}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}          
        </style>
        <link rel='stylesheet' id='external-fonts-css'  href='//fonts.googleapis.com/css?family=Lato%3A400%2C900%2C700%2C300&#038;ver=4.6.1' type='text/css' media='all' />
        <link href="https://beta.proudcity.com/wp-content/themes/wp-proud-theme/dist/styles/proud-vendor.css" rel="stylesheet" />
        <link href="https://example.proudcity.com/wp-content/themes/wp-proud-theme/dist/styles/proud.css" rel="stylesheet" />
        <style>

  html{
    height:100%;
    overflow-x: hidden; 
    overflow-y: auto;
  }

  body {
    font-family: 'Open Sans', sans-serif;
    height:100%;
    color:#fff;
/* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#4c4c4c+0,2c2c2c+0,1c1c1c+0,2b2b2b+53,131313+100 */
background: #fff;/*#1b1b1b; /* Old browsers */
  }
  /*Basic Phone styling*/
  .mobile-only {
    display: none;
  }
  .iframe-wrapper {
    height: 100%;
  }
  .facebook-wrapper .iframe-wrapper {
    padding: 80px 14px 0 198px;
    background: url(https://my.proudcity.com/images/wrappers/facebook.png);
    background-repeat: no-repeat;
  }
  .embed-wrapper .iframe-wrapper {
    padding: 92px 141px 0 144px;
    background: url(https://my.proudcity.com/images/wrappers/embed.png);
    background-repeat: no-repeat;
  }
  .embed-wrapper .iframe-wrapper iframe {
    height: 396px;
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
  .no-phone {
    border-width: 5px;
    border-radius: 5px;
  }
  
  .phone iframe {
    border: 0;
    width: 100%;
    height: 100%;
    background-color:#fff;
    overflow-x: hidden !important;
    overflow-y: hidden;
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

  #phones button,
  #types button {
    outline: none;
    width: 198px;
    border: 1px solid #016aa0;
    border-radius:5px;
    -moz-border-radius:5px;
    -webkit-border-radius:5px;
    -o-border-radius:5px;
    background-color: #016aa0;
    height: 40px;
    margin: 5px 0;
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

.text{
  margin-left: 20px;
  color: #000;
  position: absolute;
  width: 40%;
  min-width: 200px;
  font-size: 200%;
}
.text-top {
  top: 20px;
}
.text-bottom {
  position: absolute;
  bottom: 20px;
}
</style>
  </head>

  <body>

    <!--The Main Thing-->
<div class="text text-top">
  <h2 style="margin-top:0"><img src="https://my.proudcity.com/images/logo-200w.png" alt="ProudCity"><br/> Service Center</h2>
</div>
<!--<div class="text text-bottom">
  <h2>Write your content once. Build your forms once.</h2>
  <h3>Serve your residents wherever they are trying to reach you: on your website, on Facebook, on their phones.</h3>
</div>-->
<div id="wrapper">
<div class="phone view_2" id="phone_1">
  <div id="loader">Loading...</div>
  <div class="iframe-wrapper">
    <iframe src="<?php print $url ?>mobile-app#/city/answers" id="frame_1" seamless="seamless"></iframe>
  </div>
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

  <div id="types" style="background-color: white;padding:5px;width:110%;border-radius:5px;">
      <h3>Preview your Service Center</h3>
      <button value="standalone">Standalone</button>
      <button value="facebook">Facebook</button>
      <button value="embed">Embed</button>
      <button value="mobile">Mobile</button>
  </div>

  <div id="views" class="mobile-only">
      <button value="1">Table View</button>
      <button value="2">Front View</button>
  </div>

  <div id="phones" class="mobile-only">
      <button value="1">iPhone 6</button>
      <button value="2">Samsing Galaxy Note</button>
      <button value="3">Microsoft Lumia 1020</button>
      <button value="4">HTC One</button>
      <button value="5">iPad Mini</button>
  </div>

</div>
<script
  src="https://code.jquery.com/jquery-3.1.1.min.js"
  integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
  crossorigin="anonymous"></script>
 

    
        <script>
          /*Only needed for the controls*/
  phone = document.getElementById("phone_1"),
  iframe = document.getElementById("frame_1");
  var url = '<?php print $url ?>';


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
  if(evt.target.value == 1 || evt.target.value == "mobile"){
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


document.getElementById("types").addEventListener("click", function(evt) {

  if(evt.target.value == "mobile"){
    // iphone 6
    width = 375;
    height = 667;
    jQuery('.mobile-only').show();
    jQuery('#phone_1').removeClass('no-phone').removeClass('embed-wrapper').removeClass('facebook-wrapper');
    $('#frame_1').attr('src', url + 'mobile-app');
  }
  if(evt.target.value == "facebook"){
    // facebook
    width = 1033;
    height = 683;
    jQuery('.mobile-only').hide();
    updateView(2);
    jQuery('#phone_1').addClass('no-phone facebook-wrapper').removeClass('embed-wrapper');
    console.log(jQuery('#phone_1').attr('class'));
    $('#frame_1').attr('src', url + 'fbtab');
  }
  if(evt.target.value == "embed"){
    // embed
    width = 1186;
    height = 916;
    updateView(2);
    jQuery('.mobile-only').hide();
    jQuery('#phone_1').addClass('no-phone embed-wrapper').removeClass('facebook-wrapper');
    $('#frame_1').attr('src', url + 'embed');
  }
  if(evt.target.value == "standalone"){
    // embed
    width = 1186;
    height = 916;
    updateView(2);
    jQuery('.mobile-only').hide();
    jQuery('#phone_1').addClass('no-phone').removeClass('facebook-wrapper').removeClass('embed-wrapper');
    $('#frame_1').attr('src', url + 'standalone');
  }

    phone.style.width = width + "px";
    phone.style.height = height + "px"; 
    jQuery('.text').hide();

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
var loaded = false;
function afterLoading(){
  if (!loaded) {
    setTimeout(function() {
        phone.className = "phone view_1";
        setTimeout(function() {
            // do second thing
            phone.className = "phone view_1 rotate";
            document.getElementById('loader').style.display = 'none';
        }, 1000);
    }, 1000);
    loaded = true;
  }

}

        </script>    
  </body>
</html>
