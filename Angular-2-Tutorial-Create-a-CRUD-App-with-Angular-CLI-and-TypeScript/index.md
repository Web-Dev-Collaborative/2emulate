



<a href="/categories/coding/" class="category-link">Coding</a> &gt; <a href="/categories/coding/web-development/" class="category-link">Web Development</a> &gt; <a href="/categories/coding/web-development/angular/" class="category-link">Angular</a>

Angular Tutorial: Create a CRUD App with Angular CLI and TypeScript
===================================================================

<span title="Last time this post was updated"> Last updated November 6th 2019 </span> <span class="m-x-2" title="Pageviews"> 157.8k </span> <span class="m-x-2" title="Click to go to the comments section"> [ <span class="disqus-comment-count" data-disqus-url="https://adrianmejia.com/Angular-2-Tutorial-Create-a-CRUD-App-with-Angular-CLI-and-TypeScript/">0</span>](#disqus_thread) </span>

-   <a href="/tags/angular/" class="tag-list-link">angular</a><span class="tag-list-count">2</span>
-   <a href="/tags/angularjs/" class="tag-list-link">angularjs</a><span class="tag-list-count">4</span>
-   <a href="/tags/todo-app/" class="tag-list-link">todo app</a><span class="tag-list-count">5</span>

![Angular Tutorial: Create a CRUD App with Angular CLI and TypeScript](/images/angular-2-tutorial-angular-cli-large.png)

This tutorial gets you off the ground with Angular. We are going to use the official CLI (command line) tool to generate boilerplate code.

<a href="#Prerequisites" class="headerlink" title="Prerequisites"></a>Prerequisites
-----------------------------------------------------------------------------------

This tutorial is targeted to people familiar with JavaScript and HTML/CSS. You also will need:

-   Node.js up and running.
-   NPM (Node package manager) or Yarn installed.

You can verify by typing:

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4</code></pre></td><td><pre><code>node --version
## v12.13.0
npm --version
## 6.12.0</code></pre></td></tr></tbody></table>

If you get the versions Node 4.x.x and NPM 3.x.x. or higher you are all set. If not, you have to get the latest versions.

Let’s move on to Angular. We are going to create a Todo app. We will be able to CRUD (create-read-update-delete) tasks:

-   Live Demo: [Angular Todo app preview](https://angular-todo-app-crud.netlify.com/)
-   Repository [angular-todo-app](https://github.com/amejiarosario/angular-todo-app)

<a href="#Understanding-ng-new" class="headerlink" title="Understanding ng new"></a>Understanding ng new
--------------------------------------------------------------------------------------------------------

Angular CLI is the best way to get us started. We can download the tool and create a new project by running:

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5
6
7</code></pre></td><td><pre><code>## install angular-cli globally
npm install -g @angular/cli@9.1.7
## npm install -g @angular/cli # get latest

## Check angular CLI is installed
ng --version
## Angular CLI: 9.1.7 ...</code></pre></td></tr></tbody></table>

You can update to the lastest versions in the future using:

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>ng update @angular/cli @angular/core</code></pre></td></tr></tbody></table>

The rest of the steps remain the same regarless of the version.

Scafold the app using the following command.

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2</code></pre></td><td><pre><code>## create a new project
ng new Todos --style=scss</code></pre></td></tr></tbody></table>

**Note** The last command takes some minutes. Leave it running and continue reading this tutorial.

The command `ng new` will do a bunch of things for us:

1.  Initialize a git repository
2.  Creates an `package.json` files with all the Angular dependencies.
3.  Setup TypeScript, Webpack, Tests (Jasmine, Protractor, Karma). Don’t worry if you don’t know what they are. We are going to cover them later.
4.  It creates the `src` folder with the bootstrapping code to load our app into the browser
5.  Finally, it does an `npm install` to get all the packages into `node_modules`.

Let’s run the app!

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3</code></pre></td><td><pre><code>cd Todos
## builds the app and run it on port 9000
ng serve ---port 9000</code></pre></td></tr></tbody></table>

Open your browser on <http://localhost:9000/>, and you should see “Todos app is running!”. Awesome!

Now let’s dive into the `src` folder and get familiarized with the structure.

### <a href="#package-json" class="headerlink" title="package.json"></a>package.json

Open the `package.json` file and take a look at the dependencies. We have all the angular dependencies with the prefix `@angular/...`. Other dependencies (not exclusively for Angular) are also needed, such as RxJS, Zone.js, and some others. We are going to cover them in other posts.

### <a href="#src-index-html" class="headerlink" title="src/index.html"></a>src/index.html

We are building an SPA (single page application), so everything is going to be loaded into the `index.html`. Let’s take a look in the `src/index.html`. It’s pretty standard HTML5 code, except for two elements that are specific for our app:

1.  `<base href="/">`
2.  `<app-root>Loading...</app-root>`

`base href` is needed for Angular routing to work correctly. We are going to cover Routing later.

`<app-root>` this is not a standard HTML tag. Our Angular App defines it. It’s an Angular **component**. More on this later.

### <a href="#src-main-ts" class="headerlink" title="src/main.ts"></a>src/main.ts

`main.ts` is where our application starts bootstrapping (loading). Angular can be used not just in browsers, but also on other platforms such as mobile apps or even desktop apps. So, when we start our application, we have to specify what platform we want to target. That’s why we import: `platform-browser-dynamic`. Notice that we are also importing the `AppModule` from `./app.module`.

The most important line is:

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>platformBrowserDynamic().bootstrapModule(AppModule);</code></pre></td></tr></tbody></table>

We are loading our `AppModule` into the browser platform. Now, let’s take a look at the `./app/app.module.ts` directory.

### <a href="#App-directory" class="headerlink" title="App directory"></a>App directory

The `app` directory contains the components used to mount the rest of the application. In this directory, you can find the app module, component and routing.

If you remember in the `index.html`, there’s a `<app-root>`. This is where this component is defined.

Let’s start by opening `app.module`.

#### <a href="#app-module-ts" class="headerlink" title="app.module.ts"></a>app.module.ts

We are going to be using this file often. The most important part is the metadata inside the `@NgModule`. There we have `declarations`, `imports`, `providers` and `bootstrap`.

-   **Declarations**: goes all your components (e.g., AppComponent, TodoComponent)
-   **Imports**: routes and modules go here.
-   **Bootstrap**: list the components you want to load when the app starts. In our case is `AppComponent`.

#### <a href="#app-component-ts" class="headerlink" title="app.component.ts"></a>app.component.ts

`AppComponent` looks a little similar to the app module, but instead of `@NgModule` we have `@Component`. Again, the most important part is the value of the attributes (metadata). We have `selector`, `templateUrl` and `styleUrls`:

-   `selector`: is the name of the component. Do you remember the `<app-root></app-root>` on the index.html? This is where it’s defined. `templateUrl`: This is where the HTML code is. `<app-root>` will be replaced for whatever you have in the template.
-   `styleUrls`: You can have styles that only apply to this component. This is pretty neat! You can change the styles with confidence knowing that it won’t bleed into other parts of the website.

Inside the `AppComponent` class you can define variables (e.g. `title`) that are used in the templates (e.g. `app.component.html`).

Let’s remove the placeholders from `app.component.html`. Replace all the content already there with:

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5
6
7
8</code></pre></td><td><pre><code>&lt;div style=&quot;text-align:center&quot;&gt;
  &lt;h1&gt;
    {{ title }}
  &lt;/h1&gt;
&lt;/div&gt;


&lt;router-outlet&gt;&lt;/router-outlet&gt;</code></pre></td></tr></tbody></table>

Test your changes running:

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>ng serve ---port 9000</code></pre></td></tr></tbody></table>

You should see the new message.

[\[changes diff\]](https://github.com/amejiarosario/angular-todo-app/commit/bf23970)

<a href="#Creating-a-new-Component-with-Angular-CLI" class="headerlink" title="Creating a new Component with Angular CLI"></a>Creating a new Component with Angular CLI
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

Let’s create a new component to display the tasks. We can quickly create by typing:

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>ng generate component todo</code></pre></td></tr></tbody></table>

This command will create a new folder with four files:

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4</code></pre></td><td><pre><code>CREATE src/app/todo/todo.component.scss (0 bytes)
CREATE src/app/todo/todo.component.html (19 bytes)
CREATE src/app/todo/todo.component.spec.ts (614 bytes)
CREATE src/app/todo/todo.component.ts (262 bytes)</code></pre></td></tr></tbody></table>

And it will add the new Todo component to the `AppModule`:

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>UPDATE src/app/app.module.ts (467 bytes)</code></pre></td></tr></tbody></table>

Go ahead and inspect each one. It will look similar to the app components. Let ‘s add our new component to the App component.

[\[changes diff\]](https://github.com/amejiarosario/angular-todo-app/commit/27b354e)

Go to `src/app/app.component.html`, and replace everything with:

src/app/app.component.html

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>&lt;app-todo&gt;&lt;/app-todo&gt;</code></pre></td></tr></tbody></table>

If you have `ng serve` running, it should automatically update and show `todo works!`

[\[changes diff\]](https://github.com/amejiarosario/angular-todo-app/commit/64e8060)

<a href="#Todo-Template" class="headerlink" title="Todo Template"></a>Todo Template
-----------------------------------------------------------------------------------

“todo works!” is not useful. Let’s change that by adding some HTML code to represent our todo tasks. Go to the `src/app/todo/todo.component.html` file and copy-paste this HTML code:

TodoTemplate src/app/todo/todo.component.html

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
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52</code></pre></td><td><pre><code>&lt;section class=&quot;todoapp&quot;&gt;

  &lt;header class=&quot;header&quot;&gt;
    &lt;h1&gt;Todo&lt;/h1&gt;
    &lt;input class=&quot;new-todo&quot; placeholder=&quot;What needs to be done?&quot; autofocus&gt;
  &lt;/header&gt;

  &lt;!-- This section should be hidden by default and shown when there are todos --&gt;
  &lt;section class=&quot;main&quot;&gt;

    &lt;ul class=&quot;todo-list&quot;&gt;
      &lt;!-- These are here just to show the structure of the list items --&gt;
      &lt;!-- List items should get the class `editing` when editing and `completed` when marked as completed --&gt;
      &lt;li class=&quot;completed&quot;&gt;
        &lt;div class=&quot;view&quot;&gt;
          &lt;input class=&quot;toggle&quot; type=&quot;checkbox&quot; checked&gt;
          &lt;label&gt;Install angular-cli&lt;/label&gt;
          &lt;button class=&quot;destroy&quot;&gt;&lt;/button&gt;
        &lt;/div&gt;
        &lt;input class=&quot;edit&quot; value=&quot;Create a TodoMVC template&quot;&gt;
      &lt;/li&gt;
      &lt;li&gt;
        &lt;div class=&quot;view&quot;&gt;
          &lt;input class=&quot;toggle&quot; type=&quot;checkbox&quot;&gt;
          &lt;label&gt;Understand Angular2 apps&lt;/label&gt;
          &lt;button class=&quot;destroy&quot;&gt;&lt;/button&gt;
        &lt;/div&gt;
        &lt;input class=&quot;edit&quot; value=&quot;Rule the web&quot;&gt;
      &lt;/li&gt;
    &lt;/ul&gt;
  &lt;/section&gt;

  &lt;!-- This footer should hidden by default and shown when there are todos --&gt;
  &lt;footer class=&quot;footer&quot;&gt;
    &lt;!-- This should be `0 items left` by default --&gt;
    &lt;span class=&quot;todo-count&quot;&gt;&lt;strong&gt;0&lt;/strong&gt; item left&lt;/span&gt;
    &lt;!-- Remove this if you don&#39;t implement routing --&gt;
    &lt;ul class=&quot;filters&quot;&gt;
      &lt;li&gt;
        &lt;a class=&quot;selected&quot; href=&quot;#/&quot;&gt;All&lt;/a&gt;
      &lt;/li&gt;
      &lt;li&gt;
        &lt;a href=&quot;#/active&quot;&gt;Active&lt;/a&gt;
      &lt;/li&gt;
      &lt;li&gt;
        &lt;a href=&quot;#/completed&quot;&gt;Completed&lt;/a&gt;
      &lt;/li&gt;
    &lt;/ul&gt;
    &lt;!-- Hidden if no completed items are left ↓ --&gt;
    &lt;button class=&quot;clear-completed&quot;&gt;Clear completed&lt;/button&gt;
  &lt;/footer&gt;
&lt;/section&gt;</code></pre></td></tr></tbody></table>

The above HTML code has the general structure about how we want to represent our tasks. Right now it has hard-coded todo’s. We are going to slowly turn it into a dynamic app using Angular data bindings.

[\[changes diff\]](https://github.com/amejiarosario/angular-todo-app/commit/c0ddc65)

Next, let’s add some styling!

<a href="#Styling-the-todo-app" class="headerlink" title="Styling the todo app"></a>Styling the todo app
--------------------------------------------------------------------------------------------------------

We are going to use a community maintained CSS for Todo apps. We can go ahead and download the CSS:

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>npm install --save todomvc-app-css</code></pre></td></tr></tbody></table>

This will install a CSS file that we can use to style our Todo app and make it look nice. In the next section, we are going to explain how to use it with the `angular-cli.json`.

<a href="#Adding-global-styles-to-angular-json" class="headerlink" title="Adding global styles to angular.json"></a>Adding global styles to angular.json
--------------------------------------------------------------------------------------------------------------------------------------------------------

`angular.json` is a special file that tells the Angular CLI how to build your application. You can define how to name your root folder, tests and much more. What we care right now, is telling the angular CLI to use our new CSS file from the node modules. You can do it by adding the following line into the `styles` array:

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5
6
7
8</code></pre></td><td><pre><code>&quot;architect&quot;: {
  &quot;build&quot;: {
    &quot;options&quot;: {
      &quot;styles&quot;: [
        &quot;src/styles.scss&quot;,
        &quot;node_modules/todomvc-app-css/index.css&quot;
      ],
      &quot;scripts&quot;: []</code></pre></td></tr></tbody></table>

If you stop and start `ng serve`, then you will notice the changes.

![](/images/angular2-todo-app-preview.png "Angular Todo App")

We have the skeleton so far. Now we are going to make it dynamic and allow users to add/remove/update/sort tasks. We are going to do two versions one serverless and another one using a Node.js/Express server. We are going to be using promises all the time, so when we use a real API, the service is the only one that has to change.

[\[changes diff\]](https://github.com/amejiarosario/angular-todo-app/commit/d3106d7)

<a href="#Todo-Service" class="headerlink" title="Todo Service"></a>Todo Service
--------------------------------------------------------------------------------

Let’s first start by creating a service that contains an initial list of tasks that we want to manage. We are going to use a `service` to manipulate the data. Let’s create the service with the CLI by typing:

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>ng g service todo/todo</code></pre></td></tr></tbody></table>

This will create two files:

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2</code></pre></td><td><pre><code>CREATE src/app/todo/todo.service.spec.ts (323 bytes)
CREATE src/app/todo/todo.service.ts (133 bytes)</code></pre></td></tr></tbody></table>

[\[changes diff\]](https://github.com/amejiarosario/angular-todo-app/commit/9e5d935)

<a href="#CRUD-Functionality" class="headerlink" title="CRUD Functionality"></a>CRUD Functionality
--------------------------------------------------------------------------------------------------

For enabling the create-read-update-delete functionality, we are going to be modifying three files:

-   src/app/todo/todo.**service**.ts
-   src/app/todo/todo.**component**.ts
-   src/app/todo/todo.component.**html**

Let’s get started!

### <a href="#READ-Get-all-tasks" class="headerlink" title="READ: Get all tasks"></a>READ: Get all tasks

Let’s modify the `todo.service` to be able to get tasks:

TodoService src/app/todo/todo.service.ts

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
20</code></pre></td><td><pre><code>import { Injectable } from &#39;@angular/core&#39;;

const TODOS = [
  { title: &#39;Install Angular CLI&#39;, isDone: true },
  { title: &#39;Style app&#39;, isDone: true },
  { title: &#39;Finish service functionality&#39;, isDone: false },
  { title: &#39;Setup API&#39;, isDone: false },
];

@Injectable({
  providedIn: &#39;root&#39;
})
export class TodoService {

  constructor() { }

  get() {
    return new Promise(resolve =&gt; resolve(TODOS));
  }
}</code></pre></td></tr></tbody></table>

Now we need to change our todo component to use the service that we created.

TodoComponent src/app/todo/todo.component.ts

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
26</code></pre></td><td><pre><code>import { Component, OnInit } from &#39;@angular/core&#39;;
import { TodoService } from &#39;./todo.service&#39;;

@Component({
  selector: &#39;app-todo&#39;,
  templateUrl: &#39;./todo.component.html&#39;,
  styleUrls: [&#39;./todo.component.scss&#39;],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  private todos;
  private activeTasks;

  constructor(private todoService: TodoService) { }

  getTodos(){
    return this.todoService.get().then(todos =&gt; {
      this.todos = todos;
      this.activeTasks = this.todos.filter(todo =&gt; !todo.isDone).length;
    });
  }

  ngOnInit() {
    this.getTodos();
  }
}</code></pre></td></tr></tbody></table>

The first change is importing our `TodoService` and adding it to the providers. Then we use the constructor of the component to load the `TodoService`. While we inject the service, we can hold a private instance of it in the variable `todoService`. Finally, we use it in the `getTodos` method. This will make a variable `todos` available in the template where we can render the tasks.

Let’s change the template so we can render the data from the service. Go to the `todo.component.html` and change, from line 11, what is inside the `<ul class="todo-list"> ... </ul>` for this one:

TodoTemplate src/app/todo/todo.component.html

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5
6
7
8
9
10</code></pre></td><td><pre><code>&lt;ul class=&quot;todo-list&quot;&gt;
  &lt;li *ngFor=&quot;let todo of todos&quot; [ngClass]=&quot;{completed: todo.isDone}&quot; &gt;
    &lt;div class=&quot;view&quot;&gt;
      &lt;input class=&quot;toggle&quot; type=&quot;checkbox&quot; [checked]=&quot;todo.isDone&quot;&gt;
      &lt;label&gt;{{todo.title}}&lt;/label&gt;
      &lt;button class=&quot;destroy&quot;&gt;&lt;/button&gt;
    &lt;/div&gt;
    &lt;input class=&quot;edit&quot; value=&quot;{{todo.title}}&quot;&gt;
  &lt;/li&gt;
&lt;/ul&gt;</code></pre></td></tr></tbody></table>

Also change the line 27 in the template from:

(partial) src/app/todo/todo.component.html

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>&lt;span class=&quot;todo-count&quot;&gt;&lt;strong&gt;0&lt;/strong&gt; item left&lt;/span&gt;</code></pre></td></tr></tbody></table>

replace it with:

(partial) src/app/todo/todo.component.html

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>&lt;span class=&quot;todo-count&quot;&gt;&lt;strong&gt;{{activeTasks}}&lt;/strong&gt; item left&lt;/span&gt;</code></pre></td></tr></tbody></table>

When your browser updates you should have something like this:

![](/images/angular2-todo-app-service.png "Todo app rendering tasks from service")

Now, let’s go over what we just did. We can see that we added new data-binding into the template:

-   `*ngFor`: iterates through the `todos` array that we defined in the component and assigned in the `let todo` part.
-   `[ngClass]`: applies a class when the expression evaluates to true. In our case, it uses class `completed` when `isDone` is true.
-   `[checked]`: applies the `checked` attribute when the expression evaluates to true (`todo.isDone`).
-   `{{todo.title}}`: Render the todo title. The same happened with `{{activeTasks}}`.

[\[changes diff\]](https://github.com/amejiarosario/angular-todo-app/commit/83c0c17)

### <a href="#CREATE-using-the-input-form" class="headerlink" title="CREATE: using the input form"></a>CREATE: using the input form

Let’s start with the template this time. We have an input element for creating new tasks. Let’s listen to changes in the input form and when we click enter it creates the TODO.

Line 5 src/app/todo/todo.component.html

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5</code></pre></td><td><pre><code>&lt;input class=&quot;new-todo&quot;
       placeholder=&quot;What needs to be done?&quot;
       [(ngModel)]=&quot;newTodo&quot;
       (keyup.enter)=&quot;addTodo()&quot;
       autofocus&gt;</code></pre></td></tr></tbody></table>

Notice that we are using a new variable called `newTodo` and method called `addTodo()`. Let’s go to the controller and give it some functionality:

src/app/todo/todo.component.ts

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5
6
7
8
9</code></pre></td><td><pre><code>private newTodo;

addTodo(){
  this.todoService.add({ title: this.newTodo, isDone: false }).then(() =&gt; {
    return this.getTodos();
  }).then(() =&gt; {
    this.newTodo = &#39;&#39;; // clear input form value
  });
}</code></pre></td></tr></tbody></table>

First, we created a private variable that we are going to use to get values from the input form. Then we created a new `todo` using the todo service method `add`. It doesn’t exist yet, so we are going to create it next:

src/app/todo/todo.service.ts

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5
6</code></pre></td><td><pre><code>add(data) {
  return new Promise(resolve =&gt; {
    TODOS.push(data);
    resolve(data);
  });
}</code></pre></td></tr></tbody></table>

The above code adds the new element into the `todos` array and resolves the promise. That’s all. Go ahead a test it out creating a new todo element.

You might get an error saying:

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>Can&#39;t bind to &#39;ngModel&#39; since it isn&#39;t a known property of &#39;input&#39;</code></pre></td></tr></tbody></table>

To use the two-way data binding you need to import `FormsModule` in the `app.module.ts`. So let’s do that.

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
11</code></pre></td><td><pre><code>import { FormsModule } from &#39;@angular/forms&#39;;

// ...

@NgModule({
  imports: [
    // ...
    FormsModule
  ],
  // ...
})</code></pre></td></tr></tbody></table>

Now it should add new tasks to the list!

[\[changes diff\]](https://github.com/amejiarosario/angular-todo-app/commit/dd432b4)

### <a href="#UPDATE-on-double-click" class="headerlink" title="UPDATE: on double click"></a>UPDATE: on double click

Let’s add an event listener to double-click on each todo. That way, we can change the content. Editing is tricky since we need to display an input form. Then when the user clicks enter it should update the value. Finally, it should hide the input and show the label with the updated value. Let’s do that by keeping a temp variable called `editing` which could be true or false.

Go to line 16, and change the content inside the `<li>...</li>`:

src/app/todo/todo.component.html

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
13</code></pre></td><td><pre><code>&lt;li *ngFor=&quot;let todo of todos&quot; [ngClass]=&quot;{completed: todo.isDone, editing: todo.editing}&quot; &gt;
  &lt;div class=&quot;view&quot;&gt;
    &lt;input class=&quot;toggle&quot; type=&quot;checkbox&quot; [checked]=&quot;todo.isDone&quot;&gt;
    &lt;label (dblclick)=&quot;todo.editing = true&quot;&gt;{{todo.title}}&lt;/label&gt;
    &lt;button class=&quot;destroy&quot;&gt;&lt;/button&gt;
  &lt;/div&gt;
  &lt;input class=&quot;edit&quot;
         #updatedTodo
         [value]=&quot;todo.title&quot;
         (blur)=&quot;updateTodo(todo, updatedTodo.value)&quot;
         (keyup.escape)=&quot;todo.editing = false&quot;
         (keyup.enter)=&quot;updateTodo(todo, updatedTodo.value)&quot;&gt;
&lt;/li&gt;</code></pre></td></tr></tbody></table>

Notice that we are adding a local variable in the template `#updatedTodo`. Then we use it to get the value like `updateTodo.value` and pass it to the function `updateTodo`. We want to update the variables on `blur` (when you click somewhere else) or on `enter`. Let’s add the function that updates the value in the component.

Also, notice that we have a new CSS class applied to the element called `editing`. This is going to take care through CSS to hide and show the input element when needed.

Give it a try, double click on any task!

If you press enter you would notice an error in the console `ERROR TypeError: _co.updateTodo is not a function`. That’s because we haven’t defined `updateTodo` yet:

src/app/todo/todo.component.ts

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5
6
7</code></pre></td><td><pre><code>updateTodo(todo, newValue) {
  todo.title = newValue;
  return this.todoService.put(todo).then(() =&gt; {
    todo.editing = false;
    return this.getTodos();
  });
}</code></pre></td></tr></tbody></table>

We update the new todo’s title, and after the service has processed the update, we set editing to false. Finally, we reload all the tasks again. Let’s add the `put` action on the service.

src/app/todo/todo.service.ts

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5
6
7</code></pre></td><td><pre><code>put(changed) {
  return new Promise(resolve =&gt; {
    const index = TODOS.findIndex(todo =&gt; todo === changed);
    TODOS[index].title = changed.title;
    resolve(changed);
  });
}</code></pre></td></tr></tbody></table>

Now, give it a try again. We can edit tasks! Yay!

[\[changes diff\]](https://github.com/amejiarosario/angular-todo-app/commit/f1270ef)

### <a href="#DELETE-clicking-X" class="headerlink" title="DELETE: clicking X"></a>DELETE: clicking X

This is like the other actions. We add an event listenter on the destroy button, on line 20:

src/app/todo/todo.component.html

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>&lt;button class=&quot;destroy&quot; (click)=&quot;destroyTodo(todo)&quot;&gt;&lt;/button&gt;</code></pre></td></tr></tbody></table>

To make it work, we have to define the delete functionality on the component and service.

The method to the component looks something like this:

src/app/todo/todo.component.ts

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5</code></pre></td><td><pre><code>destroyTodo(todo) {
  this.todoService.delete(todo).then(() =&gt; {
    return this.getTodos();
  });
}</code></pre></td></tr></tbody></table>

and finally, we add the method to the service:

src/app/todo/todo.service.ts

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5
6
7</code></pre></td><td><pre><code>delete(selected) {
  return new Promise(resolve =&gt; {
    const index = TODOS.findIndex(todo =&gt; todo === selected);
    TODOS.splice(index, 1);
    resolve(true);
  });
}</code></pre></td></tr></tbody></table>

Now test it out in the browser!

[\[changes diff\]](https://github.com/amejiarosario/angular-todo-app/commit/a4aeaa4)

<a href="#Routing-and-Navigation" class="headerlink" title="Routing and Navigation"></a>Routing and Navigation
--------------------------------------------------------------------------------------------------------------

It’s time to activate the routing. When we click on the `active` button, we want to show only the ones that are active. Similarly, we want to filter by `completed`. Additionally, we want to the filters to change the route `/active` or `/completed` URLs.

In `AppModule`, we need to add the `router` library and define the routes as follows:

AppModule src/app/app.module.ts

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
29</code></pre></td><td><pre><code>import { BrowserModule } from &#39;@angular/platform-browser&#39;;
import { NgModule } from &#39;@angular/core&#39;;
import { FormsModule } from &#39;@angular/forms&#39;;
import { HttpModule } from &#39;@angular/http&#39;;
import { Routes, RouterModule } from &#39;@angular/router&#39;;

import { AppComponent } from &#39;./app.component&#39;;
import { TodoComponent } from &#39;./todo/todo.component&#39;;

const routes: Routes = [
  { path: &#39;:status&#39;, component: TodoComponent },
  { path: &#39;**&#39;, redirectTo: &#39;/all&#39; }
];

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }</code></pre></td></tr></tbody></table>

First, we import the routing library. Then we define the routes that we need. We could have said `path: 'active', component: TodoComponent` and then repeat the same for `completed`. But instead, we define a parameter called `:status` that could take any value (`all`, `completed`, `active`). Any other value path we are going to redirect it to `/all`. That’s what the `**` means.

Finally, we add it to the imports. So the app module uses it. Since the AppComponent is using routes, now we need to define the `<router-outlet>`. That’s the place where the routes are going to render the component based on the path (in our case `TodoComponent`).

Let’s go to `app/app.component.html` and replace `<app-todo></app-todo>` for `<router-outlet></router-outlet>`:

app/app.component.html

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>&lt;router-outlet&gt;&lt;/router-outlet&gt;</code></pre></td></tr></tbody></table>

Test the app in the browser and verify that now the URL is by default `http://localhost:9000/all`.

[\[changes diff\]](https://github.com/amejiarosario/angular-todo-app/commit/2e2bae9)

### <a href="#Using-routerLink-and-ActivatedRoute" class="headerlink" title="Using routerLink and ActivatedRoute"></a>Using routerLink and ActivatedRoute

`routerLink` is the replacement of `href` for our dynamic routes. We have set it up to be `/all`, `/complete` and `/active`. Notice that the expression is an array. You can pass each part of the URL as an element of the collection.

src/app/todo/todo.component.html

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
11</code></pre></td><td><pre><code>&lt;ul class=&quot;filters&quot;&gt;
  &lt;li&gt;
    &lt;a [routerLink]=&quot;[&#39;/all&#39;]&quot; [class.selected]=&quot;path === &#39;all&#39;&quot;&gt;All&lt;/a&gt;
  &lt;/li&gt;
  &lt;li&gt;
    &lt;a [routerLink]=&quot;[&#39;/active&#39;]&quot; [class.selected]=&quot;path === &#39;active&#39;&quot;&gt;Active&lt;/a&gt;
  &lt;/li&gt;
  &lt;li&gt;
    &lt;a [routerLink]=&quot;[&#39;/completed&#39;]&quot; [class.selected]=&quot;path === &#39;completed&#39;&quot;&gt;Completed&lt;/a&gt;
  &lt;/li&gt;
&lt;/ul&gt;</code></pre></td></tr></tbody></table>

What we are doing is applying the `selected` class if the path matches the button. Yet, we haven’t populate the the `path` variable yet. So let’s do that:

TodoComponent src/app/todo/todo.component.ts

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
28</code></pre></td><td><pre><code>import { Component, OnInit } from &#39;@angular/core&#39;;
import { ActivatedRoute } from &#39;@angular/router&#39;;

import { TodoService } from &#39;./todo.service&#39;;

@Component({
  selector: &#39;app-todo&#39;,
  templateUrl: &#39;./todo.component.html&#39;,
  styleUrls: [&#39;./todo.component.scss&#39;],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  private todos;
  private activeTasks;
  private newTodo;
  private path;

  constructor(private todoService: TodoService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params =&gt; {
      this.path = params[&#39;status&#39;];
      this.getTodos();
    });
  }

  /* ... */
}</code></pre></td></tr></tbody></table>

We added `ActivatedRoute` as a dependency and in the constructor. ActivatedRoute gives us access to the all the `route` params such as `path`. Notice that we are using it in the `NgOnInit` and set the path accordantly.

Go to the browser and check out that the URL matches the active button. But, it doesn’t filter anything yet. Let’s fix that next.

[\[changes diff\]](https://github.com/amejiarosario/angular-todo-app/commit/b3487a2)

### <a href="#Filtering-data-based-on-the-route" class="headerlink" title="Filtering data based on the route"></a>Filtering data based on the route

To filter todos by active and completed, we need to pass a parameter to the `todoService.get`.

TodoComponent src/app/todo/todo.component.ts

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
13</code></pre></td><td><pre><code>ngOnInit() {
  this.route.params.subscribe(params =&gt; {
    this.path = params[&#39;status&#39;];
    this.getTodos(this.path);
  });
}

getTodos(query = &#39;&#39;){
  return this.todoService.get(query).then(todos =&gt; {
    this.todos = todos;
    this.activeTasks = this.todos.filter(todo =&gt; !todo.isDone).length;
  });
}</code></pre></td></tr></tbody></table>

We added a new parameter `query`, which takes the `path` (active, completed or all). Then, we pass that parameter to the service. Let’s handle that in the service:

TodoService src/app/todo/todo.service.ts

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
14</code></pre></td><td><pre><code>get(query = &#39;&#39;) {
  return new Promise(resolve =&gt; {
    let data;

    if (query === &#39;completed&#39; || query === &#39;active&#39;){
      const isCompleted = query === &#39;completed&#39;;
      data = TODOS.filter(todo =&gt; todo.isDone === isCompleted);
    } else {
      data = TODOS;
    }

    resolve(data);
  });
}</code></pre></td></tr></tbody></table>

So we added a filter by `isDone` when we pass either `completed` or `active`. If the query is anything else, we return all the todos tasks.

That’s pretty much it for filtering and routes, test it out!

[\[changes diff\]](https://github.com/amejiarosario/angular-todo-app/commit/b87857d)

<a href="#Clearing-out-completed-tasks" class="headerlink" title="Clearing out completed tasks"></a>Clearing out completed tasks
--------------------------------------------------------------------------------------------------------------------------------

One last UI functionality, clearing out completed tasks button. Let’s first add the click event on the template:

src/app/todo/todo.component.html

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>&lt;button class=&quot;clear-completed&quot; (click)=&quot;clearCompleted()&quot;&gt;Clear completed&lt;/button&gt;</code></pre></td></tr></tbody></table>

We referenced a new function `clearCompleted` that we haven’t create yet. Let’s create it in the TodoComponent:

TodoComponent src/app/todo/todo.component.ts

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5</code></pre></td><td><pre><code>clearCompleted() {
  this.todoService.deleteCompleted().then(() =&gt; {
    return this.getTodos();
  });
}</code></pre></td></tr></tbody></table>

In the same way we have to create `deleteCompleted` in the service:

TodoService src/app/todo/todo.service.ts

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5
6</code></pre></td><td><pre><code>deleteCompleted() {
  return new Promise(resolve =&gt; {
    TODOS = TODOS.filter(todo =&gt; !todo.isDone);
    resolve(TODOS);
  });
}</code></pre></td></tr></tbody></table>

We use the filter to get the active tasks and replace the `TODOS` array with it. Since, we are overwriting the variable we need to make it a `let TODOS ...` instead of a `const TODOS ...`.

That’s it we have completed all the functionality.

[\[changes diff\]](https://github.com/amejiarosario/angular-todo-app/commit/30c699b)

<a href="#Checking-off-tasks-enhancements" class="headerlink" title="Checking off tasks enhancements"></a>Checking off tasks enhancements
-----------------------------------------------------------------------------------------------------------------------------------------

When we click on the checkbox, it gets the mark. However, the tasks doesn’t get crossout.

Let’s fix that by toggling `isDone` field when we click on task. Add `(click)="toggleTodo(todo)"` to the checkbox element.

src/app/todo/todo.component.html:17

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5
6
7
8</code></pre></td><td><pre><code>&lt;div class=&quot;view&quot;&gt;
  &lt;input class=&quot;toggle&quot;
    type=&quot;checkbox&quot;
    [checked]=&quot;todo.isDone&quot;
    (click)=&quot;toggleTodo(todo)&quot;&gt;
  &lt;label (dblclick)=&quot;todo.editing = true&quot;&gt;{{todo.title}}&lt;/label&gt;
  &lt;button class=&quot;destroy&quot; (click)=&quot;destroyTodo(todo)&quot;&gt;&lt;/button&gt;
&lt;/div&gt;</code></pre></td></tr></tbody></table>

Since we are using the `toggleTodo` function we have to define it in the controller and service.

Controller implementation:

src/app/todo/todo.component.ts:62

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5</code></pre></td><td><pre><code>toggleTodo(todo) {
  this.todoService.toggle(todo).then(() =&gt; {
    return this.getTodos();
  });
}</code></pre></td></tr></tbody></table>

Service implementation:

src/app/todo/todo.service.ts:62

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4</code></pre></td><td><pre><code>toggle(selected) {
  selected.isDone = !selected.isDone;
  return Promise.resolve();
}</code></pre></td></tr></tbody></table>

We are returning a promise, in case we later want to replace the in-memory array for a API call or external storage.

[\[changes diff\]](https://github.com/amejiarosario/angular-todo-app/commit/0affc59)

<a href="#Deploying-the-app" class="headerlink" title="Deploying the app"></a>Deploying the app
-----------------------------------------------------------------------------------------------

You can generate all your assets for production running this command:

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>ng build --prod</code></pre></td></tr></tbody></table>

It will minify and concatenate the assets for serving the app faster.

You might get some errors like `Property ... is private and only accessible within class 'TodoComponent'.`. You can fix that by making all the variables that are used on the template `public`. Instead of private:

src/app/todo/todo.component.ts

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4</code></pre></td><td><pre><code>public todos;
public activeTasks;
public newTodo;
public path;</code></pre></td></tr></tbody></table>

Now `ng build --prod` should work. By default it will create assets on the `dist` folder.

If you want to deploy to a Github page you can do the following:

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>ng build --prod --output-path docs --base-href &quot;/angular-todo-app/&quot;</code></pre></td></tr></tbody></table>

Replace `/angular-todo-app/` with the name of your project name. Finally, go to settings and set up serving Github pages using the `/docs` folder:

![image](https://user-images.githubusercontent.com/418605/43802468-dd515c14-9a63-11e8-8262-b5b837170640.png)

<a href="#Troubleshooting" class="headerlink" title="Troubleshooting"></a>Troubleshooting
-----------------------------------------------------------------------------------------

If when you compile for production you get an error like:

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5
6
7
8
9</code></pre></td><td><pre><code>The variable used in the template needs to be declared as &quot;public&quot;. Template is treated as a separate Typescript class.

ERROR in src/app/todo/todo.component.html(7,8): : Property &#39;newTodo&#39; is private and only accessible within class &#39;TodoComponent&#39;.
src/app/todo/todo.component.html(19,11): : Property &#39;todos&#39; is private and only accessible within class &#39;TodoComponent&#39;.
src/app/todo/todo.component.html(38,38): : Property &#39;activeTasks&#39; is private and only accessible within class &#39;TodoComponent&#39;.
src/app/todo/todo.component.html(41,36): : Property &#39;path&#39; is private and only accessible within class &#39;TodoComponent&#39;.
src/app/todo/todo.component.html(44,39): : Property &#39;path&#39; is private and only accessible within class &#39;TodoComponent&#39;.
src/app/todo/todo.component.html(47,42): : Property &#39;path&#39; is private and only accessible within class &#39;TodoComponent&#39;.
src/app/todo/todo.component.html(7,8): : Property &#39;newTodo&#39; is private and only accessible within class &#39;TodoComponent&#39;.</code></pre></td></tr></tbody></table>

Then you need to change `private` to `public` like [this](https://github.com/amejiarosario/angular-todo-app/commit/cbf4e20). This is because the Template in Angular is treated like a separate class.

<a href="#What’s-next-Build-Server-API" class="headerlink" title="What’s next? Build Server API"></a>What’s next? Build Server API
----------------------------------------------------------------------------------------------------------------------------------

Check out this next post to learn how to build an API and connect it with this angular app:

[Modern MEAN Stack Tutorial with Docker](/angular-todo-mean-stack-node-mongodb-typescript-tutorial/)

That’s all folks!

### Now, your turn!

Thanks for reading this far. Here are some things you can do next:

-   Found a typo? [Edit this post](https://github.com/amejiarosario/amejiarosario.github.io/edit/source/source/_posts/2016-10-01-Angular-2-Tutorial-Create-a-CRUD-App-with-Angular-CLI-and-TypeScript.md).
-   Got questions? [comment](#comments-section) below.
-   Was it useful? Show your support and share it.



<a href="/Overview-of-JavaScript-ES6-features-a-k-a-ECMAScript-6-and-ES2015/" class="article-nav-newer"><strong><em></em> newer</strong></a>

Overview of JavaScript ES6 features (a.k.a ECMAScript 6 and ES2015+)

<a href="/Building-a-Node-js-static-file-server-files-over-HTTP-using-ES6/" class="article-nav-older"><strong>older <em></em></strong></a>

Building a Node.js static file server (files over HTTP) using ES6+

Subscribe & stay up to date!

 









[<span id="back-to-top" title="Go back to the top of this page"> Top </span>](#) <a href="#" class="p-x-3" title="Improve this post"><em></em> Edit this post</a>

### Contents

1.  <a href="#Prerequisites" class="toc-link"><span class="toc-number">1.</span> <span class="toc-text">Prerequisites</span></a>
2.  <a href="#Understanding-ng-new" class="toc-link"><span class="toc-number">2.</span> <span class="toc-text">Understanding ng new</span></a>
    1.  <a href="#package-json" class="toc-link"><span class="toc-number">2.1.</span> <span class="toc-text">package.json</span></a>
    2.  <a href="#src-index-html" class="toc-link"><span class="toc-number">2.2.</span> <span class="toc-text">src/index.html</span></a>
    3.  <a href="#src-main-ts" class="toc-link"><span class="toc-number">2.3.</span> <span class="toc-text">src/main.ts</span></a>
    4.  <a href="#App-directory" class="toc-link"><span class="toc-number">2.4.</span> <span class="toc-text">App directory</span></a>
        1.  <a href="#app-module-ts" class="toc-link"><span class="toc-number">2.4.1.</span> <span class="toc-text">app.module.ts</span></a>
        2.  <a href="#app-component-ts" class="toc-link"><span class="toc-number">2.4.2.</span> <span class="toc-text">app.component.ts</span></a>
3.  <a href="#Creating-a-new-Component-with-Angular-CLI" class="toc-link"><span class="toc-number">3.</span> <span class="toc-text">Creating a new Component with Angular CLI</span></a>
4.  <a href="#Todo-Template" class="toc-link"><span class="toc-number">4.</span> <span class="toc-text">Todo Template</span></a>
5.  <a href="#Styling-the-todo-app" class="toc-link"><span class="toc-number">5.</span> <span class="toc-text">Styling the todo app</span></a>
6.  <a href="#Adding-global-styles-to-angular-json" class="toc-link"><span class="toc-number">6.</span> <span class="toc-text">Adding global styles to angular.json</span></a>
7.  <a href="#Todo-Service" class="toc-link"><span class="toc-number">7.</span> <span class="toc-text">Todo Service</span></a>
8.  <a href="#CRUD-Functionality" class="toc-link"><span class="toc-number">8.</span> <span class="toc-text">CRUD Functionality</span></a>
    1.  <a href="#READ-Get-all-tasks" class="toc-link"><span class="toc-number">8.1.</span> <span class="toc-text">READ: Get all tasks</span></a>
    2.  <a href="#CREATE-using-the-input-form" class="toc-link"><span class="toc-number">8.2.</span> <span class="toc-text">CREATE: using the input form</span></a>
    3.  <a href="#UPDATE-on-double-click" class="toc-link"><span class="toc-number">8.3.</span> <span class="toc-text">UPDATE: on double click</span></a>
    4.  <a href="#DELETE-clicking-X" class="toc-link"><span class="toc-number">8.4.</span> <span class="toc-text">DELETE: clicking X</span></a>
9.  <a href="#Routing-and-Navigation" class="toc-link"><span class="toc-number">9.</span> <span class="toc-text">Routing and Navigation</span></a>
    1.  <a href="#Using-routerLink-and-ActivatedRoute" class="toc-link"><span class="toc-number">9.1.</span> <span class="toc-text">Using routerLink and ActivatedRoute</span></a>
    2.  <a href="#Filtering-data-based-on-the-route" class="toc-link"><span class="toc-number">9.2.</span> <span class="toc-text">Filtering data based on the route</span></a>
10. <a href="#Clearing-out-completed-tasks" class="toc-link"><span class="toc-number">10.</span> <span class="toc-text">Clearing out completed tasks</span></a>
11. <a href="#Checking-off-tasks-enhancements" class="toc-link"><span class="toc-number">11.</span> <span class="toc-text">Checking off tasks enhancements</span></a>
12. <a href="#Deploying-the-app" class="toc-link"><span class="toc-number">12.</span> <span class="toc-text">Deploying the app</span></a>
13. <a href="#Troubleshooting" class="toc-link"><span class="toc-number">13.</span> <span class="toc-text">Troubleshooting</span></a>
14. <a href="#What%E2%80%99s-next-Build-Server-API" class="toc-link"><span class="toc-number">14.</span> <span class="toc-text">What’s next? Build Server API</span></a>




