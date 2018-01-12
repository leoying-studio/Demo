# axios 

1. get 请求:
```
	axios.get('http://xxxxx').then(function() {

	});

	axios.get('http://xxxxx', params: {
		id: 123456
	}).then(function() {

	}).catch(function() {

	});
```

2. post请求
```
	axios.post('/user',{
		firstName:'Fred',
		lastName:'Flintstone'
	})
	.then(function(res){
		console.log(res);
	})
	.catch(function(err){
		console.log(err);
	});
```

3. Promise.all([]);

```
  Promise.all([
	  axios.get('/user');
	  axios.post('/list', params: {
		  pageNo: 0,
		  pageSize: 12
	  });
  ]).then(function(values) {
	  conso.log(values);
  });
```	


4. axios 通过配置创建该实例

```
	const axios = axios.create({
		baseURL:"https://some-domain.com/api/",    // baseUrl
		timeout:1000,							   // 超时时间
		headers: {'X-Custom-Header':'foobar'}	   // 请求头参数
	});

```


5.  对象配置属性配置法(静态方法)

```
	axios.default.baseURL = 'XXXXX';
	axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
	axios.defaults.headers.post['content-Type'] = 'appliction/x-www-form-urlencoded';
	
```