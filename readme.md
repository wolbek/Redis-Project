## 1. HashSet:

### To setHashField:
**POST request**: `http://localhost:8080/hash/hset`

```Request JSON example:```

```
{
    "key":"hash1",
    "field1":"value1",
    "field2":"value2"
}
```

### To getHashField:
**GET request**: `http://localhost:8080/hash/hget/<hashName>/<fieldName>`

### To getHashAllFields:
**GET request**: `http://localhost:8080/hash/hget/<hashName>`

### To getAllHash:
**GET request**: `http://localhost:8080/hash/hgetallhash`

### To deleteHashField:
**POST request**: `http://localhost:8080/hash/hdel`

```Request JSON example:```

```
{
    "key":"hash1",
    "field":"field1"
}
```

### To findHashLength:
**GET request**: `http://localhost:8080/hash/hlen/<hashName>`


## 2. String:

### To setString:
**POST request**: `http://localhost:8080/string/set`

```Request JSON example:```

```
{
    "string1":"value1"
}
```

### To getString:
**GET request**: `http://localhost:8080/string/get/<stringName>`

### To getAllString:
**GET request**: `http://localhost:8080/string/getall`

### To deleteString:
**POST request**: `http://localhost:8080/string/getdel`

```
{
	"key":"string1"
}
```

### To getStringLength:
**GET request**: `http://localhost:8080/string/strlen/<stringName>`