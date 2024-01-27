## 1. Hash:

### To setHashField:
**POST request**: `http://localhost:3000/hash/hset`

```Request JSON example:```

```
{
    "hash1":{
        "field1":"value1",
        "field2":"value2",
        "field3":"value3"
    }
}
```

### To getHashField:
**GET request**: `http://localhost:3000/hash/hget/<hashName>/<fieldName>`

### To getHashAllFields:
**GET request**: `http://localhost:3000/hash/hgetall/<hashName>`

### To deleteHashField:
**POST request**: `http://localhost:3000/hash/hdel`

```Request JSON example:```

```
{
    "key":"hash1",
    "fields":["field1","field2"]
}
```

### To findHashLength:
**GET request**: `http://localhost:3000/hash/hlen/<hashName>`


## 2. String:

### To setString:
**POST request**: `http://localhost:3000/string/set`

```Request JSON example:```

```
{
    "string1":"value1"
}
```

### To getString:
**GET request**: `http://localhost:3000/string/get/<stringName>`

### To deleteString:
**POST request**: `http://localhost:3000/string/getdel`

```
{
	"key":"string1"
}
```

### To getStringLength:
**GET request**: `http://localhost:3000/string/strlen/<stringName>`