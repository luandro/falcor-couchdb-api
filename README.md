# Falcor CouchDB api

A simple example on how to combine [Falcor](http://netflix.github.io/falcor) with a [CouchDB](http://couchdb.apache.org/)(using [cradle](https://github.com/flatiron/cradle)) database to serve a [Json Graph](http://netflix.github.io/falcor/documentation/jsongraph.html) api.

## Usage

Make sure you have CouchDB installed and running.

```
	git clone https://github.com/luandro/falcor-couchdb-api.git
	cd falcor-couchdb-api

	npm install
	npm run dev     # start express server with nodemon
```

The first run may throw an error saying the database doesn't exist, just run it once again. Try passing a url with path params like ```[ characters ,{ from :0, to :4}, name ]``` and a method params ```get ``` to ```http://localhost:3000/model.json```and see the response.