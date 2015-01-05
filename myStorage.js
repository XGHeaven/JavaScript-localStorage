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
		if (typeof(Domain) != "string") Domain = "anonyDomain";

		//parent myStorage
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

		// return body;
	};

	//set values
	myStorage.prototype.set = function(key, value){

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
	myStorage.prototype.get = function(key){

		if (!key || typeof(key)!="string"){
			db && console.log("key is incorrect");
			return false;
		}

		var returnValue;
		try{
			returnValue = JSON.parse(this.value[key]);
		}catch(e){
			returnValue = this.value[key];
		}

		return returnValue==undefined ? false : returnValue;
	}

	//create new domain through this
	myStorage.prototype.extend = function(Domain){

		if (!Domain || typeof(Domain)!="string") {
			db && console.log("Domain is incorrect");
			return this;
		}

		if (this.domain[Domain]) {
			return this.domain[Domain];
		} else {
			return this.domain[Domain] = new myStorage(this, Domain);
		}
	}

	//get have been created domain
	//if it don't exist, return false.
	myStorage.prototype.getdomain = function(Domain){
		return this.domain[Domain] || false;
	}

	//remove elements from myStorage
	//elements can be a array
	myStorage.prototype.remove = function(elements){
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

	//clear this myStorage
	myStorage.prototype.clear = function(){
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

	//check if key if in the value
	myStorage.prototype.isset = function(key){
		return !!this.value[key];
	}


	//main myStorage
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
			db && console.log(_st);
		}

		return st;

	};

})(window);