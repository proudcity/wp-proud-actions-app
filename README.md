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

# Use beta version
wp --allow-root option update wp_proud_service_center_path '//service-center-beta.proudcity.com/'

# Use production version (https://service-center.proudcity.com)
wp --allow-root option delete wp_proud_service_center_path
```

#### Setting up Facebook app
1. Create a new app at https://developers.faceobook.com
2. Click on Settings -> Add Platform. Add a Page Tab with these options:
  * Secure Page Tab URL: https://example.proudcity.com/fbtab  (replace "example" with my-city-state)
  * Page Tab Name: Service Center
  * Page Tab Edit URL: https://san-rafael-ca.proudcity.com/wp-admin/admin.php?page=service-center-facebook (replace "example" with my-city-state)
3. Copy the App Id and set it in WordPress:
  ```
  wp --allow-root option update proud_service_center_fb_app 1358980630789577
  ```


All bug reports, feature requests and other issues should be added to the [wp-proudcity Issue Queue](https://github.com/proudcity/wp-proudcity/issues).c