# wp-proud-actions-app
An interactive, Angular-based 311 interface for FAQ, Payments, Issue reporting and Issue lookup. [ProudCity](http://proudcity.com) is a Wordpress platform for modern, standards-compliant municipal websites.

### Development
By default, this app calls the ProudCity Service Center remove JS include files at https://service-center.proudcity.com.  Fo development,
we can use the local or beta version.:

```
# Use local version (in ./includes/js/service-center/dist)
cd ./includes/js
git clone git@github.com:proudcity/service-center.git
wp --allow-root option update wp_proud_service_center_path 'local'
# OR
wp --allow-root option update wp_proud_service_center_path '/wp-content/plugins/wp-proud-actions-app/includes/js/service-center/dist/'

# Use beta version
wp --allow-root option update wp_proud_service_center_path '//service-center-beta.proudcity.com/'

# Use production version (https://service-center.proudcity.com)
wp --allow-root option delete wp_proud_service_center_path
```

#### Setting up Facebook app

See https://github.com/proudcity/service-center/wiki/Setting-up-Facebook-app


All bug reports, feature requests and other issues should be added to the [wp-proudcity Issue Queue](https://github.com/proudcity/wp-proudcity/issues).