# Search Param Handler

search-param-handler is angularjs service for handling url search params.

## Install

### Install with `bower`:

```shell
bower install search-param-handler
```

or, if for some reason angular won't be installed:

```shell
bower install angular
bower install search-param-handler
```

### Install manually

Grab Angular, then get searchParamHandler.js from this repo and place it in your project's folder.

## Usage

Add a `<script>` with angular and search-param-handler to your `index.html`:

```html
<script src="/bower_components/angular/angular.js"></script>
<script src="/bower_components/search-param-handler/search-param-handler.js"></script>
```

Add `cohesiva.searchParamHandler` module as dependency for your app module (or to any module in which you want to use `search-param-handler`):

```javascript
angular.module('yourApp', [
    'cohesiva.searchParamHandler'
]);

```

Inject SearchParamHandler service, in ex. to controller:

```javascript
angular.module('yourApp')
    .controller('YourAppCtrl', ['$scope', 'SearchParamHandler',
        function($scope, SearchParamHandler) {

            /* Controller body */

        }]);

```

Define params for SearchParamHandler service

```javascript
angular.module('yourApp')
    .controller('YourAppCtrl', ['$scope', 'SearchParamHandler',
        function($scope, SearchParamHandler) {

            var searchParamHandlerParams = {
                scope: $scope, // current controller's scope must be provided for angular to set $watch service
                name: 'exampleSearchParam', // the name of serch param displayed in url
                allowedValues: [true], // the array of allowed values
                callback: function(newExampleSearchParamValue) {
                    /* callback function is fired after every change of the exampleSearchParam value */
                    return;
                }
            }
            var searchParamHandler = new SearchParamHandler(searchParamHandlerParams); // initialize SearchParamHandler instance for specified params

        }]);

```

You can change controlled search param value both by changing it's value in url and by using the method provided by SearchParamHandler:

```javascript
searchParamHandler.setSearchParam(value);
```

The service is checking if the provided value is specified in searchParamHandlerParams.allowedValues property. If it's not, the last value of search param will be restored.

If you run:

```javascript
searchParamHandler.setSearchParam(null);
```

the search param will be removed from the url.
