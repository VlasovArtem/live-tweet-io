# Live Tweet IO


## Description

![][screenshot]

Live Tweet IO is an AngularJS application streaming from a nodejs application the tweets located near San Francisco.

## Demo

You can play with the demo here: http://projects.kdelemme.com/live-tweet-io/app/

## Installation

Get the sources with `git clone https://github.com/kdelemme/live-tweet-io.git`

### Server

Go into the api directory and install the nodejs dependencies with npm:
```bash
npm install
```

Create a Twitter application on https://dev.twitter.com. Then, generate your own access token for this app. You now have
* API key
* API secret
* Access token
* Access token secret

Replace those values in `config/twitter.js`:
```javascript
var T = new Twit({
    consumer_key:         'API key',
    consumer_secret:      'API secret',
    access_token:         'Access token',
    access_token_secret:  'Access token secret'
})
```


If you run the nodejs application `node app.js`, you should get:
```bash
kevin@home:/var/www/angular/live-tweet-io/api$ node app.js 
   info  - socket.io started
live-tweet-io started on port 3000
Listening for tweets from San Francisco...
```

## Usage

### Server

You have to start the nodejs server first: `node app.js`

### Client
	
Open your browser on `http://localhost/path/to/live-tweet-io/app/`

## Stack

* AngularJS
* Bootstrap
* Node.js
* Socket.io

## Licence
The MIT License (MIT)

Copyright (c) 2014 Kevin Delemme (kdelemme@gmail.com) (http://www.kdelemme.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

[screenshot]: http://www.kdelemme.com/wp-content/uploads/2014/04/live-tweet-io.png