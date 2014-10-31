# Search Param Handler

SearchParamHandler is angularjs service for handling url search params.

It allows to use callback function after each change of a controlled url search parameter and restricting its value to those provided by developer.

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

Inject SearchParamHandler service, for ex. to controller:

```javascript
angular.module('yourApp')
    .controller('YourAppCtrl', ['$scope', 'SearchParamHandler',
        function($scope, SearchParamHandler) {

            /* Controller's body */

        }]);

```

Define params for SearchParamHandler service

```javascript
angular.module('yourApp')
    .controller('YourAppCtrl', ['$scope', 'SearchParamHandler',
        function($scope, SearchParamHandler) {

            var searchParamHandlerParams = {
                scope: $scope, // current controller's scope must be provided for angular to set $watch service
                name: 'exampleSearchParam', // the name of search param displayed in url
                allowedValues: [true], // the array of allowed values
                callback: function(newExampleSearchParamValue) {
                    /* callback function is fired after every change of the exampleSearchParam value */
                    return;
                }
            }
            var searchParamHandler = new SearchParamHandler(searchParamHandlerParams); // initialize SearchParamHandler instance for specified params

        }]);

```

You can change controlled search param value both by changing its value in url and by using the method provided by SearchParamHandler:

```javascript
searchParamHandler.setSearchParam(value);
```

The service is checking if the provided value is specified in searchParamHandlerParams.allowedValues property. If it's not, the last value of search param will be restored.

If you call:

```javascript
searchParamHandler.setSearchParam(null);
```

the search param will be removed from the url.

## License

Licensed under the terms of the [Apache License](https://github.com/Cohesiva/search-param-handler/blob/master/LICENSE)
