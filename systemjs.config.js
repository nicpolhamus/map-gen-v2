/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': 'lib/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'app',
            // angular bundles
            '@angular/core': 'npm:angular/core/core.umd.js',
            '@angular/common': 'npm:angular/common/common.umd.js',
            '@angular/compiler': 'npm:angular/compiler/compiler.umd.js',
            '@angular/platform-browser': 'npm:angular/platform-browser/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:angular/platform-browser-dynamic/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:angular/http/http.umd.js',
            '@angular/router': 'npm:angular/router/router.umd.js',
            '@angular/forms': 'npm:angular/forms/forms.umd.js'
            // other libraries
            //'rxjs': 'npm:rxjs',
            //'angular-in-memory-web-api': 'npm:angular-in-memory-web-api',
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            }
//             rxjs: {
//                 defaultExtension: 'js'
//             },
//             'angular-in-memory-web-api': {
//                 main: './index.js',
//                 defaultExtension: 'js'
//             }
        }
    });
})(this);
