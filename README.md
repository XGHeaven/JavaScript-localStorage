This is a JavaScript for HTML5 localStorage class.

My purpose is you can use it to help you to simplify coding.

# How to use it quietly

And first , you must link it in your html.

```
<script src="myStorage.js" type="text/javascript"></script>
```

Then , you need get `myStorage` in your script.

```
var mystorage = myStorage;
```

It default create use localStorage path "/" without args;

you can use `set` method to set value into localStorage , such as

```
mystorage.set("me","myStorage");
```
> there have two arguments in `set` , `key` and `value` .  
  it will be insert localStorage with "/key:value"  
  such as , in the previous code , the result is it will be insert `/me:myStorage` into localStorage  
  if you use `localStorage` to see it , you will be see it like this
```
Storage {/me:"myStorage", length: 1}
```

you can use it as a varibale that never disappear.  
so you can use any type variable to assign to `value`.  
such as

```
var value = {a:1,b:2}
mystorage.set("me",value);
```

`value` will be saved in `localStorage` as JSON  
and you can use `get` to get value from localStorage

```
var value = mystorage.get("me");
//value
//{a:1,b:2}
```

This is a simple document to use it quickly.

# other method

* extent
* remove
* clear

# issue for new feature in the future

1. it can set deadline to a key.
2. partly packaging, decrease closure to incease load speed.
3. there have many elements in a domain, and a domain alse can include other domains as child domain. you can get it out as a indenpendent myStorage instance.
4. you can also change it by youself.

# More Detail

## Store in localStorage
Everything must be store in a root tree.  
The root tree default called `myStorage`  
You can rename it when you instance it from myStorage through give it a string parament;

		var mystorage = new myStorage("root");

If this root was created ,It return `myStorage` which created in the past. If not ,It will return a new `myStorage`.

It store in localStorage like this.

`/root/DOMAIN:"1.0"`



## Structure in myStorage

It like a tree. Every tree node have many attributes and methods.

*	attributes  
	* name -> string
	* path -> string
	* value -> array
	* domain -> array
	* parent -> myStorage
*	methods
	* get(string) -> value
	* set(string,value) -> myStorage
	* extend(string) -> myStorage
	* remove(string) -> myStorage
	* clear() -> myStorage

> `value` is object, string or other type

# thanks for you

this is a semi-finished product , so I hope you can wait for me to complete it.
Thanks.

Made&Write By XGHeaven