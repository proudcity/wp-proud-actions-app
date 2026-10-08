# wp-proud-actions-app
An interactive, Angular-based 311 interface for FAQ, Payments, Issue reporting and Issue lookup. [ProudCity](http://proudcity.com) is a Wordpress platform for modern, standards-compliant municipal websites.

### Development
By default, this app loads the ProudCity Service Center JS from the built copy bundled in `./includes/js/service-center/dist`
(see https://github.com/proudcity/wp-proudcity/issues/2959). When the service center is rebuilt, copy its new `dist/` here:

```
rsync -a --delete --exclude .DS_Store <path-to>/service-center/dist/ ./includes/js/service-center/dist/
```

To load it from somewhere else, set `wp_proud_service_center_path`:

```
# Use the Firebase-hosted version (https://service-center.proudcity.com)
wp --allow-root option update wp_proud_service_center_path '//service-center.proudcity.com/'

# Use beta version
wp --allow-root option update wp_proud_service_center_path '//service-center-beta.proudcity.com/'

# Back to the bundled copy (default)
wp --allow-root option delete wp_proud_service_center_path
```

### Setting up Facebook app

See https://github.com/proudcity/service-center/wiki/Setting-up-Facebook-app

### Generating Geojson files for the service center

Turning shp files into geojson files:
1. Upload all file(s) in https://mapshaper.org
2. Click Simplify and set to around 30% (shrink filesize while maintaining most details)
3. Click Console and enter `-proj wgs84` (to set the projection to standard lat/long)
4. Click Export. Type: `GeoJson`
5. Test file on http://geojson.io. Click on the Table tab to see data table
6. Upload the geojson file and enter the appropriate data table header in the Service Center settings page: 
/wp-admin/admin.php?page=service-center-settings (see example: https://cityofsanrafael.org/wp-admin/admin.php?page=service-center-settings)



To view:

All bug reports, feature requests and other issues should be added to the [wp-proudcity Issue Queue](https://github.com/proudcity/wp-proudcity/issues).
