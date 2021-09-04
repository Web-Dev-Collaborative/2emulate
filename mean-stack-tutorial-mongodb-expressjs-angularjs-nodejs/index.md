



<a href="/categories/coding/" class="category-link">Coding</a> &gt; <a href="/categories/coding/web-development/" class="category-link">Web Development</a> &gt; <a href="/categories/coding/web-development/angular/" class="category-link">Angular</a>

MEAN Stack Tutorial MongoDB ExpressJS AngularJS NodeJS (Part III)
=================================================================

<span title="Last time this post was updated"> Last updated August 6th 2016 </span> <span class="m-x-2" title="Pageviews"> 251.8k </span> <span class="m-x-2" title="Click to go to the comments section"> [ <span class="disqus-comment-count" data-disqus-url="https://adrianmejia.com/mean-stack-tutorial-mongodb-expressjs-angularjs-nodejs/">0</span>](#disqus_thread) </span>

-   <a href="/tags/express/" class="tag-list-link">express</a><span class="tag-list-count">2</span>
-   <a href="/tags/mongodb/" class="tag-list-link">mongodb</a><span class="tag-list-count">3</span>
-   <a href="/tags/nodejs/" class="tag-list-link">nodejs</a><span class="tag-list-count">12</span>
-   <a href="/tags/todo-app/" class="tag-list-link">todo app</a><span class="tag-list-count">5</span>
-   <a href="/tags/tutorial-mean-stack/" class="tag-list-link">tutorial_mean-stack</a><span class="tag-list-count">3</span>

![MEAN Stack Tutorial MongoDB ExpressJS AngularJS NodeJS (Part III)](/images/mean_large.png)

We are going to build a full stack Todo App using the MEAN (MongoDB, ExpressJS, AngularJS and NodeJS). This is the last part of [three-post series tutorial](/tags/Tutorial-MEAN-Stack/).

<span id="more"></span>

MEAN Stack tutorial series:

1.  [AngularJS tutorial for beginners (Part I)](/blog/2014/09/28/angularjs-tutorial-for-beginners-with-nodejs-expressjs-and-mongodb/)
2.  [Creating RESTful APIs with NodeJS and MongoDB Tutorial (Part II)](/blog/2014/10/01/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/)
3.  MEAN Stack Tutorial: MongoDB, ExpressJS, AngularJS and NodeJS (Part III) **👈 you are here**

Before completing the app, let’s cover some background about the this stack. If you rather jump to the hands-on part click here to [get started](#start).

<a href="#Why-MEAN-stack" class="headerlink" title="Why MEAN stack?"></a>Why MEAN stack?
----------------------------------------------------------------------------------------

[TL; DR](#start): NodeJS has been built from bottom up a non-blocking I/O paradigm, which gives you more efficiency per CPU core than using threads in other languages like [Java](http://strongloop.com/strongblog/node-js-is-faster-than-java/).

LAMP (Linux-Apache-MySQL-PHP) has dominated web application stack for many years now. Well-known platforms such as Wikipedia, Wordpress, and even Facebook uses it or started with it. Enterprise, usually, used go down the Java path: Hibernate, Spring, Struts, JBoss. More agile frameworks also have been used such as Ruby on Rails and for Python Django and Pylon.

![](/images/mean_vs_lamp_stack.png "LAMP vs MEAN stack")

**Ubiquitous**

Well, it turns out, that JavaScript it is everywhere. It used to be limited to browsers. But, now you can found it in smartphones, servers, robots, Arduino, RaspberryPi… Thus, it does not matter what technology you use to build web applications, you need to be familiar with Javascript. In that case, then, it is a time saver to use wherever it fits, especially for building web applications. MEAN stack is embracing that, using Javascript to create end-to-end web applications. ​ **Non-blocking architecture**

JavaScript is a dynamic, object-oriented, and functional scripting language. One of the features that make it win over Java Applets decades ago, it was its lightness and non-blocking event loop. Blocking means that when one line of code is executing, the rest of it is locked waiting to finish. On the other hand, non-blocking gives to each line of code a shot and then through callbacks it can come back when an event happens. Programming languages that are blocking (Java, Ruby, Python, PHP, …) overcomes concurrency using many threads of execution while JavaScript handles it using non-blocking event loop in a single thread.

![](/images/blocking_vs_non_blocking_io.png)

As you can see, a single thread of execution in Node can handle perform multiple tasks vs a non-blocking style that execute each one sequentially. You can read more about it in [NodeJS faster than Java](%5Bstrongloop.com%5D(http://strongloop.com/strongblog/node-js-is-faster-than-java/)) article.

Some companies like [Paypal](https://www.paypal-engineering.com/2013/11/22/node-js-at-paypal/) moved from Java backend to NodeJS and reported a increased performance, lower average response times, and development speed gains. Similarly happens to [Groupon](https://engineering.groupon.com/2013/misc/i-tier-dismantling-the-monoliths/) that came from Java/Rails monoliths.

**Agile and vibrant community**

The community behind Javascript is quite vibrant. It has permeated in almost all the fields of technology: data visualization, server-side, databases, robotics, building tools and many more.

<span id="start"></span>

<a href="#TODO-app-with-MEAN" class="headerlink" title="TODO app with MEAN"></a>TODO app with MEAN
--------------------------------------------------------------------------------------------------

In this section are going to put together everything that we learnt in the [two](/blog/2014/09/28/angularjs-tutorial-for-beginners-with-nodejs-expressjs-and-mongodb/) [previous](/blog/2014/10/01/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/) tutorials.

### <a href="#MEAN-Backend-with-MongoDB-ExpressJS-and-NodeJS" class="headerlink" title="MEAN Backend with MongoDB, ExpressJS and NodeJS"></a>MEAN Backend with MongoDB, ExpressJS and NodeJS

In the [previous post](/blog/2014/10/01/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/), we have gone through the process of building a RESTful API and we are going to be building on top of that. [Repository here](https://github.com/amejiarosario/todoAPIjs).

Getting the back-end code build on Part II

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>git clone https://github.com/amejiarosario/todoAPIjs.git</code></pre></td></tr></tbody></table>

### <a href="#MEAN-stack-front-end-with-AngularJS" class="headerlink" title="MEAN stack front-end with AngularJS"></a>MEAN stack front-end with AngularJS

Similarly, we have build a very lean todoApp in the [first part](/blog/2014/09/28/angularjs-tutorial-for-beginners-with-nodejs-expressjs-and-mongodb/) of this tutorial. You can [download the file](https://gist.githubusercontent.com/amejiarosario/068143b53e54db43ef38/raw/ngTodo.html) to follow along and see it in action [here](https://cdn.rawgit.com/amejiarosario/068143b53e54db43ef38/raw/ngTodo.html). You might notice the angularJS app is very simple and even it is entirely in one file for simplicity sake. In further tutorials, we are going to make it more modular, split in files, add tests and stylesheets.

Let’s go first to the ExpressJS app (todoAPIjs) and review the default routing system:

1.  `app.js` loads the all the routes.
2.  The root path (`/`) is mounted on the `routes/index.js`
3.  `routes/index.js` sets the variable title and renders `index.ejs`.

Tracing ExpressJS index route

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5
6
7
8
9
10
11
12</code></pre></td><td><pre><code>// app.js
var routes = require(&#39;./routes/index&#39;);
app.use(&#39;/&#39;, routes);

// ./routes/index.js
router.get(&#39;/&#39;, function(req, res) {
  res.render(&#39;index&#39;, { title: &#39;Express&#39; });
});

// ./views/index.ejs
    &lt;h1&gt;&lt;%= title %&gt;&lt;/h1&gt;
    &lt;p&gt;Welcome to &lt;%= title %&gt;&lt;/p&gt;</code></pre></td></tr></tbody></table>

The best place to load our `./views/index.ejs`. So let’s copy the body content from ngTodo.html content in there and change in `./routes/index.js` title to “ngTodo App”. Don’t forget to add ng-app on the top. `<html ng-app="app">`.

[diff](https://github.com/amejiarosario/todoAPIjs/commit/ebf20f4093aa20c867777b4b3db825429b54a20d)

<a href="#Wiring-up-the-App" class="headerlink" title="Wiring up the App"></a>Wiring up the App
-----------------------------------------------------------------------------------------------

### <a href="#AngularJS-Read-with-http" class="headerlink" title="AngularJS Read with $http"></a>AngularJS Read with $http

As you might notice, in the factory, we have a fixed array. We need to change it to communicate with the API that we just build.

`$http` is Anguar core sevice that allow to make `XMLHttpRequest` or `jsonp` request. You can either pass an object with http verb and url or call call $http.verb (`$http.get`, `$http.post`).

`$http` returns a promise which has a `success` and `error` function.

AngularJS $HTTP Usage Example

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5
6
7
8
9
10
11</code></pre></td><td><pre><code>$http({method: &#39;GET&#39;, url: &#39;/todos&#39;}).
  success(function(data, status, headers, config) {
    // this callback will be called asynchronously
    // when the response is available.
    console.log(&#39;todos: &#39;, data );
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    console.log(&#39;Oops and error&#39;, data);
  });</code></pre></td></tr></tbody></table>

Let’s try it out in our app. Go to `views/index.ejs` and do this changes:

Using $http to retrieve data from database

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5
6
7
8
9
10
11
12
13
14</code></pre></td><td><pre><code>// Service
.factory(&#39;Todos&#39;, [&#39;$http&#39;, function($http){
  return $http.get(&#39;/todos&#39;);
}])

// Controller
.controller(&#39;TodoController&#39;, [&#39;$scope&#39;, &#39;Todos&#39;, function ($scope, Todos) {
  Todos.success(function(data){
    $scope.todos = data;
  }).error(function(data, status){
    console.log(data, status);
    $scope.todos = [];
  });
}])</code></pre></td></tr></tbody></table>

[diff](https://github.com/amejiarosario/todoAPIjs/commit/0221aebd62e88445629debe4f132684686cf48ec)

`$http.get` will request data using the `GET` method.

> Try it in your browser!s If you have data from the [previous tutorial](http://adrianmejia.com/blog/2014/10/01/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/#browser-and-postman) you should be able to see it.

To **start the server**, you can use

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>npm start</code></pre></td></tr></tbody></table>

or if you have it installed

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>nodemon</code></pre></td></tr></tbody></table>

### <a href="#AngularJS-Read-with-resource" class="headerlink" title="AngularJS Read with $resource"></a>AngularJS Read with $resource

If you click in one of the Todo elements and get redirected to the detail page, you will not see anything yet. We need to update the `TodoDetailCtrl` first. Even though we already have the GET verb working. We have a different URL requirement for `/todos/:id` for the other methods. There’s an Angular service that has a higher level of abstraction of $http to deal with RESTful requests. It is called `$resource`.

Initialize as: `$resource(url, [paramDefaults], [actions], options);`

It comes with the following actions already defined; it is missing one though… Can you tell?

$resource actions

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5</code></pre></td><td><pre><code>{ &#39;get&#39;:    {method:&#39;GET&#39;},  // get individual record
  &#39;save&#39;:   {method:&#39;POST&#39;}, // create record
  &#39;query&#39;:  {method:&#39;GET&#39;, isArray:true}, // get list all records
  &#39;remove&#39;: {method:&#39;DELETE&#39;}, // remove record
  &#39;delete&#39;: {method:&#39;DELETE&#39;} }; // same, remove record</code></pre></td></tr></tbody></table>

The instances are used in the following way (examples will come later):

-   GET: `Resource.get([parameters], [success], [error])`
-   Non-GET: `Resource.action([parameters], postData, [success], [error])`
-   Non-GET: `resourceInstance.$action([parameters], [success], [error])`

`$resource` is not part of the Angular core, so it requires to `ngResource` and the dependency. We can get it from the CDN:

ngResource dependency

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>&lt;script src=&quot;https://ajax.googleapis.com/ajax/libs/angularjs/1.2.25/angular-resource.min.js&quot;&gt;&lt;/script&gt;</code></pre></td></tr></tbody></table>

This is what need to set it up:

$resource.query()

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5
6
7
8
9
10
11
12
13
14
15</code></pre></td><td><pre><code>  // add ngResource dependency
  angular.module(&#39;app&#39;, [&#39;ngRoute&#39;, &#39;ngResource&#39;])

  // ...

        .factory(&#39;Todos&#39;, [&#39;$resource&#39;, function($resource){
          return $resource(&#39;/todos/:id&#39;, null, {
            &#39;update&#39;: { method:&#39;PUT&#39; }
          });
        }])
// ...
        .controller(&#39;TodoController&#39;, [&#39;$scope&#39;, &#39;Todos&#39;, function ($scope, Todos) {
          $scope.todos = Todos.query();
        }])
</code></pre></td></tr></tbody></table>

Angular will render an empty `$scope.todos`. but, when `Todos.query()` comes with the data from the server it will re-render the UI.

[diff](https://github.com/amejiarosario/todoAPIjs/commit/2aff6fe004bf7f7b2cd1b91d53e6958c3b158a20)

### <a href="#AngularJS-Create" class="headerlink" title="AngularJS Create"></a>AngularJS Create

We will need to create a new text box, a button to send a `POST` request to server and add it to the `$scope`.

> We are using inline templates with `id="/todos.html"` and `id="/todoDetails.html"`. They are not physical files. Just `ng-template` that we create in the [part I](/blog/2014/09/28/angularjs-tutorial-for-beginners-with-nodejs-expressjs-and-mongodb/) of these [tutorial series](/tags/Tutorial-MEAN-Stack/).

Add this code at the bottom of the `id="/todos.html"` template:

New textbox for adding Todos

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>New task &lt;input type=&quot;text&quot; ng-model=&quot;newTodo&quot;&gt;&lt;button ng-click=&quot;save()&quot;&gt;Create&lt;/button&gt;</code></pre></td></tr></tbody></table>

Notice that we are using a new directive `ng-click`, this one executes a function when it clicked. Angular makes sure that the behaviour is consistent across different browsers.

Save function $resource.$save(...)

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5
6
7
8
9
10
11
12
13</code></pre></td><td><pre><code>.controller(&#39;TodoController&#39;, [&#39;$scope&#39;, &#39;Todos&#39;, function ($scope, Todos) {
  $scope.todos = Todos.query();

  $scope.save = function(){
    if(!$scope.newTodo || $scope.newTodo.length &lt; 1) return;
    var todo = new Todos({ name: $scope.newTodo, completed: false });

    todo.$save(function(){
      $scope.todos.push(todo);
      $scope.newTodo = &#39;&#39;; // clear textbox
    });
  }
}])</code></pre></td></tr></tbody></table>

[diff](https://github.com/amejiarosario/todoAPIjs/commit/46dd14023e2d9eff72d1366dbba9c9c8c872e07b)

### <a href="#Show-Todo-details" class="headerlink" title="Show Todo details"></a>Show Todo details

Every time you click a todo link, it is showing an empty fields. Let’s fix that. First we need set the real `_id` to the links instead of `$index`.

Change the ID link in the \`id

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4</code></pre></td><td><pre><code>&lt;li ng-repeat=&quot;todo in todos | filter: search&quot;&gt;
  &lt;input type=&quot;checkbox&quot; ng-model=&quot;todo.completed&quot;&gt;
  &lt;a href=&quot;#/{{todo._id}}&quot;&gt;{{todo.name}}&lt;/a&gt;
&lt;/li&gt;</code></pre></td></tr></tbody></table>

Update TodoDetailCtrl with $resource.get

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3</code></pre></td><td><pre><code>.controller(&#39;TodoDetailCtrl&#39;, [&#39;$scope&#39;, &#39;$routeParams&#39;, &#39;Todos&#39;, function ($scope, $routeParams, Todos) {
  $scope.todo = Todos.get({id: $routeParams.id });
}])</code></pre></td></tr></tbody></table>

Notice the change from `$scope.todo = Todos[$routeParams.id];` to `$scope.todo = Todos.get({id: $routeParams.id });`

Now you should be able to see the details :)

[diff](https://github.com/amejiarosario/todoAPIjs/commit/2484107294163a25621fba3785601adb32229ae9)

### <a href="#AngularJS-Update-in-line-editing" class="headerlink" title="AngularJS Update (in-line editing)"></a>AngularJS Update (in-line editing)

This is going to be a very cool feature. Let’s meet these new directives:

-   **ng-show**: this directive shows the element if the expression evaluates to true. Otherwise, the content is hidden.

-   **ng-change**: directive for input elements that evaluates the expression after any change.

Replace the template with `id="/todos.html"` with the following:

Template todos.html

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16</code></pre></td><td><pre><code>&lt;!-- Template --&gt;
&lt;script type=&quot;text/ng-template&quot; id=&quot;/todos.html&quot;&gt;
  Search: &lt;input type=&quot;text&quot; ng-model=&quot;search.name&quot;&gt;
  &lt;ul&gt;
    &lt;li ng-repeat=&quot;todo in todos | filter: search&quot;&gt;
      &lt;input type=&quot;checkbox&quot; ng-model=&quot;todo.completed&quot; ng-change=&quot;update($index)&quot;&gt;
      &lt;a ng-show=&quot;!editing[$index]&quot; href=&quot;#/{{todo._id}}&quot;&gt;{{todo.name}}&lt;/a&gt;
      &lt;button ng-show=&quot;!editing[$index]&quot; ng-click=&quot;edit($index)&quot;&gt;edit&lt;/button&gt;

      &lt;input ng-show=&quot;editing[$index]&quot; type=&quot;text&quot; ng-model=&quot;todo.name&quot;&gt;
      &lt;button ng-show=&quot;editing[$index]&quot; ng-click=&quot;update($index)&quot;&gt;Update&lt;/button&gt;
      &lt;button ng-show=&quot;editing[$index]&quot; ng-click=&quot;cancel($index)&quot;&gt;Cancel&lt;/button&gt;
    &lt;/li&gt;
  &lt;/ul&gt;
  New task &lt;input type=&quot;text&quot; ng-model=&quot;newTodo&quot;&gt;&lt;button ng-click=&quot;save()&quot;&gt;Create&lt;/button&gt;
&lt;/script&gt;</code></pre></td></tr></tbody></table>

Now let’s change the controller to handle the inline editing:

Todo Controller

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29</code></pre></td><td><pre><code>.controller(&#39;TodoController&#39;, [&#39;$scope&#39;, &#39;Todos&#39;, function ($scope, Todos) {
  $scope.editing = [];
  $scope.todos = Todos.query();

  $scope.save = function(){
    if(!$scope.newTodo || $scope.newTodo.length &lt; 1) return;
    var todo = new Todos({ name: $scope.newTodo, completed: false });

    todo.$save(function(){
      $scope.todos.push(todo);
      $scope.newTodo = &#39;&#39;; // clear textbox
    });
  }

  $scope.update = function(index){
    var todo = $scope.todos[index];
    Todos.update({id: todo._id}, todo);
    $scope.editing[index] = false;
  }

  $scope.edit = function(index){
    $scope.editing[index] = angular.copy($scope.todos[index]);
  }

  $scope.cancel = function(index){
    $scope.todos[index] = angular.copy($scope.editing[index]);
    $scope.editing[index] = false;
  }
}])</code></pre></td></tr></tbody></table>

We added a new variable `$scope.editing` which shows or hides the form to edit the values. Furthermore, notice ng-click functions: edit, update and cancel.

> Let’s see what they do. Try it out!

While were are editing notice that we copy the original todo task into the editing variable. This server for two purposes:

1.  It evaluates to `true` and show the forms with `ng-show`

2.  It holds a copy of the original value in case we press cancel.

Now, going to the Todo Details. We would like that to be updated as well and add notes.

Todo Details

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5
6
7
8</code></pre></td><td><pre><code>&lt;script type=&quot;text/ng-template&quot; id=&quot;/todoDetails.html&quot;&gt;
  &lt;h1&gt;{{ todo.name }}&lt;/h1&gt;
  completed: &lt;input type=&quot;checkbox&quot; ng-model=&quot;todo.completed&quot;&gt;&lt;br&gt;
  note: &lt;textarea ng-model=&quot;todo.note&quot;&gt;&lt;/textarea&gt;&lt;br&gt;&lt;br&gt;

  &lt;button ng-click=&quot;update()&quot;&gt;Update&lt;/button&gt;
  &lt;a href=&quot;/&quot;&gt;Cancel&lt;/a&gt;
&lt;/script&gt;</code></pre></td></tr></tbody></table>

Similarly, we added an update method. However, this time we do not need to pass any index, since it is just one todo at a time. After it has been saved, it goes back to root path `/`.

TodoDetailCtrl controller

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5
6
7
8
9</code></pre></td><td><pre><code>.controller(&#39;TodoDetailCtrl&#39;, [&#39;$scope&#39;, &#39;$routeParams&#39;, &#39;Todos&#39;, &#39;$location&#39;, function ($scope, $routeParams, Todos, $location) {
  $scope.todo = Todos.get({id: $routeParams.id });

  $scope.update = function(){
    Todos.update({id: $scope.todo._id}, $scope.todo, function(){
      $location.url(&#39;/&#39;);
    });
  }
}])</code></pre></td></tr></tbody></table>

> Awesome! Time to check it out in the browser!

`$location.url([url])` is a getter/setter method that allows us to change url, thus routing/view.

[diff](https://github.com/amejiarosario/todoAPIjs/commit/b6394448e1e1e8384815877df764507d6562dc4d)

### <a href="#AngularJS-Delete" class="headerlink" title="AngularJS Delete"></a>AngularJS Delete

These are the changes added to perform the remove functionality:

A. Add removes button in the `li` element:

todos.html Template

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>&lt;button ng-show=&quot;!editing[$index]&quot; ng-click=&quot;remove($index)&quot;&gt;remove&lt;/button&gt;</code></pre></td></tr></tbody></table>

Do the same for the details Template

todoDetails.html Template

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>&lt;button ng-click=&quot;remove()&quot;&gt;Remove&lt;/button&gt;</code></pre></td></tr></tbody></table>

B. Add remove functionality in the controllers

TodoController

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5
6</code></pre></td><td><pre><code>$scope.remove = function(index){
  var todo = $scope.todos[index];
  Todos.remove({id: todo._id}, function(){
    $scope.todos.splice(index, 1);
  });
}</code></pre></td></tr></tbody></table>

And also in the details controllers

todoDetails controller

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5</code></pre></td><td><pre><code>$scope.remove = function(){
  Todos.remove({id: $scope.todo._id}, function(){
    $location.url(&#39;/&#39;);
  });
}</code></pre></td></tr></tbody></table>

When we remove elements from the todos array `$scope.todos.splice(index, 1)` they also disappear from the DOM. Very cool, huh?

[diff](https://github.com/amejiarosario/todoAPIjs/commit/b9ff3a863c78d72e71b5cc9eb573bb3cb9d87179)

> **Congratulations! You are now a MEAN developer!**

<a href="#What’s-next" class="headerlink" title="What’s next?"></a>What’s next?
-------------------------------------------------------------------------------

Learn how to use GruntJS to automate repetitive tasks in your MEAN Stack workflow.

[GruntJS Tutorial](/blog/2014/10/07/grunt-js-tutorial-from-beginner-to-ninja/)

Also, you can learn more about full-stack framework solutions.

### <a href="#Full-Stack-Javascript-Web-Frameworks" class="headerlink" title="Full-Stack Javascript Web Frameworks"></a>Full-Stack Javascript Web Frameworks

What we did in these three series tutorial could have been done with just few keystrokes in the comamnd line ;). However, it’s good to know what’s going on. But at this point you do. So, I will introduce you to some frameworks that can save you a lot of time.

**Using MEAN.io**

[MeanIO](http://mean.io/) uses a customized CLI tool: ‘mean’. Its approach for modularity is leaned towards self-contained packages that have code for both client and server files. At moment of writing this, it has nine packages ranging from MEAN-Admin, Translation, file uploads, image crop and more.

**Using MEAN.js**

[MeanJS](http://meanjs.org/) it is a fork from the creator of MEAN.IO, it uses Yeoman generators to generate Angular’s CRUD modules, routes, controllers, views, services, and more. Also has generators for Express: models, controllers, routes and tests. It has excellent documentation.

### <a href="#Others-Frameworks-to-look-at" class="headerlink" title="Others Frameworks to look at"></a>Others Frameworks to look at

-   [Meteor](https://www.meteor.com/) - Meteor is an open-source platform for building top-quality web apps in a fraction of the time, whether you’re an expert developer or just getting started.
-   [Sails](http://sailsjs.org/) - The web framework of your dreams. for your next web application.
-   [Yahoo! Mojito](https://developer.yahoo.com/cocktails/mojito/) - A JavaScript MVC framework for mobile applications, one of the Yahoo! Cocktails.
-   [Tower.js](http://towerjs.org/) - Small components for building apps, manipulating data, and automating a distributed infrastructure.

### Now, your turn!

Thanks for reading this far. Here are some things you can do next:

-   Found a typo? [Edit this post](https://github.com/amejiarosario/amejiarosario.github.io/edit/source/source/_posts/2014-10-03-mean-stack-tutorial-mongodb-expressjs-angularjs-nodejs.markdown).
-   Got questions? [comment](#comments-section) below.
-   Was it useful? Show your support and share it.



<a href="/grunt-js-tutorial-from-beginner-to-ninja/" class="article-nav-newer"><strong><em></em> newer</strong></a>

Grunt JS tutorial from Beginner to Ninja

<a href="/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/" class="article-nav-older"><strong>older <em></em></strong></a>

Creating RESTful APIs with NodeJS and MongoDB Tutorial (Part II)

Subscribe & stay up to date!

 









tutorial mean stack Series
==========================

[<img src="/images/AngularJSTutorial_small.png" width="300" height="250" />](/angularjs-tutorial-for-beginners-with-nodejs-expressjs-and-mongodb/)

### AngularJS tutorial for beginners with NodeJS ExpressJS and MongoDB (Part I)

[<img src="/images/RESTfulAPIs_NodeJS__mongodb_small.png" width="300" height="250" />](/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/)

### Creating RESTful APIs with NodeJS and MongoDB Tutorial (Part II)

[<img src="/images/mean_small.png" width="300" height="250" />](/mean-stack-tutorial-mongodb-expressjs-angularjs-nodejs/)

### MEAN Stack Tutorial MongoDB ExpressJS AngularJS NodeJS (Part III)

[<span id="back-to-top" title="Go back to the top of this page"> Top </span>](#) <a href="#" class="p-x-3" title="Improve this post"><em></em> Edit this post</a>

### Contents

1.  <a href="#Why-MEAN-stack" class="toc-link"><span class="toc-number">1.</span> <span class="toc-text">Why MEAN stack?</span></a>
2.  <a href="#TODO-app-with-MEAN" class="toc-link"><span class="toc-number">2.</span> <span class="toc-text">TODO app with MEAN</span></a>
    1.  <a href="#MEAN-Backend-with-MongoDB-ExpressJS-and-NodeJS" class="toc-link"><span class="toc-number">2.1.</span> <span class="toc-text">MEAN Backend with MongoDB, ExpressJS and NodeJS</span></a>
    2.  <a href="#MEAN-stack-front-end-with-AngularJS" class="toc-link"><span class="toc-number">2.2.</span> <span class="toc-text">MEAN stack front-end with AngularJS</span></a>
3.  <a href="#Wiring-up-the-App" class="toc-link"><span class="toc-number">3.</span> <span class="toc-text">Wiring up the App</span></a>
    1.  <a href="#AngularJS-Read-with-http" class="toc-link"><span class="toc-number">3.1.</span> <span class="toc-text">AngularJS Read with $http</span></a>
    2.  <a href="#AngularJS-Read-with-resource" class="toc-link"><span class="toc-number">3.2.</span> <span class="toc-text">AngularJS Read with $resource</span></a>
    3.  <a href="#AngularJS-Create" class="toc-link"><span class="toc-number">3.3.</span> <span class="toc-text">AngularJS Create</span></a>
    4.  <a href="#Show-Todo-details" class="toc-link"><span class="toc-number">3.4.</span> <span class="toc-text">Show Todo details</span></a>
    5.  <a href="#AngularJS-Update-in-line-editing" class="toc-link"><span class="toc-number">3.5.</span> <span class="toc-text">AngularJS Update (in-line editing)</span></a>
    6.  <a href="#AngularJS-Delete" class="toc-link"><span class="toc-number">3.6.</span> <span class="toc-text">AngularJS Delete</span></a>
4.  <a href="#What%E2%80%99s-next" class="toc-link"><span class="toc-number">4.</span> <span class="toc-text">What’s next?</span></a>
    1.  <a href="#Full-Stack-Javascript-Web-Frameworks" class="toc-link"><span class="toc-number">4.1.</span> <span class="toc-text">Full-Stack Javascript Web Frameworks</span></a>
    2.  <a href="#Others-Frameworks-to-look-at" class="toc-link"><span class="toc-number">4.2.</span> <span class="toc-text">Others Frameworks to look at</span></a>




