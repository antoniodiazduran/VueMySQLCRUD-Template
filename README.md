## Vue.js v2 CRUD + MySQL sample application

Uses vue.js v2.0 and vue-router v2.0

 - Forked from  https://github.com/shershen08/vue.js-v2-crud-application on [04-13-2020]
 - Forked from [this demo](http://codepen.io/-a/pen/amOYGp) using vue.js 1.x
 - [Demo on codepen](http://codepen.io/shershen08/pen/xROOxw)

### Usage
 - clone or download zip of this repo
 - `cd` to the upacked folder
 - run `npm install`
 - run http server of your choice

### Sample application
 - This CRUD sample uses three files: invoice.html, src/js/invoice.js and a PHP file for accessing MySQL server
 - All templates are located in the same invoice.html file, defined by <template></template>
 - It uses the VUE Route to call the templates
 - The data is manipulated from the MySQL server into a Javascript array in the invoice.js file
 - The changes to the database are made by AXIOS POST call in the invoice.js file
 - The refreshing of the data is completed by allRecords function using an AXIOS function

### MySQL 
 - The PHP file is located in the web server as API type call to serve the VueJS templates, AXIOS will do the trick
 - 