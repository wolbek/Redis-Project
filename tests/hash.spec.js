import { test, expect } from '@playwright/test';
//Keeping the tests independent of each other

const baseUrl = 'http://localhost:8000';

test.describe.parallel('API Testing', () => {

    //setHash Success
    test('1) POST Request - setHash Success', async ({request}) => {
        const response = await request.post(`${baseUrl}/hash/hset`, {
            data:{
                hash1:{
                    field1:"value1",
                    field2:"value2",
                    field3:"value3"
                }
            }
        })
        const responseBody = JSON.parse(await response.text());
    
        expect(response.status()).toBe(201);
        expect(responseBody.message).toBe("Successfully saved.");
    })

    //setHash Failure
    test('1) POST Request - setHash Failure', async ({request}) => {
        const response = await request.post(`${baseUrl}/hash/hset`, {
            data:{
                hash1:[]
            }
        })
        const responseBody = JSON.parse(await response.text());
    
        expect(response.status()).toBe(400);
        expect(responseBody.message).toBe("Invalid input.");
    })
    
    //getHashField Success
    test('2) GET Request - getHashField Success', async ({request}) => {
    
        const response1 = await request.post(`${baseUrl}/hash/hset`, {
            data:{
                hash2:{
                    field1:"value1",
                    field2:"value2",
                    field3:"value3"
                }
            }
        })
        const responseBody1 = JSON.parse(await response1.text());
    
        expect(response1.status()).toBe(201);
        expect(responseBody1.message).toBe("Successfully saved.");
    
        const response2 = await request.get(`${baseUrl}/hash/hget/hash2/field1`);
        const responseBody2 = JSON.parse(await response2.text());
    
        expect(response2.status()).toBe(200);
        expect(responseBody2.data).toBe("value1");
    });

    //getHashField Failure
    test('2) GET Request - getHashField Failure', async ({request}) => {
    
        const response = await request.get(`${baseUrl}/hash/hget/notexist/notexist`);
        const responseBody = JSON.parse(await response.text());
    
        expect(response.status()).toBe(400);
        expect(responseBody.message).toBe("The requested data does not exist.");
    });
    
    //getHashAllFields Success
    test('3) GET Request - getHashAllFields Success', async ({request}) => {
    
        const response1 = await request.post(`${baseUrl}/hash/hset`, {
            data:{
                hash3:{
                    field1:"value1",
                    field2:"value2",
                    field3:"value3"
                }
            }
        })
        const responseBody1 = JSON.parse(await response1.text());
    
        expect(response1.status()).toBe(201);
        expect(responseBody1.message).toBe("Successfully saved.");
    
        const response2 = await request.get(`${baseUrl}/hash/hgetall/hash3`);
        const responseBody2 = JSON.parse(await response2.text());
    
        expect(response2.status()).toBe(200);
        expect(responseBody2.data).toStrictEqual({
            "field1": "value1",
            "field2": "value2",
            "field3": "value3"
        });
    
    });

    //getHashAllFields Failure
    test('3) GET Request - getHashAllFields Failure', async ({request}) => {
    
        const response = await request.get(`${baseUrl}/hash/hgetall/notexist`);
        const responseBody = JSON.parse(await response.text());
    
        expect(response.status()).toBe(400);
        expect(responseBody.message).toBe("The requested data does not exist.");
    
    });
    
    //findHashLength Success
    test('4) GET Request - findHashLength Success', async ({request}) => {
    
        const response1 = await request.post(`${baseUrl}/hash/hset`, {
            data:{
                hash4:{
                    field1:"value1",
                    field2:"value2",
                    field3:"value3"
                }
            }
        })
        const responseBody1 = JSON.parse(await response1.text());
    
        expect(response1.status()).toBe(201);
        expect(responseBody1.message).toBe("Successfully saved.");
    
        const response2 = await request.get(`${baseUrl}/hash/hlen/hash4`);
        const responseBody2 = JSON.parse(await response2.text());
    
        expect(response2.status()).toBe(200);
        expect(responseBody2.data).toBe(3);
    
    });

    //findHashLength Failure
    test('4) GET Request - findHashLength Failure', async ({request}) => {
    
        const response = await request.get(`${baseUrl}/hash/hlen/notexist`);
        const responseBody = JSON.parse(await response.text());
    
        expect(response.status()).toBe(400);
        expect(responseBody.message).toBe("The requested data does not exist, unable to determine its length.");
    
    });
    
    //deleteHashField Success
    test('5) POST Request - deleteHashField Success', async ({request}) => {
    
        const response1 = await request.post(`${baseUrl}/hash/hset`, {
            data:{
                hash5:{
                    field1:"value1",
                    field2:"value2",
                    field3:"value3"
                }
            }
        })
        const responseBody1 = JSON.parse(await response1.text());
    
        expect(response1.status()).toBe(201);
        expect(responseBody1.message).toBe("Successfully saved.");
    
        const response2 = await request.post(`${baseUrl}/hash/hdel`, {
            data:{
                key:"hash5",
                fields:["field1","field2"]
            }
        })
        const responseBody2 = JSON.parse(await response2.text());
        
        expect(response2.status()).toBe(200);
        expect(responseBody2.message).toBe("Successfully deleted given fields.");
    })

    //deleteHashField Failure
    test('5) POST Request - deleteHashField Failure', async ({request}) => {
    
        const response = await request.post(`${baseUrl}/hash/hdel`, {
            data:{
                key:"notexist",
                fields:["field1","field2"]
            }
        })
        const responseBody = JSON.parse(await response.text());
        
        expect(response.status()).toBe(400);
        expect(responseBody.message).toBe("The data requested to be deleted does not exist.");
    })

})






