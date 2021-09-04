



<a href="/categories/coding/" class="category-link">Coding</a> &gt; <a href="/categories/coding/web-development/" class="category-link">Web Development</a> &gt; <a href="/categories/coding/web-development/angular/" class="category-link">Angular</a>

Modern MEAN Stack Tutorial with Docker (Angular, Node, Typescript and Mongodb)
==============================================================================

<span title="Last time this post was updated"> Last updated February 27th 2020 </span> <span class="m-x-2" title="Pageviews"> 2.8k </span> <span class="m-x-2" title="Click to go to the comments section"> [ <span class="disqus-comment-count" data-disqus-url="https://adrianmejia.com/angular-todo-mean-stack-node-mongodb-typescript-tutorial/">0</span>](#disqus_thread) </span>

-   <a href="/tags/angular/" class="tag-list-link">angular</a><span class="tag-list-count">2</span>
-   <a href="/tags/angularjs/" class="tag-list-link">angularjs</a><span class="tag-list-count">4</span>
-   <a href="/tags/mean-stack/" class="tag-list-link">mean stack</a><span class="tag-list-count">1</span>

![Modern MEAN Stack Tutorial with Docker (Angular, Node, Typescript and Mongodb)](/images/modern-mean-large.png)

The MEAN stack allows you to build complete applications using one programming language: JavaScript. In this tutorial, we made upon the first part ([Creating an Angular app](/angular-2-tutorial-create-a-crud-app-with-angular-cli-and-typescript/)) which built the front-end, and this part builds the backend with a RESTful API and Database.

<span id="more"></span>

<a href="#REST-API-with-Node-js" class="headerlink" title="REST API with Node.js"></a>REST API with Node.js
-----------------------------------------------------------------------------------------------------------

We are going to use express-generator and create a folder called `server`.

First, install the generator packages:

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>npm i -g express-generator</code></pre></td></tr></tbody></table>

Note: You should have Node and NPM/Yarn installed.

### <a href="#REST-API-using-ExpressJS" class="headerlink" title="REST API using ExpressJS"></a>REST API using ExpressJS

Now let’s scaffold the App using the generator:

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>express server -e</code></pre></td></tr></tbody></table>

Let’s install all its dependencies on the server folder:

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>cd server &amp;&amp; npm i</code></pre></td></tr></tbody></table>

and now let’s make sure it’s working:

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>npm start</code></pre></td></tr></tbody></table>

Go to localhost on port 3000 and make sure you can see a “Welcome to Express.”

<http://localhost:3000/>

> Changes: [a3fcacd](https://github.com/amejiarosario/angular-todo-app/commit/a3fcacd) - REST API using ExpressJS: scaffold

### <a href="#Creating-a-host-alias-for-the-server" class="headerlink" title="Creating a host alias for the server"></a>Creating a host alias for the server

We want to run the server to work regardless of the environment where we run it. (It will be useful for Docker later on)

For that we can create an alias by editing the `hosts`:

-   Windows: `c:\windows\system32\drivers\etc\hosts`
-   Linux/Mac: `/etc/hosts`

Once you can open the file, you drop the following line at the end:

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>127.0.0.1 server</code></pre></td></tr></tbody></table>

Now you should be able to access the server by visiting:

<http://server:3000/>

(If you have trouble editing the host file, take a look [here](https://www.howtogeek.com/howto/27350/beginner-geek-how-to-edit-your-hosts-file/))

### <a href="#Creating-API-routes-and-responding-to-requests" class="headerlink" title="Creating API routes and responding to requests"></a>Creating API routes and responding to requests

Now we are going to create a new route:

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>/api/todos[/:id]</code></pre></td></tr></tbody></table>

This route will get all our todos, update, and delete them.

Create a new router file called todos in the following path:

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>touch server/routes/todos.js</code></pre></td></tr></tbody></table>

and add this initial content:

server/routes/todos.js

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
20</code></pre></td><td><pre><code>const express = require(&#39;express&#39;);
const router = express.Router();

const TODOS = [
  { title: &#39;Create API to get this list&#39;, isDone: true },
  { title: &#39;Connect API with Angular&#39;, isDone: true },
  { title: &#39;Connect server with mongo&#39;, isDone: false },
  { title: &#39;Publish app&#39;, isDone: false },
];

/* GET /api/todos */
router.get(&#39;/&#39;, async (req, res) =&gt; {
  try {
    res.json(TODOS);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;</code></pre></td></tr></tbody></table>

All this is doing is replying to the GET commands and returning a hard-coded list of todos. We will replace it later to get data from mongo instead.

Then we need to register the route as follows:

server/app.js

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5</code></pre></td><td><pre><code>var todosRouter = require(&#39;./routes/todos&#39;);

// ...

app.use(&#39;/api/todos&#39;, todosRouter);</code></pre></td></tr></tbody></table>

The method `use` registers the new path `/api/todos`. When we get any call on this path, our `todosRouter` will handle it.

You can restart your server or use nodemon to pick up changes and refresh the browser.

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2</code></pre></td><td><pre><code>## npm i -g nodemon
nodemon server/bin/www</code></pre></td></tr></tbody></table>

That should get your server running. Now you can see it in action using cURL:

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2</code></pre></td><td><pre><code>curl -XGET server:3000/api/todos
## curl -XGET localhost:3000/api/todos</code></pre></td></tr></tbody></table>

This command should get you all the lists in JSON format!

In the next step, we will query the server using Angular instead of `curl`. After that, we will complete the rest of the operations (update, delete, create).

> [6f8a502](https://github.com/amejiarosario/angular-todo-app/commit/6f8a502) - Creating API routes and responding to requests

<a href="#Connecting-REST-API-with-Angular-App" class="headerlink" title="Connecting REST API with Angular App."></a>Connecting REST API with Angular App.
----------------------------------------------------------------------------------------------------------------------------------------------------------

Let’s now prepare our angular App to use the server API that we just created.

As you might know, when you run `ng serve`, it will trigger a development server. However, our API is an entirely different server. To be able to connect the two, we need to create a proxy.

### <a href="#Creating-a-proxy-in-Angular-to-talk-to-the-API-server" class="headerlink" title="Creating a proxy in Angular to talk to the API server"></a>Creating a proxy in Angular to talk to the API server

Let’s create a new file that will tell Angular when to look for specific HTTP paths. In this case, we are going to defer all `/api` to our express server.

src/proxy.conf.json

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5
6</code></pre></td><td><pre><code>{
  &quot;/api&quot;: {
    &quot;target&quot;: &quot;http://server:3000&quot;,
    &quot;secure&quot;: false
  }
}</code></pre></td></tr></tbody></table>

(This will need the [host alias](#Creating-a-host-alias-for-the-server) from the step before)

Then, we have to tell Angular to load this file when we are serving the App. We are going to do that in the `angular.json` file.

If you are using the same version of angular CLI, you need to insert this on line 71:

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>&quot;proxyConfig&quot;: &quot;src/proxy.conf.json&quot;</code></pre></td></tr></tbody></table>

For some context, here are the surrounding elements:

angular.json &gt; projects &gt; Todos &gt; architect &gt; serve &gt; options

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
21</code></pre></td><td><pre><code>{
  &quot;$schema&quot;: &quot;./node_modules/@angular/cli/lib/config/schema.json&quot;,
  // ...
  &quot;projects&quot;: {
    &quot;Todos&quot;: {
      // ...
      &quot;architect&quot;: {
        // ...
        &quot;serve&quot;: {
          &quot;builder&quot;: &quot;@angular-devkit/build-angular:dev-server&quot;,
          &quot;options&quot;: {
            &quot;browserTarget&quot;: &quot;Todos:build&quot;,
            &quot;proxyConfig&quot;: &quot;src/proxy.conf.json&quot;  // &lt;-- Insert this line
          },
          // ...
        },
        // ...
      }
    }},
  &quot;defaultProject&quot;: &quot;Todos&quot;
}</code></pre></td></tr></tbody></table>

Now our App will pass all requests that start with `/api` to `http://localhost:3000` (or whatever path you specified on the proxy.conf).

Next, we are going to make use of these new routes!

> [e81ddb8](https://github.com/amejiarosario/angular-todo-app/commit/e81ddb8) - Creating a proxy in Angular to talk to the API server

### <a href="#Using-HTTP-Client-to-talk-to-the-server" class="headerlink" title="Using HTTP Client to talk to the server"></a>Using HTTP Client to talk to the server

To talk to the server, we are going to use the `HttpClient` module.

Let’s go to the app.module and let’s import it:

src/app/app.module.ts

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
20</code></pre></td><td><pre><code>import { HttpClientModule } from &#39;@angular/common/http&#39;;

// ...

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule, // &lt;---- import module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }</code></pre></td></tr></tbody></table>

Now that the HttpClient is available in our App let’s add it to the service and make use of it.

src/app/todo/todo.service.ts

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
20</code></pre></td><td><pre><code>import { HttpClient } from &#39;@angular/common/http&#39;;

//...

const API = &#39;/api/todos&#39;;

//...

@Injectable({
  providedIn: &#39;root&#39;
})
export class TodoService {

  constructor(private http: HttpClient) { }

  get(params = {}) {
    return this.http.get(API, { params });
  }

  // ...</code></pre></td></tr></tbody></table>

We change the `TodoService.get` to use HTTP client. However, the component was responding to a Promise, and the HTTP.get returns an Observable. So, let’s change it.

Change the getTodos method from the old one to use this one that handles an observable.

src/app/todo/todo.component.ts

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5
6</code></pre></td><td><pre><code>getTodos(query = &#39;&#39;) {
  return this.todoService.get(query).subscribe(todos =&gt; {
    this.todos = todos;
    this.activeTasks = this.todos.filter(todo =&gt; !todo.isDone).length;
  });
}</code></pre></td></tr></tbody></table>

The main difference is that instead of a `.then`, we are using `.subscribe`. Everything else remains the same (for now).

That’s it, let’s test it out!

Run these commands on your terminal:

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2</code></pre></td><td><pre><code>## run node server
nodemon server/bin/www</code></pre></td></tr></tbody></table>

on another terminal session run also:

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2</code></pre></td><td><pre><code>## run angular App
ng serve</code></pre></td></tr></tbody></table>

Once you have both running, you can go to <http://localhost:4200/all>, and you can verify that it’s coming from your server!

If you are running `nodemon`, you can change the TODOS on `server/routes/todos.js` and refresh the browser, and see how it changes.

But, we don’t want to have hard-coded tasks. Let’s create a proper DB with Mongo.

<a href="#Setting-up-MongoDB" class="headerlink" title="Setting up MongoDB"></a>Setting up MongoDB
--------------------------------------------------------------------------------------------------

It’s time to get MongoDB up and running. If don’t have it installed, you have a couple of options:

Docker (Windows/macOS/Linux) \[Preferred\]

1.  Download the [docker engine](https://docs.docker.com/engine/install/)

2.  Pull Mongo image

    <table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>docker pull mongo</code></pre></td></tr></tbody></table>

    NOTE: More details in the rest of the post.

Official Website (Windows/macOS/Linux)

You can download it from here:

<https://docs.mongodb.com/manual/administration/install-community/>

Brew (macOS)

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2</code></pre></td><td><pre><code>brew tap mongodb/brew
brew install mongodb-community</code></pre></td></tr></tbody></table>

We are going to use Docker since it’s an excellent way to have everything running together with one command. Also, you can deploy it to the cloud and scale it quickly.

### <a href="#Dockerizing-the-MEAN-stack" class="headerlink" title="Dockerizing the MEAN stack"></a>Dockerizing the MEAN stack

Let’s get everything running (Node Server, Angular, and Mongo). We will create a docker-compose file, which is going to list all our services, and we can run them all at once.

docker-compose.yml

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
32</code></pre></td><td><pre><code>version: &quot;3.7&quot;

services:
  app:
    image: node:lts-alpine
    working_dir: /app
    volumes:
      - ./:/app
    ports:
      - 4200:4200
    # --host 0.0.0.0 to listen to all the interfaces from the container (dev env)
    command: &gt;
      sh -c &quot;npm install &amp;&amp;
             npx ng serve --host 0.0.0.0&quot;

  server:
    image: node:lts-alpine
    working_dir: /server
    volumes:
      - ./server:/server
    # port 3000 has to match src/proxy.conf.json
    ports:
      - 3000:3000
    depends_on:
      - mongo
    environment:
      MONGO_HOST: mongo
    command: &gt;
      sh -c &quot;npm i -g nodemon &amp;&amp; npm install &amp;&amp; nodemon ./bin/www&quot;

  mongo:
    image: mongo</code></pre></td></tr></tbody></table>

All right, now we can get the whole full-stack App running with one command:

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>docker-compose up --build</code></pre></td></tr></tbody></table>

NOTE: close other terminals running a web server so the ports don’t conflict. The docker-compose command will create 3 containers for our Angular App, Node Server, and Mongo DB. You can also see all the logs in one place.

After you wait a minute or so, you should be able to open the App on <http://localhost:4200/>.

Now we can make use of mongo. Keep docker-compose running and now let’s remove the hard-coded tests and use the database.

> [0763db0](https://github.com/amejiarosario/angular-todo-app/commit/0763db0) - docker compose

### <a href="#Creating-MongoDB-schema-with-Mongoose" class="headerlink" title="Creating MongoDB schema with Mongoose"></a>Creating MongoDB schema with Mongoose

Let’s install Mongoose, which is a library for managing MongoDB from Node.js.

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>cd server &amp;&amp; npm i mongoose@5.9.18</code></pre></td></tr></tbody></table>

NOTE: make sure you installed it on the `./server/package.json`, rather than the client-side packages `./packages.json`.

The first thing we need to do is to connect to Mongo when our server starts. Go to `server/app.js` and add the following code:

server/app.js

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
16</code></pre></td><td><pre><code>const mongoose = require(&#39;mongoose&#39;);

// connect to db
const user = process.env.MONGO_USER;
const mongoPort = process.env.MONGO_PORT || 27017;
const mongoHost = process.env.MONGO_HOST || &#39;localhost&#39;;
const auth = user ? `${user}:${process.env.MONGO_PASS}@` : &#39;&#39;;
const DB_STRING = `mongodb://${auth}${mongoHost}:${mongoPort}/todos`;

console.log(`Running node ${process.version}...`);
console.log(`Connecting to DB... ${DB_STRING}`);

const config = { useNewUrlParser: true, useUnifiedTopology: true};
mongoose.connect(DB_STRING, config)
  .then(() =&gt; console.log(`Connected!`))
  .catch(console.error);</code></pre></td></tr></tbody></table>

> [15f6e25](https://github.com/amejiarosario/angular-todo-app/commit/15f6e25) - add db string to connect to mongo

We can pass some ENV variables like `MONGO_HOST`. If we run it locally, it will use localhost, but if you run it on Docker, we want to pass a hostname. You can see that in the `docker-compose.yml` file.

Now, let’s define our data model for Mongo. Let’s create a folder `models` inside `server` and add a file called “todos.js”.

server/models/todo.js

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
12</code></pre></td><td><pre><code>const mongoose = require(&#39;mongoose&#39;);

const { Schema, model } = mongoose;

const TodoSchema = new Schema({
  title: String,
  isDone: Boolean,
  notes: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = model(&#39;Todo&#39;, TodoSchema);</code></pre></td></tr></tbody></table>

The new schema is defining what fields we want to store and what the types are. The `updated_at` will update automatically when we create a new todo.

> [436b0ad](https://github.com/amejiarosario/angular-todo-app/commit/436b0ad) - npm i mongoose

> [b2674f3](https://github.com/amejiarosario/angular-todo-app/commit/b2674f3) - Creating MongoDB schema with Mongoose

### <a href="#Adding-all-the-API-routes-to-modify-data-in-the-DB" class="headerlink" title="Adding all the API routes to modify data in the DB"></a>Adding all the API routes to modify data in the DB

Let’s add all the routes to create, read, update, and delete data from Mongo.

The Mongoose library provides some convenient methods to do CRUD operations:

-   \*\* Todo.find\*\*: find data matching a given query. (`{}`, get all, while `{isDone: true}` get only completed tasks).
-   \*\* Todo.create\*\*: Create a new todo
-   \*\* Todo.findByIdAndUpdate\*\*: Find Todo by given id and update its content.
-   \*\* Todo.findByIdAndDelete\*\*: Find Todo by given id and delete it.
-   \*\* Todo.deleteMany\*\*: Delete everything matching a given query.

Here are the routes by their matching HTTP verb (GET, PUT, POST, DELETE). In the next sections, we will test all these routes and go over some more details.

server/routes/todos.js

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
52
53
54
55
56
57
58</code></pre></td><td><pre><code>const express = require(&#39;express&#39;);
const router = express.Router();

const Todo = require(&#39;../models/todo&#39;);

/* GET /api/todos */
router.get(&#39;/&#39;, async (req, res) =&gt; {
  try {
    const list = await Todo.find(req.query);
    res.json(list);
  } catch (error) {
    res.status(500).json({ error });
  }
});

/* POST /api/todos */
router.post(&#39;/&#39;, async (req, res) =&gt; {
  try {
    const todo = await Todo.create(req.body);
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error });
  }
});

/* PUT /api/todos/:id */
router.put(&#39;/:id&#39;, async (req, res) =&gt; {
  try {
    const options = { new: true };
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, options);
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error });
  }
});

/* DELETE /api/todos/:id */
router.delete(&#39;/:id&#39;, async (req, res) =&gt; {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Beaware: it can delete all data from db if body is empty (DON&#39;T expoose deleteMany in PRODUCTION!)
/* DELETE /api/todos */
router.delete(&#39;/&#39;, async (req, res) =&gt; {
  try {
    const todo = await Todo.deleteMany(req.body);
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;</code></pre></td></tr></tbody></table>

We added many routes to this step. Take your time to go through them. In the next section, we will test them using `curl` and then integrated them with Angular.

> [f4f2281](https://github.com/amejiarosario/angular-todo-app/commit/f4f2281) - Adding all all the API routes to modify data in DB

### <a href="#Testing-the-API-CRUD-operations" class="headerlink" title="Testing the API CRUD operations"></a>Testing the API CRUD operations

Since we installed a new package, `mongoose`, we have to run `npm install` in the docker containers. Otherwise, file changes are picked up automatically, and you don’t need to restart.

Stop `docker-compose` and start it again `docker-compose up --build`.

#### <a href="#Creating-a-new-task-and-getting-lists" class="headerlink" title="Creating a new task and getting lists"></a>Creating a new task and getting lists

You can create a new task using the following command:

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>curl -XPOST server:3000/api/todos -H &quot;Content-Type: application/json&quot; -d &#39;{&quot;title&quot;: &quot;CRUD API&quot;, &quot;isDone&quot;: false}&#39;</code></pre></td></tr></tbody></table>

Now, let’s see if it’s there:

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>curl -XGET server:3000/api/todos</code></pre></td></tr></tbody></table>

You should have got something like this:

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>[{&quot;_id&quot;:&quot;5edc2a6d0c41d60054ad715f&quot;,&quot;title&quot;:&quot;CRUD API&quot;,&quot;isDone&quot;:false,&quot;updated_at&quot;:&quot;2020-06-06T23:44:45.966Z&quot;,&quot;__v&quot;:0}]⏎</code></pre></td></tr></tbody></table>

You can also check Angular on <http://localhost:4200/all>. The new task should be there!

#### <a href="#Update-data-with-PUT-method" class="headerlink" title="Update data with PUT method"></a>Update data with PUT method

If you remember from your routes file, we are using the method PUT to update tasks.

server/routes/todos.js

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5
6
7
8
9
10</code></pre></td><td><pre><code>/* PUT /api/todos */
router.put(&#39;/:id&#39;, async (req, res) =&gt; {
  try {
    const options = { new: true };
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, options);
    res.json(todo);
  } catch (error) {
    res.json(500, { error });
  }
});</code></pre></td></tr></tbody></table>

By default `findByIdAndUpdate` returns the original document. We are passing `{ new: true }` so we can return the updated document.

For updating a task you need the `_id`. You can get it from the previous step, when we listed all the tasks. For my case the \_id is `5edc2a6d0c41d60054ad715f`, find yours and replace it in the next command:

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>curl -XPUT server:3000/api/todos/5edc2a6d0c41d60054ad715f -H &quot;Content-Type: application/json&quot; -d &#39;{&quot;title&quot;: &quot;Finish PUT API&quot;, &quot;isDone&quot;: true, &quot;note&quot;: &quot;New Field&quot;}&#39;</code></pre></td></tr></tbody></table>

As you can see in the last update, we can modify existing fields and add new values like the `note` field.

#### <a href="#Erasing-data-with-the-DELETE-method" class="headerlink" title="Erasing data with the DELETE method"></a>Erasing data with the DELETE method

For our todo route, we also defined the DELETE method. Similar to the update, we need to pass and `id`.

server/routes/todos.js

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5
6
7
8
9</code></pre></td><td><pre><code>/* DELETE /api/todos */
router.delete(&#39;/:id&#39;, async (req, res) =&gt; {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error });
  }
});</code></pre></td></tr></tbody></table>

Again, remember to replace the next call with yout `_id`:

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1</code></pre></td><td><pre><code>curl -X DELETE server:3000/api/todos/5edc2a6d0c41d60054ad715f</code></pre></td></tr></tbody></table>

If you check the UI, all tasks will be gone: <http://localhost:4200/all>.

As much fun as `curl` is, let’s move on and complete all these functionalities in Angular.

<a href="#Angular-Service-to-talk-to-the-server" class="headerlink" title="Angular Service to talk to the server"></a>Angular Service to talk to the server
-----------------------------------------------------------------------------------------------------------------------------------------------------------

There are two main changes that we need to make in other to use the API server.

1.  We need to change the `TodoService` service to use HTTP client.
2.  Change the `TodoComponent` component to use the methods.

### <a href="#Angular-service-using-the-HTTP-client" class="headerlink" title="Angular service using the HTTP client"></a>Angular service using the HTTP client

In the following code, we are using the HTTP client, to make the appropriate calls:

src/app/todo/todo.service.ts

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
45</code></pre></td><td><pre><code>import { Injectable } from &#39;@angular/core&#39;;
import { HttpClient } from &#39;@angular/common/http&#39;;

export interface ITodo {
  _id?: string;
  title: string;
  isDone: boolean;
  notes: string;
  update_at: string;
  editing ?: boolean;
}

const API = &#39;/api/todos&#39;;

@Injectable({
  providedIn: &#39;root&#39;
})
export class TodoService {
  constructor(private http: HttpClient) { }

  get(params = {}) {
    return this.http.get(API, { params });
  }

  add(data: ITodo) {
    return this.http.post(API, data);
  }

  put(changed: ITodo) {
    return this.http.put(`${API}/${changed._id}`, changed);
  }

  toggle(selected: ITodo) {
    selected.isDone = !selected.isDone;
    return this.put(selected);
  }

  delete(selected: ITodo) {
    return this.http.delete(`${API}/${selected._id}`);
  }

  deleteCompleted(body = { isDone: true }) {
    return this.http.request(&#39;delete&#39;, `${API}`, { body });
  }
}</code></pre></td></tr></tbody></table>

The Todo service matches the HTTP verbs that we used in curl and passes the payloads.

Let’s now change the TodoComponent that goes along with these changes.

> [a93291c](https://github.com/amejiarosario/angular-todo-app/commit/a93291c) - Angular service using HTTP client

### <a href="#Angular-TodoComponet-updates" class="headerlink" title="Angular TodoComponet updates"></a>Angular TodoComponet updates

Here’s what your component should look like this:

src/app/todo/todo.component.ts

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
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66</code></pre></td><td><pre><code>import { Component, OnInit } from &#39;@angular/core&#39;;
import { ActivatedRoute } from &#39;@angular/router&#39;;

import { TodoService, ITodo } from &#39;./todo.service&#39;;

@Component({
  selector: &#39;app-todo&#39;,
  templateUrl: &#39;./todo.component.html&#39;,
  styleUrls: [&#39;./todo.component.scss&#39;],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  public todos: ITodo[];
  public activeTasks: number;
  public newTodo: string;
  public path: string;
  public mapToQuery = {
    all: {},
    active: { isDone: false },
    completed: { isDone: true },
  };
  constructor(private todoService: TodoService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params =&gt; {
      this.path = params.status;
      this.getTodos(this.path);
    });
  }

  addTodo() {
    this.todoService
      .add({ title: this.newTodo, isDone: false } as unknown as ITodo)
      .subscribe(() =&gt; {
        this.getTodos();
        this.newTodo = &#39;&#39;; // clear input form value
      });
  }

  getTodos(route = &#39;all&#39;) {
    const query = this.mapToQuery[route];
    return this.todoService
      .get(query)
      .subscribe((todos: ITodo[]) =&gt; {
        this.todos = todos;
        this.activeTasks = this.todos.filter(todo =&gt; !todo.isDone).length;
      });
  }

  updateTodo(todo: ITodo, newValue: string) {
    todo.title = newValue;
    return this.todoService.put(todo).subscribe(() =&gt; this.getTodos());
  }

  destroyTodo(todo: ITodo) {
    this.todoService.delete(todo).subscribe(() =&gt; this.getTodos());
  }

  toggleTodo(todo: ITodo) {
    this.todoService.toggle(todo).subscribe(() =&gt; this.getTodos());
  }

  clearCompleted() {
    this.todoService.deleteCompleted().subscribe(() =&gt; this.getTodos());
  }
}</code></pre></td></tr></tbody></table>

Let’s go over each part in the next sections.

#### <a href="#Sending-Queries-with-HTTP-GET" class="headerlink" title="Sending Queries with HTTP GET"></a>Sending Queries with HTTP GET

In the component, one the first thing we do is check the route params (path):

recap: src/app/todo/todo.component.ts (exerpt)

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5
6</code></pre></td><td><pre><code>ngOnInit() {
  this.route.params.subscribe(params =&gt; {
    this.path = params[&#39;status&#39;];
    this.getTodos(this.path);
  });
}</code></pre></td></tr></tbody></table>

When you click on the buttons `All`, `Active`, and `Completed`, that will trigger a route change.

To recap, these buttons use the router link. So, every time you click on them, they will change the URL.

recap: src/app/todo/todo.component.html (exerpt)

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

After we change the URL, the next thing we do is to call `getTodos`. Let’s see that next.

#### <a href="#Get-all-todos" class="headerlink" title="Get all todos"></a>Get all todos

We can get all services using the following:

src/app/todo/todo.component.ts (exerpt)

<table><colgroup><col style="width: 50%" /><col style="width: 50%" /></colgroup><tbody><tr class="odd"><td><pre><code>1
2
3
4
5
6
7
8
9</code></pre></td><td><pre><code>getTodos(route = &#39;all&#39;) {
  const query = this.mapToQuery[route];
  return this.todoService
    .get(query)
    .subscribe((todos: ITodo[]) =&gt; {
      this.todos = todos;
      this.activeTasks = this.todos.filter(todo =&gt; !todo.isDone).length;
    });
}</code></pre></td></tr></tbody></table>

We `this.todoService.get` will issue an HTTP get and retrieve all the tasks from the database and update the todos. It also updates the number of active tasks (the ones that are not done).

The `getTodos` receives an argument (`route`) with the path that will be one of these: `all`, `active`, or `complete`. However, MongoDB doesn’t understand these words. We have to map it (`mapToQuery`) to something a proper query like `{ isDone: true }`. This MongoDB will understand.

> [e33d540](https://github.com/amejiarosario/angular-todo-app/commit/e33d540) - Angular TodoComponet updates

#### <a href="#Modifying-the-todos" class="headerlink" title="Modifying the todos"></a>Modifying the todos

All the other operations, like the update, clear, toggle, are very similar. They trigger an action and then call `getTodos`, so the UI is up to date with the latest changes.

That’s all!

### Now, your turn!

Thanks for reading this far. Here are some things you can do next:

-   Found a typo? [Edit this post](https://github.com/amejiarosario/amejiarosario.github.io/edit/source/source/_posts/angular-todo-mean-stack-node-mongodb-typescript-tutorial.md).
-   Got questions? [comment](#comments-section) below.
-   Was it useful? Show your support and share it.



<a href="/how-to-solve-any-graph-2d-arrays-maze-interview-questions-in-javascript-dfs-vs-bfs/" class="article-nav-newer"><strong><em></em> newer</strong></a>

How to solve any graph/Maze interview questions in JavaScript? DFS vs. BFS

<a href="/promises-tutorial-concurrency-in-javascript-node/" class="article-nav-older"><strong>older <em></em></strong></a>

The JavaScript Promise Tutorial

Subscribe & stay up to date!

 









[<span id="back-to-top" title="Go back to the top of this page"> Top </span>](#) <a href="#" class="p-x-3" title="Improve this post"><em></em> Edit this post</a>

### Contents

1.  <a href="#REST-API-with-Node-js" class="toc-link"><span class="toc-number">1.</span> <span class="toc-text">REST API with Node.js</span></a>
    1.  <a href="#REST-API-using-ExpressJS" class="toc-link"><span class="toc-number">1.1.</span> <span class="toc-text">REST API using ExpressJS</span></a>
    2.  <a href="#Creating-a-host-alias-for-the-server" class="toc-link"><span class="toc-number">1.2.</span> <span class="toc-text">Creating a host alias for the server</span></a>
    3.  <a href="#Creating-API-routes-and-responding-to-requests" class="toc-link"><span class="toc-number">1.3.</span> <span class="toc-text">Creating API routes and responding to requests</span></a>
2.  <a href="#Connecting-REST-API-with-Angular-App" class="toc-link"><span class="toc-number">2.</span> <span class="toc-text">Connecting REST API with Angular App.</span></a>
    1.  <a href="#Creating-a-proxy-in-Angular-to-talk-to-the-API-server" class="toc-link"><span class="toc-number">2.1.</span> <span class="toc-text">Creating a proxy in Angular to talk to the API server</span></a>
    2.  <a href="#Using-HTTP-Client-to-talk-to-the-server" class="toc-link"><span class="toc-number">2.2.</span> <span class="toc-text">Using HTTP Client to talk to the server</span></a>
3.  <a href="#Setting-up-MongoDB" class="toc-link"><span class="toc-number">3.</span> <span class="toc-text">Setting up MongoDB</span></a>
    1.  <a href="#Dockerizing-the-MEAN-stack" class="toc-link"><span class="toc-number">3.1.</span> <span class="toc-text">Dockerizing the MEAN stack</span></a>
    2.  <a href="#Creating-MongoDB-schema-with-Mongoose" class="toc-link"><span class="toc-number">3.2.</span> <span class="toc-text">Creating MongoDB schema with Mongoose</span></a>
    3.  <a href="#Adding-all-the-API-routes-to-modify-data-in-the-DB" class="toc-link"><span class="toc-number">3.3.</span> <span class="toc-text">Adding all the API routes to modify data in the DB</span></a>
    4.  <a href="#Testing-the-API-CRUD-operations" class="toc-link"><span class="toc-number">3.4.</span> <span class="toc-text">Testing the API CRUD operations</span></a>
        1.  <a href="#Creating-a-new-task-and-getting-lists" class="toc-link"><span class="toc-number">3.4.1.</span> <span class="toc-text">Creating a new task and getting lists</span></a>
        2.  <a href="#Update-data-with-PUT-method" class="toc-link"><span class="toc-number">3.4.2.</span> <span class="toc-text">Update data with PUT method</span></a>
        3.  <a href="#Erasing-data-with-the-DELETE-method" class="toc-link"><span class="toc-number">3.4.3.</span> <span class="toc-text">Erasing data with the DELETE method</span></a>
4.  <a href="#Angular-Service-to-talk-to-the-server" class="toc-link"><span class="toc-number">4.</span> <span class="toc-text">Angular Service to talk to the server</span></a>
    1.  <a href="#Angular-service-using-the-HTTP-client" class="toc-link"><span class="toc-number">4.1.</span> <span class="toc-text">Angular service using the HTTP client</span></a>
    2.  <a href="#Angular-TodoComponet-updates" class="toc-link"><span class="toc-number">4.2.</span> <span class="toc-text">Angular TodoComponet updates</span></a>
        1.  <a href="#Sending-Queries-with-HTTP-GET" class="toc-link"><span class="toc-number">4.2.1.</span> <span class="toc-text">Sending Queries with HTTP GET</span></a>
        2.  <a href="#Get-all-todos" class="toc-link"><span class="toc-number">4.2.2.</span> <span class="toc-text">Get all todos</span></a>
        3.  <a href="#Modifying-the-todos" class="toc-link"><span class="toc-number">4.2.3.</span> <span class="toc-text">Modifying the todos</span></a>




