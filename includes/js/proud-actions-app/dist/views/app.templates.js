angular.module('311AppParent').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/apps/311App/app-311-wrap.html',
    "<div class=\"app-wrap\"><div class=\"action-box\" id=\"wrapper-311\"><div class=\"row\"><div menu></div><div class=\"col-sm-12 content-contain\"><div class=\"body-content animation-wrap\"><main id=\"main-311\" class=\"main main-311 transform clearfix\" ui-view></main></div></div></div></div></div>"
  );


  $templateCache.put('views/apps/311App/faq/faq-child-answers.html',
    "<div ng-repeat=\"node in nodes\" class=\"panel\"><div class=\"panel-heading\"><h3 class=\"panel-title\"><a href=\"\" ui-sref=\"city.faq.child.answers({postSlug: node.slug})\" ng-bind-html=\"{{node.title.rendered}}\"></a></h3></div><div class=\"panel-body\" ng-show=\"activeSlug == node.slug\"><div ng-bind-html=\"node.content.rendered\"></div><div proudcity-get-involved></div><p ng-if=\"node.field_faq_link\"><a href=\"\" ng-href=\"{{node.field_faq_link.url}}\" class=\"btn btn-primary\">{{node.field_faq_link.title}} &raquo;</a></p></div></div><div main-toggle=\"slide-left\" main-toggle-force=\"add\" main-toggle-enter=\"true\"></div>"
  );


  $templateCache.put('views/apps/311App/faq/faq-child.html',
    "<ol class=\"breadcrumb clean\"><li><a href=\"\" main-toggle=\"slide-left\"><i class=\"fa fa-th\"></i><span class=\"sr-only\">Select category</span></a></li><li class=\"active\"><i class=\"fa fa-search\"></i> Find Answer</li></ol><div class=\"row\"><div class=\"col-sm-9\"><div class=\"panel-group\" ui-view></div></div><div class=\"col-sm-3\"><h5 ng-bind-html=\"activeParent.name\"></h5><ul class=\"nav nav-pills nav-stacked\"><li ng-repeat=\"item in terms | termsByParent:activeParent.id | orderBy: 'weight'\" ng-class=\"item.id == activeTerm.id ? 'active' : ''\"><a href=\"\" ui-sref=\"city.faq.child.answers({slug: item.slug, postSlug: 'list'})\">{{item.name}}</a></li></ul></div></div>"
  );


  $templateCache.put('views/apps/311App/faq/faq.html',
    "<div class=\"slide-left-2 column\"><ol class=\"breadcrumb clean\"><li class=\"active\"><i class=\"fa fa-th\"></i> Select answer type</li></ol><dl class=\"angular-311-2col\"><dd ng-repeat=\"item in terms | termsNoParent:$root.categories | orderBy: 'weight'\" class=\"col-sm-6 col-md-4\" ng-class=\"{'active' : item.slug == active.slug, 'expanded': $root.displayExpanded('answers')}\"><h4><a ng-click=\"open(item)\" href=\"\" ng-click=\"open(item)\"><i ng-if=\"item.description\" class=\"fa {{item.description}}\"></i><span ng-bind-html=\"item.name\"></span></a></h4><div class=\"animation-wrap\"><div class=\"slidedown\" ng-if=\"active.id == item.id || $root.displayExpanded('answers')\"><!-- @todo: ng-repeat=\"child in terms | filter: { parent: [{slug: item.slug}] } |  orderBy: 'weight'\" --><ul class=\"taxonomy-vocabulary-2col\"><li ng-repeat=\"child in terms | termsByParent:item.id\"><a main-toggle=\"slide-left\" href=\"\" ui-sref=\"city.faq.child.answers({slug: child.slug, nid: 'list'})\" ng-bind-html=\"child.name\"></a></li></ul></div></div></dd></dl></div><div class=\"animation-wrap slide-left-2\"><div class=\"quickfade\" ui-view></div></div>"
  );


  $templateCache.put('views/apps/311App/issues/issue-create-categories.html',
    "<div class=\"slide-left-2\"><ol class=\"breadcrumb clean\"><li class=\"active\"><i class=\"fa fa-th\"></i> Select issue type</li></ol><dl class=\"angular-311-2col\"><dd ng-repeat=\"item in types | orderBy: 'title'\" class=\"col-sm-6 col-md-4\"><h4><a main-toggle=\"slide-left\" href=\"\" ui-sref=\"{{typeUrl(item.url)}}\" style=\"color: {{item.field_icon.color}}\"><i ng-if=\"item.field_icon\" class=\"fa fa-{{item.field_icon.icon}}\"></i><span>{{item.title}}</span></a></h4></dd></dl></div><div class=\"animation-wrap slide-left-2\"><div id=\"main-311-1\" class=\"main main-311 transform clearfix quickfade\" ui-view></div></div>"
  );


  $templateCache.put('views/apps/311App/issues/issue-create-details.html',
    "<ol class=\"breadcrumb clean\"><li><a href=\"\" ui-sref=\"city.report\" main-toggle=\"slide-left\"><i class=\"fa fa-th\"></i></a></li><li><a href=\"\" main-toggle-nest=\"1\" main-toggle=\"slide-left\"><i class=\"fa fa-map-marker\"></i></a></li><li class=\"active\"><i class=\"fa fa-file-text-o\"></i>Provide details</li></ol><form role=\"form\" ng-submit=\"submit(form);\"><div class=\"container-flud\"><div class=\"form-group row\"><label class=\"control-label col-sm-2\" for=\"email\">Category:</label><div class=\"col-sm-10\">{{form.category}}</div></div><div class=\"form-group row\" ng-repeat=\"field in fields\" style=\"clear:both\"><label class=\"control-label col-sm-2\" for=\"{{field.primary_key}}\">{{field.question}}:</label><div class=\"col-sm-10\"><textarea ng-model=\"form.answers[field.primary_key]\" rows=\"2\" ng-if=\"field.question_type == 'textarea'\"></textarea><input type=\"{{field.question_type}}\" ng-if=\"field.question_type != 'textarea'\" class=\"form-control\" ng-model=\"form.answers[field.primary_key]\"></div></div><div class=\"form-group row\"><div class=\"col-sm-offset-2 col-sm-10\"><button type=\"submit\" class=\"btn btn-default\">Submit</button></div></div></div></form><div main-toggle=\"slide-left\" main-toggle-nest=\"1\" main-toggle-force=\"add\" main-toggle-enter=\"true\"></div>"
  );


  $templateCache.put('views/apps/311App/issues/issue-create-map.html',
    "<div class=\"slide-left-2\"><ol class=\"breadcrumb clean\"><li><a ui-sref=\"city.report\" main-toggle=\"slide-left\"><i class=\"fa fa-th\"></i></a></li><li class=\"active\"><i class=\"fa fa-map-marker\"></i> Add location</li></ol><a href=\"\" main-toggle=\"slide-left\" main-toggle-nest=\"1\" class=\"ol-next btn btn-primary btn-xs\" ng-class=\"{'disabled': !marker}\" ng-click=\"next()\">Next <i class=\"fa fa-arrow-right\"></i></a><div id=\"issue-map\" style=\"height: 400px\"></div></div><div class=\"animation-wrap slide-left-2\"><div class=\"quickfade\" ui-view></div></div><div main-toggle=\"slide-left\" main-toggle-force=\"add\" main-toggle-enter=\"true\"></div>"
  );


  $templateCache.put('views/apps/311App/issues/issue-status-result.html',
    "<ol class=\"breadcrumb clean\"><li><a href=\"\" main-toggle=\"slide-left\"><i class=\"fa fa-search\"></i></a></li><li class=\"active\"><i class=\"fa fa-file-text-o\"></i> Examine details</li></ol><h4 class=\"margin-top-none\">{{item.summary}}</h4><div class=\"row\"><div class=\"col-sm-2\"><h4 class=\"track-status status-{{item.status}}\">{{item.status}}</h4><h5 ng-if=\"item.requested_datetime != item.updated_datetime\">Last updated: {{item.updated_datetime}}</h5><h5 ng-if=\"item.requested_datetime == item.updated_datetime\">Not yet updated</h5></div><div class=\"col-sm-7 col-md-6\"><h6>{{item.requested_datetime | date:'MMM d yyyy'}}</h6><h6><a href=\"\" ng-href=\"http://maps.google.com/maps?z=12&t=m&q=loc:{{item.lat}}+{{item.long}}\" target=\"_blank\"><i class=\"fa fa-map-marker\"></i> {{item.address}}</a></h6><p>{{item.description}}</p></div><div class=\"col-sm-3 col-md-4\"><img src=\"{{item.media_url}}\" class=\"img-responsive\"></div></div><div main-toggle=\"slide-left\" main-toggle-force=\"add\" main-toggle-enter=\"true\"></div>"
  );


  $templateCache.put('views/apps/311App/issues/issue-status.html',
    "<div class=\"slide-left-2\"><ol class=\"breadcrumb clean\"><li class=\"active\"><i class=\"fa fa-search\"></i> Lookup service request</li></ol><div class=\"row\"><div class=\"col-md-9\"><form class=\"form-inline\"><div class=\"form-group\"><label for=\"code\">Tracking code</label><input type=\"text\" class=\"form-control\" id=\"code\" ng-model=\"code\" placeholder=\"Try 2d13-2 or 3b16-4\"></div><a class=\"btn btn-primary\" main-toggle=\"slide-left\" ui-sref=\"city.status.item({code: code})\">Lookup</a><h3>Recent items</h3><p><a href=\"\" ui-sref=\"city.status.item({code: '2d13-2'})\">Graffiti Report</a></p></form></div><div class=\"col-md-3\"><a href=\"#\" ng-click=\"\" class=\"btn btn-default\"><div><i class=\"fa fa-map-marker fa-3x\"></i></div>View map of<br>recent issues &raquo;</a></div></div></div><div class=\"animation-wrap slide-left-2\"><div class=\"quickfade\" ui-view></div></div>"
  );


  $templateCache.put('views/apps/311App/menu311.html',
    "<div ng-if=\"menu.length >= 1\" class=\"col-sm-12 nav-contain\"><ul class=\"nav nav-pills nav-stacked {{addlClass}}\"><li ng-repeat=\"item in menu\" ui-sref-active=\"active\"><a menu-click main-toggle=\"slide-left\" main-toggle-force=\"remove\" animate-route=\"{{item.direction}}\" ui-sref=\"city.{{item.state}}\" menu-item><i class=\"fa {{item.icon}}\"></i> <span class=\"hidden-xs\">{{item.title}}</span></a></li></ul></div>"
  );


  $templateCache.put('views/apps/311App/payment/payment-success.html',
    "<a class=\"back-btn\" main-toggle=\"slide-left\"><i class=\"fa fa-angle-left\"></i> Back</a><h4 class=\"slide-title\">{{node.title}}</h4><div class=\"row\"><div class=\"col-sm-6\"><h5>Thank you</h5><p>You have successfully paid <strong>{{payment.amount}}</strong> for invoice <strong>{{payment.number}}</strong>. An email receipt will be sent to <strong>{{payment.email}}</strong></p></div><div class=\"col-sm-6\"></div></div><div main-toggle=\"slide-left\" main-toggle-force=\"add\" main-toggle-enter=\"true\"></div>"
  );


  $templateCache.put('views/apps/311App/payment/payment-type.html',
    "<ol class=\"breadcrumb clean\"><li><a href=\"\" main-toggle=\"slide-left\"><i class=\"fa fa-th\"></i><span class=\"sr-only\">Select payment type</span></a></li><li class=\"active\"><i class=\"fa fa-money\"></i> Make Payment</li></ol><h3>{{post.title.rendered}}</h3><div class=\"row\"><div class=\"col-sm-5\" ng-if=\"post.meta.link\"><h4>Online payments</h4><p><a href=\"\" ng-href=\"{{post.meta.link}}\" class=\"btn btn-primary btn-lg\" target=\"_blank\">Pay online now &raquo;</a></p><p><small><em>You will be redirected to our secure online payment provider.</em></small></p></div><div ng-if=\"!post.meta.link\"><h4>Pay online now</h4><form class=\"form-horizontal\" role=\"form\" method=\"GET\" ng-submit=\"submit(payment)\"><div class=\"form-group\" ng-class=\"numberClass\"><label class=\"control-label col-sm-4\" for=\"invoice_number\">Invoice number:</label><div class=\"col-sm-8\"><input type=\"text\" class=\"form-control\" id=\"invoice_number\" ng-model-options=\"{ debounce: 250 }\" ng-model=\"payment.number\" placeholder=\"Try 0001 or 0002\" required><div class=\"error-message hide\">Sorry, we could not find your invoice number. Please try 0001 or 0002 for this demo</div><div class=\"success-message hide\">We found invoice <strong>{{payment.number}}</strong> for <strong>{{payment.name}}</strong> for <strong>${{payment.amount}}</strong></div></div></div><div class=\"form-group\"><label class=\"control-label col-sm-4\" for=\"amount\">Amount:</label><div class=\"col-sm-8\"><div class=\"input-group\"><div class=\"input-group-addon\">$</div><input type=\"text\" class=\"form-control\" id=\"amount\" ng-model=\"payment.amount\" placeholder=\"0.00\" required></div></div></div><div class=\"form-group\"><div class=\"col-sm-8 col-sm-push-4\"><input type=\"submit\" name=\"submit\" value=\"Make payment\" class=\"btn btn-primary\"> <small>Note: Demo mode. <a href=\"\" ng-click=\"demoInfoToggle()\">More &gt;</a><div ng-if=\"demoInfo\">This will launch an example Stripe payment dialog to demonstrate the payment process. Enter 4242 4242 4242 4242 as the card number and 123 as the CVV2. Enter your real email address to receive an example receipt.</div></small></div></div></form></div><div class=\"col-sm-6\"><h4>Other ways to pay</h4><div class=\"body\" ng-bind-html=\"post.content.rendered\"></div></div></div><div main-toggle=\"slide-left\" main-toggle-force=\"add\" main-toggle-enter=\"true\"></div>"
  );


  $templateCache.put('views/apps/311App/payment/payment.html',
    "<div class=\"slide-left-2 column\"><ol class=\"breadcrumb clean\"><li class=\"active\"><i class=\"fa fa-th\"></i> Select payment type</li></ol><dl class=\"angular-311-2col\"><dd ng-repeat=\"item in posts | orderBy: 'title'\" class=\"col-sm-6 col-md-4 category-wrapper\"><h4><a main-toggle=\"slide-left\" href=\"\" ui-sref=\"city.payments.type({slug: item.slug})\"><i ng-if=\"item.meta.icon\" class=\"fa {{item.meta.icon}}\"></i><span>{{item.title.rendered}}</span></a></h4></dd></dl></div><div class=\"animation-wrap slide-left-2\"><div class=\"quickfade\" ui-view></div></div>"
  );

}]);
