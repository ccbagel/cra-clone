-------DEV BUILD-------

LOADERS: Loaders are functions that take some string of code and returns another string of code. For example, the Babel-loader takes some JSX and returns valid JS. Webpack allows us to import and export a lot of files. I used loaders to let webpack know how to use these files. So I used some rules in webpack that required a file to be processed in a certain way if it matches a given regex.
Another type of imports are media files such as gifs, png, and even webp. For this, I was going to use `file-loader` in my webpack config to know how to handle these types of files. But instead, I'm hashing the file name no matter the configuration. Depending on the file name and extension, webpack will generate them in static/media/[name] and append a hash based on the content before finally appending the extension. 

PLUGINS: Plugins can do much more and let us configure our setup. Our first plugin is the `htmlWebpackPlugin` which I'm using to insert script tags into my HTML file after the Webpack build. This will insert the minfied script and css tags minified in one line. Also in this plugin, I'm setting the templateParameters for our %PUBLIC_URL% variables in index.html as an empty string so our file paths are dynamic once we deploy.

CSS LOADERS: In my development env, I'm using three separate loaders for css. I'm using postcss autoprefixer, css-loader for css imports, then style-loader before finally inserting my css into the head of html.

WEBPACK DEVSERVER: Since the routing is done on the frontend, the devserver will return index.html. However, the content not generated through webpack ie /public, we need to configure it to know where those files are coming from and found.

Merging the dev config and the common config using webpackMerge module. This will merge the dev/build configs with the common configs.

I'm also hot-reloading for better dev experience.


-------PRODUCTION BUILD-------

One key difference between the dev build and produciton build is that in the production build, we want hashes on the JS files so we can cache them longterm.

Hashed chunk files also incorporated for lazy loading.

We also use the css loaders in the webpack config for our production environment but this time, we'll also use source maps for css. Instead of also inserting our css into the html head, we want to generate a css file so we could cache it. 

I've also used plugins to copy all the files in the /public directory since they aren't passed through webpack except for the index.html

-------SERVICE WORKER-------

I'm using service workers to listen to requests and use the browser cache. This way, even if the connection fails it still works.

The service worker has a couple of events. First is the install event. This is when the browser detects a new service worker. Then there's the activate phase which closes old instances of service workers and also looks for changes in service workers accordingly. Finally, fetch events which is triggered every time we fetch resources over the network. 