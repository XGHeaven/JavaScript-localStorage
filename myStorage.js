// made by XGHeaven

(function(window,jQuery){

	//window localStorage
	var $ = window.localStorage;

	//myStorage instance stack
	var $stack = [];

	myStorage = function(name, parent){
		if (!parent) parent = {path:""};
		if (!name) name = "anonyName";
		this.parent = parent;
		this.name = name;
		this.path = parent.path + name + "/";

		this.set = function(key, value){
			if (typeof(value) == "object"){
				$[this.path + key] = JSON.stringify(value);
			}else{
				$[this.path + key] = value;
			}
		}

		this.extend = function(name){
			return new this.constructor(name, this);
		}

		this.close = function(){
			console.log(delete this);
		}

		$stack.push(this);
		return this;
	}

	myStorage.clear = function(){
		$.clear();
	}

	myStorage.stack = $stack;
})(window);