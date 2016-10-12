(function () {
    'use strict';

    var express = require('express');
    var winston = require('winston');
    var expressWinston = require('express-winston');
    var app = express();
    var path = require('path');
    var rootPath = path.normalize(__dirname + '/../');

    app.use(expressWinston.logger({
        transports: [
            new winston.transports.Console({
                json: false,
                colorize: true
            })
        ],
        meta: false,
        msg: "HTTP {{req.method}} {{req.url}}",
        expressFormat: true,
        colorStatus: true,
        ignoreRoute: function (req, res) {
            return false;
        }
    }));

    // app.use(express.static(rootPath + '/src'));
    // app.use(express.static(rootPath + '/node_modules'));
    app.use(express.static(rootPath));

    app.get('*', function (req, res) {
        res.send(rootPath + 'index.html');
    });

    app.listen(process.env.PORT, function () {
        console.log('Listening on port ' + process.env.PORT);
    });
})();
