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

### Setting up Facebook app

See https://github.com/proudcity/service-center/wiki/Setting-up-Facebook-app

### Setting up Facebook app

Turning shp files into geojson files:
1. Upload all file(s) in https://mapshaper.org
2. Click Simplify and set to around 30% (shrink filesize while maintaining most details)
3. Click command and enter `-proj wgs84` (to set the projection to standard lat/long)
4. Click Export. Type: `GeoJson`
5. Test file on http://geojson.io. Click on the Table tab to see data table
6. Upload the geojson file and enter the appropriate data table header in the Service Center settings page: 
/wp-admin/admin.php?page=service-center-settings (see example: https://cityofsanrafael.org/wp-admin/admin.php?page=service-center-settings)



To view:

All bug reports, feature requests and other issues should be added to the [wp-proudcity Issue Queue](https://github.com/proudcity/wp-proudcity/issues).
