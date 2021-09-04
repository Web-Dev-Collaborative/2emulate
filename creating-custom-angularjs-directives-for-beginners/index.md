



<a href="/categories/coding/" class="category-link">Coding</a> &gt; <a href="/categories/coding/web-development/" class="category-link">Web Development</a> &gt; <a href="/categories/coding/web-development/angular/" class="category-link">Angular</a>

Creating custom AngularJS directives for beginners
==================================================

<span title="Last time this post was updated"> Last updated April 8th 2016 </span> <span class="m-x-2" title="Pageviews"> 38.1k </span> <span class="m-x-2" title="Click to go to the comments section"> [ <span class="disqus-comment-count" data-disqus-url="https://adrianmejia.com/creating-custom-angularjs-directives-for-beginners/">0</span>](#disqus_thread) </span>

-   <a href="/tags/angularjs/" class="tag-list-link">angularjs</a><span class="tag-list-count">4</span>
-   <a href="/tags/javascript/" class="tag-list-link">javascript</a><span class="tag-list-count">5</span>

![Creating custom AngularJS directives for beginners](/images/angularjs_directives_large.png)

Directives are one of the most important concepts to understand Angular. This tutorial takes through the basics and beyond. We will cover how to build your own HTML extensions through directives.

<span id="more"></span>

Angular framework relies heavily on them to teach the browser new HTML tags. Directives are a powerful tool to create reusable web components. Directives not only could be defined as new HTML tags but also as attributes, CSS classes or even HTML comments. Angular comes with many built-in (core) directives that offer numerous functionalities to your web applications right away. Furthermore, it also allows us to define our own through custom directives. We are going to focus on the later.

Let’s say we want to create a new HTML component that the browsers doesn’t support yet, like a To-do list:

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>&lt;my-todo list=&quot;todo&quot; title=&quot;Angular Todo&quot;&gt;&lt;/my-todo&gt;</code></pre></td></tr></tbody></table>

If you paste that code in any browser, it will not do much. We need to use Angular to teach the browser how to interpret this new HTML element called “my-todo”. We do this by defining a new directive with its attributes.

Let’s initialize our app and define our new directive:

Create a new file called “script.js”

script.js

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
12</code></pre></td><td><pre><code>var app = angular.module(&#39;myApp&#39;, []);

app.directive(&#39;myTodo&#39;, function(){
    return {
      restrict: &#39;EA&#39;,
      templateUrl: &#39;todo.tpl.html&#39;,
      scope: {
        list: &#39;=&#39;,
        title: &#39;@&#39;
      }
    };
  });</code></pre></td></tr></tbody></table>

Don’t get scared if you don’t understand what’s going on right now. By the end of this tutorial, you will be able to know what each line is doing.

In the first line, we initialize an angular module called “myApp”. That will return an “app” instance where we can start defining our Angular app.

We start by adding a directive called “myTodo”, notice that is different from “my-todo” that we used in the HTML code above. That’s because, by convention in HTML, tags names words are separated by a hyphen like “my-todo”. On the other hand, in Angular they match the same element with words joint together and capitalizing the beginning of each word, except the first one “myTodo”. This style of joining words is known as “camelCase”.

You will notice that a directive, takes a name “myTodo” and function. The later returns an object with a number of attributes depending on what we would like to accomplish. In our case, we have three attributes: restrict, templateUrl, and scope. Let’s explain each one in that exact order.

<a href="#Restrict" class="headerlink" title="Restrict"></a>Restrict
--------------------------------------------------------------------

The “restrict” attribute tells Angular, with one letter, how are we going to create our new directive. It can take four different values ‘E’, ‘A’, ‘C’, ‘M’ or combination of them like ‘EA’. Each one has it’s own meaning:

<table><thead><tr class="header"><th>Restrict</th><th>Meaning</th><th>Example</th></tr></thead><tbody><tr class="odd"><td>E</td><td>Implies we are going to use our directive as a new HTML element.</td><td><code>&lt;my-todo list="todo" title="Element"&gt; &lt;/my-todo&gt;</code></td></tr><tr class="even"><td>A</td><td>Means that our directive is going to take over any HTML element that has an attribute that matches our directive name.</td><td><code>&lt;div my-todo list="todo" title="Attr"&gt; &lt;/div&gt;</code></td></tr><tr class="odd"><td>C</td><td>Indicates that our directive will be found in CSS classes.</td><td><code>&lt;div class="my-todo" list="todo" title="Class"&gt; &lt;/div&gt;</code></td></tr><tr class="even"><td>M</td><td>Matches HTML comments.</td><td><code>&lt;!--directive:my-todo attributes goes here--&gt;</code></td></tr></tbody></table>

Taking our To-do example, with the combined value ‘EA’, means that will match any element with our directive as an attribute, and also, it will match any element defined as “”

It is a good practice only to use restrict to either ‘E’ or ‘A’ or both. Classes ‘C’ and comments ‘M’ could be easily misinterpreted. That’s why we are using just EA.

<a href="#Template" class="headerlink" title="Template"></a>Template
--------------------------------------------------------------------

Templates are just HTML code that could be reuse multiple times with different values or text. In order to be generic enough, they use placeholders tied to variables that could be easily replaced. Let’s create the “todo.tpl.html” with the following content:

todo.tpl.html

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4</code></pre></td><td><pre><code>&lt;h1&gt;{{title}}&lt;/h1&gt;
&lt;div ng-repeat=&quot;todo in list&quot;&gt;
  &lt;input type=&quot;checkbox&quot; ng-model=&quot;todo.completed&quot;&gt; {{todo.name}}
&lt;/div&gt;</code></pre></td></tr></tbody></table>

Notice that our template contains placeholders with a variable such as Creating custom AngularJS directives for beginners, which is going, to be replaced by real title text. Similarly, is going to be replaced with a task name.

We just used our first built-in Angular directive, in this tutorial, “ng-repeat”. This directive is going to take an array of elements, like our list and repeat itself for each one of elements and refer to them as “todo”. In other words, if the list contains 4 tasks, we are going to see 4 checkboxes each one with the name of the individual tasks. We are going to explain where “title” and “list” comes in the next section.

Going back to our directive definition, we could have used “template” attribute instead of “templateUrl” and take inline html code directly, but often is hard to read and we would prefer to use “templateUrl” and defined as a separated file.

As you might figure it out, “templateUrl” takes the name of the file containing the template. If all templates and code are in the same directory just the name of the file will do. If they are in a different folder you will need to specify the full path to reach it. To keep it simple, we are going to have all files in a single directory.

<a href="#Scope" class="headerlink" title="Scope"></a>Scope
-----------------------------------------------------------

Scopes are key concept to understand Angular. Scope is what glues JavaScript code with HTML and allow us to replace placeholders from templates with real values.

In our directive definition, we are creating a new “isolated scope” with two elements:

Isolated scope

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4</code></pre></td><td><pre><code>scope: {
  list: &#39;=&#39;,
  title: &#39;@&#39;
}</code></pre></td></tr></tbody></table>

If you remember from our template, these are exactly the two placeholders that we had “title” and “list”. The symbols = and @ looks a little mysterious but they are not too cryptic once we know what they mean.

-   `@` Implies that the value of the attribute with the same name in the HTML element will be passed as a string. For instance, , will replace Creating custom AngularJS directives for beginners in our template for “The Directive”.
-   `=` Binds to the value of the expression and to the literal value. This means that if we have an attribute list=“todo” and “todo” is equal to 5, then it will be replaced to 5 and not to the literal text “todo”. In our case, “todo” is going to be an array of tasks.

Bear in mind, that in Angular we can have multiple scopes. So, our directives could be influenced by outer scopes. For instance, another scope could define “todo” as an array of elements. Here is where we introduce another important concept: controllers.

<a href="#Controllers" class="headerlink" title="Controllers"></a>Controllers
-----------------------------------------------------------------------------

The main purpose of controllers is to set initial values the scope and also add behavior through functions. We are going to use a controller to define the “todo” list that we want to render with our newly created directive.

The way we create controllers is by attaching the controller to our Angular app instance. Let’s go back to script.js and append the following:

script.js

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5
6
7</code></pre></td><td><pre><code>app.controller(&#39;main&#39;, function($scope){
  $scope.todo = [
    {name: &#39;Create a custom directive&#39;, completed: true},
    {name: &#39;Learn about restrict&#39;, completed: true},
    {name: &#39;Master scopes&#39;, completed: false}
  ];
});</code></pre></td></tr></tbody></table>

Noticed that we defined our controller with the name “main” and pass along a function with the “$scope” parameter. This is important since, whatever we attach to the “$scope” variable it will become available in templates and other directives. We just defined our todo list as an array of objects with two properties name and completed.

<a href="#To-do-directive" class="headerlink" title="To-do directive"></a>To-do directive
-----------------------------------------------------------------------------------------

So far, we have been preparing the grounds for our directive. We have created:

-   “myApp” module
-   “myTodo” directive
-   “todo.tpl.html” template
-   “main” controller

Now, is the time to put everything together and make it work!

Let’s create an index.html page with the following:

index.html

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
16</code></pre></td><td><pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;

  &lt;head&gt;
    &lt;script data-require=&quot;angular.js@1.5.0&quot; data-semver=&quot;1.5.0&quot; src=&quot;https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular.js&quot;&gt;&lt;/script&gt;
   &lt;script src=&quot;script.js&quot;&gt;&lt;/script&gt;
  &lt;/head&gt;

  &lt;body ng-app=&quot;myApp&quot;&gt;

    &lt;div ng-controller=&quot;main&quot;&gt;
  &lt;my-todo list=&quot;todo&quot; title=&quot;Angular To-do&quot;&gt;&lt;/my-todo&gt;
    &lt;/div&gt;

  &lt;/body&gt;
&lt;/html&gt;</code></pre></td></tr></tbody></table>

We add the AngularJS library first and then initialize the app using the built-in directive “ng-app”. Notice that this must match to module that we created “myApp” or it won’t work.

Later, we reference our controller using another core directive called “ng-controller”. Similarly to ng-app, it also takes a value that should match the one we defined, in this case “main” controller. This main controller defines our “todo” as an array of tasks with names and whether they have been completed or not.

Finally, we start using our new directive! It takes two attributes the title and a list. If you remember, we defined a template inside the directive definition, so it knows how to render the content.

That’s all you need to make it work. Now try it!

<a href="#Next-steps" class="headerlink" title="Next steps"></a>Next steps
--------------------------------------------------------------------------

By now you should be looking at our new To-do list. We can reuse this new directive with new to-do lists as many times as we want. Just passing different values to “list” in our “my-todo” the browser will be able to render it for us. We can also define another controller with a different $scope.todo and our directive will respond accordantly.

We just walked through the main attributes to create directives and discuss how to use them. We learnt how to isolate the scope of our directive and just allow certain parameters into our templates such as “list” and “title”. Also, used the “restrict” attribute to allow our directive be created either as a new HTML element or as an attribute. Finally, we explore how to use templates and bind it with our scope variables.

### <a href="#Related-Posts" class="headerlink" title="Related Posts"></a>Related Posts

-   [AngularJS Tutorial for Beginners](/blog/2014/09/28/angularjs-tutorial-for-beginners-with-nodejs-expressjs-and-mongodb/)
-   [Angular and Node tutorial](/blog/2014/10/03/mean-stack-tutorial-mongodb-expressjs-angularjs-nodejs/)

### Now, your turn!

Thanks for reading this far. Here are some things you can do next:

-   Found a typo? [Edit this post](https://github.com/amejiarosario/amejiarosario.github.io/edit/source/source/_posts/2016-04-08-creating-custom-angularjs-directives-for-beginners.markdown).
-   Got questions? [comment](#comments-section) below.
-   Was it useful? Show your support and share it.



<a href="/List-tasks-in-npm-grunt-gulp-and-rake/" class="article-nav-newer"><strong><em></em> newer</strong></a>

List tasks in NPM, Yarn, Grunt, Gulp and Rake

<a href="/how-to-scale-a-nodejs-app-based-on-number-of-users/" class="article-nav-older"><strong>older <em></em></strong></a>

How to scale a Nodejs app based on number of users

Subscribe & stay up to date!

 









[<span id="back-to-top" title="Go back to the top of this page"> Top </span>](#) <a href="#" class="p-x-3" title="Improve this post"><em></em> Edit this post</a>

### Contents

1.  <a href="#Restrict" class="toc-link"><span class="toc-number">1.</span> <span class="toc-text">Restrict</span></a>
2.  <a href="#Template" class="toc-link"><span class="toc-number">2.</span> <span class="toc-text">Template</span></a>
3.  <a href="#Scope" class="toc-link"><span class="toc-number">3.</span> <span class="toc-text">Scope</span></a>
4.  <a href="#Controllers" class="toc-link"><span class="toc-number">4.</span> <span class="toc-text">Controllers</span></a>
5.  <a href="#To-do-directive" class="toc-link"><span class="toc-number">5.</span> <span class="toc-text">To-do directive</span></a>
6.  <a href="#Next-steps" class="toc-link"><span class="toc-number">6.</span> <span class="toc-text">Next steps</span></a>
    1.  <a href="#Related-Posts" class="toc-link"><span class="toc-number">6.1.</span> <span class="toc-text">Related Posts</span></a>




