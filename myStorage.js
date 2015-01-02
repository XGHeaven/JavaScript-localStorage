// made by XGHeaven

(function(window,jQuery){

	//window localStorage
	var $ = window.localStorage;


	//localStorage constructor
	var localStorage = function(Domain, Parent){

		//default domain
		if (!Domain) Domain = "";

		//parent myStorage
		//if parent is void , the default parent is {path:""}
		if (!Parent) Parent = root;

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
		}

		//get value depend on path && key
		this.get = function(key){
			return this.value[key]==undefined?false:this.value[key];
		}

		this.extend = function(Domain){
			return this.domain[Domain] = new localStorage(Domain, this);
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
		}

		// this.close = function(){
		// 	console.log(delete this);
		// }

		// return body;
	};

	myStorage = function(root){
		if (!root) root = {
			path:""
		};

		var ls = new localStorage();
		for (var key in $){
			var value = $[key];
			var path = key.match(/([0-9a-zA-Z_$]+)\/??/g);
			console.log(path);
			var temp = ls;
			for (var i=0;i<path.length-1;i++){
				if (!temp.domain[path[i]]) temp.domain[path[i]] = new localStorage(path[i], temp);
				// if (!temp[path[i]]) temp[path[i]] = {};
				temp = temp.domain[path[i]];
			}
			temp.value[path[path.length-1]] = value;
			console.log(temp);
		}
		return ls;
	};

	myStorage.clear = function(){
		$.clear();
	};

})(window);