



<a href="/categories/coding/" class="category-link">Coding</a> &gt; <a href="/categories/coding/web-development/" class="category-link">Web Development</a> &gt; <a href="/categories/coding/web-development/angular/" class="category-link">Angular</a>

AngularJS tutorial for beginners with NodeJS ExpressJS and MongoDB (Part I)
===========================================================================

<span title="Last time this post was updated"> Last updated August 6th 2016 </span> <span class="m-x-2" title="Pageviews"> 653.2k </span> <span class="m-x-2" title="Click to go to the comments section"> [ <span class="disqus-comment-count" data-disqus-url="https://adrianmejia.com/angularjs-tutorial-for-beginners-with-nodejs-expressjs-and-mongodb/">0</span>](#disqus_thread) </span>

-   <a href="/tags/angularjs/" class="tag-list-link">angularjs</a><span class="tag-list-count">4</span>
-   <a href="/tags/nodejs/" class="tag-list-link">nodejs</a><span class="tag-list-count">12</span>
-   <a href="/tags/tutorial-mean-stack/" class="tag-list-link">tutorial_mean-stack</a><span class="tag-list-count">3</span>

![AngularJS tutorial for beginners with NodeJS ExpressJS and MongoDB (Part I)](/images/AngularJSTutorial_large.png)

This tutorial is meant to be as clear as possible. At the same time, we are going to cover the concepts that you will need most of the time. All the good stuff without the fat :)

<span id="more"></span>

> Check out the updated version of this post in here: [Create a CRUD App with Angular 9+ and TypeScript](/Angular-2-Tutorial-Create-a-CRUD-App-with-Angular-CLI-and-TypeScript/)

MEAN Stack tutorial series:

1.  AngularJS tutorial for beginners (Part I) **👈 you are here**
2.  [Creating RESTful APIs with NodeJS and MongoDB Tutorial (Part II)](/blog/2014/10/01/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/)
3.  [MEAN Stack Tutorial: MongoDB, ExpressJS, AngularJS and NodeJS (Part III)](/blog/2014/10/03/mean-stack-tutorial-mongodb-expressjs-angularjs-nodejs/)

We are going to start building all the examples in a single HTML file! It embedded JavaScript and NO styles/CSS for **simplicity**. Don’t worry, in the next tutorials, we will learn how to split use Angular modules. We are going to break down the code, add testing to it and styles.

<a href="#What-is-Angular-js" class="headerlink" title="What is Angular.js?"></a>What is Angular.js?
----------------------------------------------------------------------------------------------------

Angular.js is a MVW (Model-View-Whatever) open-source JavaScript web framework that facilitates the creation of single-page applications (SPA) and data-driven apps.

### <a href="#AngularJS-vs-jQuery-vs-BackboneJS-vs-EmberJS" class="headerlink" title="AngularJS vs jQuery vs BackboneJS vs EmberJS"></a>AngularJS vs jQuery vs BackboneJS vs EmberJS

[TL; DR](#start): AngularJS is awesome for building testable single page applications (SPA). Also, excel with data-driven and CRUD apps. [Show me the code!.](#start)

AngularJS motto is

> HTML enhanced for web apps!

It extends standard HTML tags and properties to bind events and data into it using JavaScript. It has a different approach to other libraries. jQuery, Backbone.Js, Ember.js and similar… they are more leaned towards “Unobtrusive JavaScript”.

Traditional JavaScript frameworks, use IDs and classes in the elements. That gives the advantage of separating structure (HTML) from behavior (Javascript). Yet, it does not do any better on code complexity and readability. Angular instead declares the event handlers right in the element that they act upon.

Times have changed since then. Let’s examine how AngularJS tries to ease code complexity and readability:

-   **Unit testing** ready: JavaScript is, usually, hard to unit test. When you have DOM manipulations and business logic together (e.g. jQuery based code). AngularJS keeps DOM manipulation in the HTML and business logic separated. Data and dependencies are `$injected` as needed.
-   **DOM manipulation** where they are used. It decouples DOM manipulation from application logic.
-   AngularJS is also excellent for **single-page applications (SPA)**.
-   Different **browsers implement** features differently, but fret not. Angular’s directive (or HTML extensions) take care of the differences for you.
-   **Global namespace** expressions and methods definitions are scoped within controllers. So, they do not pollute the global namespace.
-   **Data models** are plain old JavaScript objects (POJO).
-   Write less code: AngualarJS features save you from much boilerplate code.
-   AngularJS provides solutions for writing modular code and dependencies management.

Without further ado, let’s dive in!

<span id="start"></span>

<a href="#AngularJS-Main-Components" class="headerlink" title="AngularJS Main Components"></a>AngularJS Main Components
-----------------------------------------------------------------------------------------------------------------------

AngularJS has an [extensive API](https://docs.angularjs.org/api) and components. In this tutorial we are going to focus on the most important ones, such as directives, modules, services, controllers and related concepts.

### <a href="#AngularJS-Directives" class="headerlink" title="AngularJS Directives"></a>AngularJS Directives

The first concept you need to know about AngularJS is what are directives.

**Directives** are extensions of HTML markups. They could take the form of attributes, element names, CSS class and or even HTML comments. When the AngularJS framework is loaded, everything inside `ng-app` it’s compiled. The directives are bound to data, events, and DOM transformations.

Notice in the following example that there are two directives: ng-app and ng-model.

Notice in the following example that there are two directives: `ng-app` and `ng-model`.

Hello World in AngularJS[link](http://codepen.io/amejiarosario/pen/KdLaq)

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
11</code></pre></td><td><pre><code>&lt;html ng-app&gt;
&lt;head&gt;
  &lt;title&gt;Hello World in AngularJS&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;input ng-model=&quot;name&quot;&gt; Hello {{ name }}

&lt;script src=&quot;https://ajax.googleapis.com/ajax/libs/angularjs/1.2.25/angular.min.js&quot;&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre></td></tr></tbody></table>

We going to learn about some of the main built-in directives as we go:

-   **ng-app**: is a directive that bootstraps AngularJS. It designates the caller element as the root. It’s usually placed on `<html>` or `<body>`.

-   **ng-model**: is a directive that binds usually form elements. For instance, `input`, `select`, `checkboxes`, `textarea`. They keep data (model) and visual elements (HTML) in sync.

-   **{{ name }}** `{{ }}` are a way of binding models to elements in HTML. In the example above, the `ng-model` name is bound to the placeholder `{{ name }}`. Play with the example below to see how the placeholder is updated real-time to whatever you type in the textbox.

Data binding AngularJS example:

See the Pen [KdLaq](http://codepen.io/amejiarosario/pen/KdLaq/) by ([@amejiarosario](http://codepen.io/amejiarosario)) on [CodePen](http://codepen.io).

You can create your own directives. Checkout the this tutorial for more: [creating-custom-angularjs-directives-for-beginners](/blog/2016/04/08/creating-custom-angularjs-directives-for-beginners/). It will go deeper into directives.

### <a href="#AngularJS-Data-Binding" class="headerlink" title="AngularJS Data Binding"></a>AngularJS Data Binding

**Data binding** is an AngularJS feature that synchronizes your model data with your HTML. That’s great because models are the “single source of truth”. You do not have to worry about updating them. Here’s a graph from [docs.angularjs.org](http://docs.angularjs.org).

![](/images/Two_Way_Data_Binding.png "Two Data Binding in Angular Templates")

Whenever the HTML is changed, the model gets updated. Wherever the model gets updated it is reflected in HTML.

### <a href="#AngularJS-Scope" class="headerlink" title="AngularJS Scope"></a>AngularJS Scope

`$scope` it is an object that contains all the data to which HTML is bound. They are the glue your javascript code (controllers) and the view (HTML). Everything that is attached to the `$scope`, it is `$watch`ed by AngularJS and updated.

Scopes can be bound to javascript functions. Also, you could have more than one `$scope` and inherit from outer ones. More on this, in the controller’s section.

### <a href="#AngularJS-Controllers" class="headerlink" title="AngularJS Controllers"></a>AngularJS Controllers

Angular.js **controllers** are code that “controls” certain sections containing DOM elements. They encapsulate the behavior, callbacks and glue `$scope` models with views. Let’s see an example to drive the concept home:

AngularJS Controller Example[link](http://codepen.io/amejiarosario/pen/spuCm)

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
21</code></pre></td><td><pre><code>&lt;body ng-controller=&quot;TodoController&quot;&gt;
  &lt;ul&gt;
    &lt;li ng-repeat=&quot;todo in todos&quot;&gt;
      &lt;input type=&quot;checkbox&quot; ng-model=&quot;todo.completed&quot;&gt;
      {% raw  %}{{ todo.name }}{% endraw %}
    &lt;/li&gt;
  &lt;/ul&gt;

  &lt;script&gt;
    function TodoController($scope){
      $scope.todos = [
        { name: &#39;Master HTML/CSS/Javascript&#39;, completed: true },
        { name: &#39;Learn AngularJS&#39;, completed: false },
        { name: &#39;Build NodeJS backend&#39;, completed: false },
        { name: &#39;Get started with ExpressJS&#39;, completed: false },
        { name: &#39;Setup MongoDB database&#39;, completed: false },
        { name: &#39;Be awesome!&#39;, completed: false },
      ]
    }
  &lt;/script&gt;
&lt;/body&gt;</code></pre></td></tr></tbody></table>

AngularJS controller interactive example:

See the Pen [spuCm](http://codepen.io/amejiarosario/pen/spuCm/) by ([@amejiarosario](http://codepen.io/amejiarosario)) on [CodePen](http://codepen.io).

As you might notice we have new friends: `ng-controller`, `ng-repeat` and `$scope`.

-   **`ng-controller`** is a directive that tells angular what function controller to use for a particular view. Every time AngularJS loads, it reads the `ng-controller` argument (in this case “TodoController”). Then, it will look for a function in plain old javascript object (POJO) with the same name or for `angular.controller` matching name.

-   **`$scope`** As mentioned earlier `$scope`‘s are the glue between the data models in the controllers and the views. Take a look to our “TodoController” it has a parameter named `$scope`. AngularJS is going to pass (`$inject`) that parameter, and whatever you attach to it, it will be available in the view. In this example is the particular is the `todos` array of objects.

-   **`ng-repeat`** as its name implies, it is going to “repeat” the element and sub-elements where this directive is declared. It is going to iterate for each element in the `$scope.todos` array.

-   **`ng-model`** notice that the checkbox is bound to the `todo.completed`. If `todo.completed` is true, then the checkbox is going to be checked and vice versa.

### <a href="#AngularJS-Modules" class="headerlink" title="AngularJS Modules"></a>AngularJS Modules

Modules are a way to encapsulate different parts of your application. They allow reusing code in other places. Here’s an example of how to rewrite our controller using modules.

AngularJS Module Example[link](http://codepen.io/amejiarosario/pen/spuCm)

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5
6
7
8
9
10</code></pre></td><td><pre><code>angular.module(&#39;app&#39;, [])
  .controller(&#39;TodoController&#39;, [&#39;$scope&#39;, function ($scope) {
    $scope.todos = [
      { title: &#39;Learn Javascript&#39;, completed: true },
      { title: &#39;Learn Angular.js&#39;, completed: false },
      { title: &#39;Love this tutorial&#39;, completed: true },
      { title: &#39;Learn Javascript design patterns&#39;, completed: false },
      { title: &#39;Build Node.js backend&#39;, completed: false },
    ];
  }]);</code></pre></td></tr></tbody></table>

Notice the `<html ng-app="app">` in the example below

See the Pen [uFfqG](http://codepen.io/amejiarosario/pen/uFfqG/) by ([@amejiarosario](http://codepen.io/amejiarosario)) on [CodePen](http://codepen.io).

Using modules brings many advantages. They can be loaded in any order, and parallel dependency loading. Also, tests can only load the required modules and keep it fast, clear view of the dependencies.

### <a href="#AngularJS-Templates" class="headerlink" title="AngularJS Templates"></a>AngularJS Templates

Templates contain HTML and Angular elements (directives, markup, filters or form controls). They can be cached and referenced by an id.

Here’s an example:

AngularJS Template Example[download](https://gist.github.com/amejiarosario/eebd176cb1796769ec2b)

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5
6
7
8</code></pre></td><td><pre><code>&lt;script type=&quot;text/ng-template&quot; id=&quot;/todos.html&quot;&gt;
  &lt;ul&gt;
    &lt;li ng-repeat=&quot;todo in todos&quot;&gt;
      &lt;input type=&quot;checkbox&quot; ng-model=&quot;todo.completed&quot;&gt;
      {{ todo.name }}
    &lt;/li&gt;
  &lt;/ul&gt;
&lt;/script&gt;</code></pre></td></tr></tbody></table>

Does the code inside looks familiar? ;)

Notice they are inside the `script` and has a type of `text/ng-template`.

### <a href="#AngularJS-Routes-ngRoutes" class="headerlink" title="AngularJS Routes (ngRoutes)"></a>AngularJS Routes (ngRoutes)

ngRoutes module allows changing what we see in the app depending on the URL (route). It, usually, uses templates to inject the HTML into the app.

It does not come with AngularJS core module, so we have to list it as a dependency. We are going to get it from Google CDN:

`<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.25/angular-route.min.js"></script>`

**NEW FEATURE**: add notes to the todo tasks. Let’s start with the routes!

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5
6
7
8</code></pre></td><td><pre><code>angular.module(&#39;app&#39;, [&#39;ngRoute&#39;])
  .config([&#39;$routeProvider&#39;, function ($routeProvider) {
    $routeProvider
      .when(&#39;/&#39;, {
        templateUrl: &#39;/todos.html&#39;,
        controller: &#39;TodoController&#39;
      });
  }]);</code></pre></td></tr></tbody></table>

See the Pen [CmnFH](http://codepen.io/amejiarosario/pen/CmnFH/) by ([@amejiarosario](http://codepen.io/amejiarosario)) on [CodePen](http://codepen.io).

-   First notice that we removed `ng-controller="TodoController"` from the body tag. The controllers are now called based on the route.

-   `ngView` is a directive used by `$routeProvider` to render HTML into it. Every time the URL changes, it will inject a new HTML template and controller into ngView.

### <a href="#AngularJS-Services-Factories" class="headerlink" title="AngularJS Services (Factories)"></a>AngularJS Services (Factories)

Notice that if you want to create a 2nd controller and share $scope.todos it is not possible right now. That is when services become handy. Services are a way to inject data dependencies into controllers. They are created through factories. Let’s see it in action:

AngularJS Service Factory Example

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
19</code></pre></td><td><pre><code>angular.module(&#39;app&#39;, [&#39;ngRoute&#39;])

  .factory(&#39;Todos&#39;, function(){
    return [
      { name: &#39;AngularJS Directives&#39;, completed: true },
      { name: &#39;Data binding&#39;, completed: true },
      { name: &#39;$scope&#39;, completed: true },
      { name: &#39;Controllers and Modules&#39;, completed: true },
      { name: &#39;Templates and routes&#39;, completed: true },
      { name: &#39;Filters and Services&#39;, completed: false },
      { name: &#39;Get started with Node/ExpressJS&#39;, completed: false },
      { name: &#39;Setup MongoDB database&#39;, completed: false },
      { name: &#39;Be awesome!&#39;, completed: false },
    ];
  })

  .controller(&#39;TodoController&#39;, [&#39;$scope&#39;, &#39;Todos&#39;, function ($scope, Todos) {
    $scope.todos = Todos;
  }])</code></pre></td></tr></tbody></table>

We are now injecting the data dependency `Todo` into the controllers. This way we could reuse the data to any controller or module that we need to. This is not only used for static data like the array. But we could also do server calls using `$http` or even RESTful `$resource`.

Let’s say we want to show the details of the task when we click on it. For that, we need to create a 2nd controller, template, and route that uses this service:

See the Pen [pGkhg](http://codepen.io/amejiarosario/pen/pGkhg/) by ([@amejiarosario](http://codepen.io/amejiarosario)) on [CodePen](http://codepen.io).

(NOTE: Click on the links and it will take you to the todo details. Use backspace key to go back to the main menu)

This is what is happening:

1.  In the `HTML` tab, we created a second template `/todoDetails.html` which contains the todo details we want to show.
2.  Also, in our previous template `/todos.html` we want to have a link that points to the `todo` detail. We are using the `$index` which is the corresponding order number in a `ng-repeat`.
3.  In the `JS` tab, we created a new `$routeProvider` . It points to a new controller `TodoDetailCtrl` and the template that we created on \#1. The `:id` parameter it is accessible in the controllers through `$routeParams`.
4.  We Created the new controller `TodoDetailCtrl`. Also, we injected the dependencies which are `$scope`, `Todos` (factory), and `$routeParams` which will have the `id` param.
5.  Set the `$scope` in the new controller. Instead of using the whole array, we are going to select only the one that we need using the `id` that we set in step \#2.

NOTE: in codepen, you will not see the URL. If you want to see it changing, you can download the whole example an open it from [here](https://gist.github.com/amejiarosario/f0a82c7a0eec4786f1c9).

### <a href="#AngularJS-Filters" class="headerlink" title="AngularJS Filters"></a>AngularJS Filters

Filters allow you to format and transform data. They change the output of expressions inside the curly braces. AngularJS comes with a bunch of useful filters.

**Built-in Filters**:

-   *filter*: search for a given string in an array and return matches.
-   *Number*: adds comma-separated 1000’s and two decimal places.
-   *Currency*: the same as *Number* and adds a $ in front.
-   *Date*: takes a Unix timestamp (e.g. 1288323623006) or date string and output it in the format that you specify (e.g. ‘longDate’ or fragments ‘yyyy’ for a four-digit year). For a full list see [here](https://docs.angularjs.org/api/ng/filter/date).
-   *JSON*: converts javascript objects to JSON strings.
-   *lowercase*/*uppercase*: converts strings to lowercase/uppercase.
-   *limitTo*: number of elements from an array to show.
-   *orderBy*: order array of objects by a key that you specify.

**Note** you can also chain many filters and also define your own filters.

See the Pen [tyuDK](http://codepen.io/amejiarosario/pen/tyuDK/) by ([@amejiarosario](http://codepen.io/amejiarosario)) on [CodePen](http://codepen.io).

> **NEW FEATURE**: Search todo tasks by name. Let’s use a filter to solve that problem.

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5
6
7
8
9</code></pre></td><td><pre><code>&lt;script type=&quot;text/ng-template&quot; id=&quot;/todos.html&quot;&gt;
  Search: &lt;input type=&quot;text&quot; ng-model=&quot;search.name&quot;&gt;
  &lt;ul&gt;
    &lt;li ng-repeat=&quot;todo in todos | filter: search&quot;&gt;
      &lt;input type=&quot;checkbox&quot; ng-model=&quot;todo.completed&quot;&gt;
      &lt;a href=&quot;#/{{$index}}&quot;&gt;{{todo.name}}&lt;/a&gt;
    &lt;/li&gt;
  &lt;/ul&gt;
&lt;/script&gt;</code></pre></td></tr></tbody></table>

Notice that we are using `search.name` in the `ng-model` for search. That will limit the search to the `name` attribute and `search.notes` will look inside the notes only. Guest what `search` would do then? Precisely! It searches in all the attributes. Fork the following example and try it out:

See the Pen [ahwbz](http://codepen.io/amejiarosario/pen/ahwbz/) by ([@amejiarosario](http://codepen.io/amejiarosario)) on [CodePen](http://codepen.io).

<a href="#What’s-next" class="headerlink" title="What’s next?"></a>What’s next?
-------------------------------------------------------------------------------

Congrats! You have completed part 1 of this [3 part series](/tags/Tutorial-MEAN-Stack/). We are going to build upon the things learned in here, in the next post we are going to setup a backend in NodeJS and MongoDB and connect it to AngularJS to provide a full featured CRUD app. Continue with:

-   Part II - [NodeJS/ExpressJS and MongoDB/Mongoose](/blog/2014/10/01/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/)

-   Part III - [MEAN Stack: Wiring all together](/blog/2014/10/03/mean-stack-tutorial-mongodb-expressjs-angularjs-nodejs/)

I also have created BackboneJS tutorials check it out:

-   [BackboneJS Tutorials](/tags/backbonejs)

#### <a href="#ng-test" class="headerlink" title="ng-test"></a>ng-test

Congrats, you have reached this far! It is time to test what you have learned. Test-Driven Learning (TDL) ;). Here’s the challenge: open [this file](https://gist.githubusercontent.com/amejiarosario/26751cb85d088fd59c28/raw/c2dde0797c8d47d359c2137fc9a15a9228c272ca/index.html) on your favorite code editor. Copy the boilerplate code and built the full app that we just build in the previous examples. Of course, you can take a peek from time to time if you get stuck ;)

Download this file as…:

[index.html](https://gist.githubusercontent.com/amejiarosario/26751cb85d088fd59c28/raw/c2dde0797c8d47d359c2137fc9a15a9228c272ca/index.html)

-OR-

Fork and edit online:

See the Pen [degzC](http://codepen.io/amejiarosario/pen/degzC/) by ([@amejiarosario](http://codepen.io/amejiarosario)) on [CodePen](http://codepen.io).

#### <a href="#ng-solution" class="headerlink" title="ng-solution"></a>ng-solution

This is the full solution and you can see it [live in here](https://cdn.rawgit.com/amejiarosario/068143b53e54db43ef38/raw/b703b591bc84f2d59a2a483169294e2fb232419d/ngTodo.html#/).

### Now, your turn!

Thanks for reading this far. Here are some things you can do next:

-   Found a typo? [Edit this post](https://github.com/amejiarosario/amejiarosario.github.io/edit/source/source/_posts/2014-09-28-angularjs-tutorial-for-beginners-with-nodejs-expressjs-and-mongodb.md).
-   Got questions? [comment](#comments-section) below.
-   Was it useful? Show your support and share it.



<a href="/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/" class="article-nav-newer"><strong><em></em> newer</strong></a>

Creating RESTful APIs with NodeJS and MongoDB Tutorial (Part II)

<a href="/cheap-airplay-receiver-with-raspberry-pi/" class="article-nav-older"><strong>older <em></em></strong></a>

Cheap Airplay receiver with Raspberry Pi

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

1.  <a href="#What-is-Angular-js" class="toc-link"><span class="toc-number">1.</span> <span class="toc-text">What is Angular.js?</span></a>
    1.  <a href="#AngularJS-vs-jQuery-vs-BackboneJS-vs-EmberJS" class="toc-link"><span class="toc-number">1.1.</span> <span class="toc-text">AngularJS vs jQuery vs BackboneJS vs EmberJS</span></a>
2.  <a href="#AngularJS-Main-Components" class="toc-link"><span class="toc-number">2.</span> <span class="toc-text">AngularJS Main Components</span></a>
    1.  <a href="#AngularJS-Directives" class="toc-link"><span class="toc-number">2.1.</span> <span class="toc-text">AngularJS Directives</span></a>
    2.  <a href="#AngularJS-Data-Binding" class="toc-link"><span class="toc-number">2.2.</span> <span class="toc-text">AngularJS Data Binding</span></a>
    3.  <a href="#AngularJS-Scope" class="toc-link"><span class="toc-number">2.3.</span> <span class="toc-text">AngularJS Scope</span></a>
    4.  <a href="#AngularJS-Controllers" class="toc-link"><span class="toc-number">2.4.</span> <span class="toc-text">AngularJS Controllers</span></a>
    5.  <a href="#AngularJS-Modules" class="toc-link"><span class="toc-number">2.5.</span> <span class="toc-text">AngularJS Modules</span></a>
    6.  <a href="#AngularJS-Templates" class="toc-link"><span class="toc-number">2.6.</span> <span class="toc-text">AngularJS Templates</span></a>
    7.  <a href="#AngularJS-Routes-ngRoutes" class="toc-link"><span class="toc-number">2.7.</span> <span class="toc-text">AngularJS Routes (ngRoutes)</span></a>
    8.  <a href="#AngularJS-Services-Factories" class="toc-link"><span class="toc-number">2.8.</span> <span class="toc-text">AngularJS Services (Factories)</span></a>
    9.  <a href="#AngularJS-Filters" class="toc-link"><span class="toc-number">2.9.</span> <span class="toc-text">AngularJS Filters</span></a>
3.  <a href="#What%E2%80%99s-next" class="toc-link"><span class="toc-number">3.</span> <span class="toc-text">What’s next?</span></a>
    1.  <a href="#ng-test" class="toc-link"><span class="toc-number">3.0.1.</span> <span class="toc-text">ng-test</span></a>
    2.  <a href="#ng-solution" class="toc-link"><span class="toc-number">3.0.2.</span> <span class="toc-text">ng-solution</span></a>




