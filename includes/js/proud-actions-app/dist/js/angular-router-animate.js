/**
 * @license AngularJS v1.3.20
 * (c) 2010-2014 Google, Inc. http://angularjs.org
 * License: MIT
 */
!function(window,angular,undefined){"use strict";function nodeName_(element){return angular.lowercase(element.nodeName||element[0]&&element[0].nodeName)}/* global ngTouch: false */
/**
 * @ngdoc directive
 * @name ngSwipeLeft
 *
 * @description
 * Specify custom behavior when an element is swiped to the left on a touchscreen device.
 * A leftward swipe is a quick, right-to-left slide of the finger.
 * Though ngSwipeLeft is designed for touch-based devices, it will work with a mouse click and drag
 * too.
 *
 * To disable the mouse click and drag functionality, add `ng-swipe-disable-mouse` to
 * the `ng-swipe-left` or `ng-swipe-right` DOM Element.
 *
 * Requires the {@link ngTouch `ngTouch`} module to be installed.
 *
 * @element ANY
 * @param {expression} ngSwipeLeft {@link guide/expression Expression} to evaluate
 * upon left swipe. (Event object is available as `$event`)
 *
 * @example
    <example module="ngSwipeLeftExample" deps="angular-touch.js">
      <file name="index.html">
        <div ng-show="!showActions" ng-swipe-left="showActions = true">
          Some list content, like an email in the inbox
        </div>
        <div ng-show="showActions" ng-swipe-right="showActions = false">
          <button ng-click="reply()">Reply</button>
          <button ng-click="delete()">Delete</button>
        </div>
      </file>
      <file name="script.js">
        angular.module('ngSwipeLeftExample', ['ngTouch']);
      </file>
    </example>
 */
/**
 * @ngdoc directive
 * @name ngSwipeRight
 *
 * @description
 * Specify custom behavior when an element is swiped to the right on a touchscreen device.
 * A rightward swipe is a quick, left-to-right slide of the finger.
 * Though ngSwipeRight is designed for touch-based devices, it will work with a mouse click and drag
 * too.
 *
 * Requires the {@link ngTouch `ngTouch`} module to be installed.
 *
 * @element ANY
 * @param {expression} ngSwipeRight {@link guide/expression Expression} to evaluate
 * upon right swipe. (Event object is available as `$event`)
 *
 * @example
    <example module="ngSwipeRightExample" deps="angular-touch.js">
      <file name="index.html">
        <div ng-show="!showActions" ng-swipe-left="showActions = true">
          Some list content, like an email in the inbox
        </div>
        <div ng-show="showActions" ng-swipe-right="showActions = false">
          <button ng-click="reply()">Reply</button>
          <button ng-click="delete()">Delete</button>
        </div>
      </file>
      <file name="script.js">
        angular.module('ngSwipeRightExample', ['ngTouch']);
      </file>
    </example>
 */
function makeSwipeDirective(directiveName,direction,eventName){ngTouch.directive(directiveName,["$parse","$swipe",function($parse,$swipe){
// The maximum vertical delta for a swipe should be less than 75px.
var MAX_VERTICAL_DISTANCE=75,MAX_VERTICAL_RATIO=.3,MIN_HORIZONTAL_DISTANCE=30;return function(scope,element,attr){function validSwipe(coords){
// Check that it's within the coordinates.
// Absolute vertical distance must be within tolerances.
// Horizontal distance, we take the current X - the starting X.
// This is negative for leftward swipes and positive for rightward swipes.
// After multiplying by the direction (-1 for left, +1 for right), legal swipes
// (ie. same direction as the directive wants) will have a positive delta and
// illegal ones a negative delta.
// Therefore this delta must be positive, and larger than the minimum.
if(!startCoords)return!1;var deltaY=Math.abs(coords.y-startCoords.y),deltaX=(coords.x-startCoords.x)*direction;// Short circuit for already-invalidated swipes.
return valid&&deltaY<MAX_VERTICAL_DISTANCE&&deltaX>0&&deltaX>MIN_HORIZONTAL_DISTANCE&&deltaY/deltaX<MAX_VERTICAL_RATIO}var startCoords,valid,swipeHandler=$parse(attr[directiveName]),pointerTypes=["touch"];angular.isDefined(attr.ngSwipeDisableMouse)||pointerTypes.push("mouse"),$swipe.bind(element,{start:function(coords,event){startCoords=coords,valid=!0},cancel:function(event){valid=!1},end:function(coords,event){validSwipe(coords)&&scope.$apply(function(){element.triggerHandler(eventName),swipeHandler(scope,{$event:event})})}},pointerTypes)}}])}/**
 * @ngdoc module
 * @name ngTouch
 * @description
 *
 * # ngTouch
 *
 * The `ngTouch` module provides touch events and other helpers for touch-enabled devices.
 * The implementation is based on jQuery Mobile touch event handling
 * ([jquerymobile.com](http://jquerymobile.com/)).
 *
 *
 * See {@link ngTouch.$swipe `$swipe`} for usage.
 *
 * <div doc-module-components="ngTouch"></div>
 *
 */
// define ngTouch module
/* global -ngTouch */
var ngTouch=angular.module("ngTouch",[]);/* global ngTouch: false */
/**
     * @ngdoc service
     * @name $swipe
     *
     * @description
     * The `$swipe` service is a service that abstracts the messier details of hold-and-drag swipe
     * behavior, to make implementing swipe-related directives more convenient.
     *
     * Requires the {@link ngTouch `ngTouch`} module to be installed.
     *
     * `$swipe` is used by the `ngSwipeLeft` and `ngSwipeRight` directives in `ngTouch`, and by
     * `ngCarousel` in a separate component.
     *
     * # Usage
     * The `$swipe` service is an object with a single method: `bind`. `bind` takes an element
     * which is to be watched for swipes, and an object with four handler functions. See the
     * documentation for `bind` below.
     */
ngTouch.factory("$swipe",[function(){function getCoordinates(event){var originalEvent=event.originalEvent||event,touches=originalEvent.touches&&originalEvent.touches.length?originalEvent.touches:[originalEvent],e=originalEvent.changedTouches&&originalEvent.changedTouches[0]||touches[0];return{x:e.clientX,y:e.clientY}}function getEvents(pointerTypes,eventType){var res=[];return angular.forEach(pointerTypes,function(pointerType){var eventName=POINTER_EVENTS[pointerType][eventType];eventName&&res.push(eventName)}),res.join(" ")}
// The total distance in any direction before we make the call on swipe vs. scroll.
var MOVE_BUFFER_RADIUS=10,POINTER_EVENTS={mouse:{start:"mousedown",move:"mousemove",end:"mouseup"},touch:{start:"touchstart",move:"touchmove",end:"touchend",cancel:"touchcancel"}};return{/**
     * @ngdoc method
     * @name $swipe#bind
     *
     * @description
     * The main method of `$swipe`. It takes an element to be watched for swipe motions, and an
     * object containing event handlers.
     * The pointer types that should be used can be specified via the optional
     * third argument, which is an array of strings `'mouse'` and `'touch'`. By default,
     * `$swipe` will listen for `mouse` and `touch` events.
     *
     * The four events are `start`, `move`, `end`, and `cancel`. `start`, `move`, and `end`
     * receive as a parameter a coordinates object of the form `{ x: 150, y: 310 }`.
     *
     * `start` is called on either `mousedown` or `touchstart`. After this event, `$swipe` is
     * watching for `touchmove` or `mousemove` events. These events are ignored until the total
     * distance moved in either dimension exceeds a small threshold.
     *
     * Once this threshold is exceeded, either the horizontal or vertical delta is greater.
     * - If the horizontal distance is greater, this is a swipe and `move` and `end` events follow.
     * - If the vertical distance is greater, this is a scroll, and we let the browser take over.
     *   A `cancel` event is sent.
     *
     * `move` is called on `mousemove` and `touchmove` after the above logic has determined that
     * a swipe is in progress.
     *
     * `end` is called when a swipe is successfully completed with a `touchend` or `mouseup`.
     *
     * `cancel` is called either on a `touchcancel` from the browser, or when we begin scrolling
     * as described above.
     *
     */
bind:function(element,eventHandlers,pointerTypes){
// Absolute total movement, used to control swipe vs. scroll.
var totalX,totalY,startCoords,lastPos,active=!1;pointerTypes=pointerTypes||["mouse","touch"],element.on(getEvents(pointerTypes,"start"),function(event){startCoords=getCoordinates(event),active=!0,totalX=0,totalY=0,lastPos=startCoords,eventHandlers.start&&eventHandlers.start(startCoords,event)});var events=getEvents(pointerTypes,"cancel");events&&element.on(events,function(event){active=!1,eventHandlers.cancel&&eventHandlers.cancel(event)}),element.on(getEvents(pointerTypes,"move"),function(event){if(active&&startCoords)
// Android will send a touchcancel if it thinks we're starting to scroll.
// So when the total distance (+ or - or both) exceeds 10px in either direction,
// we either:
// - On totalX > totalY, we send preventDefault() and treat this as a swipe.
// - On totalY > totalX, we let the browser handle it as a scroll.
{var coords=getCoordinates(event);if(totalX+=Math.abs(coords.x-lastPos.x),totalY+=Math.abs(coords.y-lastPos.y),lastPos=coords,!(totalX<MOVE_BUFFER_RADIUS&&totalY<MOVE_BUFFER_RADIUS))
// One of totalX or totalY has exceeded the buffer, so decide on swipe vs. scroll.
// One of totalX or totalY has exceeded the buffer, so decide on swipe vs. scroll.
// Allow native scrolling to take over.
// Prevent the browser from scrolling.
return totalY>totalX?(active=!1,void(eventHandlers.cancel&&eventHandlers.cancel(event))):(event.preventDefault(),void(eventHandlers.move&&eventHandlers.move(coords,event)))}}),element.on(getEvents(pointerTypes,"end"),function(event){active&&(active=!1,eventHandlers.end&&eventHandlers.end(getCoordinates(event),event))})}}}]),/* global ngTouch: false,
  nodeName_: false
*/
/**
 * @ngdoc directive
 * @name ngClick
 *
 * @description
 * A more powerful replacement for the default ngClick designed to be used on touchscreen
 * devices. Most mobile browsers wait about 300ms after a tap-and-release before sending
 * the click event. This version handles them immediately, and then prevents the
 * following click event from propagating.
 *
 * Requires the {@link ngTouch `ngTouch`} module to be installed.
 *
 * This directive can fall back to using an ordinary click event, and so works on desktop
 * browsers as well as mobile.
 *
 * This directive also sets the CSS class `ng-click-active` while the element is being held
 * down (by a mouse click or touch) so you can restyle the depressed element if you wish.
 *
 * @element ANY
 * @param {expression} ngClick {@link guide/expression Expression} to evaluate
 * upon tap. (Event object is available as `$event`)
 *
 * @example
    <example module="ngClickExample" deps="angular-touch.js">
      <file name="index.html">
        <button ng-click="count = count + 1" ng-init="count=0">
          Increment
        </button>
        count: {{ count }}
      </file>
      <file name="script.js">
        angular.module('ngClickExample', ['ngTouch']);
      </file>
    </example>
 */
ngTouch.config(["$provide",function($provide){$provide.decorator("ngClickDirective",["$delegate",function($delegate){
// drop the default ngClick directive
return $delegate.shift(),$delegate}])}]),ngTouch.directive("ngClick",["$parse","$timeout","$rootElement",function($parse,$timeout,$rootElement){
// TAP EVENTS AND GHOST CLICKS
//
// Why tap events?
// Mobile browsers detect a tap, then wait a moment (usually ~300ms) to see if you're
// double-tapping, and then fire a click event.
//
// This delay sucks and makes mobile apps feel unresponsive.
// So we detect touchstart, touchmove, touchcancel and touchend ourselves and determine when
// the user has tapped on something.
//
// What happens when the browser then generates a click event?
// The browser, of course, also detects the tap and fires a click after a delay. This results in
// tapping/clicking twice. We do "clickbusting" to prevent it.
//
// How does it work?
// We attach global touchstart and click handlers, that run during the capture (early) phase.
// So the sequence for a tap is:
// - global touchstart: Sets an "allowable region" at the point touched.
// - element's touchstart: Starts a touch
// (- touchmove or touchcancel ends the touch, no click follows)
// - element's touchend: Determines if the tap is valid (didn't move too far away, didn't hold
//   too long) and fires the user's tap handler. The touchend also calls preventGhostClick().
// - preventGhostClick() removes the allowable region the global touchstart created.
// - The browser generates a click event.
// - The global click handler catches the click, and checks whether it was in an allowable region.
//     - If preventGhostClick was called, the region will have been removed, the click is busted.
//     - If the region is still there, the click proceeds normally. Therefore clicks on links and
//       other elements without ngTap on them work normally.
//
// This is an ugly, terrible hack!
// Yeah, tell me about it. The alternatives are using the slow click events, or making our users
// deal with the ghost clicks, so I consider this the least of evils. Fortunately Angular
// encapsulates this ugly logic away from the user.
//
// Why not just put click handlers on the element?
// We do that too, just to be sure. If the tap event caused the DOM to change,
// it is possible another element is now in that position. To take account for these possibly
// distinct elements, the handlers are global and care only about coordinates.
// Checks if the coordinates are close enough to be within the region.
function hit(x1,y1,x2,y2){return Math.abs(x1-x2)<CLICKBUSTER_THRESHOLD&&Math.abs(y1-y2)<CLICKBUSTER_THRESHOLD}
// Checks a list of allowable regions against a click location.
// Returns true if the click should be allowed.
// Splices out the allowable region from the list after it has been used.
function checkAllowableRegions(touchCoordinates,x,y){for(var i=0;i<touchCoordinates.length;i+=2)if(hit(touchCoordinates[i],touchCoordinates[i+1],x,y))return touchCoordinates.splice(i,i+2),!0;return!1}
// Global click handler that prevents the click if it's in a bustable zone and preventGhostClick
// was called recently.
function onClick(event){if(!(Date.now()-lastPreventedTime>PREVENT_DURATION)){var touches=event.touches&&event.touches.length?event.touches:[event],x=touches[0].clientX,y=touches[0].clientY;
// Work around desktop Webkit quirk where clicking a label will fire two clicks (on the label
// and on the input element). Depending on the exact browser, this second click we don't want
// to bust has either (0,0), negative coordinates, or coordinates equal to triggering label
// click event
x<1&&y<1||lastLabelClickCoordinates&&lastLabelClickCoordinates[0]===x&&lastLabelClickCoordinates[1]===y||(
// reset label click coordinates on first subsequent click
lastLabelClickCoordinates&&(lastLabelClickCoordinates=null),
// remember label click coordinates to prevent click busting of trigger click event on input
"label"===nodeName_(event.target)&&(lastLabelClickCoordinates=[x,y]),
// Look for an allowable region containing this click.
// If we find one, that means it was created by touchstart and not removed by
// preventGhostClick, so we don't bust it.
checkAllowableRegions(touchCoordinates,x,y)||(
// If we didn't find an allowable region, bust the click.
event.stopPropagation(),event.preventDefault(),
// Blur focused form elements
event.target&&event.target.blur&&event.target.blur()))}}
// Global touchstart handler that creates an allowable region for a click event.
// This allowable region can be removed by preventGhostClick if we want to bust it.
function onTouchStart(event){var touches=event.touches&&event.touches.length?event.touches:[event],x=touches[0].clientX,y=touches[0].clientY;touchCoordinates.push(x,y),$timeout(function(){
// Remove the allowable region.
for(var i=0;i<touchCoordinates.length;i+=2)if(touchCoordinates[i]==x&&touchCoordinates[i+1]==y)return void touchCoordinates.splice(i,i+2)},PREVENT_DURATION,!1)}
// On the first call, attaches some event handlers. Then whenever it gets called, it creates a
// zone around the touchstart where clicks will get busted.
function preventGhostClick(x,y){touchCoordinates||($rootElement[0].addEventListener("click",onClick,!0),$rootElement[0].addEventListener("touchstart",onTouchStart,!0),touchCoordinates=[]),lastPreventedTime=Date.now(),checkAllowableRegions(touchCoordinates,x,y)}var lastPreventedTime,touchCoordinates,lastLabelClickCoordinates,TAP_DURATION=750,MOVE_TOLERANCE=12,PREVENT_DURATION=2500,CLICKBUSTER_THRESHOLD=25,ACTIVE_CLASS_NAME="ng-click-active";
// Actual linking function.
return function(scope,element,attr){function resetState(){tapping=!1,element.removeClass(ACTIVE_CLASS_NAME)}var tapElement,// Used to blur the element after a tap.
startTime,// Used to check if the tap was held too long.
touchStartX,touchStartY,clickHandler=$parse(attr.ngClick),tapping=!1;element.on("touchstart",function(event){tapping=!0,tapElement=event.target?event.target:event.srcElement,// IE uses srcElement.
// Hack for Safari, which can target text nodes instead of containers.
3==tapElement.nodeType&&(tapElement=tapElement.parentNode),element.addClass(ACTIVE_CLASS_NAME),startTime=Date.now();
// Use jQuery originalEvent
var originalEvent=event.originalEvent||event,touches=originalEvent.touches&&originalEvent.touches.length?originalEvent.touches:[originalEvent],e=touches[0];touchStartX=e.clientX,touchStartY=e.clientY}),element.on("touchmove",function(event){resetState()}),element.on("touchcancel",function(event){resetState()}),element.on("touchend",function(event){var diff=Date.now()-startTime,originalEvent=event.originalEvent||event,touches=originalEvent.changedTouches&&originalEvent.changedTouches.length?originalEvent.changedTouches:originalEvent.touches&&originalEvent.touches.length?originalEvent.touches:[originalEvent],e=touches[0],x=e.clientX,y=e.clientY,dist=Math.sqrt(Math.pow(x-touchStartX,2)+Math.pow(y-touchStartY,2));tapping&&diff<TAP_DURATION&&dist<MOVE_TOLERANCE&&(
// Call preventGhostClick so the clickbuster will catch the corresponding click.
preventGhostClick(x,y),
// Blur the focused element (the button, probably) before firing the callback.
// This doesn't work perfectly on Android Chrome, but seems to work elsewhere.
// I couldn't get anything to work reliably on Android Chrome.
tapElement&&tapElement.blur(),angular.isDefined(attr.disabled)&&attr.disabled!==!1||element.triggerHandler("click",[event])),resetState()}),
// Hack for iOS Safari's benefit. It goes searching for onclick handlers and is liable to click
// something else nearby.
element.onclick=function(event){},
// Actual click handler.
// There are three different kinds of clicks, only two of which reach this point.
// - On desktop browsers without touch events, their clicks will always come here.
// - On mobile browsers, the simulated "fast" click will call this.
// - But the browser's follow-up slow click will be "busted" before it reaches this handler.
// Therefore it's safe to use this directive on both mobile and desktop.
element.on("click",function(event,touchend){scope.$apply(function(){clickHandler(scope,{$event:touchend||event})})}),element.on("mousedown",function(event){element.addClass(ACTIVE_CLASS_NAME)}),element.on("mousemove mouseup",function(event){element.removeClass(ACTIVE_CLASS_NAME)})}}]),
// Left is negative X-coordinate, right is positive.
makeSwipeDirective("ngSwipeLeft",-1,"swipeleft"),makeSwipeDirective("ngSwipeRight",1,"swiperight")}(window,window.angular),/**
 * @license AngularJS v1.3.20
 * (c) 2010-2014 Google, Inc. http://angularjs.org
 * License: MIT
 */
function(window,angular,undefined){"use strict";/* jshint maxlen: false */
/**
 * @ngdoc module
 * @name ngAnimate
 * @description
 *
 * The `ngAnimate` module provides support for JavaScript, CSS3 transition and CSS3 keyframe animation hooks within existing core and custom directives.
 *
 * <div doc-module-components="ngAnimate"></div>
 *
 * # Usage
 *
 * To see animations in action, all that is required is to define the appropriate CSS classes
 * or to register a JavaScript animation via the `myModule.animation()` function. The directives that support animation automatically are:
 * `ngRepeat`, `ngInclude`, `ngIf`, `ngSwitch`, `ngShow`, `ngHide`, `ngView` and `ngClass`. Custom directives can take advantage of animation
 * by using the `$animate` service.
 *
 * Below is a more detailed breakdown of the supported animation events provided by pre-existing ng directives:
 *
 * | Directive                                                                                                | Supported Animations                                                     |
 * |----------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------|
 * | {@link ng.directive:ngRepeat#animations ngRepeat}                                                        | enter, leave and move                                                    |
 * | {@link ngRoute.directive:ngView#animations ngView}                                                       | enter and leave                                                          |
 * | {@link ng.directive:ngInclude#animations ngInclude}                                                      | enter and leave                                                          |
 * | {@link ng.directive:ngSwitch#animations ngSwitch}                                                        | enter and leave                                                          |
 * | {@link ng.directive:ngIf#animations ngIf}                                                                | enter and leave                                                          |
 * | {@link ng.directive:ngClass#animations ngClass}                                                          | add and remove (the CSS class(es) present)                               |
 * | {@link ng.directive:ngShow#animations ngShow} & {@link ng.directive:ngHide#animations ngHide}            | add and remove (the ng-hide class value)                                 |
 * | {@link ng.directive:form#animation-hooks form} & {@link ng.directive:ngModel#animation-hooks ngModel}    | add and remove (dirty, pristine, valid, invalid & all other validations) |
 * | {@link module:ngMessages#animations ngMessages}                                                          | add and remove (ng-active & ng-inactive)                                 |
 * | {@link module:ngMessages#animations ngMessage}                                                           | enter and leave                                                          |
 *
 * You can find out more information about animations upon visiting each directive page.
 *
 * Below is an example of how to apply animations to a directive that supports animation hooks:
 *
 * ```html
 * <style type="text/css">
 * .slide.ng-enter, .slide.ng-leave {
 *   -webkit-transition:0.5s linear all;
 *   transition:0.5s linear all;
 * }
 *
 * .slide.ng-enter { }        /&#42; starting animations for enter &#42;/
 * .slide.ng-enter.ng-enter-active { } /&#42; terminal animations for enter &#42;/
 * .slide.ng-leave { }        /&#42; starting animations for leave &#42;/
 * .slide.ng-leave.ng-leave-active { } /&#42; terminal animations for leave &#42;/
 * </style>
 *
 * <!--
 * the animate service will automatically add .ng-enter and .ng-leave to the element
 * to trigger the CSS transition/animations
 * -->
 * <ANY class="slide" ng-include="..."></ANY>
 * ```
 *
 * Keep in mind that, by default, if an animation is running, any child elements cannot be animated
 * until the parent element's animation has completed. This blocking feature can be overridden by
 * placing the `ng-animate-children` attribute on a parent container tag.
 *
 * ```html
 * <div class="slide-animation" ng-if="on" ng-animate-children>
 *   <div class="fade-animation" ng-if="on">
 *     <div class="explode-animation" ng-if="on">
 *        ...
 *     </div>
 *   </div>
 * </div>
 * ```
 *
 * When the `on` expression value changes and an animation is triggered then each of the elements within
 * will all animate without the block being applied to child elements.
 *
 * ## Are animations run when the application starts?
 * No they are not. When an application is bootstrapped Angular will disable animations from running to avoid
 * a frenzy of animations from being triggered as soon as the browser has rendered the screen. For this to work,
 * Angular will wait for two digest cycles until enabling animations. From there on, any animation-triggering
 * layout changes in the application will trigger animations as normal.
 *
 * In addition, upon bootstrap, if the routing system or any directives or load remote data (via $http) then Angular
 * will automatically extend the wait time to enable animations once **all** of the outbound HTTP requests
 * are complete.
 *
 * ## CSS-defined Animations
 * The animate service will automatically apply two CSS classes to the animated element and these two CSS classes
 * are designed to contain the start and end CSS styling. Both CSS transitions and keyframe animations are supported
 * and can be used to play along with this naming structure.
 *
 * The following code below demonstrates how to perform animations using **CSS transitions** with Angular:
 *
 * ```html
 * <style type="text/css">
 * /&#42;
 *  The animate class is apart of the element and the ng-enter class
 *  is attached to the element once the enter animation event is triggered
 * &#42;/
 * .reveal-animation.ng-enter {
 *  -webkit-transition: 1s linear all; /&#42; Safari/Chrome &#42;/
 *  transition: 1s linear all; /&#42; All other modern browsers and IE10+ &#42;/
 *
 *  /&#42; The animation preparation code &#42;/
 *  opacity: 0;
 * }
 *
 * /&#42;
 *  Keep in mind that you want to combine both CSS
 *  classes together to avoid any CSS-specificity
 *  conflicts
 * &#42;/
 * .reveal-animation.ng-enter.ng-enter-active {
 *  /&#42; The animation code itself &#42;/
 *  opacity: 1;
 * }
 * </style>
 *
 * <div class="view-container">
 *   <div ng-view class="reveal-animation"></div>
 * </div>
 * ```
 *
 * The following code below demonstrates how to perform animations using **CSS animations** with Angular:
 *
 * ```html
 * <style type="text/css">
 * .reveal-animation.ng-enter {
 *   -webkit-animation: enter_sequence 1s linear; /&#42; Safari/Chrome &#42;/
 *   animation: enter_sequence 1s linear; /&#42; IE10+ and Future Browsers &#42;/
 * }
 * @-webkit-keyframes enter_sequence {
 *   from { opacity:0; }
 *   to { opacity:1; }
 * }
 * @keyframes enter_sequence {
 *   from { opacity:0; }
 *   to { opacity:1; }
 * }
 * </style>
 *
 * <div class="view-container">
 *   <div ng-view class="reveal-animation"></div>
 * </div>
 * ```
 *
 * Both CSS3 animations and transitions can be used together and the animate service will figure out the correct duration and delay timing.
 *
 * Upon DOM mutation, the event class is added first (something like `ng-enter`), then the browser prepares itself to add
 * the active class (in this case `ng-enter-active`) which then triggers the animation. The animation module will automatically
 * detect the CSS code to determine when the animation ends. Once the animation is over then both CSS classes will be
 * removed from the DOM. If a browser does not support CSS transitions or CSS animations then the animation will start and end
 * immediately resulting in a DOM element that is at its final state. This final state is when the DOM element
 * has no CSS transition/animation classes applied to it.
 *
 * ### Structural transition animations
 *
 * Structural transitions (such as enter, leave and move) will always apply a `0s none` transition
 * value to force the browser into rendering the styles defined in the setup (`.ng-enter`, `.ng-leave`
 * or `.ng-move`) class. This means that any active transition animations operating on the element
 * will be cut off to make way for the enter, leave or move animation.
 *
 * ### Class-based transition animations
 *
 * Class-based transitions refer to transition animations that are triggered when a CSS class is
 * added to or removed from the element (via `$animate.addClass`, `$animate.removeClass`,
 * `$animate.setClass`, or by directives such as `ngClass`, `ngModel` and `form`).
 * They are different when compared to structural animations since they **do not cancel existing
 * animations** nor do they **block successive transitions** from rendering on the same element.
 * This distinction allows for **multiple class-based transitions** to be performed on the same element.
 *
 * In addition to ngAnimate supporting the default (natural) functionality of class-based transition
 * animations, ngAnimate also decorates the element with starting and ending CSS classes to aid the
 * developer in further styling the element throughout the transition animation. Earlier versions
 * of ngAnimate may have caused natural CSS transitions to break and not render properly due to
 * $animate temporarily blocking transitions using `0s none` in order to allow the setup CSS class
 * (the `-add` or `-remove` class) to be applied without triggering an animation. However, as of
 * **version 1.3**, this workaround has been removed with ngAnimate and all non-ngAnimate CSS
 * class transitions are compatible with ngAnimate.
 *
 * There is, however, one special case when dealing with class-based transitions in ngAnimate.
 * When rendering class-based transitions that make use of the setup and active CSS classes
 * (e.g. `.fade-add` and `.fade-add-active` for when `.fade` is added) be sure to define
 * the transition value **on the active CSS class** and not the setup class.
 *
 * ```css
 * .fade-add {
 *   /&#42; remember to place a 0s transition here
 *      to ensure that the styles are applied instantly
 *      even if the element already has a transition style &#42;/
 *   transition:0s linear all;
 *
 *   /&#42; starting CSS styles &#42;/
 *   opacity:1;
 * }
 * .fade-add.fade-add-active {
 *   /&#42; this will be the length of the animation &#42;/
 *   transition:1s linear all;
 *   opacity:0;
 * }
 * ```
 *
 * The setup CSS class (in this case `.fade-add`) also has a transition style property, however, it
 * has a duration of zero. This may not be required, however, incase the browser is unable to render
 * the styling present in this CSS class instantly then it could be that the browser is attempting
 * to perform an unnecessary transition.
 *
 * This workaround, however, does not apply to  standard class-based transitions that are rendered
 * when a CSS class containing a transition is applied to an element:
 *
 * ```css
 * /&#42; this works as expected &#42;/
 * .fade {
 *   transition:1s linear all;
 *   opacity:0;
 * }
 * ```
 *
 * Please keep this in mind when coding the CSS markup that will be used within class-based transitions.
 * Also, try not to mix the two class-based animation flavors together since the CSS code may become
 * overly complex.
 *
 *
 * ### Preventing Collisions With Third Party Libraries
 *
 * Some third-party frameworks place animation duration defaults across many element or className
 * selectors in order to make their code small and reuseable. This can lead to issues with ngAnimate, which
 * is expecting actual animations on these elements and has to wait for their completion.
 *
 * You can prevent this unwanted behavior by using a prefix on all your animation classes:
 *
 * ```css
 * /&#42; prefixed with animate- &#42;/
 * .animate-fade-add.animate-fade-add-active {
 *   transition:1s linear all;
 *   opacity:0;
 * }
 * ```
 *
 * You then configure `$animate` to enforce this prefix:
 *
 * ```js
 * $animateProvider.classNameFilter(/animate-/);
 * ```
 * </div>
 *
 * ### CSS Staggering Animations
 * A Staggering animation is a collection of animations that are issued with a slight delay in between each successive operation resulting in a
 * curtain-like effect. The ngAnimate module (versions >=1.2) supports staggering animations and the stagger effect can be
 * performed by creating a **ng-EVENT-stagger** CSS class and attaching that class to the base CSS class used for
 * the animation. The style property expected within the stagger class can either be a **transition-delay** or an
 * **animation-delay** property (or both if your animation contains both transitions and keyframe animations).
 *
 * ```css
 * .my-animation.ng-enter {
 *   /&#42; standard transition code &#42;/
 *   -webkit-transition: 1s linear all;
 *   transition: 1s linear all;
 *   opacity:0;
 * }
 * .my-animation.ng-enter-stagger {
 *   /&#42; this will have a 100ms delay between each successive leave animation &#42;/
 *   -webkit-transition-delay: 0.1s;
 *   transition-delay: 0.1s;
 *
 *   /&#42; in case the stagger doesn't work then these two values
 *    must be set to 0 to avoid an accidental CSS inheritance &#42;/
 *   -webkit-transition-duration: 0s;
 *   transition-duration: 0s;
 * }
 * .my-animation.ng-enter.ng-enter-active {
 *   /&#42; standard transition styles &#42;/
 *   opacity:1;
 * }
 * ```
 *
 * Staggering animations work by default in ngRepeat (so long as the CSS class is defined). Outside of ngRepeat, to use staggering animations
 * on your own, they can be triggered by firing multiple calls to the same event on $animate. However, the restrictions surrounding this
 * are that each of the elements must have the same CSS className value as well as the same parent element. A stagger operation
 * will also be reset if more than 10ms has passed after the last animation has been fired.
 *
 * The following code will issue the **ng-leave-stagger** event on the element provided:
 *
 * ```js
 * var kids = parent.children();
 *
 * $animate.leave(kids[0]); //stagger index=0
 * $animate.leave(kids[1]); //stagger index=1
 * $animate.leave(kids[2]); //stagger index=2
 * $animate.leave(kids[3]); //stagger index=3
 * $animate.leave(kids[4]); //stagger index=4
 *
 * $timeout(function() {
 *   //stagger has reset itself
 *   $animate.leave(kids[5]); //stagger index=0
 *   $animate.leave(kids[6]); //stagger index=1
 * }, 100, false);
 * ```
 *
 * Stagger animations are currently only supported within CSS-defined animations.
 *
 * ## JavaScript-defined Animations
 * In the event that you do not want to use CSS3 transitions or CSS3 animations or if you wish to offer animations on browsers that do not
 * yet support CSS transitions/animations, then you can make use of JavaScript animations defined inside of your AngularJS module.
 *
 * ```js
 * //!annotate="YourApp" Your AngularJS Module|Replace this or ngModule with the module that you used to define your application.
 * var ngModule = angular.module('YourApp', ['ngAnimate']);
 * ngModule.animation('.my-crazy-animation', function() {
 *   return {
 *     enter: function(element, done) {
 *       //run the animation here and call done when the animation is complete
 *       return function(cancelled) {
 *         //this (optional) function will be called when the animation
 *         //completes or when the animation is cancelled (the cancelled
 *         //flag will be set to true if cancelled).
 *       };
 *     },
 *     leave: function(element, done) { },
 *     move: function(element, done) { },
 *
 *     //animation that can be triggered before the class is added
 *     beforeAddClass: function(element, className, done) { },
 *
 *     //animation that can be triggered after the class is added
 *     addClass: function(element, className, done) { },
 *
 *     //animation that can be triggered before the class is removed
 *     beforeRemoveClass: function(element, className, done) { },
 *
 *     //animation that can be triggered after the class is removed
 *     removeClass: function(element, className, done) { }
 *   };
 * });
 * ```
 *
 * JavaScript-defined animations are created with a CSS-like class selector and a collection of events which are set to run
 * a javascript callback function. When an animation is triggered, $animate will look for a matching animation which fits
 * the element's CSS class attribute value and then run the matching animation event function (if found).
 * In other words, if the CSS classes present on the animated element match any of the JavaScript animations then the callback function will
 * be executed. It should be also noted that only simple, single class selectors are allowed (compound class selectors are not supported).
 *
 * Within a JavaScript animation, an object containing various event callback animation functions is expected to be returned.
 * As explained above, these callbacks are triggered based on the animation event. Therefore if an enter animation is run,
 * and the JavaScript animation is found, then the enter callback will handle that animation (in addition to the CSS keyframe animation
 * or transition code that is defined via a stylesheet).
 *
 *
 * ### Applying Directive-specific Styles to an Animation
 * In some cases a directive or service may want to provide `$animate` with extra details that the animation will
 * include into its animation. Let's say for example we wanted to render an animation that animates an element
 * towards the mouse coordinates as to where the user clicked last. By collecting the X/Y coordinates of the click
 * (via the event parameter) we can set the `top` and `left` styles into an object and pass that into our function
 * call to `$animate.addClass`.
 *
 * ```js
 * canvas.on('click', function(e) {
 *   $animate.addClass(element, 'on', {
 *     to: {
 *       left : e.client.x + 'px',
 *       top : e.client.y + 'px'
 *     }
 *   }):
 * });
 * ```
 *
 * Now when the animation runs, and a transition or keyframe animation is picked up, then the animation itself will
 * also include and transition the styling of the `left` and `top` properties into its running animation. If we want
 * to provide some starting animation values then we can do so by placing the starting animations styles into an object
 * called `from` in the same object as the `to` animations.
 *
 * ```js
 * canvas.on('click', function(e) {
 *   $animate.addClass(element, 'on', {
 *     from: {
 *        position: 'absolute',
 *        left: '0px',
 *        top: '0px'
 *     },
 *     to: {
 *       left : e.client.x + 'px',
 *       top : e.client.y + 'px'
 *     }
 *   }):
 * });
 * ```
 *
 * Once the animation is complete or cancelled then the union of both the before and after styles are applied to the
 * element. If `ngAnimate` is not present then the styles will be applied immediately.
 *
 */
angular.module("ngAnimate",["ng"]).directive("ngAnimateChildren",function(){var NG_ANIMATE_CHILDREN="$$ngAnimateChildren";return function(scope,element,attrs){var val=attrs.ngAnimateChildren;angular.isString(val)&&0===val.length?//empty attribute
element.data(NG_ANIMATE_CHILDREN,!0):scope.$watch(val,function(value){element.data(NG_ANIMATE_CHILDREN,!!value)})}}).factory("$$animateReflow",["$$rAF","$document",function($$rAF,$document){var bod=$document[0].body;return function(fn){
//the returned function acts as the cancellation function
return $$rAF(function(){
//the line below will force the browser to perform a repaint
//so that all the animated elements within the animation frame
//will be properly updated and drawn on screen. This is
//required to perform multi-class CSS based animations with
//Firefox. DO NOT REMOVE THIS LINE. DO NOT OPTIMIZE THIS LINE.
//THE MINIFIER WILL REMOVE IT OTHERWISE WHICH WILL RESULT IN AN
//UNPREDICTABLE BUG THAT IS VERY HARD TO TRACK DOWN AND WILL
//TAKE YEARS AWAY FROM YOUR LIFE!
fn(bod.offsetWidth)})}}]).config(["$provide","$animateProvider",function($provide,$animateProvider){function extractElementNode(element){for(var i=0;i<element.length;i++){var elm=element[i];if(elm.nodeType==ELEMENT_NODE)return elm}}function prepareElement(element){return element&&angular.element(element)}function stripCommentsFromElement(element){return angular.element(extractElementNode(element))}function isMatchingElement(elm1,elm2){return extractElementNode(elm1)==extractElementNode(elm2)}var $$jqLite,noop=angular.noop,forEach=angular.forEach,selectors=$animateProvider.$$selectors,isArray=angular.isArray,isString=angular.isString,isObject=angular.isObject,ELEMENT_NODE=1,NG_ANIMATE_STATE="$$ngAnimateState",NG_ANIMATE_CHILDREN="$$ngAnimateChildren",NG_ANIMATE_CLASS_NAME="ng-animate",rootAnimateState={running:!0};$provide.decorator("$animate",["$delegate","$$q","$injector","$sniffer","$rootElement","$$asyncCallback","$rootScope","$document","$templateRequest","$$jqLite",function($delegate,$$q,$injector,$sniffer,$rootElement,$$asyncCallback,$rootScope,$document,$templateRequest,$$$jqLite){function classBasedAnimationsBlocked(element,setter){var data=element.data(NG_ANIMATE_STATE)||{};return setter&&(data.running=!0,data.structural=!0,element.data(NG_ANIMATE_STATE,data)),data.disabled||data.running&&data.structural}function runAnimationPostDigest(fn){var cancelFn,defer=$$q.defer();return defer.promise.$$cancelFn=function(){cancelFn&&cancelFn()},$rootScope.$$postDigest(function(){cancelFn=fn(function(){defer.resolve()})}),defer.promise}function parseAnimateOptions(options){
// some plugin code may still be passing in the callback
// function as the last param for the $animate methods so
// it's best to only allow string or array values for now
if(isObject(options))return options.tempClasses&&isString(options.tempClasses)&&(options.tempClasses=options.tempClasses.split(/\s+/)),options}function resolveElementClasses(element,cache,runningAnimations){runningAnimations=runningAnimations||{};var lookup={};forEach(runningAnimations,function(data,selector){forEach(selector.split(" "),function(s){lookup[s]=data})});var hasClasses=Object.create(null);forEach((element.attr("class")||"").split(/\s+/),function(className){hasClasses[className]=!0});var toAdd=[],toRemove=[];return forEach(cache&&cache.classes||[],function(status,className){var hasClass=hasClasses[className],matchingAnimation=lookup[className]||{};
// When addClass and removeClass is called then $animate will check to
// see if addClass and removeClass cancel each other out. When there are
// more calls to removeClass than addClass then the count falls below 0
// and then the removeClass animation will be allowed. Otherwise if the
// count is above 0 then that means an addClass animation will commence.
// Once an animation is allowed then the code will also check to see if
// there exists any on-going animation that is already adding or remvoing
// the matching CSS class.
status===!1?
//does it have the class or will it have the class
(hasClass||"addClass"==matchingAnimation.event)&&toRemove.push(className):status===!0&&(
//is the class missing or will it be removed?
hasClass&&"removeClass"!=matchingAnimation.event||toAdd.push(className))}),toAdd.length+toRemove.length>0&&[toAdd.join(" "),toRemove.join(" ")]}function lookup(name){if(name){var matches=[],flagMap={},classes=name.substr(1).split(".");
//the empty string value is the default animation
//operation which performs CSS transition and keyframe
//animations sniffing. This is always included for each
//element animation procedure if the browser supports
//transitions and/or keyframe animations. The default
//animation is added to the top of the list to prevent
//any previous animations from affecting the element styling
//prior to the element being animated.
($sniffer.transitions||$sniffer.animations)&&matches.push($injector.get(selectors[""]));for(var i=0;i<classes.length;i++){var klass=classes[i],selectorFactoryName=selectors[klass];selectorFactoryName&&!flagMap[klass]&&(matches.push($injector.get(selectorFactoryName)),flagMap[klass]=!0)}return matches}}function animationRunner(element,animationEvent,className,options){function registerAnimation(animationFactory,event){var afterFn=animationFactory[event],beforeFn=animationFactory["before"+event.charAt(0).toUpperCase()+event.substr(1)];if(afterFn||beforeFn)
//when set as null then animation knows to skip this phase
return"leave"==event&&(beforeFn=afterFn,afterFn=null),after.push({event:event,fn:afterFn}),before.push({event:event,fn:beforeFn}),!0}function run(fns,cancellations,allCompleteFn){function afterAnimationComplete(index){if(cancellations){if((cancellations[index]||noop)(),++count<animations.length)return;cancellations=null}allCompleteFn()}var animations=[];forEach(fns,function(animation){animation.fn&&animations.push(animation)});var count=0;
//The code below adds directly to the array in order to work with
//both sync and async animations. Sync animations are when the done()
//operation is called right away. DO NOT REFACTOR!
forEach(animations,function(animation,index){var progress=function(){afterAnimationComplete(index)};switch(animation.event){case"setClass":cancellations.push(animation.fn(element,classNameAdd,classNameRemove,progress,options));break;case"animate":cancellations.push(animation.fn(element,className,options.from,options.to,progress));break;case"addClass":cancellations.push(animation.fn(element,classNameAdd||className,progress,options));break;case"removeClass":cancellations.push(animation.fn(element,classNameRemove||className,progress,options));break;default:cancellations.push(animation.fn(element,progress,options))}}),cancellations&&0===cancellations.length&&allCompleteFn()}
//transcluded directives may sometimes fire an animation using only comment nodes
//best to catch this early on to prevent any animation operations from occurring
var node=element[0];if(node){options&&(options.to=options.to||{},options.from=options.from||{});var classNameAdd,classNameRemove;isArray(className)&&(classNameAdd=className[0],classNameRemove=className[1],classNameAdd?classNameRemove?className=classNameAdd+" "+classNameRemove:(className=classNameAdd,animationEvent="addClass"):(className=classNameRemove,animationEvent="removeClass"));var isSetClassOperation="setClass"==animationEvent,isClassBased=isSetClassOperation||"addClass"==animationEvent||"removeClass"==animationEvent||"animate"==animationEvent,currentClassName=element.attr("class"),classes=currentClassName+" "+className;if(isAnimatableClassName(classes)){var beforeComplete=noop,beforeCancel=[],before=[],afterComplete=noop,afterCancel=[],after=[],animationLookup=(" "+classes).replace(/\s+/g,".");return forEach(lookup(animationLookup),function(animationFactory){var created=registerAnimation(animationFactory,animationEvent);!created&&isSetClassOperation&&(registerAnimation(animationFactory,"addClass"),registerAnimation(animationFactory,"removeClass"))}),{node:node,event:animationEvent,className:className,isClassBased:isClassBased,isSetClassOperation:isSetClassOperation,applyStyles:function(){options&&element.css(angular.extend(options.from||{},options.to||{}))},before:function(allCompleteFn){beforeComplete=allCompleteFn,run(before,beforeCancel,function(){beforeComplete=noop,allCompleteFn()})},after:function(allCompleteFn){afterComplete=allCompleteFn,run(after,afterCancel,function(){afterComplete=noop,allCompleteFn()})},cancel:function(){beforeCancel&&(forEach(beforeCancel,function(cancelFn){(cancelFn||noop)(!0)}),beforeComplete(!0)),afterCancel&&(forEach(afterCancel,function(cancelFn){(cancelFn||noop)(!0)}),afterComplete(!0))}}}}}/*
        all animations call this shared animation triggering function internally.
        The animationEvent variable refers to the JavaScript animation event that will be triggered
        and the className value is the name of the animation that will be applied within the
        CSS code. Element, `parentElement` and `afterElement` are provided DOM elements for the animation
        and the onComplete callback will be fired once the animation is fully complete.
      */
function performAnimation(animationEvent,className,element,parentElement,afterElement,domOperation,options,doneCallback){function fireDOMCallback(animationPhase){var eventName="$animate:"+animationPhase;elementEvents&&elementEvents[eventName]&&elementEvents[eventName].length>0&&$$asyncCallback(function(){element.triggerHandler(eventName,{event:animationEvent,className:className})})}function fireBeforeCallbackAsync(){fireDOMCallback("before")}function fireAfterCallbackAsync(){fireDOMCallback("after")}function fireDoneCallbackAsync(){fireDOMCallback("close"),doneCallback()}
//it is less complicated to use a flag than managing and canceling
//timeouts containing multiple callbacks.
function fireDOMOperation(){fireDOMOperation.hasBeenRun||(fireDOMOperation.hasBeenRun=!0,domOperation())}function closeAnimation(){if(!closeAnimation.hasBeenRun){runner&&//the runner doesn't exist if it fails to instantiate
runner.applyStyles(),closeAnimation.hasBeenRun=!0,options&&options.tempClasses&&forEach(options.tempClasses,function(className){$$jqLite.removeClass(element,className)});var data=element.data(NG_ANIMATE_STATE);data&&(/* only structural animations wait for reflow before removing an
                 animation, but class-based animations don't. An example of this
                 failing would be when a parent HTML tag has a ng-class attribute
                 causing ALL directives below to skip animations during the digest */
runner&&runner.isClassBased?cleanup(element,className):($$asyncCallback(function(){var data=element.data(NG_ANIMATE_STATE)||{};localAnimationCount==data.index&&cleanup(element,className,animationEvent)}),element.data(NG_ANIMATE_STATE,data))),fireDoneCallbackAsync()}}var noopCancel=noop,runner=animationRunner(element,animationEvent,className,options);if(!runner)return fireDOMOperation(),fireBeforeCallbackAsync(),fireAfterCallbackAsync(),closeAnimation(),noopCancel;animationEvent=runner.event,className=runner.className;var elementEvents=angular.element._data(runner.node);
//skip the animation if animations are disabled, a parent is already being animated,
//the element is not currently attached to the document body or then completely close
//the animation if any matching animations are not found at all.
//NOTE: IE8 + IE9 should close properly (run closeAnimation()) in case an animation was found.
if(elementEvents=elementEvents&&elementEvents.events,parentElement||(parentElement=afterElement?afterElement.parent():element.parent()),animationsDisabled(element,parentElement))return fireDOMOperation(),fireBeforeCallbackAsync(),fireAfterCallbackAsync(),closeAnimation(),noopCancel;var ngAnimateState=element.data(NG_ANIMATE_STATE)||{},runningAnimations=ngAnimateState.active||{},totalActiveAnimations=ngAnimateState.totalActive||0,lastAnimation=ngAnimateState.last,skipAnimation=!1;if(totalActiveAnimations>0){var animationsToCancel=[];if(runner.isClassBased){if("setClass"==lastAnimation.event)animationsToCancel.push(lastAnimation),cleanup(element,className);else if(runningAnimations[className]){var current=runningAnimations[className];current.event==animationEvent?skipAnimation=!0:(animationsToCancel.push(current),cleanup(element,className))}}else if("leave"==animationEvent&&runningAnimations["ng-leave"])skipAnimation=!0;else{
//cancel all animations when a structural animation takes place
for(var klass in runningAnimations)animationsToCancel.push(runningAnimations[klass]);ngAnimateState={},cleanup(element,!0)}animationsToCancel.length>0&&forEach(animationsToCancel,function(operation){operation.cancel()})}if(!runner.isClassBased||runner.isSetClassOperation||"animate"==animationEvent||skipAnimation||(skipAnimation="addClass"==animationEvent==element.hasClass(className)),skipAnimation)return fireDOMOperation(),fireBeforeCallbackAsync(),fireAfterCallbackAsync(),fireDoneCallbackAsync(),noopCancel;runningAnimations=ngAnimateState.active||{},totalActiveAnimations=ngAnimateState.totalActive||0,"leave"==animationEvent&&
//there's no need to ever remove the listener since the element
//will be removed (destroyed) after the leave animation ends or
//is cancelled midway
element.one("$destroy",function(e){var element=angular.element(this),state=element.data(NG_ANIMATE_STATE);if(state){var activeLeaveAnimation=state.active["ng-leave"];activeLeaveAnimation&&(activeLeaveAnimation.cancel(),cleanup(element,"ng-leave"))}}),
//the ng-animate class does nothing, but it's here to allow for
//parent animations to find and cancel child animations when needed
$$jqLite.addClass(element,NG_ANIMATE_CLASS_NAME),options&&options.tempClasses&&forEach(options.tempClasses,function(className){$$jqLite.addClass(element,className)});var localAnimationCount=globalAnimationCounter++;
//first we run the before animations and when all of those are complete
//then we perform the DOM operation and run the next set of animations
return totalActiveAnimations++,runningAnimations[className]=runner,element.data(NG_ANIMATE_STATE,{last:runner,active:runningAnimations,index:localAnimationCount,totalActive:totalActiveAnimations}),fireBeforeCallbackAsync(),runner.before(function(cancelled){var data=element.data(NG_ANIMATE_STATE);cancelled=cancelled||!data||!data.active[className]||runner.isClassBased&&data.active[className].event!=animationEvent,fireDOMOperation(),cancelled===!0?closeAnimation():(fireAfterCallbackAsync(),runner.after(closeAnimation))}),runner.cancel}function cancelChildAnimations(element){var node=extractElementNode(element);if(node){var nodes=angular.isFunction(node.getElementsByClassName)?node.getElementsByClassName(NG_ANIMATE_CLASS_NAME):node.querySelectorAll("."+NG_ANIMATE_CLASS_NAME);forEach(nodes,function(element){element=angular.element(element);var data=element.data(NG_ANIMATE_STATE);data&&data.active&&forEach(data.active,function(runner){runner.cancel()})})}}function cleanup(element,className){if(isMatchingElement(element,$rootElement))rootAnimateState.disabled||(rootAnimateState.running=!1,rootAnimateState.structural=!1);else if(className){var data=element.data(NG_ANIMATE_STATE)||{},removeAnimations=className===!0;!removeAnimations&&data.active&&data.active[className]&&(data.totalActive--,delete data.active[className]),!removeAnimations&&data.totalActive||($$jqLite.removeClass(element,NG_ANIMATE_CLASS_NAME),element.removeData(NG_ANIMATE_STATE))}}function animationsDisabled(element,parentElement){if(rootAnimateState.disabled)return!0;if(isMatchingElement(element,$rootElement))return rootAnimateState.running;var allowChildAnimations,parentRunningAnimation,hasParent;do{
//the element did not reach the root element which means that it
//is not apart of the DOM. Therefore there is no reason to do
//any animations on it
if(0===parentElement.length)break;var isRoot=isMatchingElement(parentElement,$rootElement),state=isRoot?rootAnimateState:parentElement.data(NG_ANIMATE_STATE)||{};if(state.disabled)return!0;
//once a flag is found that is strictly false then everything before
//it will be discarded and all child animations will be restricted
if(
//no matter what, for an animation to work it must reach the root element
//this implies that the element is attached to the DOM when the animation is run
isRoot&&(hasParent=!0),allowChildAnimations!==!1){var animateChildrenFlag=parentElement.data(NG_ANIMATE_CHILDREN);angular.isDefined(animateChildrenFlag)&&(allowChildAnimations=animateChildrenFlag)}parentRunningAnimation=parentRunningAnimation||state.running||state.last&&!state.last.isClassBased}while(parentElement=parentElement.parent());return!hasParent||!allowChildAnimations&&parentRunningAnimation}$$jqLite=$$$jqLite,$rootElement.data(NG_ANIMATE_STATE,rootAnimateState);
// Wait until all directive and route-related templates are downloaded and
// compiled. The $templateRequest.totalPendingRequests variable keeps track of
// all of the remote templates being currently downloaded. If there are no
// templates currently downloading then the watcher will still fire anyway.
var deregisterWatch=$rootScope.$watch(function(){return $templateRequest.totalPendingRequests},function(val,oldVal){0===val&&(deregisterWatch(),
// Now that all templates have been downloaded, $animate will wait until
// the post digest queue is empty before enabling animations. By having two
// calls to $postDigest calls we can ensure that the flag is enabled at the
// very end of the post digest queue. Since all of the animations in $animate
// use $postDigest, it's important that the code below executes at the end.
// This basically means that the page is fully downloaded and compiled before
// any animations are triggered.
$rootScope.$$postDigest(function(){$rootScope.$$postDigest(function(){rootAnimateState.running=!1})}))}),globalAnimationCounter=0,classNameFilter=$animateProvider.classNameFilter(),isAnimatableClassName=classNameFilter?function(className){return classNameFilter.test(className)}:function(){return!0};/**
       * @ngdoc service
       * @name $animate
       * @kind object
       *
       * @description
       * The `$animate` service provides animation detection support while performing DOM operations (enter, leave and move) as well as during addClass and removeClass operations.
       * When any of these operations are run, the $animate service
       * will examine any JavaScript-defined animations (which are defined by using the $animateProvider provider object)
       * as well as any CSS-defined animations against the CSS classes present on the element once the DOM operation is run.
       *
       * The `$animate` service is used behind the scenes with pre-existing directives and animation with these directives
       * will work out of the box without any extra configuration.
       *
       * Requires the {@link ngAnimate `ngAnimate`} module to be installed.
       *
       * Please visit the {@link ngAnimate `ngAnimate`} module overview page learn more about how to use animations in your application.
       * ## Callback Promises
       * With AngularJS 1.3, each of the animation methods, on the `$animate` service, return a promise when called. The
       * promise itself is then resolved once the animation has completed itself, has been cancelled or has been
       * skipped due to animations being disabled. (Note that even if the animation is cancelled it will still
       * call the resolve function of the animation.)
       *
       * ```js
       * $animate.enter(element, container).then(function() {
       *   //...this is called once the animation is complete...
       * });
       * ```
       *
       * Also note that, due to the nature of the callback promise, if any Angular-specific code (like changing the scope,
       * location of the page, etc...) is executed within the callback promise then be sure to wrap the code using
       * `$scope.$apply(...)`;
       *
       * ```js
       * $animate.leave(element).then(function() {
       *   $scope.$apply(function() {
       *     $location.path('/new-page');
       *   });
       * });
       * ```
       *
       * An animation can also be cancelled by calling the `$animate.cancel(promise)` method with the provided
       * promise that was returned when the animation was started.
       *
       * ```js
       * var promise = $animate.addClass(element, 'super-long-animation');
       * promise.then(function() {
       *   //this will still be called even if cancelled
       * });
       *
       * element.on('click', function() {
       *   //tooo lazy to wait for the animation to end
       *   $animate.cancel(promise);
       * });
       * ```
       *
       * (Keep in mind that the promise cancellation is unique to `$animate` since promises in
       * general cannot be cancelled.)
       *
       */
return{/**
         * @ngdoc method
         * @name $animate#animate
         * @kind function
         *
         * @description
         * Performs an inline animation on the element which applies the provided `to` and `from` CSS styles to the element.
         * If any detected CSS transition, keyframe or JavaScript matches the provided `className` value then the animation
         * will take on the provided styles. For example, if a transition animation is set for the given className then the
         * provided `from` and `to` styles will be applied alongside the given transition. If a JavaScript animation is
         * detected then the provided styles will be given in as function paramters.
         *
         * ```js
         * ngModule.animation('.my-inline-animation', function() {
         *   return {
         *     animate : function(element, className, from, to, done) {
         *       //styles
         *     }
         *   }
         * });
         * ```
         *
         * Below is a breakdown of each step that occurs during the `animate` animation:
         *
         * | Animation Step                                                                                                        | What the element class attribute looks like                  |
         * |-----------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------|
         * | 1. `$animate.animate(...)` is called                                                                                  | `class="my-animation"`                                       |
         * | 2. `$animate` waits for the next digest to start the animation                                                        | `class="my-animation ng-animate"`                            |
         * | 3. `$animate` runs the JavaScript-defined animations detected on the element                                          | `class="my-animation ng-animate"`                            |
         * | 4. the `className` class value is added to the element                                                                | `class="my-animation ng-animate className"`                  |
         * | 5. `$animate` scans the element styles to get the CSS transition/animation duration and delay                         | `class="my-animation ng-animate className"`                  |
         * | 6. `$animate` blocks all CSS transitions on the element to ensure the `.className` class styling is applied right away| `class="my-animation ng-animate className"`                  |
         * | 7. `$animate` applies the provided collection of `from` CSS styles to the element                                     | `class="my-animation ng-animate className"`                  |
         * | 8. `$animate` waits for a single animation frame (this performs a reflow)                                             | `class="my-animation ng-animate className"`                  |
         * | 9. `$animate` removes the CSS transition block placed on the element                                                  | `class="my-animation ng-animate className"`                  |
         * | 10. the `className-active` class is added (this triggers the CSS transition/animation)                                | `class="my-animation ng-animate className className-active"` |
         * | 11. `$animate` applies the collection of `to` CSS styles to the element which are then handled by the transition      | `class="my-animation ng-animate className className-active"` |
         * | 12. `$animate` waits for the animation to complete (via events and timeout)                                           | `class="my-animation ng-animate className className-active"` |
         * | 13. The animation ends and all generated CSS classes are removed from the element                                     | `class="my-animation"`                                       |
         * | 14. The returned promise is resolved.                                                                                 | `class="my-animation"`                                       |
         *
         * @param {DOMElement} element the element that will be the focus of the enter animation
         * @param {object} from a collection of CSS styles that will be applied to the element at the start of the animation
         * @param {object} to a collection of CSS styles that the element will animate towards
         * @param {string=} className an optional CSS class that will be added to the element for the duration of the animation (the default class is `ng-inline-animate`)
         * @param {object=} options an optional collection of options that will be picked up by the CSS transition/animation
         * @return {Promise} the animation callback promise
        */
animate:function(element,from,to,className,options){return className=className||"ng-inline-animate",options=parseAnimateOptions(options)||{},options.from=to?from:null,options.to=to?to:from,runAnimationPostDigest(function(done){return performAnimation("animate",className,stripCommentsFromElement(element),null,null,noop,options,done)})},/**
         * @ngdoc method
         * @name $animate#enter
         * @kind function
         *
         * @description
         * Appends the element to the parentElement element that resides in the document and then runs the enter animation. Once
         * the animation is started, the following CSS classes will be present on the element for the duration of the animation:
         *
         * Below is a breakdown of each step that occurs during enter animation:
         *
         * | Animation Step                                                                                                        | What the element class attribute looks like                |
         * |-----------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------|
         * | 1. `$animate.enter(...)` is called                                                                                    | `class="my-animation"`                                     |
         * | 2. element is inserted into the `parentElement` element or beside the `afterElement` element                          | `class="my-animation"`                                     |
         * | 3. `$animate` waits for the next digest to start the animation                                                        | `class="my-animation ng-animate"`                          |
         * | 4. `$animate` runs the JavaScript-defined animations detected on the element                                          | `class="my-animation ng-animate"`                          |
         * | 5. the `.ng-enter` class is added to the element                                                                      | `class="my-animation ng-animate ng-enter"`                 |
         * | 6. `$animate` scans the element styles to get the CSS transition/animation duration and delay                         | `class="my-animation ng-animate ng-enter"`                 |
         * | 7. `$animate` blocks all CSS transitions on the element to ensure the `.ng-enter` class styling is applied right away | `class="my-animation ng-animate ng-enter"`                 |
         * | 8. `$animate` waits for a single animation frame (this performs a reflow)                                             | `class="my-animation ng-animate ng-enter"`                 |
         * | 9. `$animate` removes the CSS transition block placed on the element                                                  | `class="my-animation ng-animate ng-enter"`                 |
         * | 10. the `.ng-enter-active` class is added (this triggers the CSS transition/animation)                                | `class="my-animation ng-animate ng-enter ng-enter-active"` |
         * | 11. `$animate` waits for the animation to complete (via events and timeout)                                           | `class="my-animation ng-animate ng-enter ng-enter-active"` |
         * | 12. The animation ends and all generated CSS classes are removed from the element                                     | `class="my-animation"`                                     |
         * | 13. The returned promise is resolved.                                                                                 | `class="my-animation"`                                     |
         *
         * @param {DOMElement} element the element that will be the focus of the enter animation
         * @param {DOMElement} parentElement the parent element of the element that will be the focus of the enter animation
         * @param {DOMElement} afterElement the sibling element (which is the previous element) of the element that will be the focus of the enter animation
         * @param {object=} options an optional collection of options that will be picked up by the CSS transition/animation
         * @return {Promise} the animation callback promise
        */
enter:function(element,parentElement,afterElement,options){return options=parseAnimateOptions(options),element=angular.element(element),parentElement=prepareElement(parentElement),afterElement=prepareElement(afterElement),classBasedAnimationsBlocked(element,!0),$delegate.enter(element,parentElement,afterElement),runAnimationPostDigest(function(done){return performAnimation("enter","ng-enter",stripCommentsFromElement(element),parentElement,afterElement,noop,options,done)})},/**
         * @ngdoc method
         * @name $animate#leave
         * @kind function
         *
         * @description
         * Runs the leave animation operation and, upon completion, removes the element from the DOM. Once
         * the animation is started, the following CSS classes will be added for the duration of the animation:
         *
         * Below is a breakdown of each step that occurs during leave animation:
         *
         * | Animation Step                                                                                                        | What the element class attribute looks like                |
         * |-----------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------|
         * | 1. `$animate.leave(...)` is called                                                                                    | `class="my-animation"`                                     |
         * | 2. `$animate` runs the JavaScript-defined animations detected on the element                                          | `class="my-animation ng-animate"`                          |
         * | 3. `$animate` waits for the next digest to start the animation                                                        | `class="my-animation ng-animate"`                          |
         * | 4. the `.ng-leave` class is added to the element                                                                      | `class="my-animation ng-animate ng-leave"`                 |
         * | 5. `$animate` scans the element styles to get the CSS transition/animation duration and delay                         | `class="my-animation ng-animate ng-leave"`                 |
         * | 6. `$animate` blocks all CSS transitions on the element to ensure the `.ng-leave` class styling is applied right away | `class="my-animation ng-animate ng-leave"`                 |
         * | 7. `$animate` waits for a single animation frame (this performs a reflow)                                             | `class="my-animation ng-animate ng-leave"`                 |
         * | 8. `$animate` removes the CSS transition block placed on the element                                                  | `class="my-animation ng-animate ng-leave"`                 |
         * | 9. the `.ng-leave-active` class is added (this triggers the CSS transition/animation)                                 | `class="my-animation ng-animate ng-leave ng-leave-active"` |
         * | 10. `$animate` waits for the animation to complete (via events and timeout)                                           | `class="my-animation ng-animate ng-leave ng-leave-active"` |
         * | 11. The animation ends and all generated CSS classes are removed from the element                                     | `class="my-animation"`                                     |
         * | 12. The element is removed from the DOM                                                                               | ...                                                        |
         * | 13. The returned promise is resolved.                                                                                 | ...                                                        |
         *
         * @param {DOMElement} element the element that will be the focus of the leave animation
         * @param {object=} options an optional collection of styles that will be picked up by the CSS transition/animation
         * @return {Promise} the animation callback promise
        */
leave:function(element,options){return options=parseAnimateOptions(options),element=angular.element(element),cancelChildAnimations(element),classBasedAnimationsBlocked(element,!0),runAnimationPostDigest(function(done){return performAnimation("leave","ng-leave",stripCommentsFromElement(element),null,null,function(){$delegate.leave(element)},options,done)})},/**
         * @ngdoc method
         * @name $animate#move
         * @kind function
         *
         * @description
         * Fires the move DOM operation. Just before the animation starts, the animate service will either append it into the parentElement container or
         * add the element directly after the afterElement element if present. Then the move animation will be run. Once
         * the animation is started, the following CSS classes will be added for the duration of the animation:
         *
         * Below is a breakdown of each step that occurs during move animation:
         *
         * | Animation Step                                                                                                       | What the element class attribute looks like              |
         * |----------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------|
         * | 1. `$animate.move(...)` is called                                                                                    | `class="my-animation"`                                   |
         * | 2. element is moved into the parentElement element or beside the afterElement element                                | `class="my-animation"`                                   |
         * | 3. `$animate` waits for the next digest to start the animation                                                       | `class="my-animation ng-animate"`                        |
         * | 4. `$animate` runs the JavaScript-defined animations detected on the element                                         | `class="my-animation ng-animate"`                        |
         * | 5. the `.ng-move` class is added to the element                                                                      | `class="my-animation ng-animate ng-move"`                |
         * | 6. `$animate` scans the element styles to get the CSS transition/animation duration and delay                        | `class="my-animation ng-animate ng-move"`                |
         * | 7. `$animate` blocks all CSS transitions on the element to ensure the `.ng-move` class styling is applied right away | `class="my-animation ng-animate ng-move"`                |
         * | 8. `$animate` waits for a single animation frame (this performs a reflow)                                            | `class="my-animation ng-animate ng-move"`                |
         * | 9. `$animate` removes the CSS transition block placed on the element                                                 | `class="my-animation ng-animate ng-move"`                |
         * | 10. the `.ng-move-active` class is added (this triggers the CSS transition/animation)                                | `class="my-animation ng-animate ng-move ng-move-active"` |
         * | 11. `$animate` waits for the animation to complete (via events and timeout)                                          | `class="my-animation ng-animate ng-move ng-move-active"` |
         * | 12. The animation ends and all generated CSS classes are removed from the element                                    | `class="my-animation"`                                   |
         * | 13. The returned promise is resolved.                                                                                | `class="my-animation"`                                   |
         *
         * @param {DOMElement} element the element that will be the focus of the move animation
         * @param {DOMElement} parentElement the parentElement element of the element that will be the focus of the move animation
         * @param {DOMElement} afterElement the sibling element (which is the previous element) of the element that will be the focus of the move animation
         * @param {object=} options an optional collection of styles that will be picked up by the CSS transition/animation
         * @return {Promise} the animation callback promise
        */
move:function(element,parentElement,afterElement,options){return options=parseAnimateOptions(options),element=angular.element(element),parentElement=prepareElement(parentElement),afterElement=prepareElement(afterElement),cancelChildAnimations(element),classBasedAnimationsBlocked(element,!0),$delegate.move(element,parentElement,afterElement),runAnimationPostDigest(function(done){return performAnimation("move","ng-move",stripCommentsFromElement(element),parentElement,afterElement,noop,options,done)})},/**
         * @ngdoc method
         * @name $animate#addClass
         *
         * @description
         * Triggers a custom animation event based off the className variable and then attaches the className value to the element as a CSS class.
         * Unlike the other animation methods, the animate service will suffix the className value with {@type -add} in order to provide
         * the animate service the setup and active CSS classes in order to trigger the animation (this will be skipped if no CSS transitions
         * or keyframes are defined on the -add-active or base CSS class).
         *
         * Below is a breakdown of each step that occurs during addClass animation:
         *
         * | Animation Step                                                                                         | What the element class attribute looks like                        |
         * |--------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------|
         * | 1. `$animate.addClass(element, 'super')` is called                                                     | `class="my-animation"`                                             |
         * | 2. `$animate` runs the JavaScript-defined animations detected on the element                           | `class="my-animation ng-animate"`                                  |
         * | 3. the `.super-add` class is added to the element                                                      | `class="my-animation ng-animate super-add"`                        |
         * | 4. `$animate` waits for a single animation frame (this performs a reflow)                              | `class="my-animation ng-animate super-add"`                        |
         * | 5. the `.super` and `.super-add-active` classes are added (this triggers the CSS transition/animation) | `class="my-animation ng-animate super super-add super-add-active"` |
         * | 6. `$animate` scans the element styles to get the CSS transition/animation duration and delay          | `class="my-animation ng-animate super super-add super-add-active"` |
         * | 7. `$animate` waits for the animation to complete (via events and timeout)                             | `class="my-animation ng-animate super super-add super-add-active"` |
         * | 8. The animation ends and all generated CSS classes are removed from the element                       | `class="my-animation super"`                                       |
         * | 9. The super class is kept on the element                                                              | `class="my-animation super"`                                       |
         * | 10. The returned promise is resolved.                                                                  | `class="my-animation super"`                                       |
         *
         * @param {DOMElement} element the element that will be animated
         * @param {string} className the CSS class that will be added to the element and then animated
         * @param {object=} options an optional collection of styles that will be picked up by the CSS transition/animation
         * @return {Promise} the animation callback promise
        */
addClass:function(element,className,options){return this.setClass(element,className,[],options)},/**
         * @ngdoc method
         * @name $animate#removeClass
         *
         * @description
         * Triggers a custom animation event based off the className variable and then removes the CSS class provided by the className value
         * from the element. Unlike the other animation methods, the animate service will suffix the className value with {@type -remove} in
         * order to provide the animate service the setup and active CSS classes in order to trigger the animation (this will be skipped if
         * no CSS transitions or keyframes are defined on the -remove or base CSS classes).
         *
         * Below is a breakdown of each step that occurs during removeClass animation:
         *
         * | Animation Step                                                                                                       | What the element class attribute looks like                        |
         * |----------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------|
         * | 1. `$animate.removeClass(element, 'super')` is called                                                                | `class="my-animation super"`                                       |
         * | 2. `$animate` runs the JavaScript-defined animations detected on the element                                         | `class="my-animation super ng-animate"`                            |
         * | 3. the `.super-remove` class is added to the element                                                                 | `class="my-animation super ng-animate super-remove"`               |
         * | 4. `$animate` waits for a single animation frame (this performs a reflow)                                            | `class="my-animation super ng-animate super-remove"`               |
         * | 5. the `.super-remove-active` classes are added and `.super` is removed (this triggers the CSS transition/animation) | `class="my-animation ng-animate super-remove super-remove-active"` |
         * | 6. `$animate` scans the element styles to get the CSS transition/animation duration and delay                        | `class="my-animation ng-animate super-remove super-remove-active"` |
         * | 7. `$animate` waits for the animation to complete (via events and timeout)                                           | `class="my-animation ng-animate super-remove super-remove-active"` |
         * | 8. The animation ends and all generated CSS classes are removed from the element                                     | `class="my-animation"`                                             |
         * | 9. The returned promise is resolved.                                                                                 | `class="my-animation"`                                             |
         *
         *
         * @param {DOMElement} element the element that will be animated
         * @param {string} className the CSS class that will be animated and then removed from the element
         * @param {object=} options an optional collection of styles that will be picked up by the CSS transition/animation
         * @return {Promise} the animation callback promise
        */
removeClass:function(element,className,options){return this.setClass(element,[],className,options)},/**
         *
         * @ngdoc method
         * @name $animate#setClass
         *
         * @description Adds and/or removes the given CSS classes to and from the element.
         * Once complete, the `done()` callback will be fired (if provided).
         *
         * | Animation Step                                                                                                                               | What the element class attribute looks like                                            |
         * |----------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|
         * | 1. `$animate.setClass(element, 'on', 'off')` is called                                                                                       | `class="my-animation off"`                                                             |
         * | 2. `$animate` runs the JavaScript-defined animations detected on the element                                                                 | `class="my-animation ng-animate off"`                                                  |
         * | 3. the `.on-add` and `.off-remove` classes are added to the element                                                                          | `class="my-animation ng-animate on-add off-remove off"`                                |
         * | 4. `$animate` waits for a single animation frame (this performs a reflow)                                                                    | `class="my-animation ng-animate on-add off-remove off"`                                |
         * | 5. the `.on`, `.on-add-active` and `.off-remove-active` classes are added and `.off` is removed (this triggers the CSS transition/animation) | `class="my-animation ng-animate on on-add on-add-active off-remove off-remove-active"` |
         * | 6. `$animate` scans the element styles to get the CSS transition/animation duration and delay                                                | `class="my-animation ng-animate on on-add on-add-active off-remove off-remove-active"` |
         * | 7. `$animate` waits for the animation to complete (via events and timeout)                                                                   | `class="my-animation ng-animate on on-add on-add-active off-remove off-remove-active"` |
         * | 8. The animation ends and all generated CSS classes are removed from the element                                                             | `class="my-animation on"`                                                              |
         * | 9. The returned promise is resolved.                                                                                                         | `class="my-animation on"`                                                              |
         *
         * @param {DOMElement} element the element which will have its CSS classes changed
         *   removed from it
         * @param {string} add the CSS classes which will be added to the element
         * @param {string} remove the CSS class which will be removed from the element
         *   CSS classes have been set on the element
         * @param {object=} options an optional collection of styles that will be picked up by the CSS transition/animation
         * @return {Promise} the animation callback promise
         */
setClass:function(element,add,remove,options){options=parseAnimateOptions(options);var STORAGE_KEY="$$animateClasses";if(element=angular.element(element),element=stripCommentsFromElement(element),classBasedAnimationsBlocked(element))return $delegate.$$setClassImmediately(element,add,remove,options);
// we're using a combined array for both the add and remove
// operations since the ORDER OF addClass and removeClass matters
var classes,cache=element.data(STORAGE_KEY),hasCache=!!cache;return cache||(cache={},cache.classes={}),classes=cache.classes,add=isArray(add)?add:add.split(" "),forEach(add,function(c){c&&c.length&&(classes[c]=!0)}),remove=isArray(remove)?remove:remove.split(" "),forEach(remove,function(c){c&&c.length&&(classes[c]=!1)}),hasCache?(options&&cache.options&&(cache.options=angular.extend(cache.options||{},options)),cache.promise):(element.data(STORAGE_KEY,cache={classes:classes,options:options}),cache.promise=runAnimationPostDigest(function(done){var cache,parentNode,parentElement,elementNode=extractElementNode(element);
// TODO(matsko): move this code into the animationsDisabled() function once #8092 is fixed
if(elementNode&&(cache=element.data(STORAGE_KEY),element.removeData(STORAGE_KEY),parentElement=element.parent(),parentNode=elementNode.parentNode),!parentNode||parentNode.$$NG_REMOVED||elementNode.$$NG_REMOVED)return void done();var state=element.data(NG_ANIMATE_STATE)||{},classes=resolveElementClasses(element,cache,state.active);return classes?performAnimation("setClass",classes,element,parentElement,null,function(){classes[0]&&$delegate.$$addClassImmediately(element,classes[0]),classes[1]&&$delegate.$$removeClassImmediately(element,classes[1])},cache.options,done):done()}))},/**
         * @ngdoc method
         * @name $animate#cancel
         * @kind function
         *
         * @param {Promise} animationPromise The animation promise that is returned when an animation is started.
         *
         * @description
         * Cancels the provided animation.
        */
cancel:function(promise){promise.$$cancelFn()},/**
         * @ngdoc method
         * @name $animate#enabled
         * @kind function
         *
         * @param {boolean=} value If provided then set the animation on or off.
         * @param {DOMElement=} element If provided then the element will be used to represent the enable/disable operation
         * @return {boolean} Current animation state.
         *
         * @description
         * Globally enables/disables animations.
         *
        */
enabled:function(value,element){switch(arguments.length){case 2:if(value)cleanup(element);else{var data=element.data(NG_ANIMATE_STATE)||{};data.disabled=!0,element.data(NG_ANIMATE_STATE,data)}break;case 1:rootAnimateState.disabled=!value;break;default:value=!rootAnimateState.disabled}return!!value}}}]),$animateProvider.register("",["$window","$sniffer","$timeout","$$animateReflow",function($window,$sniffer,$timeout,$$animateReflow){function clearCacheAfterReflow(){cancelAnimationReflow||(cancelAnimationReflow=$$animateReflow(function(){animationReflowQueue=[],cancelAnimationReflow=null,lookupCache={}}))}function afterReflow(element,callback){cancelAnimationReflow&&cancelAnimationReflow(),animationReflowQueue.push(callback),cancelAnimationReflow=$$animateReflow(function(){forEach(animationReflowQueue,function(fn){fn()}),animationReflowQueue=[],cancelAnimationReflow=null,lookupCache={}})}function animationCloseHandler(element,totalTime){var node=extractElementNode(element);element=angular.element(node),
//this item will be garbage collected by the closing
//animation timeout
animationElementQueue.push(element);
//but it may not need to cancel out the existing timeout
//if the timestamp is less than the previous one
var futureTimestamp=Date.now()+totalTime;futureTimestamp<=closingTimestamp||($timeout.cancel(closingTimer),closingTimestamp=futureTimestamp,closingTimer=$timeout(function(){closeAllAnimations(animationElementQueue),animationElementQueue=[]},totalTime,!1))}function closeAllAnimations(elements){forEach(elements,function(element){var elementData=element.data(NG_ANIMATE_CSS_DATA_KEY);elementData&&forEach(elementData.closeAnimationFns,function(fn){fn()})})}function getElementAnimationDetails(element,cacheKey){var data=cacheKey?lookupCache[cacheKey]:null;if(!data){var transitionDuration=0,transitionDelay=0,animationDuration=0,animationDelay=0;
//we want all the styles defined before and after
forEach(element,function(element){if(element.nodeType==ELEMENT_NODE){var elementStyles=$window.getComputedStyle(element)||{},transitionDurationStyle=elementStyles[TRANSITION_PROP+DURATION_KEY];transitionDuration=Math.max(parseMaxTime(transitionDurationStyle),transitionDuration);var transitionDelayStyle=elementStyles[TRANSITION_PROP+DELAY_KEY];transitionDelay=Math.max(parseMaxTime(transitionDelayStyle),transitionDelay);elementStyles[ANIMATION_PROP+DELAY_KEY];animationDelay=Math.max(parseMaxTime(elementStyles[ANIMATION_PROP+DELAY_KEY]),animationDelay);var aDuration=parseMaxTime(elementStyles[ANIMATION_PROP+DURATION_KEY]);aDuration>0&&(aDuration*=parseInt(elementStyles[ANIMATION_PROP+ANIMATION_ITERATION_COUNT_KEY],10)||1),animationDuration=Math.max(aDuration,animationDuration)}}),data={total:0,transitionDelay:transitionDelay,transitionDuration:transitionDuration,animationDelay:animationDelay,animationDuration:animationDuration},cacheKey&&(lookupCache[cacheKey]=data)}return data}function parseMaxTime(str){var maxValue=0,values=isString(str)?str.split(/\s*,\s*/):[];return forEach(values,function(value){maxValue=Math.max(parseFloat(value)||0,maxValue)}),maxValue}function getCacheKey(element){var parentElement=element.parent(),parentID=parentElement.data(NG_ANIMATE_PARENT_KEY);return parentID||(parentElement.data(NG_ANIMATE_PARENT_KEY,++parentCounter),parentID=parentCounter),parentID+"-"+extractElementNode(element).getAttribute("class")}function animateSetup(animationEvent,element,className,styles){var structural=["ng-enter","ng-leave","ng-move"].indexOf(className)>=0,cacheKey=getCacheKey(element),eventCacheKey=cacheKey+" "+className,itemIndex=lookupCache[eventCacheKey]?++lookupCache[eventCacheKey].total:0,stagger={};if(itemIndex>0){var staggerClassName=className+"-stagger",staggerCacheKey=cacheKey+" "+staggerClassName,applyClasses=!lookupCache[staggerCacheKey];applyClasses&&$$jqLite.addClass(element,staggerClassName),stagger=getElementAnimationDetails(element,staggerCacheKey),applyClasses&&$$jqLite.removeClass(element,staggerClassName)}$$jqLite.addClass(element,className);var formerData=element.data(NG_ANIMATE_CSS_DATA_KEY)||{},timings=getElementAnimationDetails(element,eventCacheKey),transitionDuration=timings.transitionDuration,animationDuration=timings.animationDuration;if(structural&&0===transitionDuration&&0===animationDuration)return $$jqLite.removeClass(element,className),!1;var blockTransition=styles||structural&&transitionDuration>0,blockAnimation=animationDuration>0&&stagger.animationDelay>0&&0===stagger.animationDuration,closeAnimationFns=formerData.closeAnimationFns||[];element.data(NG_ANIMATE_CSS_DATA_KEY,{stagger:stagger,cacheKey:eventCacheKey,running:formerData.running||0,itemIndex:itemIndex,blockTransition:blockTransition,closeAnimationFns:closeAnimationFns});var node=extractElementNode(element);return blockTransition&&(blockTransitions(node,!0),styles&&element.css(styles)),blockAnimation&&blockAnimations(node,!0),!0}function animateRun(animationEvent,element,className,activeAnimationComplete,styles){
// This will automatically be called by $animate so
// there is no need to attach this internally to the
// timeout done method.
function onEnd(){element.off(css3AnimationEvents,onAnimationProgress),$$jqLite.removeClass(element,activeClassName),$$jqLite.removeClass(element,pendingClassName),staggerTimeout&&$timeout.cancel(staggerTimeout),animateClose(element,className);var node=extractElementNode(element);for(var i in appliedStyles)node.style.removeProperty(appliedStyles[i])}function onAnimationProgress(event){event.stopPropagation();var ev=event.originalEvent||event,timeStamp=ev.$manualTimeStamp||ev.timeStamp||Date.now(),elapsedTime=parseFloat(ev.elapsedTime.toFixed(ELAPSED_TIME_MAX_DECIMAL_PLACES));/* $manualTimeStamp is a mocked timeStamp value which is set
           * within browserTrigger(). This is only here so that tests can
           * mock animations properly. Real events fallback to event.timeStamp,
           * or, if they don't, then a timeStamp is automatically created for them.
           * We're checking to see if the timeStamp surpasses the expected delay,
           * but we're using elapsedTime instead of the timeStamp on the 2nd
           * pre-condition since animations sometimes close off early */
Math.max(timeStamp-startTime,0)>=maxDelayTime&&elapsedTime>=maxDuration&&activeAnimationComplete()}var node=extractElementNode(element),elementData=element.data(NG_ANIMATE_CSS_DATA_KEY);if(node.getAttribute("class").indexOf(className)==-1||!elementData)return void activeAnimationComplete();var activeClassName="",pendingClassName="";forEach(className.split(" "),function(klass,i){var prefix=(i>0?" ":"")+klass;activeClassName+=prefix+"-active",pendingClassName+=prefix+"-pending"});var style="",appliedStyles=[],itemIndex=elementData.itemIndex,stagger=elementData.stagger,staggerTime=0;if(itemIndex>0){var transitionStaggerDelay=0;stagger.transitionDelay>0&&0===stagger.transitionDuration&&(transitionStaggerDelay=stagger.transitionDelay*itemIndex);var animationStaggerDelay=0;stagger.animationDelay>0&&0===stagger.animationDuration&&(animationStaggerDelay=stagger.animationDelay*itemIndex,appliedStyles.push(CSS_PREFIX+"animation-play-state")),staggerTime=Math.round(100*Math.max(transitionStaggerDelay,animationStaggerDelay))/100}staggerTime||($$jqLite.addClass(element,activeClassName),elementData.blockTransition&&blockTransitions(node,!1));var eventCacheKey=elementData.cacheKey+" "+activeClassName,timings=getElementAnimationDetails(element,eventCacheKey),maxDuration=Math.max(timings.transitionDuration,timings.animationDuration);if(0===maxDuration)return $$jqLite.removeClass(element,activeClassName),animateClose(element,className),void activeAnimationComplete();!staggerTime&&styles&&Object.keys(styles).length>0&&(timings.transitionDuration||(element.css("transition",timings.animationDuration+"s linear all"),appliedStyles.push("transition")),element.css(styles));var maxDelay=Math.max(timings.transitionDelay,timings.animationDelay),maxDelayTime=maxDelay*ONE_SECOND;if(appliedStyles.length>0){
//the element being animated may sometimes contain comment nodes in
//the jqLite object, so we're safe to use a single variable to house
//the styles since there is always only one element being animated
var oldStyle=node.getAttribute("style")||"";";"!==oldStyle.charAt(oldStyle.length-1)&&(oldStyle+=";"),node.setAttribute("style",oldStyle+" "+style)}var staggerTimeout,startTime=Date.now(),css3AnimationEvents=ANIMATIONEND_EVENT+" "+TRANSITIONEND_EVENT,animationTime=(maxDelay+maxDuration)*CLOSING_TIME_BUFFER,totalTime=(staggerTime+animationTime)*ONE_SECOND;return staggerTime>0&&($$jqLite.addClass(element,pendingClassName),staggerTimeout=$timeout(function(){staggerTimeout=null,timings.transitionDuration>0&&blockTransitions(node,!1),timings.animationDuration>0&&blockAnimations(node,!1),$$jqLite.addClass(element,activeClassName),$$jqLite.removeClass(element,pendingClassName),styles&&(0===timings.transitionDuration&&element.css("transition",timings.animationDuration+"s linear all"),element.css(styles),appliedStyles.push("transition"))},staggerTime*ONE_SECOND,!1)),element.on(css3AnimationEvents,onAnimationProgress),elementData.closeAnimationFns.push(function(){onEnd(),activeAnimationComplete()}),elementData.running++,animationCloseHandler(element,totalTime),onEnd}function blockTransitions(node,bool){node.style[TRANSITION_PROP+PROPERTY_KEY]=bool?"none":""}function blockAnimations(node,bool){node.style[ANIMATION_PROP+ANIMATION_PLAYSTATE_KEY]=bool?"paused":""}function animateBefore(animationEvent,element,className,styles){if(animateSetup(animationEvent,element,className,styles))return function(cancelled){cancelled&&animateClose(element,className)}}function animateAfter(animationEvent,element,className,afterAnimationComplete,styles){return element.data(NG_ANIMATE_CSS_DATA_KEY)?animateRun(animationEvent,element,className,afterAnimationComplete,styles):(animateClose(element,className),void afterAnimationComplete())}function animate(animationEvent,element,className,animationComplete,options){
//If the animateSetup function doesn't bother returning a
//cancellation function then it means that there is no animation
//to perform at all
var preReflowCancellation=animateBefore(animationEvent,element,className,options.from);if(!preReflowCancellation)return clearCacheAfterReflow(),void animationComplete();
//There are two cancellation functions: one is before the first
//reflow animation and the second is during the active state
//animation. The first function will take care of removing the
//data from the element which will not make the 2nd animation
//happen in the first place
var cancel=preReflowCancellation;return afterReflow(element,function(){
//once the reflow is complete then we point cancel to
//the new cancellation function which will remove all of the
//animation properties from the active animation
cancel=animateAfter(animationEvent,element,className,animationComplete,options.to)}),function(cancelled){(cancel||noop)(cancelled)}}function animateClose(element,className){$$jqLite.removeClass(element,className);var data=element.data(NG_ANIMATE_CSS_DATA_KEY);data&&(data.running&&data.running--,data.running&&0!==data.running||element.removeData(NG_ANIMATE_CSS_DATA_KEY))}function suffixClasses(classes,suffix){var className="";return classes=isArray(classes)?classes:classes.split(/\s+/),forEach(classes,function(klass,i){klass&&klass.length>0&&(className+=(i>0?" ":"")+klass+suffix)}),className}
// Detect proper transitionend/animationend event names.
var TRANSITION_PROP,TRANSITIONEND_EVENT,ANIMATION_PROP,ANIMATIONEND_EVENT,CSS_PREFIX="";
// If unprefixed events are not supported but webkit-prefixed are, use the latter.
// Otherwise, just use W3C names, browsers not supporting them at all will just ignore them.
// Note: Chrome implements `window.onwebkitanimationend` and doesn't implement `window.onanimationend`
// but at the same time dispatches the `animationend` event and not `webkitAnimationEnd`.
// Register both events in case `window.onanimationend` is not supported because of that,
// do the same for `transitionend` as Safari is likely to exhibit similar behavior.
// Also, the only modern browser that uses vendor prefixes for transitions/keyframes is webkit
// therefore there is no reason to test anymore for other vendor prefixes: http://caniuse.com/#search=transition
window.ontransitionend===undefined&&window.onwebkittransitionend!==undefined?(CSS_PREFIX="-webkit-",TRANSITION_PROP="WebkitTransition",TRANSITIONEND_EVENT="webkitTransitionEnd transitionend"):(TRANSITION_PROP="transition",TRANSITIONEND_EVENT="transitionend"),window.onanimationend===undefined&&window.onwebkitanimationend!==undefined?(CSS_PREFIX="-webkit-",ANIMATION_PROP="WebkitAnimation",ANIMATIONEND_EVENT="webkitAnimationEnd animationend"):(ANIMATION_PROP="animation",ANIMATIONEND_EVENT="animationend");var cancelAnimationReflow,DURATION_KEY="Duration",PROPERTY_KEY="Property",DELAY_KEY="Delay",ANIMATION_ITERATION_COUNT_KEY="IterationCount",ANIMATION_PLAYSTATE_KEY="PlayState",NG_ANIMATE_PARENT_KEY="$$ngAnimateKey",NG_ANIMATE_CSS_DATA_KEY="$$ngAnimateCSS3Data",ELAPSED_TIME_MAX_DECIMAL_PLACES=3,CLOSING_TIME_BUFFER=1.5,ONE_SECOND=1e3,lookupCache={},parentCounter=0,animationReflowQueue=[],closingTimer=null,closingTimestamp=0,animationElementQueue=[];return{animate:function(element,className,from,to,animationCompleted,options){return options=options||{},options.from=from,options.to=to,animate("animate",element,className,animationCompleted,options)},enter:function(element,animationCompleted,options){return options=options||{},animate("enter",element,"ng-enter",animationCompleted,options)},leave:function(element,animationCompleted,options){return options=options||{},animate("leave",element,"ng-leave",animationCompleted,options)},move:function(element,animationCompleted,options){return options=options||{},animate("move",element,"ng-move",animationCompleted,options)},beforeSetClass:function(element,add,remove,animationCompleted,options){options=options||{};var className=suffixClasses(remove,"-remove")+" "+suffixClasses(add,"-add"),cancellationMethod=animateBefore("setClass",element,className,options.from);return cancellationMethod?(afterReflow(element,animationCompleted),cancellationMethod):(clearCacheAfterReflow(),void animationCompleted())},beforeAddClass:function(element,className,animationCompleted,options){options=options||{};var cancellationMethod=animateBefore("addClass",element,suffixClasses(className,"-add"),options.from);return cancellationMethod?(afterReflow(element,animationCompleted),cancellationMethod):(clearCacheAfterReflow(),void animationCompleted())},beforeRemoveClass:function(element,className,animationCompleted,options){options=options||{};var cancellationMethod=animateBefore("removeClass",element,suffixClasses(className,"-remove"),options.from);return cancellationMethod?(afterReflow(element,animationCompleted),cancellationMethod):(clearCacheAfterReflow(),void animationCompleted())},setClass:function(element,add,remove,animationCompleted,options){options=options||{},remove=suffixClasses(remove,"-remove"),add=suffixClasses(add,"-add");var className=remove+" "+add;return animateAfter("setClass",element,className,animationCompleted,options.to)},addClass:function(element,className,animationCompleted,options){return options=options||{},animateAfter("addClass",element,suffixClasses(className,"-add"),animationCompleted,options.to)},removeClass:function(element,className,animationCompleted,options){return options=options||{},animateAfter("removeClass",element,suffixClasses(className,"-remove"),animationCompleted,options.to)}}}])}])}(window,window.angular),/**
 * State-based routing for AngularJS
 * @version v0.2.15
 * @link http://angular-ui.github.com/
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
/* commonjs package manager support (eg componentjs) */
"undefined"!=typeof module&&"undefined"!=typeof exports&&module.exports===exports&&(module.exports="ui.router"),function(window,angular,undefined){/*jshint globalstrict:true*/
/*global angular:false*/
"use strict";function inherit(parent,extra){return extend(new(extend(function(){},{prototype:parent})),extra)}function merge(dst){return forEach(arguments,function(obj){obj!==dst&&forEach(obj,function(value,key){dst.hasOwnProperty(key)||(dst[key]=value)})}),dst}/**
 * Finds the common ancestor path between two states.
 *
 * @param {Object} first The first state.
 * @param {Object} second The second state.
 * @return {Array} Returns an array of state names in descending order, not including the root.
 */
function ancestors(first,second){var path=[];for(var n in first.path){if(first.path[n]!==second.path[n])break;path.push(first.path[n])}return path}/**
 * IE8-safe wrapper for `Object.keys()`.
 *
 * @param {Object} object A JavaScript object.
 * @return {Array} Returns the keys of the object as an array.
 */
function objectKeys(object){if(Object.keys)return Object.keys(object);var result=[];return forEach(object,function(val,key){result.push(key)}),result}/**
 * IE8-safe wrapper for `Array.prototype.indexOf()`.
 *
 * @param {Array} array A JavaScript array.
 * @param {*} value A value to search the array for.
 * @return {Number} Returns the array index value of `value`, or `-1` if not present.
 */
function indexOf(array,value){if(Array.prototype.indexOf)return array.indexOf(value,Number(arguments[2])||0);var len=array.length>>>0,from=Number(arguments[2])||0;for(from=from<0?Math.ceil(from):Math.floor(from),from<0&&(from+=len);from<len;from++)if(from in array&&array[from]===value)return from;return-1}/**
 * Merges a set of parameters with all parameters inherited between the common parents of the
 * current state and a given destination state.
 *
 * @param {Object} currentParams The value of the current state parameters ($stateParams).
 * @param {Object} newParams The set of parameters which will be composited with inherited params.
 * @param {Object} $current Internal definition of object representing the current state.
 * @param {Object} $to Internal definition of object representing state to transition to.
 */
function inheritParams(currentParams,newParams,$current,$to){var parentParams,parents=ancestors($current,$to),inherited={},inheritList=[];for(var i in parents)if(parents[i].params&&(parentParams=objectKeys(parents[i].params),parentParams.length))for(var j in parentParams)indexOf(inheritList,parentParams[j])>=0||(inheritList.push(parentParams[j]),inherited[parentParams[j]]=currentParams[parentParams[j]]);return extend({},inherited,newParams)}/**
 * Performs a non-strict comparison of the subset of two objects, defined by a list of keys.
 *
 * @param {Object} a The first object.
 * @param {Object} b The second object.
 * @param {Array} keys The list of keys within each object to compare. If the list is empty or not specified,
 *                     it defaults to the list of keys in `a`.
 * @return {Boolean} Returns `true` if the keys match, otherwise `false`.
 */
function equalForKeys(a,b,keys){if(!keys){keys=[];for(var n in a)keys.push(n)}for(var i=0;i<keys.length;i++){var k=keys[i];if(a[k]!=b[k])return!1}return!0}/**
 * Returns the subset of an object, based on a list of keys.
 *
 * @param {Array} keys
 * @param {Object} values
 * @return {Boolean} Returns a subset of `values`.
 */
function filterByKeys(keys,values){var filtered={};return forEach(keys,function(name){filtered[name]=values[name]}),filtered}
// extracted from underscore.js
// Return a copy of the object only containing the whitelisted properties.
function pick(obj){var copy={},keys=Array.prototype.concat.apply(Array.prototype,Array.prototype.slice.call(arguments,1));return forEach(keys,function(key){key in obj&&(copy[key]=obj[key])}),copy}
// extracted from underscore.js
// Return a copy of the object omitting the blacklisted properties.
function omit(obj){var copy={},keys=Array.prototype.concat.apply(Array.prototype,Array.prototype.slice.call(arguments,1));for(var key in obj)indexOf(keys,key)==-1&&(copy[key]=obj[key]);return copy}function filter(collection,callback){var array=isArray(collection),result=array?[]:{};return forEach(collection,function(val,i){callback(val,i)&&(result[array?result.length:i]=val)}),result}function map(collection,callback){var result=isArray(collection)?[]:{};return forEach(collection,function(val,i){result[i]=callback(val,i)}),result}function $Resolve($q,$injector){var VISIT_IN_PROGRESS=1,VISIT_DONE=2,NOTHING={},NO_DEPENDENCIES=[],NO_LOCALS=NOTHING,NO_PARENT=extend($q.when(NOTHING),{$$promises:NOTHING,$$values:NOTHING});/**
   * @ngdoc function
   * @name ui.router.util.$resolve#study
   * @methodOf ui.router.util.$resolve
   *
   * @description
   * Studies a set of invocables that are likely to be used multiple times.
   * <pre>
   * $resolve.study(invocables)(locals, parent, self)
   * </pre>
   * is equivalent to
   * <pre>
   * $resolve.resolve(invocables, locals, parent, self)
   * </pre>
   * but the former is more efficient (in fact `resolve` just calls `study` 
   * internally).
   *
   * @param {object} invocables Invocable objects
   * @return {function} a function to pass in locals, parent and self
   */
this.study=function(invocables){function visit(value,key){if(visited[key]!==VISIT_DONE){if(cycle.push(key),visited[key]===VISIT_IN_PROGRESS)throw cycle.splice(0,indexOf(cycle,key)),new Error("Cyclic dependency: "+cycle.join(" -> "));if(visited[key]=VISIT_IN_PROGRESS,isString(value))plan.push(key,[function(){return $injector.get(value)}],NO_DEPENDENCIES);else{var params=$injector.annotate(value);forEach(params,function(param){param!==key&&invocables.hasOwnProperty(param)&&visit(invocables[param],param)}),plan.push(key,value,params)}cycle.pop(),visited[key]=VISIT_DONE}}// plan is all that's required
function isResolve(value){return isObject(value)&&value.then&&value.$$promises}if(!isObject(invocables))throw new Error("'invocables' must be an object");var invocableKeys=objectKeys(invocables||{}),plan=[],cycle=[],visited={};return forEach(invocables,visit),invocables=cycle=visited=null,function(locals,parent,self){function done(){
// Merge parent values we haven't got yet and publish our own $$values
--wait||(merged||merge(values,parent.$$values),result.$$values=values,result.$$promises=result.$$promises||!0,// keep for isResolve()
delete result.$$inheritedValues,resolution.resolve(values))}function fail(reason){result.$$failure=reason,resolution.reject(reason)}function invoke(key,invocable,params){function onfailure(reason){invocation.reject(reason),fail(reason)}function proceed(){if(!isDefined(result.$$failure))try{invocation.resolve($injector.invoke(invocable,self,values)),invocation.promise.then(function(result){values[key]=result,done()},onfailure)}catch(e){onfailure(e)}}
// Create a deferred for this invocation. Failures will propagate to the resolution as well.
var invocation=$q.defer(),waitParams=0;
// Wait for any parameter that we have a promise for (either from parent or from this
// resolve; in that case study() will have made sure it's ordered before us in the plan).
forEach(params,function(dep){promises.hasOwnProperty(dep)&&!locals.hasOwnProperty(dep)&&(waitParams++,promises[dep].then(function(result){values[dep]=result,--waitParams||proceed()},onfailure))}),waitParams||proceed(),
// Publish promise synchronously; invocations further down in the plan may depend on it.
promises[key]=invocation.promise}if(isResolve(locals)&&self===undefined&&(self=parent,parent=locals,locals=null),locals){if(!isObject(locals))throw new Error("'locals' must be an object")}else locals=NO_LOCALS;if(parent){if(!isResolve(parent))throw new Error("'parent' must be a promise returned by $resolve.resolve()")}else parent=NO_PARENT;
// To complete the overall resolution, we have to wait for the parent
// promise and for the promise for each invokable in our plan.
var resolution=$q.defer(),result=resolution.promise,promises=result.$$promises={},values=extend({},locals),wait=1+plan.length/3,merged=!1;
// Short-circuit if parent has already failed
if(isDefined(parent.$$failure))return fail(parent.$$failure),result;parent.$$inheritedValues&&merge(values,omit(parent.$$inheritedValues,invocableKeys)),
// Merge parent values if the parent has already resolved, or merge
// parent promises and wait if the parent resolve is still in progress.
extend(promises,parent.$$promises),parent.$$values?(merged=merge(values,omit(parent.$$values,invocableKeys)),result.$$inheritedValues=omit(parent.$$values,invocableKeys),done()):(parent.$$inheritedValues&&(result.$$inheritedValues=omit(parent.$$inheritedValues,invocableKeys)),parent.then(done,fail));
// Process each invocable in the plan, but ignore any where a local of the same name exists.
for(var i=0,ii=plan.length;i<ii;i+=3)locals.hasOwnProperty(plan[i])?done():invoke(plan[i],plan[i+1],plan[i+2]);return result}},/**
   * @ngdoc function
   * @name ui.router.util.$resolve#resolve
   * @methodOf ui.router.util.$resolve
   *
   * @description
   * Resolves a set of invocables. An invocable is a function to be invoked via 
   * `$injector.invoke()`, and can have an arbitrary number of dependencies. 
   * An invocable can either return a value directly,
   * or a `$q` promise. If a promise is returned it will be resolved and the 
   * resulting value will be used instead. Dependencies of invocables are resolved 
   * (in this order of precedence)
   *
   * - from the specified `locals`
   * - from another invocable that is part of this `$resolve` call
   * - from an invocable that is inherited from a `parent` call to `$resolve` 
   *   (or recursively
   * - from any ancestor `$resolve` of that parent).
   *
   * The return value of `$resolve` is a promise for an object that contains 
   * (in this order of precedence)
   *
   * - any `locals` (if specified)
   * - the resolved return values of all injectables
   * - any values inherited from a `parent` call to `$resolve` (if specified)
   *
   * The promise will resolve after the `parent` promise (if any) and all promises 
   * returned by injectables have been resolved. If any invocable 
   * (or `$injector.invoke`) throws an exception, or if a promise returned by an 
   * invocable is rejected, the `$resolve` promise is immediately rejected with the 
   * same error. A rejection of a `parent` promise (if specified) will likewise be 
   * propagated immediately. Once the `$resolve` promise has been rejected, no 
   * further invocables will be called.
   * 
   * Cyclic dependencies between invocables are not permitted and will caues `$resolve`
   * to throw an error. As a special case, an injectable can depend on a parameter 
   * with the same name as the injectable, which will be fulfilled from the `parent` 
   * injectable of the same name. This allows inherited values to be decorated. 
   * Note that in this case any other injectable in the same `$resolve` with the same
   * dependency would see the decorated value, not the inherited value.
   *
   * Note that missing dependencies -- unlike cyclic dependencies -- will cause an 
   * (asynchronous) rejection of the `$resolve` promise rather than a (synchronous) 
   * exception.
   *
   * Invocables are invoked eagerly as soon as all dependencies are available. 
   * This is true even for dependencies inherited from a `parent` call to `$resolve`.
   *
   * As a special case, an invocable can be a string, in which case it is taken to 
   * be a service name to be passed to `$injector.get()`. This is supported primarily 
   * for backwards-compatibility with the `resolve` property of `$routeProvider` 
   * routes.
   *
   * @param {object} invocables functions to invoke or 
   * `$injector` services to fetch.
   * @param {object} locals  values to make available to the injectables
   * @param {object} parent  a promise returned by another call to `$resolve`.
   * @param {object} self  the `this` for the invoked methods
   * @return {object} Promise for an object that contains the resolved return value
   * of all invocables, as well as any inherited and local values.
   */
this.resolve=function(invocables,locals,parent,self){return this.study(invocables)(locals,parent,self)}}function $TemplateFactory($http,$templateCache,$injector){/**
   * @ngdoc function
   * @name ui.router.util.$templateFactory#fromConfig
   * @methodOf ui.router.util.$templateFactory
   *
   * @description
   * Creates a template from a configuration object. 
   *
   * @param {object} config Configuration object for which to load a template. 
   * The following properties are search in the specified order, and the first one 
   * that is defined is used to create the template:
   *
   * @param {string|object} config.template html string template or function to 
   * load via {@link ui.router.util.$templateFactory#fromString fromString}.
   * @param {string|object} config.templateUrl url to load or a function returning 
   * the url to load via {@link ui.router.util.$templateFactory#fromUrl fromUrl}.
   * @param {Function} config.templateProvider function to invoke via 
   * {@link ui.router.util.$templateFactory#fromProvider fromProvider}.
   * @param {object} params  Parameters to pass to the template function.
   * @param {object} locals Locals to pass to `invoke` if the template is loaded 
   * via a `templateProvider`. Defaults to `{ params: params }`.
   *
   * @return {string|object}  The template html as a string, or a promise for 
   * that string,or `null` if no template is configured.
   */
this.fromConfig=function(config,params,locals){return isDefined(config.template)?this.fromString(config.template,params):isDefined(config.templateUrl)?this.fromUrl(config.templateUrl,params):isDefined(config.templateProvider)?this.fromProvider(config.templateProvider,params,locals):null},/**
   * @ngdoc function
   * @name ui.router.util.$templateFactory#fromString
   * @methodOf ui.router.util.$templateFactory
   *
   * @description
   * Creates a template from a string or a function returning a string.
   *
   * @param {string|object} template html template as a string or function that 
   * returns an html template as a string.
   * @param {object} params Parameters to pass to the template function.
   *
   * @return {string|object} The template html as a string, or a promise for that 
   * string.
   */
this.fromString=function(template,params){return isFunction(template)?template(params):template},/**
   * @ngdoc function
   * @name ui.router.util.$templateFactory#fromUrl
   * @methodOf ui.router.util.$templateFactory
   * 
   * @description
   * Loads a template from the a URL via `$http` and `$templateCache`.
   *
   * @param {string|Function} url url of the template to load, or a function 
   * that returns a url.
   * @param {Object} params Parameters to pass to the url function.
   * @return {string|Promise.<string>} The template html as a string, or a promise 
   * for that string.
   */
this.fromUrl=function(url,params){return isFunction(url)&&(url=url(params)),null==url?null:$http.get(url,{cache:$templateCache,headers:{Accept:"text/html"}}).then(function(response){return response.data})},/**
   * @ngdoc function
   * @name ui.router.util.$templateFactory#fromProvider
   * @methodOf ui.router.util.$templateFactory
   *
   * @description
   * Creates a template by invoking an injectable provider function.
   *
   * @param {Function} provider Function to invoke via `$injector.invoke`
   * @param {Object} params Parameters for the template.
   * @param {Object} locals Locals to pass to `invoke`. Defaults to 
   * `{ params: params }`.
   * @return {string|Promise.<string>} The template html as a string, or a promise 
   * for that string.
   */
this.fromProvider=function(provider,params,locals){return $injector.invoke(provider,null,locals||{params:params})}}// reference to $UrlMatcherFactoryProvider
/**
 * @ngdoc object
 * @name ui.router.util.type:UrlMatcher
 *
 * @description
 * Matches URLs against patterns and extracts named parameters from the path or the search
 * part of the URL. A URL pattern consists of a path pattern, optionally followed by '?' and a list
 * of search parameters. Multiple search parameter names are separated by '&'. Search parameters
 * do not influence whether or not a URL is matched, but their values are passed through into
 * the matched parameters returned by {@link ui.router.util.type:UrlMatcher#methods_exec exec}.
 *
 * Path parameter placeholders can be specified using simple colon/catch-all syntax or curly brace
 * syntax, which optionally allows a regular expression for the parameter to be specified:
 *
 * * `':'` name - colon placeholder
 * * `'*'` name - catch-all placeholder
 * * `'{' name '}'` - curly placeholder
 * * `'{' name ':' regexp|type '}'` - curly placeholder with regexp or type name. Should the
 *   regexp itself contain curly braces, they must be in matched pairs or escaped with a backslash.
 *
 * Parameter names may contain only word characters (latin letters, digits, and underscore) and
 * must be unique within the pattern (across both path and search parameters). For colon
 * placeholders or curly placeholders without an explicit regexp, a path parameter matches any
 * number of characters other than '/'. For catch-all placeholders the path parameter matches
 * any number of characters.
 *
 * Examples:
 *
 * * `'/hello/'` - Matches only if the path is exactly '/hello/'. There is no special treatment for
 *   trailing slashes, and patterns have to match the entire path, not just a prefix.
 * * `'/user/:id'` - Matches '/user/bob' or '/user/1234!!!' or even '/user/' but not '/user' or
 *   '/user/bob/details'. The second path segment will be captured as the parameter 'id'.
 * * `'/user/{id}'` - Same as the previous example, but using curly brace syntax.
 * * `'/user/{id:[^/]*}'` - Same as the previous example.
 * * `'/user/{id:[0-9a-fA-F]{1,8}}'` - Similar to the previous example, but only matches if the id
 *   parameter consists of 1 to 8 hex digits.
 * * `'/files/{path:.*}'` - Matches any URL starting with '/files/' and captures the rest of the
 *   path into the parameter 'path'.
 * * `'/files/*path'` - ditto.
 * * `'/calendar/{start:date}'` - Matches "/calendar/2014-11-12" (because the pattern defined
 *   in the built-in  `date` Type matches `2014-11-12`) and provides a Date object in $stateParams.start
 *
 * @param {string} pattern  The pattern to compile into a matcher.
 * @param {Object} config  A configuration object hash:
 * @param {Object=} parentMatcher Used to concatenate the pattern/config onto
 *   an existing UrlMatcher
 *
 * * `caseInsensitive` - `true` if URL matching should be case insensitive, otherwise `false`, the default value (for backward compatibility) is `false`.
 * * `strict` - `false` if matching against a URL with a trailing slash should be treated as equivalent to a URL without a trailing slash, the default value is `true`.
 *
 * @property {string} prefix  A static prefix of this pattern. The matcher guarantees that any
 *   URL matching this matcher (i.e. any string for which {@link ui.router.util.type:UrlMatcher#methods_exec exec()} returns
 *   non-null) will start with this prefix.
 *
 * @property {string} source  The pattern that was passed into the constructor
 *
 * @property {string} sourcePath  The path portion of the source property
 *
 * @property {string} sourceSearch  The search portion of the source property
 *
 * @property {string} regex  The constructed regex that will be used to match against the url when
 *   it is time to determine which url will match.
 *
 * @returns {Object}  New `UrlMatcher` object
 */
function UrlMatcher(pattern,config,parentMatcher){function addParameter(id,type,config,location){if(paramNames.push(id),parentParams[id])return parentParams[id];if(!/^\w+(-+\w+)*(?:\[\])?$/.test(id))throw new Error("Invalid parameter name '"+id+"' in pattern '"+pattern+"'");if(params[id])throw new Error("Duplicate parameter name '"+id+"' in pattern '"+pattern+"'");return params[id]=new $$UMFP.Param(id,type,config,location),params[id]}function quoteRegExp(string,pattern,squash,optional){var surroundPattern=["",""],result=string.replace(/[\\\[\]\^$*+?.()|{}]/g,"\\$&");if(!pattern)return result;switch(squash){case!1:surroundPattern=["(",")"+(optional?"?":"")];break;case!0:surroundPattern=["?(",")?"];break;default:surroundPattern=["("+squash+"|",")?"]}return result+surroundPattern[0]+pattern+surroundPattern[1]}
// Split into static segments separated by path parameter placeholders.
// The number of segments is always 1 more than the number of parameters.
function matchDetails(m,isSearch){var id,regexp,segment,type,cfg;// IE[78] returns '' for unmatched groups instead of null
return id=m[2]||m[3],cfg=config.params[id],segment=pattern.substring(last,m.index),regexp=isSearch?m[4]:m[4]||("*"==m[1]?".*":null),type=$$UMFP.type(regexp||"string")||inherit($$UMFP.type("string"),{pattern:new RegExp(regexp,config.caseInsensitive?"i":undefined)}),{id:id,regexp:regexp,segment:segment,type:type,cfg:cfg}}config=extend({params:{}},isObject(config)?config:{});
// Find all placeholders and create a compiled pattern, using either classic or curly syntax:
//   '*' name
//   ':' name
//   '{' name '}'
//   '{' name ':' regexp '}'
// The regular expression is somewhat complicated due to the need to allow curly braces
// inside the regular expression. The placeholder regexp breaks down as follows:
//    ([:*])([\w\[\]]+)              - classic placeholder ($1 / $2) (search version has - for snake-case)
//    \{([\w\[\]]+)(?:\:( ... ))?\}  - curly brace placeholder ($3) with optional regexp/type ... ($4) (search version has - for snake-case
//    (?: ... | ... | ... )+         - the regexp consists of any number of atoms, an atom being either
//    [^{}\\]+                       - anything other than curly braces or backslash
//    \\.                            - a backslash escape
//    \{(?:[^{}\\]+|\\.)*\}          - a matched set of curly braces containing other atoms
var m,placeholder=/([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,searchPlaceholder=/([:]?)([\w\[\]-]+)|\{([\w\[\]-]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,compiled="^",last=0,segments=this.segments=[],parentParams=parentMatcher?parentMatcher.params:{},params=this.params=parentMatcher?parentMatcher.params.$$new():new $$UMFP.ParamSet,paramNames=[];this.source=pattern;for(var p,param,segment;(m=placeholder.exec(pattern))&&(p=matchDetails(m,!1),!(p.segment.indexOf("?")>=0));)// we're into the search part
param=addParameter(p.id,p.type,p.cfg,"path"),compiled+=quoteRegExp(p.segment,param.type.pattern.source,param.squash,param.isOptional),segments.push(p.segment),last=placeholder.lastIndex;segment=pattern.substring(last);
// Find any search parameter names and remove them from the last segment
var i=segment.indexOf("?");if(i>=0){var search=this.sourceSearch=segment.substring(i);if(segment=segment.substring(0,i),this.sourcePath=pattern.substring(0,last+i),search.length>0)for(last=0;m=searchPlaceholder.exec(search);)p=matchDetails(m,!0),param=addParameter(p.id,p.type,p.cfg,"search"),last=placeholder.lastIndex}else this.sourcePath=pattern,this.sourceSearch="";compiled+=quoteRegExp(segment)+(config.strict===!1?"/?":"")+"$",segments.push(segment),this.regexp=new RegExp(compiled,config.caseInsensitive?"i":undefined),this.prefix=segments[0],this.$$paramNames=paramNames}/**
 * @ngdoc object
 * @name ui.router.util.type:Type
 *
 * @description
 * Implements an interface to define custom parameter types that can be decoded from and encoded to
 * string parameters matched in a URL. Used by {@link ui.router.util.type:UrlMatcher `UrlMatcher`}
 * objects when matching or formatting URLs, or comparing or validating parameter values.
 *
 * See {@link ui.router.util.$urlMatcherFactory#methods_type `$urlMatcherFactory#type()`} for more
 * information on registering custom types.
 *
 * @param {Object} config  A configuration object which contains the custom type definition.  The object's
 *        properties will override the default methods and/or pattern in `Type`'s public interface.
 * @example
 * <pre>
 * {
 *   decode: function(val) { return parseInt(val, 10); },
 *   encode: function(val) { return val && val.toString(); },
 *   equals: function(a, b) { return this.is(a) && a === b; },
 *   is: function(val) { return angular.isNumber(val) isFinite(val) && val % 1 === 0; },
 *   pattern: /\d+/
 * }
 * </pre>
 *
 * @property {RegExp} pattern The regular expression pattern used to match values of this type when
 *           coming from a substring of a URL.
 *
 * @returns {Object}  Returns a new `Type` object.
 */
function Type(config){extend(this,config)}/**
 * @ngdoc object
 * @name ui.router.util.$urlMatcherFactory
 *
 * @description
 * Factory for {@link ui.router.util.type:UrlMatcher `UrlMatcher`} instances. The factory
 * is also available to providers under the name `$urlMatcherFactoryProvider`.
 */
function $UrlMatcherFactory(){function valToString(val){return null!=val?val.toString().replace(/\//g,"%2F"):val}function valFromString(val){return null!=val?val.toString().replace(/%2F/g,"/"):val}function getDefaultConfig(){return{strict:isStrictMode,caseInsensitive:isCaseInsensitive}}function isInjectable(value){return isFunction(value)||isArray(value)&&isFunction(value[value.length-1])}
// `flushTypeQueue()` waits until `$urlMatcherFactory` is injected before invoking the queued `definitionFn`s
function flushTypeQueue(){for(;typeQueue.length;){var type=typeQueue.shift();if(type.pattern)throw new Error("You cannot override a type's .pattern at runtime.");angular.extend($types[type.name],injector.invoke(type.def))}}function ParamSet(params){extend(this,params||{})}$$UMFP=this;var injector,isCaseInsensitive=!1,isStrictMode=!0,defaultSquashPolicy=!1,$types={},enqueue=!0,typeQueue=[],defaultTypes={string:{encode:valToString,decode:valFromString,
// TODO: in 1.0, make string .is() return false if value is undefined/null by default.
// In 0.2.x, string params are optional by default for backwards compat
is:function(val){return null==val||!isDefined(val)||"string"==typeof val},pattern:/[^/]*/},"int":{encode:valToString,decode:function(val){return parseInt(val,10)},is:function(val){return isDefined(val)&&this.decode(val.toString())===val},pattern:/\d+/},bool:{encode:function(val){return val?1:0},decode:function(val){return 0!==parseInt(val,10)},is:function(val){return val===!0||val===!1},pattern:/0|1/},date:{encode:function(val){return this.is(val)?[val.getFullYear(),("0"+(val.getMonth()+1)).slice(-2),("0"+val.getDate()).slice(-2)].join("-"):undefined},decode:function(val){if(this.is(val))return val;var match=this.capture.exec(val);return match?new Date(match[1],match[2]-1,match[3]):undefined},is:function(val){return val instanceof Date&&!isNaN(val.valueOf())},equals:function(a,b){return this.is(a)&&this.is(b)&&a.toISOString()===b.toISOString()},pattern:/[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,capture:/([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/},json:{encode:angular.toJson,decode:angular.fromJson,is:angular.isObject,equals:angular.equals,pattern:/[^/]*/},any:{// does not encode/decode
encode:angular.identity,decode:angular.identity,equals:angular.equals,pattern:/.*/}};/**
   * [Internal] Get the default value of a parameter, which may be an injectable function.
   */
$UrlMatcherFactory.$$getDefaultValue=function(config){if(!isInjectable(config.value))return config.value;if(!injector)throw new Error("Injectable functions cannot be called at configuration time");return injector.invoke(config.value)},/**
   * @ngdoc function
   * @name ui.router.util.$urlMatcherFactory#caseInsensitive
   * @methodOf ui.router.util.$urlMatcherFactory
   *
   * @description
   * Defines whether URL matching should be case sensitive (the default behavior), or not.
   *
   * @param {boolean} value `false` to match URL in a case sensitive manner; otherwise `true`;
   * @returns {boolean} the current value of caseInsensitive
   */
this.caseInsensitive=function(value){return isDefined(value)&&(isCaseInsensitive=value),isCaseInsensitive},/**
   * @ngdoc function
   * @name ui.router.util.$urlMatcherFactory#strictMode
   * @methodOf ui.router.util.$urlMatcherFactory
   *
   * @description
   * Defines whether URLs should match trailing slashes, or not (the default behavior).
   *
   * @param {boolean=} value `false` to match trailing slashes in URLs, otherwise `true`.
   * @returns {boolean} the current value of strictMode
   */
this.strictMode=function(value){return isDefined(value)&&(isStrictMode=value),isStrictMode},/**
   * @ngdoc function
   * @name ui.router.util.$urlMatcherFactory#defaultSquashPolicy
   * @methodOf ui.router.util.$urlMatcherFactory
   *
   * @description
   * Sets the default behavior when generating or matching URLs with default parameter values.
   *
   * @param {string} value A string that defines the default parameter URL squashing behavior.
   *    `nosquash`: When generating an href with a default parameter value, do not squash the parameter value from the URL
   *    `slash`: When generating an href with a default parameter value, squash (remove) the parameter value, and, if the
   *             parameter is surrounded by slashes, squash (remove) one slash from the URL
   *    any other string, e.g. "~": When generating an href with a default parameter value, squash (remove)
   *             the parameter value from the URL and replace it with this string.
   */
this.defaultSquashPolicy=function(value){if(!isDefined(value))return defaultSquashPolicy;if(value!==!0&&value!==!1&&!isString(value))throw new Error("Invalid squash policy: "+value+". Valid policies: false, true, arbitrary-string");return defaultSquashPolicy=value,value},/**
   * @ngdoc function
   * @name ui.router.util.$urlMatcherFactory#compile
   * @methodOf ui.router.util.$urlMatcherFactory
   *
   * @description
   * Creates a {@link ui.router.util.type:UrlMatcher `UrlMatcher`} for the specified pattern.
   *
   * @param {string} pattern  The URL pattern.
   * @param {Object} config  The config object hash.
   * @returns {UrlMatcher}  The UrlMatcher.
   */
this.compile=function(pattern,config){return new UrlMatcher(pattern,extend(getDefaultConfig(),config))},/**
   * @ngdoc function
   * @name ui.router.util.$urlMatcherFactory#isMatcher
   * @methodOf ui.router.util.$urlMatcherFactory
   *
   * @description
   * Returns true if the specified object is a `UrlMatcher`, or false otherwise.
   *
   * @param {Object} object  The object to perform the type check against.
   * @returns {Boolean}  Returns `true` if the object matches the `UrlMatcher` interface, by
   *          implementing all the same methods.
   */
this.isMatcher=function(o){if(!isObject(o))return!1;var result=!0;return forEach(UrlMatcher.prototype,function(val,name){isFunction(val)&&(result=result&&isDefined(o[name])&&isFunction(o[name]))}),result},/**
   * @ngdoc function
   * @name ui.router.util.$urlMatcherFactory#type
   * @methodOf ui.router.util.$urlMatcherFactory
   *
   * @description
   * Registers a custom {@link ui.router.util.type:Type `Type`} object that can be used to
   * generate URLs with typed parameters.
   *
   * @param {string} name  The type name.
   * @param {Object|Function} definition   The type definition. See
   *        {@link ui.router.util.type:Type `Type`} for information on the values accepted.
   * @param {Object|Function} definitionFn (optional) A function that is injected before the app
   *        runtime starts.  The result of this function is merged into the existing `definition`.
   *        See {@link ui.router.util.type:Type `Type`} for information on the values accepted.
   *
   * @returns {Object}  Returns `$urlMatcherFactoryProvider`.
   *
   * @example
   * This is a simple example of a custom type that encodes and decodes items from an
   * array, using the array index as the URL-encoded value:
   *
   * <pre>
   * var list = ['John', 'Paul', 'George', 'Ringo'];
   *
   * $urlMatcherFactoryProvider.type('listItem', {
   *   encode: function(item) {
   *     // Represent the list item in the URL using its corresponding index
   *     return list.indexOf(item);
   *   },
   *   decode: function(item) {
   *     // Look up the list item by index
   *     return list[parseInt(item, 10)];
   *   },
   *   is: function(item) {
   *     // Ensure the item is valid by checking to see that it appears
   *     // in the list
   *     return list.indexOf(item) > -1;
   *   }
   * });
   *
   * $stateProvider.state('list', {
   *   url: "/list/{item:listItem}",
   *   controller: function($scope, $stateParams) {
   *     console.log($stateParams.item);
   *   }
   * });
   *
   * // ...
   *
   * // Changes URL to '/list/3', logs "Ringo" to the console
   * $state.go('list', { item: "Ringo" });
   * </pre>
   *
   * This is a more complex example of a type that relies on dependency injection to
   * interact with services, and uses the parameter name from the URL to infer how to
   * handle encoding and decoding parameter values:
   *
   * <pre>
   * // Defines a custom type that gets a value from a service,
   * // where each service gets different types of values from
   * // a backend API:
   * $urlMatcherFactoryProvider.type('dbObject', {}, function(Users, Posts) {
   *
   *   // Matches up services to URL parameter names
   *   var services = {
   *     user: Users,
   *     post: Posts
   *   };
   *
   *   return {
   *     encode: function(object) {
   *       // Represent the object in the URL using its unique ID
   *       return object.id;
   *     },
   *     decode: function(value, key) {
   *       // Look up the object by ID, using the parameter
   *       // name (key) to call the correct service
   *       return services[key].findById(value);
   *     },
   *     is: function(object, key) {
   *       // Check that object is a valid dbObject
   *       return angular.isObject(object) && object.id && services[key];
   *     }
   *     equals: function(a, b) {
   *       // Check the equality of decoded objects by comparing
   *       // their unique IDs
   *       return a.id === b.id;
   *     }
   *   };
   * });
   *
   * // In a config() block, you can then attach URLs with
   * // type-annotated parameters:
   * $stateProvider.state('users', {
   *   url: "/users",
   *   // ...
   * }).state('users.item', {
   *   url: "/{user:dbObject}",
   *   controller: function($scope, $stateParams) {
   *     // $stateParams.user will now be an object returned from
   *     // the Users service
   *   },
   *   // ...
   * });
   * </pre>
   */
this.type=function(name,definition,definitionFn){if(!isDefined(definition))return $types[name];if($types.hasOwnProperty(name))throw new Error("A type named '"+name+"' has already been defined.");return $types[name]=new Type(extend({name:name},definition)),definitionFn&&(typeQueue.push({name:name,def:definitionFn}),enqueue||flushTypeQueue()),this},
// Register default types. Store them in the prototype of $types.
forEach(defaultTypes,function(type,name){$types[name]=new Type(extend({name:name},type))}),$types=inherit($types,{}),/* No need to document $get, since it returns this */
this.$get=["$injector",function($injector){return injector=$injector,enqueue=!1,flushTypeQueue(),forEach(defaultTypes,function(type,name){$types[name]||($types[name]=new Type(type))}),this}],this.Param=function(id,type,config,location){function unwrapShorthand(config){var keys=isObject(config)?objectKeys(config):[],isShorthand=indexOf(keys,"value")===-1&&indexOf(keys,"type")===-1&&indexOf(keys,"squash")===-1&&indexOf(keys,"array")===-1;return isShorthand&&(config={value:config}),config.$$fn=isInjectable(config.value)?config.value:function(){return config.value},config}function getType(config,urlType,location){if(config.type&&urlType)throw new Error("Param '"+id+"' has two type configurations.");return urlType?urlType:config.type?config.type instanceof Type?config.type:new Type(config.type):"config"===location?$types.any:$types.string}
// array config: param name (param[]) overrides default settings.  explicit config overrides param name.
function getArrayMode(){var arrayDefaults={array:"search"===location&&"auto"},arrayParamNomenclature=id.match(/\[\]$/)?{array:!0}:{};return extend(arrayDefaults,arrayParamNomenclature,config).array}/**
     * returns false, true, or the squash value to indicate the "default parameter url squash policy".
     */
function getSquashPolicy(config,isOptional){var squash=config.squash;if(!isOptional||squash===!1)return!1;if(!isDefined(squash)||null==squash)return defaultSquashPolicy;if(squash===!0||isString(squash))return squash;throw new Error("Invalid squash policy: '"+squash+"'. Valid policies: false, true, or arbitrary string")}function getReplace(config,arrayMode,isOptional,squash){var replace,configuredKeys,defaultPolicy=[{from:"",to:isOptional||arrayMode?undefined:""},{from:null,to:isOptional||arrayMode?undefined:""}];return replace=isArray(config.replace)?config.replace:[],isString(squash)&&replace.push({from:squash,to:undefined}),configuredKeys=map(replace,function(item){return item.from}),filter(defaultPolicy,function(item){return indexOf(configuredKeys,item.from)===-1}).concat(replace)}/**
     * [Internal] Get the default value of a parameter, which may be an injectable function.
     */
function $$getDefaultValue(){if(!injector)throw new Error("Injectable functions cannot be called at configuration time");var defaultValue=injector.invoke(config.$$fn);if(null!==defaultValue&&defaultValue!==undefined&&!self.type.is(defaultValue))throw new Error("Default value ("+defaultValue+") for parameter '"+self.id+"' is not an instance of Type ("+self.type.name+")");return defaultValue}/**
     * [Internal] Gets the decoded representation of a value if the value is defined, otherwise, returns the
     * default value, which may be the result of an injectable function.
     */
function $value(value){function hasReplaceVal(val){return function(obj){return obj.from===val}}function $replace(value){var replacement=map(filter(self.replace,hasReplaceVal(value)),function(obj){return obj.to});return replacement.length?replacement[0]:value}return value=$replace(value),isDefined(value)?self.type.$normalize(value):$$getDefaultValue()}function toString(){return"{Param:"+id+" "+type+" squash: '"+squash+"' optional: "+isOptional+"}"}var self=this;config=unwrapShorthand(config),type=getType(config,type,location);var arrayMode=getArrayMode();type=arrayMode?type.$asArray(arrayMode,"search"===location):type,"string"!==type.name||arrayMode||"path"!==location||config.value!==undefined||(config.value="");// for 0.2.x; in 0.3.0+ do not automatically default to ""
var isOptional=config.value!==undefined,squash=getSquashPolicy(config,isOptional),replace=getReplace(config,arrayMode,isOptional,squash);extend(this,{id:id,type:type,location:location,array:arrayMode,squash:squash,replace:replace,isOptional:isOptional,value:$value,dynamic:undefined,config:config,toString:toString})},ParamSet.prototype={$$new:function(){return inherit(this,extend(new ParamSet,{$$parent:this}))},$$keys:function(){for(var keys=[],chain=[],parent=this,ignore=objectKeys(ParamSet.prototype);parent;)chain.push(parent),parent=parent.$$parent;return chain.reverse(),forEach(chain,function(paramset){forEach(objectKeys(paramset),function(key){indexOf(keys,key)===-1&&indexOf(ignore,key)===-1&&keys.push(key)})}),keys},$$values:function(paramValues){var values={},self=this;return forEach(self.$$keys(),function(key){values[key]=self[key].value(paramValues&&paramValues[key])}),values},$$equals:function(paramValues1,paramValues2){var equal=!0,self=this;return forEach(self.$$keys(),function(key){var left=paramValues1&&paramValues1[key],right=paramValues2&&paramValues2[key];self[key].type.equals(left,right)||(equal=!1)}),equal},$$validates:function(paramValues){var i,param,rawVal,normalized,encoded,keys=this.$$keys();for(i=0;i<keys.length&&(param=this[keys[i]],rawVal=paramValues[keys[i]],rawVal!==undefined&&null!==rawVal||!param.isOptional);i++){if(// There was no parameter value, but the param is optional
normalized=param.type.$normalize(rawVal),!param.type.is(normalized))return!1;if(// The value was not of the correct Type, and could not be decoded to the correct Type
encoded=param.type.encode(normalized),angular.isString(encoded)&&!param.type.pattern.exec(encoded))return!1}return!0},$$parent:undefined},this.ParamSet=ParamSet}function $UrlRouterProvider($locationProvider,$urlMatcherFactory){
// Returns a string that is a prefix of all strings matching the RegExp
function regExpPrefix(re){var prefix=/^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(re.source);return null!=prefix?prefix[1].replace(/\\(.)/g,"$1"):""}
// Interpolates matched values into a String.replace()-style pattern
function interpolate(pattern,match){return pattern.replace(/\$(\$|\d{1,2})/,function(m,what){return match["$"===what?0:Number(what)]})}function handleIfMatch($injector,handler,match){if(!match)return!1;var result=$injector.invoke(handler,handler,{$match:match});return!isDefined(result)||result}function $get($location,$rootScope,$injector,$browser){function appendBasePath(url,isHtml5,absolute){return"/"===baseHref?url:isHtml5?baseHref.slice(0,-1)+url:absolute?baseHref.slice(1)+url:url}
// TODO: Optimize groups of rules with non-empty prefix into some sort of decision tree
function update(evt){
// TODO: Re-implement this in 1.0 for https://github.com/angular-ui/ui-router/issues/1573
//if (ignoreUpdate) return true;
function check(rule){var handled=rule($injector,$location);return!!handled&&(isString(handled)&&$location.replace().url(handled),!0)}if(!evt||!evt.defaultPrevented){lastPushedUrl&&$location.url()===lastPushedUrl;lastPushedUrl=undefined;var i,n=rules.length;for(i=0;i<n;i++)if(check(rules[i]))return;
// always check otherwise last to allow dynamic updates to the set of rules
otherwise&&check(otherwise)}}function listen(){return listener=listener||$rootScope.$on("$locationChangeSuccess",update)}var lastPushedUrl,baseHref=$browser.baseHref(),location=$location.url();return interceptDeferred||listen(),{/**
       * @ngdoc function
       * @name ui.router.router.$urlRouter#sync
       * @methodOf ui.router.router.$urlRouter
       *
       * @description
       * Triggers an update; the same update that happens when the address bar url changes, aka `$locationChangeSuccess`.
       * This method is useful when you need to use `preventDefault()` on the `$locationChangeSuccess` event,
       * perform some custom logic (route protection, auth, config, redirection, etc) and then finally proceed
       * with the transition by calling `$urlRouter.sync()`.
       *
       * @example
       * <pre>
       * angular.module('app', ['ui.router'])
       *   .run(function($rootScope, $urlRouter) {
       *     $rootScope.$on('$locationChangeSuccess', function(evt) {
       *       // Halt state change from even starting
       *       evt.preventDefault();
       *       // Perform custom logic
       *       var meetsRequirement = ...
       *       // Continue with the update and state transition if logic allows
       *       if (meetsRequirement) $urlRouter.sync();
       *     });
       * });
       * </pre>
       */
sync:function(){update()},listen:function(){return listen()},update:function(read){return read?void(location=$location.url()):void($location.url()!==location&&($location.url(location),$location.replace()))},push:function(urlMatcher,params,options){var url=urlMatcher.format(params||{});
// Handle the special hash param, if needed
null!==url&&params&&params["#"]&&(url+="#"+params["#"]),$location.url(url),lastPushedUrl=options&&options.$$avoidResync?$location.url():undefined,options&&options.replace&&$location.replace()},/**
       * @ngdoc function
       * @name ui.router.router.$urlRouter#href
       * @methodOf ui.router.router.$urlRouter
       *
       * @description
       * A URL generation method that returns the compiled URL for a given
       * {@link ui.router.util.type:UrlMatcher `UrlMatcher`}, populated with the provided parameters.
       *
       * @example
       * <pre>
       * $bob = $urlRouter.href(new UrlMatcher("/about/:person"), {
       *   person: "bob"
       * });
       * // $bob == "/about/bob";
       * </pre>
       *
       * @param {UrlMatcher} urlMatcher The `UrlMatcher` object which is used as the template of the URL to generate.
       * @param {object=} params An object of parameter values to fill the matcher's required parameters.
       * @param {object=} options Options object. The options are:
       *
       * - **`absolute`** - {boolean=false},  If true will generate an absolute url, e.g. "http://www.example.com/fullurl".
       *
       * @returns {string} Returns the fully compiled URL, or `null` if `params` fail validation against `urlMatcher`
       */
href:function(urlMatcher,params,options){if(!urlMatcher.validates(params))return null;var isHtml5=$locationProvider.html5Mode();angular.isObject(isHtml5)&&(isHtml5=isHtml5.enabled);var url=urlMatcher.format(params);if(options=options||{},isHtml5||null===url||(url="#"+$locationProvider.hashPrefix()+url),
// Handle special hash param, if needed
null!==url&&params&&params["#"]&&(url+="#"+params["#"]),url=appendBasePath(url,isHtml5,options.absolute),!options.absolute||!url)return url;var slash=!isHtml5&&url?"/":"",port=$location.port();return port=80===port||443===port?"":":"+port,[$location.protocol(),"://",$location.host(),port,slash,url].join("")}}}var listener,rules=[],otherwise=null,interceptDeferred=!1;/**
   * @ngdoc function
   * @name ui.router.router.$urlRouterProvider#rule
   * @methodOf ui.router.router.$urlRouterProvider
   *
   * @description
   * Defines rules that are used by `$urlRouterProvider` to find matches for
   * specific URLs.
   *
   * @example
   * <pre>
   * var app = angular.module('app', ['ui.router.router']);
   *
   * app.config(function ($urlRouterProvider) {
   *   // Here's an example of how you might allow case insensitive urls
   *   $urlRouterProvider.rule(function ($injector, $location) {
   *     var path = $location.path(),
   *         normalized = path.toLowerCase();
   *
   *     if (path !== normalized) {
   *       return normalized;
   *     }
   *   });
   * });
   * </pre>
   *
   * @param {object} rule Handler function that takes `$injector` and `$location`
   * services as arguments. You can use them to return a valid path as a string.
   *
   * @return {object} `$urlRouterProvider` - `$urlRouterProvider` instance
   */
this.rule=function(rule){if(!isFunction(rule))throw new Error("'rule' must be a function");return rules.push(rule),this},/**
   * @ngdoc object
   * @name ui.router.router.$urlRouterProvider#otherwise
   * @methodOf ui.router.router.$urlRouterProvider
   *
   * @description
   * Defines a path that is used when an invalid route is requested.
   *
   * @example
   * <pre>
   * var app = angular.module('app', ['ui.router.router']);
   *
   * app.config(function ($urlRouterProvider) {
   *   // if the path doesn't match any of the urls you configured
   *   // otherwise will take care of routing the user to the
   *   // specified url
   *   $urlRouterProvider.otherwise('/index');
   *
   *   // Example of using function rule as param
   *   $urlRouterProvider.otherwise(function ($injector, $location) {
   *     return '/a/valid/url';
   *   });
   * });
   * </pre>
   *
   * @param {string|object} rule The url path you want to redirect to or a function 
   * rule that returns the url path. The function version is passed two params: 
   * `$injector` and `$location` services, and must return a url string.
   *
   * @return {object} `$urlRouterProvider` - `$urlRouterProvider` instance
   */
this.otherwise=function(rule){if(isString(rule)){var redirect=rule;rule=function(){return redirect}}else if(!isFunction(rule))throw new Error("'rule' must be a function");return otherwise=rule,this},/**
   * @ngdoc function
   * @name ui.router.router.$urlRouterProvider#when
   * @methodOf ui.router.router.$urlRouterProvider
   *
   * @description
   * Registers a handler for a given url matching. if handle is a string, it is
   * treated as a redirect, and is interpolated according to the syntax of match
   * (i.e. like `String.replace()` for `RegExp`, or like a `UrlMatcher` pattern otherwise).
   *
   * If the handler is a function, it is injectable. It gets invoked if `$location`
   * matches. You have the option of inject the match object as `$match`.
   *
   * The handler can return
   *
   * - **falsy** to indicate that the rule didn't match after all, then `$urlRouter`
   *   will continue trying to find another one that matches.
   * - **string** which is treated as a redirect and passed to `$location.url()`
   * - **void** or any **truthy** value tells `$urlRouter` that the url was handled.
   *
   * @example
   * <pre>
   * var app = angular.module('app', ['ui.router.router']);
   *
   * app.config(function ($urlRouterProvider) {
   *   $urlRouterProvider.when($state.url, function ($match, $stateParams) {
   *     if ($state.$current.navigable !== state ||
   *         !equalForKeys($match, $stateParams) {
   *      $state.transitionTo(state, $match, false);
   *     }
   *   });
   * });
   * </pre>
   *
   * @param {string|object} what The incoming path that you want to redirect.
   * @param {string|object} handler The path you want to redirect your user to.
   */
this.when=function(what,handler){var redirect,handlerIsString=isString(handler);if(isString(what)&&(what=$urlMatcherFactory.compile(what)),!handlerIsString&&!isFunction(handler)&&!isArray(handler))throw new Error("invalid 'handler' in when()");var strategies={matcher:function(what,handler){return handlerIsString&&(redirect=$urlMatcherFactory.compile(handler),handler=["$match",function($match){return redirect.format($match)}]),extend(function($injector,$location){return handleIfMatch($injector,handler,what.exec($location.path(),$location.search()))},{prefix:isString(what.prefix)?what.prefix:""})},regex:function(what,handler){if(what.global||what.sticky)throw new Error("when() RegExp must not be global or sticky");return handlerIsString&&(redirect=handler,handler=["$match",function($match){return interpolate(redirect,$match)}]),extend(function($injector,$location){return handleIfMatch($injector,handler,what.exec($location.path()))},{prefix:regExpPrefix(what)})}},check={matcher:$urlMatcherFactory.isMatcher(what),regex:what instanceof RegExp};for(var n in check)if(check[n])return this.rule(strategies[n](what,handler));throw new Error("invalid 'what' in when()")},/**
   * @ngdoc function
   * @name ui.router.router.$urlRouterProvider#deferIntercept
   * @methodOf ui.router.router.$urlRouterProvider
   *
   * @description
   * Disables (or enables) deferring location change interception.
   *
   * If you wish to customize the behavior of syncing the URL (for example, if you wish to
   * defer a transition but maintain the current URL), call this method at configuration time.
   * Then, at run time, call `$urlRouter.listen()` after you have configured your own
   * `$locationChangeSuccess` event handler.
   *
   * @example
   * <pre>
   * var app = angular.module('app', ['ui.router.router']);
   *
   * app.config(function ($urlRouterProvider) {
   *
   *   // Prevent $urlRouter from automatically intercepting URL changes;
   *   // this allows you to configure custom behavior in between
   *   // location changes and route synchronization:
   *   $urlRouterProvider.deferIntercept();
   *
   * }).run(function ($rootScope, $urlRouter, UserService) {
   *
   *   $rootScope.$on('$locationChangeSuccess', function(e) {
   *     // UserService is an example service for managing user state
   *     if (UserService.isLoggedIn()) return;
   *
   *     // Prevent $urlRouter's default handler from firing
   *     e.preventDefault();
   *
   *     UserService.handleLogin().then(function() {
   *       // Once the user has logged in, sync the current URL
   *       // to the router:
   *       $urlRouter.sync();
   *     });
   *   });
   *
   *   // Configures $urlRouter's listener *after* your custom listener
   *   $urlRouter.listen();
   * });
   * </pre>
   *
   * @param {boolean} defer Indicates whether to defer location change interception. Passing
            no parameter is equivalent to `true`.
   */
this.deferIntercept=function(defer){defer===undefined&&(defer=!0),interceptDeferred=defer},/**
   * @ngdoc object
   * @name ui.router.router.$urlRouter
   *
   * @requires $location
   * @requires $rootScope
   * @requires $injector
   * @requires $browser
   *
   * @description
   *
   */
this.$get=$get,$get.$inject=["$location","$rootScope","$injector","$browser"]}function $StateProvider($urlRouterProvider,$urlMatcherFactory){function isRelative(stateName){return 0===stateName.indexOf(".")||0===stateName.indexOf("^")}function findState(stateOrName,base){if(!stateOrName)return undefined;var isStr=isString(stateOrName),name=isStr?stateOrName:stateOrName.name,path=isRelative(name);if(path){if(!base)throw new Error("No reference point given for path '"+name+"'");base=findState(base);for(var rel=name.split("."),i=0,pathLength=rel.length,current=base;i<pathLength;i++)if(""!==rel[i]||0!==i){if("^"!==rel[i])break;if(!current.parent)throw new Error("Path '"+name+"' not valid for state '"+base.name+"'");current=current.parent}else current=base;rel=rel.slice(i).join("."),name=current.name+(current.name&&rel?".":"")+rel}var state=states[name];return!state||!isStr&&(isStr||state!==stateOrName&&state.self!==stateOrName)?undefined:state}function queueState(parentName,state){queue[parentName]||(queue[parentName]=[]),queue[parentName].push(state)}function flushQueuedChildren(parentName){for(var queued=queue[parentName]||[];queued.length;)registerState(queued.shift())}function registerState(state){
// Wrap a new object around the state so we can store our private details easily.
state=inherit(state,{self:state,resolve:state.resolve||{},toString:function(){return this.name}});var name=state.name;if(!isString(name)||name.indexOf("@")>=0)throw new Error("State must have a valid name");if(states.hasOwnProperty(name))throw new Error("State '"+name+"'' is already defined");
// Get parent name
var parentName=name.indexOf(".")!==-1?name.substring(0,name.lastIndexOf(".")):isString(state.parent)?state.parent:isObject(state.parent)&&isString(state.parent.name)?state.parent.name:"";
// If parent is not registered yet, add state to queue and register later
if(parentName&&!states[parentName])return queueState(parentName,state.self);for(var key in stateBuilder)isFunction(stateBuilder[key])&&(state[key]=stateBuilder[key](state,stateBuilder.$delegates[key]));
// Register the state in the global state list and with $urlRouter if necessary.
// Register any queued children
return states[name]=state,!state[abstractKey]&&state.url&&$urlRouterProvider.when(state.url,["$match","$stateParams",function($match,$stateParams){$state.$current.navigable==state&&equalForKeys($match,$stateParams)||$state.transitionTo(state,$match,{inherit:!0,location:!1})}]),flushQueuedChildren(name),state}
// Checks text to see if it looks like a glob.
function isGlob(text){return text.indexOf("*")>-1}
// Returns true if glob matches current $state name.
function doesStateMatchGlob(glob){
//match single stars
for(var globSegments=glob.split("."),segments=$state.$current.name.split("."),i=0,l=globSegments.length;i<l;i++)"*"===globSegments[i]&&(segments[i]="*");
//match greedy starts
//match greedy ends
return"**"===globSegments[0]&&(segments=segments.slice(indexOf(segments,globSegments[1])),segments.unshift("**")),"**"===globSegments[globSegments.length-1]&&(segments.splice(indexOf(segments,globSegments[globSegments.length-2])+1,Number.MAX_VALUE),segments.push("**")),globSegments.length==segments.length&&segments.join("")===globSegments.join("")}function decorator(name,func){/*jshint validthis: true */
/*jshint validthis: true */
return isString(name)&&!isDefined(func)?stateBuilder[name]:isFunction(func)&&isString(name)?(stateBuilder[name]&&!stateBuilder.$delegates[name]&&(stateBuilder.$delegates[name]=stateBuilder[name]),stateBuilder[name]=func,this):this}function state(name,definition){/*jshint validthis: true */
return isObject(name)?definition=name:definition.name=name,registerState(definition),this}function $get($rootScope,$q,$view,$injector,$resolve,$stateParams,$urlRouter,$location,$urlMatcherFactory){
// Handles the case where a state which is the target of a transition is not found, and the user
// can optionally retry or defer the transition
function handleRedirect(redirect,state,params,options){/**
       * @ngdoc event
       * @name ui.router.state.$state#$stateNotFound
       * @eventOf ui.router.state.$state
       * @eventType broadcast on root scope
       * @description
       * Fired when a requested state **cannot be found** using the provided state name during transition.
       * The event is broadcast allowing any handlers a single chance to deal with the error (usually by
       * lazy-loading the unfound state). A special `unfoundState` object is passed to the listener handler,
       * you can see its three properties in the example. You can use `event.preventDefault()` to abort the
       * transition and the promise returned from `go` will be rejected with a `'transition aborted'` value.
       *
       * @param {Object} event Event object.
       * @param {Object} unfoundState Unfound State information. Contains: `to, toParams, options` properties.
       * @param {State} fromState Current state object.
       * @param {Object} fromParams Current state params.
       *
       * @example
       *
       * <pre>
       * // somewhere, assume lazy.state has not been defined
       * $state.go("lazy.state", {a:1, b:2}, {inherit:false});
       *
       * // somewhere else
       * $scope.$on('$stateNotFound',
       * function(event, unfoundState, fromState, fromParams){
       *     console.log(unfoundState.to); // "lazy.state"
       *     console.log(unfoundState.toParams); // {a:1, b:2}
       *     console.log(unfoundState.options); // {inherit:false} + default options
       * })
       * </pre>
       */
var evt=$rootScope.$broadcast("$stateNotFound",redirect,state,params);if(evt.defaultPrevented)return $urlRouter.update(),TransitionAborted;if(!evt.retry)return null;
// Allow the handler to return a promise to defer state lookup retry
if(options.$retry)return $urlRouter.update(),TransitionFailed;var retryTransition=$state.transition=$q.when(evt.retry);return retryTransition.then(function(){return retryTransition!==$state.transition?TransitionSuperseded:(redirect.options.$retry=!0,$state.transitionTo(redirect.to,redirect.toParams,redirect.options))},function(){return TransitionAborted}),$urlRouter.update(),retryTransition}function resolveState(state,params,paramsAreFiltered,inherited,dst,options){function resolveViews(){var viewsPromises=[];
// Resolve template and dependencies for all views.
return forEach(state.views,function(view,name){var injectables=view.resolve&&view.resolve!==state.resolve?view.resolve:{};injectables.$template=[function(){return $view.load(name,{view:view,locals:dst.globals,params:$stateParams,notify:options.notify})||""}],viewsPromises.push($resolve.resolve(injectables,dst.globals,dst.resolve,state).then(function(result){
// References to the controller (only instantiated at link time)
if(isFunction(view.controllerProvider)||isArray(view.controllerProvider)){var injectLocals=angular.extend({},injectables,dst.globals);result.$$controller=$injector.invoke(view.controllerProvider,null,injectLocals)}else result.$$controller=view.controller;
// Provide access to the state itself for internal use
result.$$state=state,result.$$controllerAs=view.controllerAs,dst[name]=result}))}),$q.all(viewsPromises).then(function(){return dst.globals})}
// Make a restricted $stateParams with only the parameters that apply to this state if
// necessary. In addition to being available to the controller and onEnter/onExit callbacks,
// we also need $stateParams to be available for any $injector calls we make during the
// dependency resolution process.
var $stateParams=paramsAreFiltered?params:filterByKeys(state.params.$$keys(),params),locals={$stateParams:$stateParams};
// Resolve 'global' dependencies for the state, i.e. those not specific to a view.
// We're also including $stateParams in this; that way the parameters are restricted
// to the set that should be visible to the state, and are independent of when we update
// the global $state and $stateParams values.
dst.resolve=$resolve.resolve(state.resolve,locals,dst.resolve,state);var promises=[dst.resolve.then(function(globals){dst.globals=globals})];
// Wait for all the promises and then return the activation object
return inherited&&promises.push(inherited),$q.all(promises).then(resolveViews).then(function(values){return dst})}var TransitionSuperseded=$q.reject(new Error("transition superseded")),TransitionPrevented=$q.reject(new Error("transition prevented")),TransitionAborted=$q.reject(new Error("transition aborted")),TransitionFailed=$q.reject(new Error("transition failed"));/**
     * @ngdoc function
     * @name ui.router.state.$state#reload
     * @methodOf ui.router.state.$state
     *
     * @description
     * A method that force reloads the current state. All resolves are re-resolved,
     * controllers reinstantiated, and events re-fired.
     *
     * @example
     * <pre>
     * var app angular.module('app', ['ui.router']);
     *
     * app.controller('ctrl', function ($scope, $state) {
     *   $scope.reload = function(){
     *     $state.reload();
     *   }
     * });
     * </pre>
     *
     * `reload()` is just an alias for:
     * <pre>
     * $state.transitionTo($state.current, $stateParams, { 
     *   reload: true, inherit: false, notify: true
     * });
     * </pre>
     *
     * @param {string=|object=} state - A state name or a state object, which is the root of the resolves to be re-resolved.
     * @example
     * <pre>
     * //assuming app application consists of 3 states: 'contacts', 'contacts.detail', 'contacts.detail.item' 
     * //and current state is 'contacts.detail.item'
     * var app angular.module('app', ['ui.router']);
     *
     * app.controller('ctrl', function ($scope, $state) {
     *   $scope.reload = function(){
     *     //will reload 'contact.detail' and 'contact.detail.item' states
     *     $state.reload('contact.detail');
     *   }
     * });
     * </pre>
     *
     * `reload()` is just an alias for:
     * <pre>
     * $state.transitionTo($state.current, $stateParams, { 
     *   reload: true, inherit: false, notify: true
     * });
     * </pre>

     * @returns {promise} A promise representing the state of the new transition. See
     * {@link ui.router.state.$state#methods_go $state.go}.
     */
/**
     * @ngdoc function
     * @name ui.router.state.$state#go
     * @methodOf ui.router.state.$state
     *
     * @description
     * Convenience method for transitioning to a new state. `$state.go` calls 
     * `$state.transitionTo` internally but automatically sets options to 
     * `{ location: true, inherit: true, relative: $state.$current, notify: true }`. 
     * This allows you to easily use an absolute or relative to path and specify 
     * only the parameters you'd like to update (while letting unspecified parameters 
     * inherit from the currently active ancestor states).
     *
     * @example
     * <pre>
     * var app = angular.module('app', ['ui.router']);
     *
     * app.controller('ctrl', function ($scope, $state) {
     *   $scope.changeState = function () {
     *     $state.go('contact.detail');
     *   };
     * });
     * </pre>
     * <img src='../ngdoc_assets/StateGoExamples.png'/>
     *
     * @param {string} to Absolute state name or relative state path. Some examples:
     *
     * - `$state.go('contact.detail')` - will go to the `contact.detail` state
     * - `$state.go('^')` - will go to a parent state
     * - `$state.go('^.sibling')` - will go to a sibling state
     * - `$state.go('.child.grandchild')` - will go to grandchild state
     *
     * @param {object=} params A map of the parameters that will be sent to the state, 
     * will populate $stateParams. Any parameters that are not specified will be inherited from currently 
     * defined parameters. This allows, for example, going to a sibling state that shares parameters
     * specified in a parent state. Parameter inheritance only works between common ancestor states, I.e.
     * transitioning to a sibling will get you the parameters for all parents, transitioning to a child
     * will get you all current parameters, etc.
     * @param {object=} options Options object. The options are:
     *
     * - **`location`** - {boolean=true|string=} - If `true` will update the url in the location bar, if `false`
     *    will not. If string, must be `"replace"`, which will update url and also replace last history record.
     * - **`inherit`** - {boolean=true}, If `true` will inherit url parameters from current url.
     * - **`relative`** - {object=$state.$current}, When transitioning with relative path (e.g '^'), 
     *    defines which state to be relative from.
     * - **`notify`** - {boolean=true}, If `true` will broadcast $stateChangeStart and $stateChangeSuccess events.
     * - **`reload`** (v0.2.5) - {boolean=false}, If `true` will force transition even if the state or params 
     *    have not changed, aka a reload of the same state. It differs from reloadOnSearch because you'd
     *    use this when you want to force a reload when *everything* is the same, including search params.
     *
     * @returns {promise} A promise representing the state of the new transition.
     *
     * Possible success values:
     *
     * - $state.current
     *
     * <br/>Possible rejection values:
     *
     * - 'transition superseded' - when a newer transition has been started after this one
     * - 'transition prevented' - when `event.preventDefault()` has been called in a `$stateChangeStart` listener
     * - 'transition aborted' - when `event.preventDefault()` has been called in a `$stateNotFound` listener or
     *   when a `$stateNotFound` `event.retry` promise errors.
     * - 'transition failed' - when a state has been unsuccessfully found after 2 tries.
     * - *resolve error* - when an error has occurred with a `resolve`
     *
     */
/**
     * @ngdoc function
     * @name ui.router.state.$state#transitionTo
     * @methodOf ui.router.state.$state
     *
     * @description
     * Low-level method for transitioning to a new state. {@link ui.router.state.$state#methods_go $state.go}
     * uses `transitionTo` internally. `$state.go` is recommended in most situations.
     *
     * @example
     * <pre>
     * var app = angular.module('app', ['ui.router']);
     *
     * app.controller('ctrl', function ($scope, $state) {
     *   $scope.changeState = function () {
     *     $state.transitionTo('contact.detail');
     *   };
     * });
     * </pre>
     *
     * @param {string} to State name.
     * @param {object=} toParams A map of the parameters that will be sent to the state,
     * will populate $stateParams.
     * @param {object=} options Options object. The options are:
     *
     * - **`location`** - {boolean=true|string=} - If `true` will update the url in the location bar, if `false`
     *    will not. If string, must be `"replace"`, which will update url and also replace last history record.
     * - **`inherit`** - {boolean=false}, If `true` will inherit url parameters from current url.
     * - **`relative`** - {object=}, When transitioning with relative path (e.g '^'), 
     *    defines which state to be relative from.
     * - **`notify`** - {boolean=true}, If `true` will broadcast $stateChangeStart and $stateChangeSuccess events.
     * - **`reload`** (v0.2.5) - {boolean=false|string=|object=}, If `true` will force transition even if the state or params 
     *    have not changed, aka a reload of the same state. It differs from reloadOnSearch because you'd
     *    use this when you want to force a reload when *everything* is the same, including search params.
     *    if String, then will reload the state with the name given in reload, and any children.
     *    if Object, then a stateObj is expected, will reload the state found in stateObj, and any children.
     *
     * @returns {promise} A promise representing the state of the new transition. See
     * {@link ui.router.state.$state#methods_go $state.go}.
     */
/**
     * @ngdoc function
     * @name ui.router.state.$state#is
     * @methodOf ui.router.state.$state
     *
     * @description
     * Similar to {@link ui.router.state.$state#methods_includes $state.includes},
     * but only checks for the full state name. If params is supplied then it will be
     * tested for strict equality against the current active params object, so all params
     * must match with none missing and no extras.
     *
     * @example
     * <pre>
     * $state.$current.name = 'contacts.details.item';
     *
     * // absolute name
     * $state.is('contact.details.item'); // returns true
     * $state.is(contactDetailItemStateObject); // returns true
     *
     * // relative name (. and ^), typically from a template
     * // E.g. from the 'contacts.details' template
     * <div ng-class="{highlighted: $state.is('.item')}">Item</div>
     * </pre>
     *
     * @param {string|object} stateOrName The state name (absolute or relative) or state object you'd like to check.
     * @param {object=} params A param object, e.g. `{sectionId: section.id}`, that you'd like
     * to test against the current active state.
     * @param {object=} options An options object.  The options are:
     *
     * - **`relative`** - {string|object} -  If `stateOrName` is a relative state name and `options.relative` is set, .is will
     * test relative to `options.relative` state (or name).
     *
     * @returns {boolean} Returns true if it is the state.
     */
/**
     * @ngdoc function
     * @name ui.router.state.$state#includes
     * @methodOf ui.router.state.$state
     *
     * @description
     * A method to determine if the current active state is equal to or is the child of the
     * state stateName. If any params are passed then they will be tested for a match as well.
     * Not all the parameters need to be passed, just the ones you'd like to test for equality.
     *
     * @example
     * Partial and relative names
     * <pre>
     * $state.$current.name = 'contacts.details.item';
     *
     * // Using partial names
     * $state.includes("contacts"); // returns true
     * $state.includes("contacts.details"); // returns true
     * $state.includes("contacts.details.item"); // returns true
     * $state.includes("contacts.list"); // returns false
     * $state.includes("about"); // returns false
     *
     * // Using relative names (. and ^), typically from a template
     * // E.g. from the 'contacts.details' template
     * <div ng-class="{highlighted: $state.includes('.item')}">Item</div>
     * </pre>
     *
     * Basic globbing patterns
     * <pre>
     * $state.$current.name = 'contacts.details.item.url';
     *
     * $state.includes("*.details.*.*"); // returns true
     * $state.includes("*.details.**"); // returns true
     * $state.includes("**.item.**"); // returns true
     * $state.includes("*.details.item.url"); // returns true
     * $state.includes("*.details.*.url"); // returns true
     * $state.includes("*.details.*"); // returns false
     * $state.includes("item.**"); // returns false
     * </pre>
     *
     * @param {string} stateOrName A partial name, relative name, or glob pattern
     * to be searched for within the current state name.
     * @param {object=} params A param object, e.g. `{sectionId: section.id}`,
     * that you'd like to test against the current active state.
     * @param {object=} options An options object.  The options are:
     *
     * - **`relative`** - {string|object=} -  If `stateOrName` is a relative state reference and `options.relative` is set,
     * .includes will test relative to `options.relative` state (or name).
     *
     * @returns {boolean} Returns true if it does include the state
     */
/**
     * @ngdoc function
     * @name ui.router.state.$state#href
     * @methodOf ui.router.state.$state
     *
     * @description
     * A url generation method that returns the compiled url for the given state populated with the given params.
     *
     * @example
     * <pre>
     * expect($state.href("about.person", { person: "bob" })).toEqual("/about/bob");
     * </pre>
     *
     * @param {string|object} stateOrName The state name or state object you'd like to generate a url from.
     * @param {object=} params An object of parameter values to fill the state's required parameters.
     * @param {object=} options Options object. The options are:
     *
     * - **`lossy`** - {boolean=true} -  If true, and if there is no url associated with the state provided in the
     *    first parameter, then the constructed href url will be built from the first navigable ancestor (aka
     *    ancestor with a valid url).
     * - **`inherit`** - {boolean=true}, If `true` will inherit url parameters from current url.
     * - **`relative`** - {object=$state.$current}, When transitioning with relative path (e.g '^'), 
     *    defines which state to be relative from.
     * - **`absolute`** - {boolean=false},  If true will generate an absolute url, e.g. "http://www.example.com/fullurl".
     * 
     * @returns {string} compiled state url
     */
/**
     * @ngdoc function
     * @name ui.router.state.$state#get
     * @methodOf ui.router.state.$state
     *
     * @description
     * Returns the state configuration object for any specific state or all states.
     *
     * @param {string|object=} stateOrName (absolute or relative) If provided, will only get the config for
     * the requested state. If not provided, returns an array of ALL state configs.
     * @param {string|object=} context When stateOrName is a relative state reference, the state will be retrieved relative to context.
     * @returns {Object|Array} State configuration object or array of all objects.
     */
return root.locals={resolve:null,globals:{$stateParams:{}}},$state={params:{},current:root.self,$current:root,transition:null},$state.reload=function(state){return $state.transitionTo($state.current,$stateParams,{reload:state||!0,inherit:!1,notify:!0})},$state.go=function(to,params,options){return $state.transitionTo(to,params,extend({inherit:!0,relative:$state.$current},options))},$state.transitionTo=function(to,toParams,options){toParams=toParams||{},options=extend({location:!0,inherit:!1,relative:null,notify:!0,reload:!1,$retry:!1},options||{});var evt,from=$state.$current,fromParams=$state.params,fromPath=from.path,toState=findState(to,options.relative),hash=toParams["#"];if(!isDefined(toState)){var redirect={to:to,toParams:toParams,options:options},redirectResult=handleRedirect(redirect,from.self,fromParams,options);if(redirectResult)return redirectResult;if(
// Always retry once if the $stateNotFound was not prevented
// (handles either redirect changed or state lazy-definition)
to=redirect.to,toParams=redirect.toParams,options=redirect.options,toState=findState(to,options.relative),!isDefined(toState)){if(!options.relative)throw new Error("No such state '"+to+"'");throw new Error("Could not resolve '"+to+"' from state '"+options.relative+"'")}}if(toState[abstractKey])throw new Error("Cannot transition to abstract state '"+to+"'");if(options.inherit&&(toParams=inheritParams($stateParams,toParams||{},$state.$current,toState)),!toState.params.$$validates(toParams))return TransitionFailed;toParams=toState.params.$$values(toParams),to=toState;var toPath=to.path,keep=0,state=toPath[keep],locals=root.locals,toLocals=[];if(options.reload){if(isString(options.reload)||isObject(options.reload)){if(isObject(options.reload)&&!options.reload.name)throw new Error("Invalid reload state object");var reloadState=options.reload===!0?fromPath[0]:findState(options.reload);if(options.reload&&!reloadState)throw new Error("No such reload state '"+(isString(options.reload)?options.reload:options.reload.name)+"'");for(;state&&state===fromPath[keep]&&state!==reloadState;)locals=toLocals[keep]=state.locals,keep++,state=toPath[keep]}}else for(;state&&state===fromPath[keep]&&state.ownParams.$$equals(toParams,fromParams);)locals=toLocals[keep]=state.locals,keep++,state=toPath[keep];
// If we're going to the same state and all locals are kept, we've got nothing to do.
// But clear 'transition', as we still want to cancel any other pending transitions.
// TODO: We may not want to bump 'transition' if we're called from a location change
// that we've initiated ourselves, because we might accidentally abort a legitimate
// transition initiated from code?
if(shouldSkipReload(to,toParams,from,fromParams,locals,options))return hash&&(toParams["#"]=hash),$state.params=toParams,copy($state.params,$stateParams),options.location&&to.navigable&&to.navigable.url&&($urlRouter.push(to.navigable.url,toParams,{$$avoidResync:!0,replace:"replace"===options.location}),$urlRouter.update(!0)),$state.transition=null,$q.when($state.current);
// Broadcast start event and cancel the transition if requested
if(
// Filter parameters before we pass them to event handlers etc.
toParams=filterByKeys(to.params.$$keys(),toParams||{}),options.notify&&$rootScope.$broadcast("$stateChangeStart",to.self,toParams,from.self,fromParams).defaultPrevented)return $rootScope.$broadcast("$stateChangeCancel",to.self,toParams,from.self,fromParams),$urlRouter.update(),TransitionPrevented;for(var resolved=$q.when(locals),l=keep;l<toPath.length;l++,state=toPath[l])locals=toLocals[l]=inherit(locals),resolved=resolveState(state,toParams,state===to,resolved,locals,options);
// Once everything is resolved, we are ready to perform the actual transition
// and return a promise for the new state. We also keep track of what the
// current promise is, so that we can detect overlapping transitions and
// keep only the outcome of the last transition.
var transition=$state.transition=resolved.then(function(){var l,entering,exiting;if($state.transition!==transition)return TransitionSuperseded;
// Exit 'from' states not kept
for(l=fromPath.length-1;l>=keep;l--)exiting=fromPath[l],exiting.self.onExit&&$injector.invoke(exiting.self.onExit,exiting.self,exiting.locals.globals),exiting.locals=null;
// Enter 'to' states not kept
for(l=keep;l<toPath.length;l++)entering=toPath[l],entering.locals=toLocals[l],entering.self.onEnter&&$injector.invoke(entering.self.onEnter,entering.self,entering.locals.globals);
// Run it again, to catch any transitions in callbacks
// Re-add the saved hash before we start returning things
// Run it again, to catch any transitions in callbacks
// Update globals in $state
/**
         * @ngdoc event
         * @name ui.router.state.$state#$stateChangeSuccess
         * @eventOf ui.router.state.$state
         * @eventType broadcast on root scope
         * @description
         * Fired once the state transition is **complete**.
         *
         * @param {Object} event Event object.
         * @param {State} toState The state being transitioned to.
         * @param {Object} toParams The params supplied to the `toState`.
         * @param {State} fromState The current state, pre-transition.
         * @param {Object} fromParams The params supplied to the `fromState`.
         */
return hash&&(toParams["#"]=hash),$state.transition!==transition?TransitionSuperseded:($state.$current=to,$state.current=to.self,$state.params=toParams,copy($state.params,$stateParams),$state.transition=null,options.location&&to.navigable&&$urlRouter.push(to.navigable.url,to.navigable.locals.globals.$stateParams,{$$avoidResync:!0,replace:"replace"===options.location}),options.notify&&$rootScope.$broadcast("$stateChangeSuccess",to.self,toParams,from.self,fromParams),$urlRouter.update(!0),$state.current)},function(error){/**
         * @ngdoc event
         * @name ui.router.state.$state#$stateChangeError
         * @eventOf ui.router.state.$state
         * @eventType broadcast on root scope
         * @description
         * Fired when an **error occurs** during transition. It's important to note that if you
         * have any errors in your resolve functions (javascript errors, non-existent services, etc)
         * they will not throw traditionally. You must listen for this $stateChangeError event to
         * catch **ALL** errors.
         *
         * @param {Object} event Event object.
         * @param {State} toState The state being transitioned to.
         * @param {Object} toParams The params supplied to the `toState`.
         * @param {State} fromState The current state, pre-transition.
         * @param {Object} fromParams The params supplied to the `fromState`.
         * @param {Error} error The resolve error object.
         */
return $state.transition!==transition?TransitionSuperseded:($state.transition=null,evt=$rootScope.$broadcast("$stateChangeError",to.self,toParams,from.self,fromParams,error),evt.defaultPrevented||$urlRouter.update(),$q.reject(error))});return transition},$state.is=function(stateOrName,params,options){options=extend({relative:$state.$current},options||{});var state=findState(stateOrName,options.relative);return isDefined(state)?$state.$current===state&&(!params||equalForKeys(state.params.$$values(params),$stateParams)):undefined},$state.includes=function(stateOrName,params,options){if(options=extend({relative:$state.$current},options||{}),isString(stateOrName)&&isGlob(stateOrName)){if(!doesStateMatchGlob(stateOrName))return!1;stateOrName=$state.$current.name}var state=findState(stateOrName,options.relative);return isDefined(state)?!!isDefined($state.$current.includes[state.name])&&(!params||equalForKeys(state.params.$$values(params),$stateParams,objectKeys(params))):undefined},$state.href=function(stateOrName,params,options){options=extend({lossy:!0,inherit:!0,absolute:!1,relative:$state.$current},options||{});var state=findState(stateOrName,options.relative);if(!isDefined(state))return null;options.inherit&&(params=inheritParams($stateParams,params||{},$state.$current,state));var nav=state&&options.lossy?state.navigable:state;return nav&&nav.url!==undefined&&null!==nav.url?$urlRouter.href(nav.url,filterByKeys(state.params.$$keys().concat("#"),params||{}),{absolute:options.absolute}):null},$state.get=function(stateOrName,context){if(0===arguments.length)return map(objectKeys(states),function(name){return states[name].self});var state=findState(stateOrName,context||$state.$current);return state&&state.self?state.self:null},$state}function shouldSkipReload(to,toParams,from,fromParams,locals,options){
// Return true if there are no differences in non-search (path/object) params, false if there are differences
function nonSearchParamsEqual(fromAndToState,fromParams,toParams){
// Identify whether all the parameters that differ between `fromParams` and `toParams` were search params.
function notSearchParam(key){return"search"!=fromAndToState.params[key].location}var nonQueryParamKeys=fromAndToState.params.$$keys().filter(notSearchParam),nonQueryParams=pick.apply({},[fromAndToState.params].concat(nonQueryParamKeys)),nonQueryParamSet=new $$UMFP.ParamSet(nonQueryParams);return nonQueryParamSet.$$equals(fromParams,toParams)}
// If reload was not explicitly requested
// and we're transitioning to the same state we're already in
// and    the locals didn't change
//     or they changed in a way that doesn't merit reloading
//        (reloadOnParams:false, or reloadOnSearch.false and only search params changed)
// Then return true.
if(!options.reload&&to===from&&(locals===from.locals||to.self.reloadOnSearch===!1&&nonSearchParamsEqual(from,fromParams,toParams)))return!0}var root,$state,states={},queue={},abstractKey="abstract",stateBuilder={
// Derive parent state from a hierarchical name only if 'parent' is not explicitly defined.
// state.children = [];
// if (parent) parent.children.push(state);
parent:function(state){if(isDefined(state.parent)&&state.parent)return findState(state.parent);
// regex matches any valid composite state name
// would match "contact.list" but not "contacts"
var compositeName=/^(.+)\.[^.]+$/.exec(state.name);return compositeName?findState(compositeName[1]):root},
// inherit 'data' from parent and override by own values (if any)
data:function(state){return state.parent&&state.parent.data&&(state.data=state.self.data=extend({},state.parent.data,state.data)),state.data},
// Build a URLMatcher if necessary, either via a relative or absolute URL
url:function(state){var url=state.url,config={params:state.params||{}};if(isString(url))return"^"==url.charAt(0)?$urlMatcherFactory.compile(url.substring(1),config):(state.parent.navigable||root).url.concat(url,config);if(!url||$urlMatcherFactory.isMatcher(url))return url;throw new Error("Invalid url '"+url+"' in state '"+state+"'")},
// Keep track of the closest ancestor state that has a URL (i.e. is navigable)
navigable:function(state){return state.url?state:state.parent?state.parent.navigable:null},
// Own parameters for this state. state.url.params is already built at this point. Create and add non-url params
ownParams:function(state){var params=state.url&&state.url.params||new $$UMFP.ParamSet;return forEach(state.params||{},function(config,id){params[id]||(params[id]=new $$UMFP.Param(id,null,config,"config"))}),params},
// Derive parameters for this state and ensure they're a super-set of parent's parameters
params:function(state){return state.parent&&state.parent.params?extend(state.parent.params.$$new(),state.ownParams):new $$UMFP.ParamSet},
// If there is no explicit multi-view configuration, make one up so we don't have
// to handle both cases in the view directive later. Note that having an explicit
// 'views' property will mean the default unnamed view properties are ignored. This
// is also a good time to resolve view names to absolute names, so everything is a
// straight lookup at link time.
views:function(state){var views={};return forEach(isDefined(state.views)?state.views:{"":state},function(view,name){name.indexOf("@")<0&&(name+="@"+state.parent.name),views[name]=view}),views},
// Keep a full path from the root down to this state as this is needed for state activation.
path:function(state){return state.parent?state.parent.path.concat(state):[]},
// Speed up $state.contains() as it's used a lot
includes:function(state){var includes=state.parent?extend({},state.parent.includes):{};return includes[state.name]=!0,includes},$delegates:{}};
// Implicit root state that is always active
root=registerState({name:"",url:"^",views:null,"abstract":!0}),root.navigable=null,/**
   * @ngdoc function
   * @name ui.router.state.$stateProvider#decorator
   * @methodOf ui.router.state.$stateProvider
   *
   * @description
   * Allows you to extend (carefully) or override (at your own peril) the 
   * `stateBuilder` object used internally by `$stateProvider`. This can be used 
   * to add custom functionality to ui-router, for example inferring templateUrl 
   * based on the state name.
   *
   * When passing only a name, it returns the current (original or decorated) builder
   * function that matches `name`.
   *
   * The builder functions that can be decorated are listed below. Though not all
   * necessarily have a good use case for decoration, that is up to you to decide.
   *
   * In addition, users can attach custom decorators, which will generate new 
   * properties within the state's internal definition. There is currently no clear 
   * use-case for this beyond accessing internal states (i.e. $state.$current), 
   * however, expect this to become increasingly relevant as we introduce additional 
   * meta-programming features.
   *
   * **Warning**: Decorators should not be interdependent because the order of 
   * execution of the builder functions in non-deterministic. Builder functions 
   * should only be dependent on the state definition object and super function.
   *
   *
   * Existing builder functions and current return values:
   *
   * - **parent** `{object}` - returns the parent state object.
   * - **data** `{object}` - returns state data, including any inherited data that is not
   *   overridden by own values (if any).
   * - **url** `{object}` - returns a {@link ui.router.util.type:UrlMatcher UrlMatcher}
   *   or `null`.
   * - **navigable** `{object}` - returns closest ancestor state that has a URL (aka is 
   *   navigable).
   * - **params** `{object}` - returns an array of state params that are ensured to 
   *   be a super-set of parent's params.
   * - **views** `{object}` - returns a views object where each key is an absolute view 
   *   name (i.e. "viewName@stateName") and each value is the config object 
   *   (template, controller) for the view. Even when you don't use the views object 
   *   explicitly on a state config, one is still created for you internally.
   *   So by decorating this builder function you have access to decorating template 
   *   and controller properties.
   * - **ownParams** `{object}` - returns an array of params that belong to the state, 
   *   not including any params defined by ancestor states.
   * - **path** `{string}` - returns the full path from the root down to this state. 
   *   Needed for state activation.
   * - **includes** `{object}` - returns an object that includes every state that 
   *   would pass a `$state.includes()` test.
   *
   * @example
   * <pre>
   * // Override the internal 'views' builder with a function that takes the state
   * // definition, and a reference to the internal function being overridden:
   * $stateProvider.decorator('views', function (state, parent) {
   *   var result = {},
   *       views = parent(state);
   *
   *   angular.forEach(views, function (config, name) {
   *     var autoName = (state.name + '.' + name).replace('.', '/');
   *     config.templateUrl = config.templateUrl || '/partials/' + autoName + '.html';
   *     result[name] = config;
   *   });
   *   return result;
   * });
   *
   * $stateProvider.state('home', {
   *   views: {
   *     'contact.list': { controller: 'ListController' },
   *     'contact.item': { controller: 'ItemController' }
   *   }
   * });
   *
   * // ...
   *
   * $state.go('home');
   * // Auto-populates list and item views with /partials/home/contact/list.html,
   * // and /partials/home/contact/item.html, respectively.
   * </pre>
   *
   * @param {string} name The name of the builder function to decorate. 
   * @param {object} func A function that is responsible for decorating the original 
   * builder function. The function receives two parameters:
   *
   *   - `{object}` - state - The state config object.
   *   - `{object}` - super - The original builder function.
   *
   * @return {object} $stateProvider - $stateProvider instance
   */
this.decorator=decorator,/**
   * @ngdoc function
   * @name ui.router.state.$stateProvider#state
   * @methodOf ui.router.state.$stateProvider
   *
   * @description
   * Registers a state configuration under a given state name. The stateConfig object
   * has the following acceptable properties.
   *
   * @param {string} name A unique state name, e.g. "home", "about", "contacts".
   * To create a parent/child state use a dot, e.g. "about.sales", "home.newest".
   * @param {object} stateConfig State configuration object.
   * @param {string|function=} stateConfig.template
   * <a id='template'></a>
   *   html template as a string or a function that returns
   *   an html template as a string which should be used by the uiView directives. This property 
   *   takes precedence over templateUrl.
   *   
   *   If `template` is a function, it will be called with the following parameters:
   *
   *   - {array.&lt;object&gt;} - state parameters extracted from the current $location.path() by
   *     applying the current state
   *
   * <pre>template:
   *   "<h1>inline template definition</h1>" +
   *   "<div ui-view></div>"</pre>
   * <pre>template: function(params) {
   *       return "<h1>generated template</h1>"; }</pre>
   * </div>
   *
   * @param {string|function=} stateConfig.templateUrl
   * <a id='templateUrl'></a>
   *
   *   path or function that returns a path to an html
   *   template that should be used by uiView.
   *   
   *   If `templateUrl` is a function, it will be called with the following parameters:
   *
   *   - {array.&lt;object&gt;} - state parameters extracted from the current $location.path() by 
   *     applying the current state
   *
   * <pre>templateUrl: "home.html"</pre>
   * <pre>templateUrl: function(params) {
   *     return myTemplates[params.pageId]; }</pre>
   *
   * @param {function=} stateConfig.templateProvider
   * <a id='templateProvider'></a>
   *    Provider function that returns HTML content string.
   * <pre> templateProvider:
   *       function(MyTemplateService, params) {
   *         return MyTemplateService.getTemplate(params.pageId);
   *       }</pre>
   *
   * @param {string|function=} stateConfig.controller
   * <a id='controller'></a>
   *
   *  Controller fn that should be associated with newly
   *   related scope or the name of a registered controller if passed as a string.
   *   Optionally, the ControllerAs may be declared here.
   * <pre>controller: "MyRegisteredController"</pre>
   * <pre>controller:
   *     "MyRegisteredController as fooCtrl"}</pre>
   * <pre>controller: function($scope, MyService) {
   *     $scope.data = MyService.getData(); }</pre>
   *
   * @param {function=} stateConfig.controllerProvider
   * <a id='controllerProvider'></a>
   *
   * Injectable provider function that returns the actual controller or string.
   * <pre>controllerProvider:
   *   function(MyResolveData) {
   *     if (MyResolveData.foo)
   *       return "FooCtrl"
   *     else if (MyResolveData.bar)
   *       return "BarCtrl";
   *     else return function($scope) {
   *       $scope.baz = "Qux";
   *     }
   *   }</pre>
   *
   * @param {string=} stateConfig.controllerAs
   * <a id='controllerAs'></a>
   * 
   * A controller alias name. If present the controller will be
   *   published to scope under the controllerAs name.
   * <pre>controllerAs: "myCtrl"</pre>
   *
   * @param {string|object=} stateConfig.parent
   * <a id='parent'></a>
   * Optionally specifies the parent state of this state.
   *
   * <pre>parent: 'parentState'</pre>
   * <pre>parent: parentState // JS variable</pre>
   *
   * @param {object=} stateConfig.resolve
   * <a id='resolve'></a>
   *
   * An optional map&lt;string, function&gt; of dependencies which
   *   should be injected into the controller. If any of these dependencies are promises, 
   *   the router will wait for them all to be resolved before the controller is instantiated.
   *   If all the promises are resolved successfully, the $stateChangeSuccess event is fired
   *   and the values of the resolved promises are injected into any controllers that reference them.
   *   If any  of the promises are rejected the $stateChangeError event is fired.
   *
   *   The map object is:
   *   
   *   - key - {string}: name of dependency to be injected into controller
   *   - factory - {string|function}: If string then it is alias for service. Otherwise if function, 
   *     it is injected and return value it treated as dependency. If result is a promise, it is 
   *     resolved before its value is injected into controller.
   *
   * <pre>resolve: {
   *     myResolve1:
   *       function($http, $stateParams) {
   *         return $http.get("/api/foos/"+stateParams.fooID);
   *       }
   *     }</pre>
   *
   * @param {string=} stateConfig.url
   * <a id='url'></a>
   *
   *   A url fragment with optional parameters. When a state is navigated or
   *   transitioned to, the `$stateParams` service will be populated with any 
   *   parameters that were passed.
   *
   *   (See {@link ui.router.util.type:UrlMatcher UrlMatcher} `UrlMatcher`} for
   *   more details on acceptable patterns )
   *
   * examples:
   * <pre>url: "/home"
   * url: "/users/:userid"
   * url: "/books/{bookid:[a-zA-Z_-]}"
   * url: "/books/{categoryid:int}"
   * url: "/books/{publishername:string}/{categoryid:int}"
   * url: "/messages?before&after"
   * url: "/messages?{before:date}&{after:date}"
   * url: "/messages/:mailboxid?{before:date}&{after:date}"
   * </pre>
   *
   * @param {object=} stateConfig.views
   * <a id='views'></a>
   * an optional map&lt;string, object&gt; which defined multiple views, or targets views
   * manually/explicitly.
   *
   * Examples:
   *
   * Targets three named `ui-view`s in the parent state's template
   * <pre>views: {
   *     header: {
   *       controller: "headerCtrl",
   *       templateUrl: "header.html"
   *     }, body: {
   *       controller: "bodyCtrl",
   *       templateUrl: "body.html"
   *     }, footer: {
   *       controller: "footCtrl",
   *       templateUrl: "footer.html"
   *     }
   *   }</pre>
   *
   * Targets named `ui-view="header"` from grandparent state 'top''s template, and named `ui-view="body" from parent state's template.
   * <pre>views: {
   *     'header@top': {
   *       controller: "msgHeaderCtrl",
   *       templateUrl: "msgHeader.html"
   *     }, 'body': {
   *       controller: "messagesCtrl",
   *       templateUrl: "messages.html"
   *     }
   *   }</pre>
   *
   * @param {boolean=} [stateConfig.abstract=false]
   * <a id='abstract'></a>
   * An abstract state will never be directly activated,
   *   but can provide inherited properties to its common children states.
   * <pre>abstract: true</pre>
   *
   * @param {function=} stateConfig.onEnter
   * <a id='onEnter'></a>
   *
   * Callback function for when a state is entered. Good way
   *   to trigger an action or dispatch an event, such as opening a dialog.
   * If minifying your scripts, make sure to explictly annotate this function,
   * because it won't be automatically annotated by your build tools.
   *
   * <pre>onEnter: function(MyService, $stateParams) {
   *     MyService.foo($stateParams.myParam);
   * }</pre>
   *
   * @param {function=} stateConfig.onExit
   * <a id='onExit'></a>
   *
   * Callback function for when a state is exited. Good way to
   *   trigger an action or dispatch an event, such as opening a dialog.
   * If minifying your scripts, make sure to explictly annotate this function,
   * because it won't be automatically annotated by your build tools.
   *
   * <pre>onExit: function(MyService, $stateParams) {
   *     MyService.cleanup($stateParams.myParam);
   * }</pre>
   *
   * @param {boolean=} [stateConfig.reloadOnSearch=true]
   * <a id='reloadOnSearch'></a>
   *
   * If `false`, will not retrigger the same state
   *   just because a search/query parameter has changed (via $location.search() or $location.hash()). 
   *   Useful for when you'd like to modify $location.search() without triggering a reload.
   * <pre>reloadOnSearch: false</pre>
   *
   * @param {object=} stateConfig.data
   * <a id='data'></a>
   *
   * Arbitrary data object, useful for custom configuration.  The parent state's `data` is
   *   prototypally inherited.  In other words, adding a data property to a state adds it to
   *   the entire subtree via prototypal inheritance.
   *
   * <pre>data: {
   *     requiredRole: 'foo'
   * } </pre>
   *
   * @param {object=} stateConfig.params
   * <a id='params'></a>
   *
   * A map which optionally configures parameters declared in the `url`, or
   *   defines additional non-url parameters.  For each parameter being
   *   configured, add a configuration object keyed to the name of the parameter.
   *
   *   Each parameter configuration object may contain the following properties:
   *
   *   - ** value ** - {object|function=}: specifies the default value for this
   *     parameter.  This implicitly sets this parameter as optional.
   *
   *     When UI-Router routes to a state and no value is
   *     specified for this parameter in the URL or transition, the
   *     default value will be used instead.  If `value` is a function,
   *     it will be injected and invoked, and the return value used.
   *
   *     *Note*: `undefined` is treated as "no default value" while `null`
   *     is treated as "the default value is `null`".
   *
   *     *Shorthand*: If you only need to configure the default value of the
   *     parameter, you may use a shorthand syntax.   In the **`params`**
   *     map, instead mapping the param name to a full parameter configuration
   *     object, simply set map it to the default parameter value, e.g.:
   *
   * <pre>// define a parameter's default value
   * params: {
   *     param1: { value: "defaultValue" }
   * }
   * // shorthand default values
   * params: {
   *     param1: "defaultValue",
   *     param2: "param2Default"
   * }</pre>
   *
   *   - ** array ** - {boolean=}: *(default: false)* If true, the param value will be
   *     treated as an array of values.  If you specified a Type, the value will be
   *     treated as an array of the specified Type.  Note: query parameter values
   *     default to a special `"auto"` mode.
   *
   *     For query parameters in `"auto"` mode, if multiple  values for a single parameter
   *     are present in the URL (e.g.: `/foo?bar=1&bar=2&bar=3`) then the values
   *     are mapped to an array (e.g.: `{ foo: [ '1', '2', '3' ] }`).  However, if
   *     only one value is present (e.g.: `/foo?bar=1`) then the value is treated as single
   *     value (e.g.: `{ foo: '1' }`).
   *
   * <pre>params: {
   *     param1: { array: true }
   * }</pre>
   *
   *   - ** squash ** - {bool|string=}: `squash` configures how a default parameter value is represented in the URL when
   *     the current parameter value is the same as the default value. If `squash` is not set, it uses the
   *     configured default squash policy.
   *     (See {@link ui.router.util.$urlMatcherFactory#methods_defaultSquashPolicy `defaultSquashPolicy()`})
   *
   *   There are three squash settings:
   *
   *     - false: The parameter's default value is not squashed.  It is encoded and included in the URL
   *     - true: The parameter's default value is omitted from the URL.  If the parameter is preceeded and followed
   *       by slashes in the state's `url` declaration, then one of those slashes are omitted.
   *       This can allow for cleaner looking URLs.
   *     - `"<arbitrary string>"`: The parameter's default value is replaced with an arbitrary placeholder of  your choice.
   *
   * <pre>params: {
   *     param1: {
   *       value: "defaultId",
   *       squash: true
   * } }
   * // squash "defaultValue" to "~"
   * params: {
   *     param1: {
   *       value: "defaultValue",
   *       squash: "~"
   * } }
   * </pre>
   *
   *
   * @example
   * <pre>
   * // Some state name examples
   *
   * // stateName can be a single top-level name (must be unique).
   * $stateProvider.state("home", {});
   *
   * // Or it can be a nested state name. This state is a child of the
   * // above "home" state.
   * $stateProvider.state("home.newest", {});
   *
   * // Nest states as deeply as needed.
   * $stateProvider.state("home.newest.abc.xyz.inception", {});
   *
   * // state() returns $stateProvider, so you can chain state declarations.
   * $stateProvider
   *   .state("home", {})
   *   .state("about", {})
   *   .state("contacts", {});
   * </pre>
   *
   */
this.state=state,/**
   * @ngdoc object
   * @name ui.router.state.$state
   *
   * @requires $rootScope
   * @requires $q
   * @requires ui.router.state.$view
   * @requires $injector
   * @requires ui.router.util.$resolve
   * @requires ui.router.state.$stateParams
   * @requires ui.router.router.$urlRouter
   *
   * @property {object} params A param object, e.g. {sectionId: section.id)}, that 
   * you'd like to test against the current active state.
   * @property {object} current A reference to the state's config object. However 
   * you passed it in. Useful for accessing custom data.
   * @property {object} transition Currently pending transition. A promise that'll 
   * resolve or reject.
   *
   * @description
   * `$state` service is responsible for representing states as well as transitioning
   * between them. It also provides interfaces to ask for current state or even states
   * you're coming from.
   */
this.$get=$get,$get.$inject=["$rootScope","$q","$view","$injector","$resolve","$stateParams","$urlRouter","$location","$urlMatcherFactory"]}function $ViewProvider(){function $get($rootScope,$templateFactory){return{
// $view.load('full.viewName', { template: ..., controller: ..., resolve: ..., async: false, params: ... })
/**
       * @ngdoc function
       * @name ui.router.state.$view#load
       * @methodOf ui.router.state.$view
       *
       * @description
       *
       * @param {string} name name
       * @param {object} options option object.
       */
load:function(name,options){var result,defaults={template:null,controller:null,view:null,locals:null,notify:!0,async:!0,params:{}};/**
         * @ngdoc event
         * @name ui.router.state.$state#$viewContentLoading
         * @eventOf ui.router.state.$view
         * @eventType broadcast on root scope
         * @description
         *
         * Fired once the view **begins loading**, *before* the DOM is rendered.
         *
         * @param {Object} event Event object.
         * @param {Object} viewConfig The view config properties (template, controller, etc).
         *
         * @example
         *
         * <pre>
         * $scope.$on('$viewContentLoading',
         * function(event, viewConfig){
         *     // Access to all the view config properties.
         *     // and one special property 'targetView'
         *     // viewConfig.targetView
         * });
         * </pre>
         */
return options=extend(defaults,options),options.view&&(result=$templateFactory.fromConfig(options.view,options.params,options.locals)),result&&options.notify&&$rootScope.$broadcast("$viewContentLoading",options),result}}}this.$get=$get,/**
   * @ngdoc object
   * @name ui.router.state.$view
   *
   * @requires ui.router.util.$templateFactory
   * @requires $rootScope
   *
   * @description
   *
   */
$get.$inject=["$rootScope","$templateFactory"]}/**
 * @ngdoc object
 * @name ui.router.state.$uiViewScrollProvider
 *
 * @description
 * Provider that returns the {@link ui.router.state.$uiViewScroll} service function.
 */
function $ViewScrollProvider(){var useAnchorScroll=!1;/**
   * @ngdoc function
   * @name ui.router.state.$uiViewScrollProvider#useAnchorScroll
   * @methodOf ui.router.state.$uiViewScrollProvider
   *
   * @description
   * Reverts back to using the core [`$anchorScroll`](http://docs.angularjs.org/api/ng.$anchorScroll) service for
   * scrolling based on the url anchor.
   */
this.useAnchorScroll=function(){useAnchorScroll=!0},/**
   * @ngdoc object
   * @name ui.router.state.$uiViewScroll
   *
   * @requires $anchorScroll
   * @requires $timeout
   *
   * @description
   * When called with a jqLite element, it scrolls the element into view (after a
   * `$timeout` so the DOM has time to refresh).
   *
   * If you prefer to rely on `$anchorScroll` to scroll the view to the anchor,
   * this can be enabled by calling {@link ui.router.state.$uiViewScrollProvider#methods_useAnchorScroll `$uiViewScrollProvider.useAnchorScroll()`}.
   */
this.$get=["$anchorScroll","$timeout",function($anchorScroll,$timeout){return useAnchorScroll?$anchorScroll:function($element){return $timeout(function(){$element[0].scrollIntoView()},0,!1)}}]}function $ViewDirective($state,$injector,$uiViewScroll,$interpolate){function getService(){return $injector.has?function(service){return $injector.has(service)?$injector.get(service):null}:function(service){try{return $injector.get(service)}catch(e){return null}}}
// Returns a set of DOM manipulation functions based on which Angular version
// it should use
function getRenderer(attrs,scope){var statics=function(){return{enter:function(element,target,cb){target.after(element),cb()},leave:function(element,cb){element.remove(),cb()}}};if($animate)return{enter:function(element,target,cb){var promise=$animate.enter(element,null,target,cb);promise&&promise.then&&promise.then(cb)},leave:function(element,cb){var promise=$animate.leave(element,cb);promise&&promise.then&&promise.then(cb)}};if($animator){var animate=$animator&&$animator(scope,attrs);return{enter:function(element,target,cb){animate.enter(element,null,target),cb()},leave:function(element,cb){animate.leave(element),cb()}}}return statics()}var service=getService(),$animator=service("$animator"),$animate=service("$animate"),directive={restrict:"ECA",terminal:!0,priority:400,transclude:"element",compile:function(tElement,tAttrs,$transclude){return function(scope,$element,attrs){function cleanupLastView(){previousEl&&(previousEl.remove(),previousEl=null),currentScope&&(currentScope.$destroy(),currentScope=null),currentEl&&(renderer.leave(currentEl,function(){previousEl=null}),previousEl=currentEl,currentEl=null)}function updateView(firstTime){var newScope,name=getUiViewName(scope,attrs,$element,$interpolate),previousLocals=name&&$state.$current&&$state.$current.locals[name];if(firstTime||previousLocals!==latestLocals){// nothing to do
newScope=scope.$new(),latestLocals=$state.$current.locals[name];var clone=$transclude(newScope,function(clone){renderer.enter(clone,$element,function(){currentScope&&currentScope.$emit("$viewContentAnimationEnded"),(angular.isDefined(autoScrollExp)&&!autoScrollExp||scope.$eval(autoScrollExp))&&$uiViewScroll(clone)}),cleanupLastView()});currentEl=clone,currentScope=newScope,/**
           * @ngdoc event
           * @name ui.router.state.directive:ui-view#$viewContentLoaded
           * @eventOf ui.router.state.directive:ui-view
           * @eventType emits on ui-view directive scope
           * @description           *
           * Fired once the view is **loaded**, *after* the DOM is rendered.
           *
           * @param {Object} event Event object.
           */
currentScope.$emit("$viewContentLoaded"),currentScope.$eval(onloadExp)}}var previousEl,currentEl,currentScope,latestLocals,onloadExp=attrs.onload||"",autoScrollExp=attrs.autoscroll,renderer=getRenderer(attrs,scope);scope.$on("$stateChangeSuccess",function(){updateView(!1)}),scope.$on("$viewContentLoading",function(){updateView(!1)}),updateView(!0)}}};return directive}function $ViewDirectiveFill($compile,$controller,$state,$interpolate){return{restrict:"ECA",priority:-400,compile:function(tElement){var initial=tElement.html();return function(scope,$element,attrs){var current=$state.$current,name=getUiViewName(scope,attrs,$element,$interpolate),locals=current&&current.locals[name];if(locals){$element.data("$uiView",{name:name,state:locals.$$state}),$element.html(locals.$template?locals.$template:initial);var link=$compile($element.contents());if(locals.$$controller){locals.$scope=scope,locals.$element=$element;var controller=$controller(locals.$$controller,locals);locals.$$controllerAs&&(scope[locals.$$controllerAs]=controller),$element.data("$ngControllerController",controller),$element.children().data("$ngControllerController",controller)}link(scope)}}}}}/**
 * Shared ui-view code for both directives:
 * Given scope, element, and its attributes, return the view's name
 */
function getUiViewName(scope,attrs,element,$interpolate){var name=$interpolate(attrs.uiView||attrs.name||"")(scope),inherited=element.inheritedData("$uiView");return name.indexOf("@")>=0?name:name+"@"+(inherited?inherited.state.name:"")}function parseStateRef(ref,current){var parsed,preparsed=ref.match(/^\s*({[^}]*})\s*$/);if(preparsed&&(ref=current+"("+preparsed[1]+")"),parsed=ref.replace(/\n/g," ").match(/^([^(]+?)\s*(\((.*)\))?$/),!parsed||4!==parsed.length)throw new Error("Invalid state ref '"+ref+"'");return{state:parsed[1],paramExpr:parsed[3]||null}}function stateContext(el){var stateData=el.parent().inheritedData("$uiView");if(stateData&&stateData.state&&stateData.state.name)return stateData.state}function $StateRefDirective($state,$timeout){var allowedOptions=["location","inherit","reload","absolute"];return{restrict:"A",require:["?^uiSrefActive","?^uiSrefActiveEq"],link:function(scope,element,attrs,uiSrefActive){var ref=parseStateRef(attrs.uiSref,$state.current.name),params=null,base=stateContext(element)||$state.$current,hrefKind="[object SVGAnimatedString]"===Object.prototype.toString.call(element.prop("href"))?"xlink:href":"href",newHref=null,isAnchor="A"===element.prop("tagName").toUpperCase(),isForm="FORM"===element[0].nodeName,attr=isForm?"action":hrefKind,nav=!0,options={relative:base,inherit:!0},optionsOverride=scope.$eval(attrs.uiSrefOpts)||{};angular.forEach(allowedOptions,function(option){option in optionsOverride&&(options[option]=optionsOverride[option])});var update=function(newVal){if(newVal&&(params=angular.copy(newVal)),nav){newHref=$state.href(ref.state,params,options);var activeDirective=uiSrefActive[1]||uiSrefActive[0];return activeDirective&&activeDirective.$$addStateInfo(ref.state,params),null===newHref?(nav=!1,!1):void attrs.$set(attr,newHref)}};ref.paramExpr&&(scope.$watch(ref.paramExpr,function(newVal,oldVal){newVal!==params&&update(newVal)},!0),params=angular.copy(scope.$eval(ref.paramExpr))),update(),isForm||element.bind("click",function(e){var button=e.which||e.button;if(!(button>1||e.ctrlKey||e.metaKey||e.shiftKey||element.attr("target"))){
// HACK: This is to allow ng-clicks to be processed before the transition is initiated:
var transition=$timeout(function(){$state.go(ref.state,params,options)});e.preventDefault();
// if the state has no URL, ignore one preventDefault from the <a> directive.
var ignorePreventDefaultCount=isAnchor&&!newHref?1:0;e.preventDefault=function(){ignorePreventDefaultCount--<=0&&$timeout.cancel(transition)}}})}}}function $StateRefActiveDirective($state,$stateParams,$interpolate){return{restrict:"A",controller:["$scope","$element","$attrs",function($scope,$element,$attrs){
// Update route state
function update(){anyMatch()?$element.addClass(activeClass):$element.removeClass(activeClass)}function anyMatch(){for(var i=0;i<states.length;i++)if(isMatch(states[i].state,states[i].params))return!0;return!1}function isMatch(state,params){return"undefined"!=typeof $attrs.uiSrefActiveEq?$state.is(state.name,params):$state.includes(state.name,params)}var activeClass,states=[];
// There probably isn't much point in $observing this
// uiSrefActive and uiSrefActiveEq share the same directive object with some
// slight difference in logic routing
activeClass=$interpolate($attrs.uiSrefActiveEq||$attrs.uiSrefActive||"",!1)($scope),
// Allow uiSref to communicate with uiSrefActive[Equals]
this.$$addStateInfo=function(newState,newParams){var state=$state.get(newState,stateContext($element));states.push({state:state||{name:newState},params:newParams}),update()},$scope.$on("$stateChangeSuccess",update)}]}}function $IsStateFilter($state){var isFilter=function(state){return $state.is(state)};return isFilter.$stateful=!0,isFilter}function $IncludedByStateFilter($state){var includesFilter=function(state){return $state.includes(state)};return includesFilter.$stateful=!0,includesFilter}var isDefined=angular.isDefined,isFunction=angular.isFunction,isString=angular.isString,isObject=angular.isObject,isArray=angular.isArray,forEach=angular.forEach,extend=angular.extend,copy=angular.copy;/**
 * @ngdoc overview
 * @name ui.router.util
 *
 * @description
 * # ui.router.util sub-module
 *
 * This module is a dependency of other sub-modules. Do not include this module as a dependency
 * in your angular app (use {@link ui.router} module instead).
 *
 */
angular.module("ui.router.util",["ng"]),/**
 * @ngdoc overview
 * @name ui.router.router
 * 
 * @requires ui.router.util
 *
 * @description
 * # ui.router.router sub-module
 *
 * This module is a dependency of other sub-modules. Do not include this module as a dependency
 * in your angular app (use {@link ui.router} module instead).
 */
angular.module("ui.router.router",["ui.router.util"]),/**
 * @ngdoc overview
 * @name ui.router.state
 * 
 * @requires ui.router.router
 * @requires ui.router.util
 *
 * @description
 * # ui.router.state sub-module
 *
 * This module is a dependency of the main ui.router module. Do not include this module as a dependency
 * in your angular app (use {@link ui.router} module instead).
 * 
 */
angular.module("ui.router.state",["ui.router.router","ui.router.util"]),/**
 * @ngdoc overview
 * @name ui.router
 *
 * @requires ui.router.state
 *
 * @description
 * # ui.router
 * 
 * ## The main module for ui.router 
 * There are several sub-modules included with the ui.router module, however only this module is needed
 * as a dependency within your angular app. The other modules are for organization purposes. 
 *
 * The modules are:
 * * ui.router - the main "umbrella" module
 * * ui.router.router - 
 * 
 * *You'll need to include **only** this module as the dependency within your angular app.*
 * 
 * <pre>
 * <!doctype html>
 * <html ng-app="myApp">
 * <head>
 *   <script src="js/angular.js"></script>
 *   <!-- Include the ui-router script -->
 *   <script src="js/angular-ui-router.min.js"></script>
 *   <script>
 *     // ...and add 'ui.router' as a dependency
 *     var myApp = angular.module('myApp', ['ui.router']);
 *   </script>
 * </head>
 * <body>
 * </body>
 * </html>
 * </pre>
 */
angular.module("ui.router",["ui.router.state"]),angular.module("ui.router.compat",["ui.router"]),/**
 * @ngdoc object
 * @name ui.router.util.$resolve
 *
 * @requires $q
 * @requires $injector
 *
 * @description
 * Manages resolution of (acyclic) graphs of promises.
 */
$Resolve.$inject=["$q","$injector"],angular.module("ui.router.util").service("$resolve",$Resolve),/**
 * @ngdoc object
 * @name ui.router.util.$templateFactory
 *
 * @requires $http
 * @requires $templateCache
 * @requires $injector
 *
 * @description
 * Service. Manages loading of templates.
 */
$TemplateFactory.$inject=["$http","$templateCache","$injector"],angular.module("ui.router.util").service("$templateFactory",$TemplateFactory);var $$UMFP;/**
 * @ngdoc function
 * @name ui.router.util.type:UrlMatcher#concat
 * @methodOf ui.router.util.type:UrlMatcher
 *
 * @description
 * Returns a new matcher for a pattern constructed by appending the path part and adding the
 * search parameters of the specified pattern to this pattern. The current pattern is not
 * modified. This can be understood as creating a pattern for URLs that are relative to (or
 * suffixes of) the current pattern.
 *
 * @example
 * The following two matchers are equivalent:
 * <pre>
 * new UrlMatcher('/user/{id}?q').concat('/details?date');
 * new UrlMatcher('/user/{id}/details?q&date');
 * </pre>
 *
 * @param {string} pattern  The pattern to append.
 * @param {Object} config  An object hash of the configuration for the matcher.
 * @returns {UrlMatcher}  A matcher for the concatenated pattern.
 */
UrlMatcher.prototype.concat=function(pattern,config){
// Because order of search parameters is irrelevant, we can add our own search
// parameters to the end of the new pattern. Parse the new pattern by itself
// and then join the bits together, but it's much easier to do this on a string level.
var defaultConfig={caseInsensitive:$$UMFP.caseInsensitive(),strict:$$UMFP.strictMode(),squash:$$UMFP.defaultSquashPolicy()};return new UrlMatcher(this.sourcePath+pattern+this.sourceSearch,extend(defaultConfig,config),this)},UrlMatcher.prototype.toString=function(){return this.source},/**
 * @ngdoc function
 * @name ui.router.util.type:UrlMatcher#exec
 * @methodOf ui.router.util.type:UrlMatcher
 *
 * @description
 * Tests the specified path against this matcher, and returns an object containing the captured
 * parameter values, or null if the path does not match. The returned object contains the values
 * of any search parameters that are mentioned in the pattern, but their value may be null if
 * they are not present in `searchParams`. This means that search parameters are always treated
 * as optional.
 *
 * @example
 * <pre>
 * new UrlMatcher('/user/{id}?q&r').exec('/user/bob', {
 *   x: '1', q: 'hello'
 * });
 * // returns { id: 'bob', q: 'hello', r: null }
 * </pre>
 *
 * @param {string} path  The URL path to match, e.g. `$location.path()`.
 * @param {Object} searchParams  URL search parameters, e.g. `$location.search()`.
 * @returns {Object}  The captured parameter values.
 */
UrlMatcher.prototype.exec=function(path,searchParams){function decodePathArray(string){function reverseString(str){return str.split("").reverse().join("")}function unquoteDashes(str){return str.replace(/\\-/g,"-")}var split=reverseString(string).split(/-(?!\\)/),allReversed=map(split,reverseString);return map(allReversed,unquoteDashes).reverse()}var m=this.regexp.exec(path);if(!m)return null;searchParams=searchParams||{};var i,j,paramName,paramNames=this.parameters(),nTotal=paramNames.length,nPath=this.segments.length-1,values={};if(nPath!==m.length-1)throw new Error("Unbalanced capture group in route '"+this.source+"'");for(i=0;i<nPath;i++){paramName=paramNames[i];var param=this.params[paramName],paramVal=m[i+1];
// if the param value matches a pre-replace pair, replace the value before decoding.
for(j=0;j<param.replace;j++)param.replace[j].from===paramVal&&(paramVal=param.replace[j].to);paramVal&&param.array===!0&&(paramVal=decodePathArray(paramVal)),values[paramName]=param.value(paramVal)}for(;i<nTotal;i++)paramName=paramNames[i],values[paramName]=this.params[paramName].value(searchParams[paramName]);return values},/**
 * @ngdoc function
 * @name ui.router.util.type:UrlMatcher#parameters
 * @methodOf ui.router.util.type:UrlMatcher
 *
 * @description
 * Returns the names of all path and search parameters of this pattern in an unspecified order.
 *
 * @returns {Array.<string>}  An array of parameter names. Must be treated as read-only. If the
 *    pattern has no parameters, an empty array is returned.
 */
UrlMatcher.prototype.parameters=function(param){return isDefined(param)?this.params[param]||null:this.$$paramNames},/**
 * @ngdoc function
 * @name ui.router.util.type:UrlMatcher#validate
 * @methodOf ui.router.util.type:UrlMatcher
 *
 * @description
 * Checks an object hash of parameters to validate their correctness according to the parameter
 * types of this `UrlMatcher`.
 *
 * @param {Object} params The object hash of parameters to validate.
 * @returns {boolean} Returns `true` if `params` validates, otherwise `false`.
 */
UrlMatcher.prototype.validates=function(params){return this.params.$$validates(params)},/**
 * @ngdoc function
 * @name ui.router.util.type:UrlMatcher#format
 * @methodOf ui.router.util.type:UrlMatcher
 *
 * @description
 * Creates a URL that matches this pattern by substituting the specified values
 * for the path and search parameters. Null values for path parameters are
 * treated as empty strings.
 *
 * @example
 * <pre>
 * new UrlMatcher('/user/{id}?q').format({ id:'bob', q:'yes' });
 * // returns '/user/bob?q=yes'
 * </pre>
 *
 * @param {Object} values  the values to substitute for the parameters in this pattern.
 * @returns {string}  the formatted URL (path and optionally search part).
 */
UrlMatcher.prototype.format=function(values){function encodeDashes(str){// Replace dashes with encoded "\-"
return encodeURIComponent(str).replace(/-/g,function(c){return"%5C%"+c.charCodeAt(0).toString(16).toUpperCase()})}values=values||{};var segments=this.segments,params=this.parameters(),paramset=this.params;if(!this.validates(values))return null;var i,search=!1,nPath=segments.length-1,nTotal=params.length,result=segments[0];for(i=0;i<nTotal;i++){var isPathParam=i<nPath,name=params[i],param=paramset[name],value=param.value(values[name]),isDefaultValue=param.isOptional&&param.type.equals(param.value(),value),squash=!!isDefaultValue&&param.squash,encoded=param.type.encode(value);if(isPathParam){var nextSegment=segments[i+1];if(squash===!1)null!=encoded&&(result+=isArray(encoded)?map(encoded,encodeDashes).join("-"):encodeURIComponent(encoded)),result+=nextSegment;else if(squash===!0){var capture=result.match(/\/$/)?/\/?(.*)/:/(.*)/;result+=nextSegment.match(capture)[1]}else isString(squash)&&(result+=squash+nextSegment)}else{if(null==encoded||isDefaultValue&&squash!==!1)continue;isArray(encoded)||(encoded=[encoded]),encoded=map(encoded,encodeURIComponent).join("&"+name+"="),result+=(search?"&":"?")+(name+"="+encoded),search=!0}}return result},/**
 * @ngdoc function
 * @name ui.router.util.type:Type#is
 * @methodOf ui.router.util.type:Type
 *
 * @description
 * Detects whether a value is of a particular type. Accepts a native (decoded) value
 * and determines whether it matches the current `Type` object.
 *
 * @param {*} val  The value to check.
 * @param {string} key  Optional. If the type check is happening in the context of a specific
 *        {@link ui.router.util.type:UrlMatcher `UrlMatcher`} object, this is the name of the
 *        parameter in which `val` is stored. Can be used for meta-programming of `Type` objects.
 * @returns {Boolean}  Returns `true` if the value matches the type, otherwise `false`.
 */
Type.prototype.is=function(val,key){return!0},/**
 * @ngdoc function
 * @name ui.router.util.type:Type#encode
 * @methodOf ui.router.util.type:Type
 *
 * @description
 * Encodes a custom/native type value to a string that can be embedded in a URL. Note that the
 * return value does *not* need to be URL-safe (i.e. passed through `encodeURIComponent()`), it
 * only needs to be a representation of `val` that has been coerced to a string.
 *
 * @param {*} val  The value to encode.
 * @param {string} key  The name of the parameter in which `val` is stored. Can be used for
 *        meta-programming of `Type` objects.
 * @returns {string}  Returns a string representation of `val` that can be encoded in a URL.
 */
Type.prototype.encode=function(val,key){return val},/**
 * @ngdoc function
 * @name ui.router.util.type:Type#decode
 * @methodOf ui.router.util.type:Type
 *
 * @description
 * Converts a parameter value (from URL string or transition param) to a custom/native value.
 *
 * @param {string} val  The URL parameter value to decode.
 * @param {string} key  The name of the parameter in which `val` is stored. Can be used for
 *        meta-programming of `Type` objects.
 * @returns {*}  Returns a custom representation of the URL parameter value.
 */
Type.prototype.decode=function(val,key){return val},/**
 * @ngdoc function
 * @name ui.router.util.type:Type#equals
 * @methodOf ui.router.util.type:Type
 *
 * @description
 * Determines whether two decoded values are equivalent.
 *
 * @param {*} a  A value to compare against.
 * @param {*} b  A value to compare against.
 * @returns {Boolean}  Returns `true` if the values are equivalent/equal, otherwise `false`.
 */
Type.prototype.equals=function(a,b){return a==b},Type.prototype.$subPattern=function(){var sub=this.pattern.toString();return sub.substr(1,sub.length-2)},Type.prototype.pattern=/.*/,Type.prototype.toString=function(){return"{Type:"+this.name+"}"},/** Given an encoded string, or a decoded object, returns a decoded object */
Type.prototype.$normalize=function(val){return this.is(val)?val:this.decode(val)},/*
 * Wraps an existing custom Type as an array of Type, depending on 'mode'.
 * e.g.:
 * - urlmatcher pattern "/path?{queryParam[]:int}"
 * - url: "/path?queryParam=1&queryParam=2
 * - $stateParams.queryParam will be [1, 2]
 * if `mode` is "auto", then
 * - url: "/path?queryParam=1 will create $stateParams.queryParam: 1
 * - url: "/path?queryParam=1&queryParam=2 will create $stateParams.queryParam: [1, 2]
 */
Type.prototype.$asArray=function(mode,isSearch){function ArrayType(type,mode){function bindTo(type,callbackName){return function(){return type[callbackName].apply(type,arguments)}}
// Wrap non-array value as array
function arrayWrap(val){return isArray(val)?val:isDefined(val)?[val]:[]}
// Unwrap array value for "auto" mode. Return undefined for empty array.
function arrayUnwrap(val){switch(val.length){case 0:return undefined;case 1:return"auto"===mode?val[0]:val;default:return val}}function falsey(val){return!val}
// Wraps type (.is/.encode/.decode) functions to operate on each value of an array
function arrayHandler(callback,allTruthyMode){return function(val){val=arrayWrap(val);var result=map(val,callback);return allTruthyMode===!0?0===filter(result,falsey).length:arrayUnwrap(result)}}
// Wraps type (.equals) functions to operate on each value of an array
function arrayEqualsHandler(callback){return function(val1,val2){var left=arrayWrap(val1),right=arrayWrap(val2);if(left.length!==right.length)return!1;for(var i=0;i<left.length;i++)if(!callback(left[i],right[i]))return!1;return!0}}this.encode=arrayHandler(bindTo(type,"encode")),this.decode=arrayHandler(bindTo(type,"decode")),this.is=arrayHandler(bindTo(type,"is"),!0),this.equals=arrayEqualsHandler(bindTo(type,"equals")),this.pattern=type.pattern,this.$normalize=arrayHandler(bindTo(type,"$normalize")),this.name=type.name,this.$arrayMode=mode}if(!mode)return this;if("auto"===mode&&!isSearch)throw new Error("'auto' array mode is for query parameters only");return new ArrayType(this,mode)},
// Register as a provider so it's available to other providers
angular.module("ui.router.util").provider("$urlMatcherFactory",$UrlMatcherFactory),angular.module("ui.router.util").run(["$urlMatcherFactory",function($urlMatcherFactory){}]),/**
 * @ngdoc object
 * @name ui.router.router.$urlRouterProvider
 *
 * @requires ui.router.util.$urlMatcherFactoryProvider
 * @requires $locationProvider
 *
 * @description
 * `$urlRouterProvider` has the responsibility of watching `$location`. 
 * When `$location` changes it runs through a list of rules one by one until a 
 * match is found. `$urlRouterProvider` is used behind the scenes anytime you specify 
 * a url in a state configuration. All urls are compiled into a UrlMatcher object.
 *
 * There are several methods on `$urlRouterProvider` that make it useful to use directly
 * in your module config.
 */
$UrlRouterProvider.$inject=["$locationProvider","$urlMatcherFactoryProvider"],angular.module("ui.router.router").provider("$urlRouter",$UrlRouterProvider),/**
 * @ngdoc object
 * @name ui.router.state.$stateProvider
 *
 * @requires ui.router.router.$urlRouterProvider
 * @requires ui.router.util.$urlMatcherFactoryProvider
 *
 * @description
 * The new `$stateProvider` works similar to Angular's v1 router, but it focuses purely
 * on state.
 *
 * A state corresponds to a "place" in the application in terms of the overall UI and
 * navigation. A state describes (via the controller / template / view properties) what
 * the UI looks like and does at that place.
 *
 * States often have things in common, and the primary way of factoring out these
 * commonalities in this model is via the state hierarchy, i.e. parent/child states aka
 * nested states.
 *
 * The `$stateProvider` provides interfaces to declare these states for your app.
 */
$StateProvider.$inject=["$urlRouterProvider","$urlMatcherFactoryProvider"],angular.module("ui.router.state").value("$stateParams",{}).provider("$state",$StateProvider),$ViewProvider.$inject=[],angular.module("ui.router.state").provider("$view",$ViewProvider),angular.module("ui.router.state").provider("$uiViewScroll",$ViewScrollProvider),/**
 * @ngdoc directive
 * @name ui.router.state.directive:ui-view
 *
 * @requires ui.router.state.$state
 * @requires $compile
 * @requires $controller
 * @requires $injector
 * @requires ui.router.state.$uiViewScroll
 * @requires $document
 *
 * @restrict ECA
 *
 * @description
 * The ui-view directive tells $state where to place your templates.
 *
 * @param {string=} name A view name. The name should be unique amongst the other views in the
 * same state. You can have views of the same name that live in different states.
 *
 * @param {string=} autoscroll It allows you to set the scroll behavior of the browser window
 * when a view is populated. By default, $anchorScroll is overridden by ui-router's custom scroll
 * service, {@link ui.router.state.$uiViewScroll}. This custom service let's you
 * scroll ui-view elements into view when they are populated during a state activation.
 *
 * *Note: To revert back to old [`$anchorScroll`](http://docs.angularjs.org/api/ng.$anchorScroll)
 * functionality, call `$uiViewScrollProvider.useAnchorScroll()`.*
 *
 * @param {string=} onload Expression to evaluate whenever the view updates.
 * 
 * @example
 * A view can be unnamed or named. 
 * <pre>
 * <!-- Unnamed -->
 * <div ui-view></div> 
 * 
 * <!-- Named -->
 * <div ui-view="viewName"></div>
 * </pre>
 *
 * You can only have one unnamed view within any template (or root html). If you are only using a 
 * single view and it is unnamed then you can populate it like so:
 * <pre>
 * <div ui-view></div> 
 * $stateProvider.state("home", {
 *   template: "<h1>HELLO!</h1>"
 * })
 * </pre>
 * 
 * The above is a convenient shortcut equivalent to specifying your view explicitly with the {@link ui.router.state.$stateProvider#views `views`}
 * config property, by name, in this case an empty name:
 * <pre>
 * $stateProvider.state("home", {
 *   views: {
 *     "": {
 *       template: "<h1>HELLO!</h1>"
 *     }
 *   }    
 * })
 * </pre>
 * 
 * But typically you'll only use the views property if you name your view or have more than one view 
 * in the same template. There's not really a compelling reason to name a view if its the only one, 
 * but you could if you wanted, like so:
 * <pre>
 * <div ui-view="main"></div>
 * </pre> 
 * <pre>
 * $stateProvider.state("home", {
 *   views: {
 *     "main": {
 *       template: "<h1>HELLO!</h1>"
 *     }
 *   }    
 * })
 * </pre>
 * 
 * Really though, you'll use views to set up multiple views:
 * <pre>
 * <div ui-view></div>
 * <div ui-view="chart"></div> 
 * <div ui-view="data"></div> 
 * </pre>
 * 
 * <pre>
 * $stateProvider.state("home", {
 *   views: {
 *     "": {
 *       template: "<h1>HELLO!</h1>"
 *     },
 *     "chart": {
 *       template: "<chart_thing/>"
 *     },
 *     "data": {
 *       template: "<data_thing/>"
 *     }
 *   }    
 * })
 * </pre>
 *
 * Examples for `autoscroll`:
 *
 * <pre>
 * <!-- If autoscroll present with no expression,
 *      then scroll ui-view into view -->
 * <ui-view autoscroll/>
 *
 * <!-- If autoscroll present with valid expression,
 *      then scroll ui-view into view if expression evaluates to true -->
 * <ui-view autoscroll='true'/>
 * <ui-view autoscroll='false'/>
 * <ui-view autoscroll='scopeVariable'/>
 * </pre>
 */
$ViewDirective.$inject=["$state","$injector","$uiViewScroll","$interpolate"],$ViewDirectiveFill.$inject=["$compile","$controller","$state","$interpolate"],angular.module("ui.router.state").directive("uiView",$ViewDirective),angular.module("ui.router.state").directive("uiView",$ViewDirectiveFill),/**
 * @ngdoc directive
 * @name ui.router.state.directive:ui-sref
 *
 * @requires ui.router.state.$state
 * @requires $timeout
 *
 * @restrict A
 *
 * @description
 * A directive that binds a link (`<a>` tag) to a state. If the state has an associated 
 * URL, the directive will automatically generate & update the `href` attribute via 
 * the {@link ui.router.state.$state#methods_href $state.href()} method. Clicking 
 * the link will trigger a state transition with optional parameters. 
 *
 * Also middle-clicking, right-clicking, and ctrl-clicking on the link will be 
 * handled natively by the browser.
 *
 * You can also use relative state paths within ui-sref, just like the relative 
 * paths passed to `$state.go()`. You just need to be aware that the path is relative
 * to the state that the link lives in, in other words the state that loaded the 
 * template containing the link.
 *
 * You can specify options to pass to {@link ui.router.state.$state#go $state.go()}
 * using the `ui-sref-opts` attribute. Options are restricted to `location`, `inherit`,
 * and `reload`.
 *
 * @example
 * Here's an example of how you'd use ui-sref and how it would compile. If you have the 
 * following template:
 * <pre>
 * <a ui-sref="home">Home</a> | <a ui-sref="about">About</a> | <a ui-sref="{page: 2}">Next page</a>
 * 
 * <ul>
 *     <li ng-repeat="contact in contacts">
 *         <a ui-sref="contacts.detail({ id: contact.id })">{{ contact.name }}</a>
 *     </li>
 * </ul>
 * </pre>
 * 
 * Then the compiled html would be (assuming Html5Mode is off and current state is contacts):
 * <pre>
 * <a href="#/home" ui-sref="home">Home</a> | <a href="#/about" ui-sref="about">About</a> | <a href="#/contacts?page=2" ui-sref="{page: 2}">Next page</a>
 * 
 * <ul>
 *     <li ng-repeat="contact in contacts">
 *         <a href="#/contacts/1" ui-sref="contacts.detail({ id: contact.id })">Joe</a>
 *     </li>
 *     <li ng-repeat="contact in contacts">
 *         <a href="#/contacts/2" ui-sref="contacts.detail({ id: contact.id })">Alice</a>
 *     </li>
 *     <li ng-repeat="contact in contacts">
 *         <a href="#/contacts/3" ui-sref="contacts.detail({ id: contact.id })">Bob</a>
 *     </li>
 * </ul>
 *
 * <a ui-sref="home" ui-sref-opts="{reload: true}">Home</a>
 * </pre>
 *
 * @param {string} ui-sref 'stateName' can be any valid absolute or relative state
 * @param {Object} ui-sref-opts options to pass to {@link ui.router.state.$state#go $state.go()}
 */
$StateRefDirective.$inject=["$state","$timeout"],/**
 * @ngdoc directive
 * @name ui.router.state.directive:ui-sref-active
 *
 * @requires ui.router.state.$state
 * @requires ui.router.state.$stateParams
 * @requires $interpolate
 *
 * @restrict A
 *
 * @description
 * A directive working alongside ui-sref to add classes to an element when the
 * related ui-sref directive's state is active, and removing them when it is inactive.
 * The primary use-case is to simplify the special appearance of navigation menus
 * relying on `ui-sref`, by having the "active" state's menu button appear different,
 * distinguishing it from the inactive menu items.
 *
 * ui-sref-active can live on the same element as ui-sref or on a parent element. The first
 * ui-sref-active found at the same level or above the ui-sref will be used.
 *
 * Will activate when the ui-sref's target state or any child state is active. If you
 * need to activate only when the ui-sref target state is active and *not* any of
 * it's children, then you will use
 * {@link ui.router.state.directive:ui-sref-active-eq ui-sref-active-eq}
 *
 * @example
 * Given the following template:
 * <pre>
 * <ul>
 *   <li ui-sref-active="active" class="item">
 *     <a href ui-sref="app.user({user: 'bilbobaggins'})">@bilbobaggins</a>
 *   </li>
 * </ul>
 * </pre>
 *
 *
 * When the app state is "app.user" (or any children states), and contains the state parameter "user" with value "bilbobaggins",
 * the resulting HTML will appear as (note the 'active' class):
 * <pre>
 * <ul>
 *   <li ui-sref-active="active" class="item active">
 *     <a ui-sref="app.user({user: 'bilbobaggins'})" href="/users/bilbobaggins">@bilbobaggins</a>
 *   </li>
 * </ul>
 * </pre>
 *
 * The class name is interpolated **once** during the directives link time (any further changes to the
 * interpolated value are ignored).
 *
 * Multiple classes may be specified in a space-separated format:
 * <pre>
 * <ul>
 *   <li ui-sref-active='class1 class2 class3'>
 *     <a ui-sref="app.user">link</a>
 *   </li>
 * </ul>
 * </pre>
 */
/**
 * @ngdoc directive
 * @name ui.router.state.directive:ui-sref-active-eq
 *
 * @requires ui.router.state.$state
 * @requires ui.router.state.$stateParams
 * @requires $interpolate
 *
 * @restrict A
 *
 * @description
 * The same as {@link ui.router.state.directive:ui-sref-active ui-sref-active} but will only activate
 * when the exact target state used in the `ui-sref` is active; no child states.
 *
 */
$StateRefActiveDirective.$inject=["$state","$stateParams","$interpolate"],angular.module("ui.router.state").directive("uiSref",$StateRefDirective).directive("uiSrefActive",$StateRefActiveDirective).directive("uiSrefActiveEq",$StateRefActiveDirective),/**
 * @ngdoc filter
 * @name ui.router.state.filter:isState
 *
 * @requires ui.router.state.$state
 *
 * @description
 * Translates to {@link ui.router.state.$state#methods_is $state.is("stateName")}.
 */
$IsStateFilter.$inject=["$state"],/**
 * @ngdoc filter
 * @name ui.router.state.filter:includedByState
 *
 * @requires ui.router.state.$state
 *
 * @description
 * Translates to {@link ui.router.state.$state#methods_includes $state.includes('fullOrPartialStateName')}.
 */
$IncludedByStateFilter.$inject=["$state"],angular.module("ui.router.state").filter("isState",$IsStateFilter).filter("includedByState",$IncludedByStateFilter)}(window,window.angular);