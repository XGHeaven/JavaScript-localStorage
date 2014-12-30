This is a JavaScript for HTML5 localStorage class.

My purpose is you can use it to help you to simplify coding.

# How to use it quietly

And first , you must link it in your html.

```
<script src="myStorage.js" type="text/javascript"></script>
```

Then , you need instance `myStorage` in your script.

```
var mystorage = new myStorage("mystorage");
```

It default create use localStorage path "anonyname" without args;

you can use `set` method to set value into localStorage , such as

```
mystorage.set("me","myStorage");
```
> there have two arguments in `set` , `key` and `value` .  
  it will be insert localStorage with "mystorage/key:value"  
  such as , in the previous code , the result is it will be insert `mystorage/me:myStorage` into localStorage  
  if you use `localStorage` to see it , you will be see it like this
```
Storage {mystorage/me:"myStorage", length: 1}
```

you can see it as a varibale that never disappear.  
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