angular.module('311AppParent').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/apps/311App/app-311-wrap.html',
    "<div class=\"app-wrap\"><div class=\"action-box\" id=\"wrapper-311\"><div class=\"row\"><div menu></div><div class=\"col-sm-12 content-contain\"><div class=\"body-content animation-wrap\"><div id=\"main-311\" class=\"main-311 transform clearfix\" ui-view></div></div></div></div></div></div>"
  );


  $templateCache.put('views/apps/311App/faq/faq-child-answers.html',
    "<div ng-repeat=\"node in nodes\" class=\"panel\"><div class=\"panel-heading\"><h3 class=\"panel-title\"><a href=\"\" ui-sref=\"city.faq.child.answers({postSlug: node.slug})\" ng-bind-html=\"node.title.rendered\"></a></h3></div><div class=\"panel-body\" ng-show=\"activeSlug == node.slug\"><div ng-bind-html=\"node.content.rendered\"></div><div proudcity-get-involved></div><p ng-if=\"node.field_faq_link\"><a href=\"\" ng-href=\"{{node.field_faq_link.url}}\" class=\"btn btn-primary\">{{node.field_faq_link.title}} &raquo;</a></p><a class=\"btn btn-default btn-xs\" ng-class=\"{active : node.hearted}\" href=\"#\" ng-click=\"heartClick(node, $event)\" title=\"This makes me proud\"><i class=\"fa fa-fw fa-heart\"></i> Helpful</a></div></div><div main-toggle=\"slide-left\" main-toggle-force=\"add\" main-toggle-enter=\"true\"></div>"
  );


  $templateCache.put('views/apps/311App/faq/faq-child.html',
    "<ol class=\"breadcrumb clean\"><li><a href=\"\" main-toggle=\"slide-left\"><i class=\"fa fa-th\"></i><span class=\"sr-only\">Select category</span></a></li><li class=\"active\"><i class=\"fa fa-search\"></i> Find Answer</li></ol><div class=\"row\"><div class=\"col-sm-9\"><div class=\"panel-group\" ui-view></div></div><div class=\"col-sm-3\"><h5 ng-bind-html=\"activeParent.name\"></h5><ul class=\"nav nav-pills nav-stacked\"><li ng-repeat=\"item in terms | termsByParent:activeParent.id | orderBy: 'weight'\" ng-class=\"item.id == activeTerm.id ? 'active' : ''\"><a href=\"\" ui-sref=\"city.faq.child.answers({slug: item.slug, postSlug: 'list'})\" ng-bind-html=\"item.name\"></a></li></ul></div></div>"
  );


  $templateCache.put('views/apps/311App/faq/faq.html',
    "<div class=\"slide-left-2 column\"><ol class=\"breadcrumb clean\"><li class=\"active\"><i class=\"fa fa-th\"></i> Select answer type</li></ol><dl class=\"angular-311-2col\"><dd ng-repeat=\"item in terms | termsNoParent:$root.categories | orderBy: 'weight'\" class=\"col-sm-6 col-md-4\" ng-class=\"{'active' : item.slug == active.slug, 'expanded': $root.displayExpanded('answers')}\"><h4><a ng-click=\"open(item)\" href=\"\" ng-click=\"open(item)\"><i ng-if=\"item.description\" class=\"fa {{item.description}}\"></i><span ng-bind-html=\"item.name\"></span></a></h4><div class=\"animation-wrap\"><div class=\"slidedown\" ng-if=\"active.id == item.id || $root.displayExpanded('answers')\"><!-- @todo: ng-repeat=\"child in terms | filter: { parent: [{slug: item.slug}] } |  orderBy: 'weight'\" --><ul class=\"taxonomy-vocabulary-2col\"><li ng-repeat=\"child in terms | termsByParent:item.id\"><a main-toggle=\"slide-left\" href=\"\" ui-sref=\"city.faq.child.answers({slug: child.slug, nid: 'list'})\" ng-bind-html=\"child.name\"></a></li></ul></div></div></dd></dl></div><div class=\"animation-wrap slide-left-2\"><div class=\"quickfade\" ui-view></div></div>"
  );


  $templateCache.put('views/apps/311App/issues/issue-create-categories.html',
    "<div class=\"slide-left-2\"><ol class=\"breadcrumb clean\"><li class=\"active\"><i class=\"fa fa-th\"></i> Select issue type</li></ol><dl class=\"angular-311-2col\"><dd ng-repeat=\"item in types | orderBy: 'title'\" class=\"col-sm-6 col-md-4\"><h4><a ng-if=\"service !== 'seeclickfix' && item.meta.issue_category_type === 'link'\" main-toggle=\"slide-left\" ng-href=\"{{item.meta.url}}\" target=\"_blank\"><i ng-if=\"item.meta.icon\" class=\"fa {{item.meta.icon}}\"></i> <span>{{item.title.rendered}}</span></a> <a ng-if=\"service !== 'seeclickfix' && item.meta.issue_category_type === 'iframe'\" main-toggle=\"slide-left\" href=\"#\" ui-sref=\"city.report.iframe({slug: item.slug})\"><i ng-if=\"item.meta.icon\" class=\"fa {{item.meta.icon}}\"></i> <span>{{item.title.rendered}}</span></a> <a ng-if=\"service === 'seeclickfix'\" main-toggle=\"slide-left\" href=\"#\" ui-sref=\"city.report.map({type: item.id})\"><i ng-if=\"item.icon\" class=\"fa fa-{{item.icon}}\"></i> <span>{{item.title}}</span></a></h4></dd></dl></div><div class=\"animation-wrap slide-left-2\"><div id=\"main-311-1\" class=\"main-311 transform clearfix quickfade\" ui-view></div></div>"
  );


  $templateCache.put('views/apps/311App/issues/issue-create-details.html',
    "<ol class=\"breadcrumb clean\"><li><a href=\"\" ui-sref=\"city.report\" main-toggle=\"slide-left\"><i class=\"fa fa-th\"></i></a></li><li><a href=\"\" main-toggle-nest=\"1\" main-toggle=\"slide-left\"><i class=\"fa fa-map-marker\"></i></a></li><li class=\"active\"><i class=\"fa fa-file-text-o\"></i>Provide details</li></ol><form role=\"form\" ng-submit=\"submit(form);\"><div class=\"container-flud\"><div class=\"form-group row\"><label class=\"control-label col-sm-2\" for=\"email\">Category:</label><div class=\"col-sm-10\"><strong>{{form.category}}</strong></div></div><div class=\"form-group row\" ng-if=\"form.address\"><label class=\"control-label col-sm-2\" for=\"email\">Address:</label><div class=\"col-sm-10\"><strong>{{form.address}}</strong></div></div><div class=\"row\" ng-if=\"errors\"><div class=\"col-sm-12\"><div class=\"alert alert-danger\" role=\"alert\" ng-bind-html=\"errors\"></div></div></div><div class=\"form-group row\" ng-repeat=\"field in fields\" style=\"clear:both\"><label class=\"control-label col-sm-2\" for=\"{{field.primary_key}}\"><span ng-if=\"field.question_type != 'note'\">{{field.question}}</span> <span ng-if=\"field.response_required\" class=\"required\">*</span></label><div class=\"col-sm-10\"><span ng-if=\"field.question_type == 'note'\" class=\"description\">{{field.question}}</span><textarea ng-model=\"form.answers[field.primary_key]\" rows=\"2\" ng-if=\"field.question_type == 'textarea'\"></textarea><input type=\"{{field.question_type}}\" ng-if=\"field.question_type != 'textarea' && field.question_type != 'note'\" class=\"form-control\" ng-model=\"form.answers[field.primary_key]\"></div></div><div ng-if=\"form.guest\"><div class=\"form-group row\"><label class=\"control-label col-sm-2\" for=\"name\">Name:</label><div class=\"col-sm-10\"><input type=\"textfield\" name=\"email\" id=\"name\" class=\"form-control\" ng-model=\"form.name\"><div class=\"description\">This will be publicly visible</div></div></div><div class=\"form-group row\"><label class=\"control-label col-sm-2\" for=\"email\">Email:</label><div class=\"col-sm-10\"><input type=\"email\" name=\"email\" id=\"email\" class=\"form-control\" ng-model=\"form.email\"></div></div></div><!-- /if --><div class=\"form-group row\"><div class=\"col-sm-offset-2 col-sm-10\"><button type=\"submit\" class=\"btn btn-primary\">{{submitLabel}}</button>&nbsp;&nbsp; <a ng-if=\"guestAllowed && !form.guest\" href=\"\" ng-click=\"toggleGuest($event)\">Submit as Guest</a> <a ng-if=\"guestAllowed && form.guest\" href=\"\" ng-click=\"toggleGuest($event);submit(form);\">SeeClickFix Account</a><!--Note: This is an example form that will not actually submit--></div></div></div></form><div main-toggle=\"slide-left\" main-toggle-nest=\"1\" main-toggle-force=\"add\" main-toggle-enter=\"true\"></div>"
  );


  $templateCache.put('views/apps/311App/issues/issue-create-iframe.html',
    "<div class=\"slide-left-2\"><ol class=\"breadcrumb clean\"><li><a ui-sref=\"city.report\" main-toggle=\"slide-left\"><i class=\"fa fa-th\"></i></a></li><li class=\"active\"><i class=\"fa fa-file-text-o\"></i> Provide details</li></ol><div ng-bind-html=\"post.content.rendered\"></div><iframe ng-src=\"{{trustSrc(post.meta.iframe)}}\" style=\"border:none;height:1500px;width:100%\"></iframe></div><div class=\"animation-wrap slide-left-2\"><div class=\"quickfade\" ui-view></div></div><div main-toggle=\"slide-left\" main-toggle-force=\"add\" main-toggle-enter=\"true\"></div>"
  );


  $templateCache.put('views/apps/311App/issues/issue-create-map.html',
    "<div class=\"slide-left-2\"><ol class=\"breadcrumb clean\"><li><a ui-sref=\"city.report\" main-toggle=\"slide-left\"><i class=\"fa fa-th\"></i></a></li><li class=\"active\"><i class=\"fa fa-map-marker\"></i> Add location</li></ol><a href=\"\" main-toggle=\"slide-left\" main-toggle-nest=\"1\" class=\"ol-next btn btn-primary btn-sm\" ng-class=\"{'disabled': !marker}\" ng-click=\"next()\">Next <i class=\"fa fa-arrow-right\"></i></a><div id=\"issue-map\" style=\"height: 400px\"></div><a href=\"\" main-toggle=\"slide-left\" main-toggle-nest=\"1\" class=\"btn-next btn btn-primary btn-sm pull-right\" ng-class=\"{'disabled': !marker}\" ng-click=\"next()\">Next <i class=\"fa fa-arrow-right\"></i></a></div><div class=\"animation-wrap slide-left-2\"><div class=\"quickfade\" ui-view></div></div><div main-toggle=\"slide-left\" main-toggle-force=\"add\" main-toggle-enter=\"true\"></div>"
  );


  $templateCache.put('views/apps/311App/issues/issue-status-result.html',
    "<ol class=\"breadcrumb clean\"><li><a href=\"\" main-toggle=\"slide-left\"><i class=\"fa fa-search\"></i></a></li><li class=\"active\"><i class=\"fa fa-file-text-o\"></i> Examine details</li></ol><div class=\"row\" ng-if=\"saved\"><div class=\"col-sm-12\"><div class=\"alert alert-success\" role=\"alert\"><p>Your issue has been successfully posted. You will recieve email alerts as it gets resolved. You can track the status of your issue request online at <a href=\"{{currentUrl}}\" ui-href=\"{{currentUrl}}\">{{currentUrl}}</a>.</p><p ng-if=\"saved == 2 && showLocalCheckbox\">For your convenience, your issue requests automatically appear on the Issue Status tab<br><label for=\"no-remember\"><input type=\"checkbox\" id=\"no-remember\" name=\"no-remember\" ng-click=\"toggleSave()\"> Do not remember me</label></p></div></div></div><div class=\"row text-center\" ng-if=\"loading\"><i class=\"fa fa-refresh fa-spin fa-3x fa-fw\" aria-hidden=\"true\"></i> <span class=\"sr-only\">Loading...</span></div><div class=\"row\" ng-if=\"!loading\"><div class=\"col-sm-3\"><h4 class=\"track-status status-{{item.status}}\">{{item.status}}</h4><p><div>Created: {{item.created_at | date:'MMM d yyyy'}}</div><div ng-if=\"item.updated_at != item.created_at\">Last updated: {{item.updated_at | date:'MMM d yyyy'}}</div><div ng-if=\"item.updated_at == item.created_at\">Not yet updated</div></p><p><a href=\"{{currentUrl}}\" ui-href=\"{{currentUrl}}\">Tracking code: {{item.id}}</a></p></div><div class=\"col-sm-6 col-md-5\"><h2 class=\"margin-top-none\">{{item.summary}}</h2><h6><a href=\"\" ng-href=\"http://maps.google.com/maps?z=12&t=m&q=loc:{{item.lat}}+{{item.lng}}\" target=\"_blank\"><i class=\"fa fa-map-marker\"></i> {{item.address}}</a></h6><p>{{item.description}}</p></div><div class=\"col-sm-3 col-md-4\"><img src=\"{{item.media_url}}\" class=\"img-responsive\"></div></div><div class=\"row\" ng-if=\"!loading && error\"><div class=\"col-sm-3\"><p>Sorry, we could not find any issues with the tracking code {{code}}.</p></div></div><div main-toggle=\"slide-left\" main-toggle-force=\"add\" main-toggle-enter=\"true\"></div>"
  );


  $templateCache.put('views/apps/311App/issues/issue-status.html',
    "<div class=\"slide-left-2 issue-status\"><ol class=\"breadcrumb clean\"><li class=\"active\"><i class=\"fa fa-search\"></i> Lookup service request</li></ol><div class=\"row\"><div class=\"col-xs-12\"><form class=\"form-inline\"><div class=\"form-group\"><label for=\"lookup\">Issue code</label><input type=\"text\" class=\"form-control\" id=\"lookup\" ng-model=\"lookup\" placeholder=\"Try '1'\"></div><a class=\"btn btn-primary\" main-toggle=\"slide-left\" ui-sref=\"city.status.item({code: lookup})\">Lookup</a></form></div></div><div class=\"row issue-status-tabs\"><div class=\"col-sm-4 col-md-3\"><ul class=\"nav nav-pills nav-stacked\"><li role=\"presentation\" ng-class=\"{'active': activeTab == 'me'}\" ng-if=\"myIssues !== -1\"><a href=\"#\" ng-click=\"tabClick('me', $event)\"><i class=\"fa fa-fw fa-user\"></i> My issues</a></li><li role=\"presentation\" ng-class=\"{'active': activeTab == 'recent'}\"><a href=\"#\" ng-click=\"tabClick('recent', $event)\"><i class=\"fa fa-fw fa-clock-o\"></i> Recently in {{city}}</a></li><li role=\"presentation\" ng-if=\"showMap\"><a href=\"#\" ng-click=\"clickMap($event)\"><i class=\"fa fa-fw fa-map\"></i> Map</a></li></ul></div><div class=\"col-md-8 tab-content\"><div ng-if=\"activeTab == 'me'\"><div ng-if=\"!myIssues\"><p>We do not have a record of any reported issues on this device. Search your email for your Issue Code and enter it in the box above.</p><p><a class=\"btn btn-default\" href=\"#\" ui-sref=\"city.report\"><i class=\"fa fa-fw fa-exclamation-triangle\"></i> Report an issue</a></p></div><ul ng-if=\"myIssues\" class=\"title-list list-unstyled\"><li ng-repeat=\"item in myIssues\" ui-sref=\"city.status.item({code: item.id})\" class=\"teaser-mini\"><h4><a href=\"\" ui-sref=\"city.status.item({code: item.id})\">{{item.title}} <small>{{item.id}}</small></a></h4><p><span class=\"pull-right text-muted\">{{item.created_at | date:'MMM d yyyy'}}</span> <span class=\"text-muted\">{{item.address}}</span></p></li></ul></div><ul ng-if=\"activeTab == 'recent'\" class=\"title-list list-unstyled\"><li ng-repeat=\"item in recentIssues\" ui-sref=\"city.status.item({code: item.id})\" class=\"teaser-mini\"><img ng-if=\"item.thumb\" ng-src=\"{{ issueThumb(item) }}\" class=\"pull-right\"> <span class=\"pull-right track-status status-open\">open</span><h6><a href=\"\" ui-sref=\"city.status.item({code: item.id})\">{{item.title}}</a></h6><p><span class=\"text-muted pull-right\">{{item.created_at | date:'MMM d yyyy'}}</span> <span class=\"text-muted\">{{item.address}}</span></p></li></ul></div><!-- /row --></div></div><div class=\"animation-wrap slide-left-2\"><div class=\"quickfade\" ui-view></div></div>"
  );


  $templateCache.put('views/apps/311App/menu311.html',
    "<div ng-if=\"menu.length > 1\" class=\"col-sm-12 nav-contain\"><ul class=\"nav nav-pills nav-stacked {{addlClass}}\"><li ng-repeat=\"item in menu\" ui-sref-active=\"active\"><a ng-if=\"item.state\" menu-click main-toggle=\"slide-left\" main-toggle-force=\"remove\" animate-route=\"{{item.direction}}\" ui-sref=\"city.{{item.state}}\" menu-item><i class=\"fa {{item.icon}}\"></i> <span class=\"hidden-xs\">{{item.title}}</span></a> <a ng-if=\"item.url\" href=\"\" ng-href=\"{{item.url}}\"><i class=\"fa {{item.icon}}\"></i> <span class=\"hidden-xs\">{{item.title}}</span></a></li></ul></div>"
  );


  $templateCache.put('views/apps/311App/payment/payment-success.html',
    "<a class=\"back-btn\" main-toggle=\"slide-left\"><i class=\"fa fa-angle-left\"></i> Back</a><h4 class=\"slide-title\">{{node.title}}</h4><div class=\"row\"><div class=\"col-sm-6\"><h5>Thank you</h5><p>You have successfully paid <strong>{{payment.amount}}</strong> for invoice <strong>{{payment.number}}</strong>. An email receipt will be sent to <strong>{{payment.email}}</strong></p></div><div class=\"col-sm-6\"></div></div><div main-toggle=\"slide-left\" main-toggle-force=\"add\" main-toggle-enter=\"true\"></div>"
  );


  $templateCache.put('views/apps/311App/payment/payment-type.html',
    "<ol class=\"breadcrumb clean\"><li><a href=\"\" main-toggle=\"slide-left\"><i class=\"fa fa-th\"></i><span class=\"sr-only\">Select payment type</span></a></li><li class=\"active\"><i class=\"fa fa-money\"></i> Make Payment</li></ol><h3>{{post.title.rendered}}</h3><div class=\"row\"><div class=\"col-sm-5\" ng-if=\"post.meta.type == 'link'\"><h4>Online payments</h4><p><a href=\"\" ng-href=\"{{post.meta.link}}\" class=\"btn btn-primary btn-lg\" target=\"_blank\">Pay online now &raquo;</a></p><p><small><em>You will be redirected to our secure online payment provider.</em></small></p></div><div class=\"col-sm-5\" ng-if=\"post.meta.type == 'gravityform'\"><h4>Pay online now</h4><form class=\"form-horizontal\" role=\"form\" method=\"GET\" ng-submit=\"submit(payment)\"><div class=\"form-group\" ng-class=\"idClass\"><label class=\"control-label col-sm-4\" for=\"invoice_id\">Invoice number:</label><div class=\"col-sm-8\"><input type=\"text\" class=\"form-control\" id=\"invoice_id\" ng-model-options=\"{ debounce: 250 }\" ng-model=\"payment.id\" placeholder=\"Try 0001 or 0002\" required><div class=\"error-message hide\">Sorry, we could not find your invoice number. Please try 0001 or 0002 for this demo</div><div class=\"success-message hide\">We found invoice <strong>{{payment.id}}</strong> for <strong>{{payment.name}}</strong> for <strong>${{payment.amount}}</strong></div></div></div><div class=\"form-group\"><label class=\"control-label col-sm-4\" for=\"amount\">Amount:</label><div class=\"col-sm-8\"><div class=\"input-group\"><div class=\"input-group-addon\">$</div><input type=\"text\" class=\"form-control\" id=\"amount\" ng-model=\"payment.amount\" placeholder=\"0.00\" required></div></div></div><div class=\"form-group\"><div class=\"col-sm-8 col-sm-push-4\"><input type=\"submit\" name=\"submit\" value=\"Make payment &raquo\" class=\"btn btn-primary\"></div></div></form></div><div class=\"col-sm-6\"><h4>Other ways to pay</h4><div class=\"body\" ng-bind-html=\"post.content.rendered\"></div></div></div><div main-toggle=\"slide-left\" main-toggle-force=\"add\" main-toggle-enter=\"true\"></div>"
  );


  $templateCache.put('views/apps/311App/payment/payment.html',
    "<div class=\"slide-left-2 column\"><ol class=\"breadcrumb clean\"><li class=\"active\"><i class=\"fa fa-th\"></i> Select payment type</li></ol><dl class=\"angular-311-2col\"><dd ng-repeat=\"item in posts | orderBy: 'title'\" class=\"col-sm-6 col-md-4 category-wrapper\"><h4><a main-toggle=\"slide-left\" href=\"\" ui-sref=\"city.payments.type({slug: item.slug})\"><i ng-if=\"item.meta.icon\" class=\"fa {{item.meta.icon}}\"></i><span>{{item.title.rendered}}</span></a></h4></dd></dl></div><div class=\"animation-wrap slide-left-2\"><div class=\"quickfade\" ui-view></div></div>"
  );


  $templateCache.put('views/apps/311App/vote/vote-address.html',
    "<div class=\"slide-left-2 column\"><h1>Voting is important</h1><h3>Enter your address to find out how to vote, and educate yourself on the issues on the ballot.</h3><input class=\"input-lg form-control\" style=\"max-width: 300px\" type=\"text\" googleplace ng-model=\"place\" place=\"chosenPlace\" ng-change=\"chosenUpdate()\"><hr style=\"margin-top:400px\"><a ui-sref=\"city.vote.embed\"><i class=\"fa fa-fw fa-plus-circle\"></i>Add this to your website (free!)</a></div><div class=\"animation-wrap slide-left-2\"><div class=\"quickfade\" ui-view></div></div>"
  );


  $templateCache.put('views/apps/311App/vote/vote-candidates.html',
    "<div ng-repeat=\"contest in contests\"><h3>{{contest.office}} <small><i class=\"fa fa-fw fa-map-marker\"></i>{{contest.district.name}}</small></h3><div class=\"row\"><div ng-repeat=\"candidate in contest.candidates\" class=\"col-md-4 col-xs-6\"><div><strong>{{candidate.name}}</strong></div><div>{{candidate.party}}</div><div><a ng-repeat=\"channel in candidate.channels\" ng-if=\"channel.type != 'GooglePlus'\" href=\"{{channel.id}}\"><i class=\"fa fa-fw fa-{{channel.type|lowercase}}-square\"></i></a></div></div></div><hr></div>"
  );


  $templateCache.put('views/apps/311App/vote/vote-embed.html',
    "<div class=\"slide-left-2 column\"><h1>Embed this widget on your website</h1><p><a href=\"\">ProudCity's</a> mission is to make getting information online from your local governments easier. As part of this mission, we are making our Vote app available online as a free widget. Simple copy the embed code below on to your website to add the fully-unbraded widget to your site.</p><p><textarea style=\"width:80%\">&lt;iframe src=\"https://vote-embed.proudcity.com\" style=\"width:100%;height:1000px;border:0\"&gt;&lt;/iframe&gt;</textarea></p><p>Please <a href=\"mailto:info@proudcity.com\">contact us</a> if you are having issues, have suggestions, want to share your widget, or just want to say thanks.</p><p><a ui-sref=\"city.vote.address\" class=\"btn btn-primary\">Back</a></p></div><div class=\"animation-wrap slide-left-2\"><div class=\"quickfade\" ui-view></div></div>"
  );


  $templateCache.put('views/apps/311App/vote/vote-how.html',
    "<div class=\"row\"><div class=\"col-sm-7\"><a ng-if=\"address\" ng-href=\"{{directionsLink}}\" class=\"btn btn-primary btn-sm pull-right\" target=\"_blank\"><i class=\"fa fa-fw fa-location-arrow\"></i>Get directions</a><h3 style=\"margin-top:0\">Your polling place</h3><div ng-if=\"!address\">Sorry, we could not find any polling location for your address. Please try searching on the <a ng-href=\"{{links.votingLocationFinderUrl}}\" target=\"_blank\">{{links.name}} polling location finder</a>.</div><div ng-if=\"address\"><div class=\"row\"><div class=\"col-sm-1 col-xs-2\"><i class=\"fa fa-map-marker fa-2x text-muted\"></i></div><div class=\"col-sm-11 col-xs-10\"><div>{{address.locationName}}</div><div>{{address.line1}}</div><div ng-if=\"address.line2\">{{address.line2}}</div><div>{{address.city}}, {{address.state}} {{address.zip}}</div><hr></div></div><div class=\"row\"><div class=\"col-sm-1 col-xs-2\"><i class=\"fa fa-clock-o fa-2x text-muted\"></i></div><div class=\"col-sm-11 col-xs-10\"><div ng-if=\"hours\">{{hours}}</div><div ng-if=\"!hours\">No hours are available for this polling location. Most polls nationally are open from 7am - 8pm.</div><hr style=\"margin-bottom:5px\"></div></div><div class=\"row\"><div class=\"col-sm-1 col-xs-2\"></div><div class=\"col-sm-11 col-xs-10\"><div style=\"font-size:.9em\"><span class=\"pull-right\">Source: <span ng-repeat=\"source in sources\">{{source.name}} <i ng-if=\"source.verified\" class=\"fa fa-check-circle\" title=\"Source if verified\"></i></span></span> <a href=\"#\" ng-click=\"toggleDisclaimer()\">Disclaimer</a><div class=\"\" ng-if=\"disclaimer\">This information is for reference purposes only. Your polling location may differ from this information depending on many factors, including the address you used to register to vote. Please contact the <a ng-href=\"{{links.votingLocationFinderUrl}}\" target=\"_blank\">{{links.name}}</a> for your official voting information.</div></div></div></div></div><!-- if address --><h3 style=\"margin-top:36px\">Helpful links from the {{links.name}}</h3><div class=\"card-columns card-columns-xs-2 card-columns-sm-2 card-columns-md-2 card-columns-equalize\"><div class=\"card-wrap\"><a ng-href=\"{{links.electionInfoUrl}}\" class=\"card text-center card-btn card-block\" target=\"_blank\"><i class=\"fa fa-info-circle fa-2x\"></i><h4>Election info</h4></a></div><div class=\"card-wrap\"><a ng-href=\"{{links.electionRegistrationUrl}}\" class=\"card text-center card-btn card-block\" target=\"_blank\"><i class=\"fa fa-pencil-square-o fa-2x\"></i><h4>Register to vote</h4></a></div><div class=\"card-wrap\"><a ng-href=\"{{links.electionRegistrationConfirmationUrl}}\" class=\"card text-center card-btn card-block\" target=\"_blank\"><i class=\"fa fa-check-circle-o fa-2x\"></i><h4>Confirm registration</h4></a></div><div class=\"card-wrap\"><a ng-href=\"{{links.absenteeVotingInfoUrl}}\" class=\"card text-center card-btn card-block\" target=\"_blank\"><i class=\"fa fa-globe fa-2x\"></i><h4>Absentee voting info</h4></a></div></div></div><div class=\"col-sm-5\"><div id=\"google-map\" style=\"width:100%;height:400px\"></div></div></div><hr>"
  );


  $templateCache.put('views/apps/311App/vote/vote-issues.html',
    "<div ng-repeat=\"contest in contests\"><a ng-href=\"{{contest.referendumUrl}}\" target=\"_blank\" class=\"hidden-xs btn btn-primary pull-right\"><i class=\"fa fa-fw fa-info-circle\"></i>Impartial analysis</a><h3><a ng-href=\"{{contest.referendumUrl}}\" target=\"_blank\" title=\"Learn more about {{contest.referendumTitle}}\">{{contest.referendumTitle}}</a></h3><h5>{{contest.referendumSubtitle}} <small><i class=\"fa fa-fw fa-map-marker\"></i>{{contest.district.name}}</small></h5><hr></div>"
  );


  $templateCache.put('views/apps/311App/vote/vote-wrapper.html',
    "<ul class=\"nav nav-pills\"><li ui-sref-active=\"active\"><a main-toggle=\"slide-left\" main-toggle-force=\"remove\" animate-route ui-sref=\"city.vote.location.how\" title=\"How to Vote\"><i class=\"fa fa-map-marker\"></i> How<span class=\"hidden-xs\">to Vote</span></a></li><li ui-sref-active=\"active\"><a main-toggle=\"slide-left\" main-toggle-force=\"remove\" animate-route ui-sref=\"city.vote.location.issues\" title=\"Issues\"><i class=\"fa fa-check-square-o\"></i> Issues</a></li><li ui-sref-active=\"active\"><a main-toggle=\"slide-left\" main-toggle-force=\"remove\" animate-route ui-sref=\"city.vote.location.candidates\" title=\"Candidates\"><i class=\"fa fa-user\"></i> Candidates</a></li><li><a main-toggle=\"slide-left\" main-toggle-force=\"remove\" animate-route ui-sref=\"city.vote.address\" title=\"Enter a new address\"><i class=\"fa fa-refresh\"></i></a></li></ul><div class=\"slide-left-2 column\"><div ui-view></div><span class=\"pull-right\">Data from the <a href=\"https://developers.google.com/civic-information/\" target=\"_blank\">Google Civic Information API</a>. Widget by <a href=\"//proudcity.com\">ProudCity</a>.</span> <a ui-sref=\"city.vote.embed\"><i class=\"fa fa-fw fa-plus-circle\"></i>Add this to your website (free!)</a></div><div class=\"animation-wrap slide-left-2\"><div class=\"quickfade\" ui-view></div></div>"
  );

}]);
