// made by XGHeaven

(function(window){

	//debug
	var db = true;

	//window localStorage
	var $ = window.localStorage;

	var stack = [];

	var version = "1.0";

	//localStorage constructor
	var myStorage = function(Parent, Domain){

		//default domain
		if (!Domain && typeof(Domain)!="string") Domain = "anonyDomain";

		//parent myStorage
		//if parent is void , the default parent is {path:""}
		if (!Parent) {
			console.error("need parent");
		}

		// var this = {};
		this.parent = Parent;

		//this domain's name , It also is Domain.
		this.name = Domain;

		//path
		this.path = this.parent.path + this.name + "/";

		//domain content
		this.domain = {};

		//values content
		this.value = {};

		// this.myStorage = version;


		//set values
		this.set = function(key, value){

			//convert string to object for key
			if (typeof(key) != "object"){
				key = (function(temp){
					temp[key] = value;
					return temp;
				})({});
			}

			//set value
			for (var k in key){
				var v = key[k];
				if (typeof(v) === "object"){
					this.value[k] = $[this.path + k] = JSON.stringify(v);
				}else{
					this.value[k] = $[this.path + k] = v;
				}
			}

			return this;
		}

		//get value depend on path && key
		//it can be return JSON or string or false
		this.get = function(key){

			var returnValue;
			try{
				returnValue = JSON.parse(this.value[key]);
			}catch(e){
				returnValue = this.value[key];
			}

			return returnValue==undefined ? false : returnValue;
		}

		this.extend = function(Domain){
			return this.domain[Domain] = new myStorage(this, Domain);
		}

		this.remove = function(elements){
			if (typeof(elements) != "object"){
				elements = [elements];
			}

			for (k in elements){
				var ele = elements[k];
				if (this.value[ele]){
					$.removeItem(this.path + ele);
					delete this.value[ele];
				}else if (this.domain[ele]){
					this.domain[ele].clear();
					delete this.domain[k];
				}
			}
			return this;
		}

		this.clear = function(){
			for (var k in this.domain){
				this.domain[k].clear();
				delete this.domain[k];
			}
			for (var k in this.value){
				$.removeItem(this.path + k);
				delete this.value[k];
			}
			return this;
		}

		// this.close = function(){
		// 	console.log(delete this);
		// }

		// return body;
	};

	myStorage.prototype.clone = function(){
		return this.path;
	}

	window.myStorage = function(root){

		root = root || "myStorage";

		var key,value,path,st,_st,i;

		for (key in stack){
			if (stack[key].name == root){
				return stack[key];
			}
		}
		st = new myStorage({path:""},root);
		stack.push(st);

		for (key in $) {
			path = key.match(/([0-9a-zA-Z_$]+)\/??/g);
			db && console.log(path);

			if (path[0] != root) {
				break;
			}

			_st = st;

			for (i=1; i<path.length-1; i++) {
				if (!_st.domain[path[i]]) _st.domain[path[i]] = new myStorage(_st, path[i]);
				// if (!temp[path[i]]) temp[path[i]] = {};
				_st = _st.domain[path[i]];
			}
			_st.value[path[path.length-1]] = $[key];
			console.log(_st);
		}

		return st;

	};

})(window);