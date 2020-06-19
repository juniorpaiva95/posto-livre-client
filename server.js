const express = require('express')
	const serveStatic = require('serve-static')
	const path = require('path')

	const app = express()

	// serves files from our list directory which now contains out index.html file
    app.use('/', serveStatic(path.join(__dirname, '/dist')))
    
    // Catch all routes and redirect to the index file
    app.get('*', function (
        req, res) {
            res.sendFile(__dirname + '/dist/index.html')
        })

	const port = process.env.PORT || 8080
	app.listen(port)

	console.log('Listening on port: '+ port)