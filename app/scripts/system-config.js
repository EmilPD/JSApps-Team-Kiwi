SystemJS.config({
 // tell SystemJS which transpiler to use
 transpiler: 'plugin-babel',
 // tell SystemJS where to look for the dependencies
 map: {
  'plugin-babel': 'libs/systemjs-plugin-babel/plugin-babel.js',
  'systemjs-babel-build': 'libs/systemjs-plugin-babel/systemjs-babel-browser.js',
  
  // app start script
  'app': '../scripts/app.js',

  // Library files
   'jquery': 'libs/jquery/dist/jquery.min.js',
   'handlebars': 'libs/handlebars/dist/handlebars.amd.js',
 },
 packages: {
     '/': {
         defaultExtension: 'js'
     }
 }
});

System.import('app');