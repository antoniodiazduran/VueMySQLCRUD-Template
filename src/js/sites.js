var productsx = [
  {id: 1, name: 'Angular', description: 'Superheroic JavaScript MVW Framework.', price: 100},
  {id: 2, name: 'Ember', description: 'A framework for creating ambitious web applications.', price: 100},
  {id: 3, name: 'React', description: 'A JavaScript Library for building user interfaces.', price: 100}
];

var products = [];
var infodata = '';
var productx = [];

function allRecords(tablx,callback) {
  axios.post('/module/ajax_sites.php', {
    request: 1,
    files: tablx,
  }).then(function (response) { 
    products = response.data; 
    callback();
  }).catch(function (error) {
    console.log(error);
  });
}
async function oneRecord(tablx,idx,callback) {
  await axios.post('/module/ajax_sites.php', {
    request: 31,
    id: idx,
    files: tablx,
  }).then(function (response) { 
    productx = response.data; 
    productx = productx[0];
    callback();
  }).catch(function (error) {
    console.log(error);
  });
}

var ProductEdit = Vue.extend({
  template: '#product-edit',
  async created() {
    await oneRecord('sites',this.$route.params.product_id,function(){
      console.log('looking one record');
      console.log(productx);
    })  
  },
  data: function() { 
    return {
      product: {
        id: null,
        title: 'x',
        description: productx.description,
      }
    }
  },
  methods: {
    updateProduct: function () {
       alert('Updating record');
    },
  },
  mounted() {
    return {
      product: {
        id: productx.id,
        title: productx.title,
        description: productx.description,
      }
    }
  }
});

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

var List = Vue.extend({
  template: '#product-list',
  data:  function() { 
    console.log('list1...');
      return {
        products: products, 
        searchKey: '', 
      }
    
  },
  computed : {
    filteredProducts: function () {   
      var self = this;
      console.log('list2...');
      console.log(self.products.length);
      return self.products.filter(function (product) {
       return product.title.indexOf(self.searchKey) !== -1
     })
      
    }
  },   
});

var ProductDelete = Vue.extend({
  template: '#product-delete',
  data: function () {
    return {
      product: findProduct(this.$route.params.product_id)
    };
  },
  methods: {
    deleteProduct: function () {
      axios.post('/module/ajax_sites.php', {
        request: 4,
        files: 'sites',
        id: this.$route.params.product_id
      })
      .then(function (response) {
        console.log('deleted..');
        allRecords('sites',function() { 
          console.log('loading..');
          router.push('/'); 
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
});

var AddProduct = Vue.extend({
  template: '#add-product',
  data: function () {
    return {
      product: {
        title: '', 
        description: '', 
        timestamp: ''
      }
    }
  },
  methods: {
    createProduct: function() {
      axios.post('/module/ajax_sites.php', {
        request: 2,
        files: 'sites',
        title: this.product.title,
        description: this.product.description,
      })
      .then(function (response) {
        console.log('added...'+ response.data);
        infodata = response.data;
        allRecords('sites',function() { 
          console.log('loading..');
          router.push('/'); 
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
});

var Product = Vue.extend({
  template: '#product',
  data: function () {
    return {
      product: findProduct(this.$route.params.product_id)
    };
  }
});

var router = new VueRouter({
  routes: [
    {path: '/', component: List},
    {path: '/product/:product_id', component: Product, name: 'product'},
    {path: '/add-product', component: AddProduct},
    {path: '/product/:product_id/edit', component: ProductEdit, name: 'product-edit'},
    {path: '/product/:product_id/delete', component: ProductDelete, name: 'product-delete'}
   ]
});

// Gathering data from the server
axios.post('/module/ajax_sites.php', {
    request: 1,
    files: 'sites'
 }).then(function (response) { 
    products = response.data;
    initialize();  
 }).catch(function (error) {
    console.log(error);
 })

 // Once the data is in, the Vue instance is created
function initialize() {
  const vm = new Vue({
   el: '#app',
   router: router,
   template: '<router-view></router-view>',
  
  })
}
