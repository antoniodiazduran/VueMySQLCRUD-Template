var productx = [
  {id: 1, title: 'Angular', description: 'Superheroic JavaScript MVW Framework.', timestamp: '2020-02-02 10:10'},
  {id: 2, title: 'Ember', description: 'A framework for creating ambitious web applications.', timestamp: '2020-01-09 08:08'},
  {id: 3, title: 'React', description: 'A JavaScript Library for building user interfaces.', timestamp: '2020-04-10 02:10'}
];

// Gathering data from the server
async function allRecords(tablx,callback) {
  await axios.post('/module/ajax_sites.php', {
    request: 1,
    files: tablx,
 }).then(function (response) { 
    products = response.data;
    console.log('List:'+products.length);
    callback();
 }).catch(function (error) {
    console.log(error);
 });
}

// Delete a single record from table
async function delRecord(req,tablx,id,callback) {
    await axios.post('/module/ajax_sites.php', {
        request: req,
        files: tablx,
        id: id,
     }).then(function (response) { 
        products = response.data;
        console.log('deleting..');
        callback();
     }).catch(function (error) {
        console.log(error);
     });
}

function findProduct (productId) {
  return products[findProductKey(productId)];
};

function findProductKey (productId) {
  for (var key = 0; key < products.length; key++) {
    if (products[key].id == productId) {
      return key;
    }
  }
};

function timeStampDate() {
    var tsd = new Date();
    var newTimeStamp = '';
    var nyear = tsd.getFullYear();
    var nmonth = ((tsd.getMonth()+1)>9?(tsd.getMonth()+1):'0'+(tsd.getMonth()+1));
    var nday = (tsd.getDate()>9?tsd.getDate():'0'+tsd.getDate());
    return nyear+'-'+nmonth+'-'+nday;
}

var List = Vue.extend({
  template: '#product-list',
  data: function () {
    return {products: products, searchKey: ''};
  },
  computed : {
    filteredProducts: function () {
    var self = this;
    console.log()
      return self.products.filter(function (product) {
        return product.title.indexOf(self.searchKey) !== -1
      })
    },
  }
});

var Product = Vue.extend({
  template: '#product',
  data: function () {
    return {product: findProduct(this.$route.params.product_id)};
  }
});

var ProductEdit = Vue.extend({
  template: '#product-edit',
  data: function () {
    return {product: findProduct(this.$route.params.product_id)};
  },
  methods: {
    updateProduct: function () {
      var product = this.product;
      // Adding data to database
      axios.post('/module/ajax_sites.php', {
        request: 3,
        files: 'sites',
        id: this.$route.params.product_id,
        title: product.title,
        description: product.description,    
      }).then(function (response) { 
        products = response.data;
        console.log('update mysql:'+products);
        allRecords('sites',function() { 
            console.log('loading..');
            router.push('/'); 
        });
      }).catch(function (error) {
        console.log(error);
      });
      //products[findProductKey(product.id)] = {
      //  id: product.id,
      //  title: product.title,
      //  description: product.description,  
      //};
      //router.push('/');
    }
  }
});

var ProductDelete = Vue.extend({
  template: '#product-delete',
  data: function () {
    return {product: findProduct(this.$route.params.product_id)};
  },
  methods: {
    deleteProduct: function () {
      delRecord(4,'sites',this.$route.params.product_id,function(){
        console.log('record deleted');
        allRecords('sites',function() { 
            console.log('loading..');
            router.push('/'); 
        });
      })
      //products.splice(findProductKey(this.$route.params.product_id), 1);
      console.log('del:'+products.length);
    }
  }
});

var AddProduct = Vue.extend({
  template: '#add-product',
  data: function () {
    return {product: {title: '', description: '', timestamp: ''}
    }
  },
  methods: {
    createProduct: function() {
      var product = this.product;
      // Adding data to database
      axios.post('/module/ajax_sites.php', {
        request: 2,
        files: 'sites',
        title: product.title,
        description: product.description,    
      }).then(function (response) { 
        products = response.data;
        console.log('mysql:'+products);
        allRecords('sites',function() { 
            console.log('loading..');
            router.push('/'); 
        });
      }).catch(function (error) {
        console.log(error);
      });
      //products.push({
        //id: Math.random().toString().split('.')[1],
        //title: product.title,
        //description: product.description,
      //});

    }
  }
});

var router = new VueRouter({
  routes: [
    {path: '/', component: List},
    {path: '/product/:product_id', component: Product, name: 'product'},
    {path: '/add-product', component: AddProduct},
    {path: '/product/:product_id/edit', component: ProductEdit, name: 'product-edit'},
    {path: '/product/:product_id/delete', component: ProductDelete, name: 'product-delete'}
]});

//Getting records for the List template
allRecords('sites', function(){
    console.log('init:'+products.length);
    initialize();
})

function initialize() {
 const vm = new Vue({
    el: '#app',
    router: router,
    template: '<router-view></router-view>' 
 })
}