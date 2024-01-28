## 1. Hash:

### To setHashField:
**POST request**: `http://localhost:3000/hash/hset`

```Request:```

```
{
    "<hash1>":{
        "<field1>":"<value1>",
        "<field2>":"<value2>",
        "<field3>":"<value3>"
    }
}
```

```Response:```
```
{
    "message": "Successfully saved."
}
```

### To getHashField:
**GET request**: `http://localhost:3000/hash/hget/<hashName>/<fieldName>`

```Response:```
```
{
    "data": "<value>"
}
```

### To getHashAllFields:
**GET request**: `http://localhost:3000/hash/hgetall/<hashName>`

```Response:```
```
{
    "data": {
        "<field1>": "<value1>",
        "<field2>": "<value2>",
        "<field3>": "<value3>"
    }
}
```


### To findHashLength:
**GET request**: `http://localhost:3000/hash/hlen/<hashName>`

```Response:```
```
{
    "data": <hashLength>
}
```


### To deleteHashField:
**POST request**: `http://localhost:3000/hash/hdel`

```Request:```

```
{
    "key":"<hash1>",
    "fields":["<field1>","<field2>"]
}
```

```Response:```
```
{
    "message": "Successfully deleted given fields."
}
```


## 2. String:

### To setString:
**POST request**: `http://localhost:3000/string/set`

```Request:```

```
{
    "<string1>":"<value1>"
}
```

```Response:```
```
{
    "message": "Successfully saved."
}
```

### To getString:
**GET request**: `http://localhost:3000/string/get/<stringName>`

```Response:```
```
{
    "data": "<value>"
}
```


### To getStringLength:
**GET request**: `http://localhost:3000/string/strlen/<stringName>`

```Response:```
```
{
    "data": <valueLength>
}
```


### To deleteString:
**POST request**: `http://localhost:3000/string/getdel`

```Request:```
```
{
	"key":"<string1>"
}
```

```Response:```
```
{
    "data": "<value>"
}
```
