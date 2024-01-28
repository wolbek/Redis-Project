import { test, expect } from '@playwright/test';
//Keeping the tests independent of each other

const baseUrl = 'http://localhost:8000';

test.describe.parallel('API Testing', () => {

    //setString Success
    test('1) POST Request - setString Success', async ({request}) => {
        const response = await request.post(`${baseUrl}/string/set`, {
            data:{
                string1:"value1"
            }
        })
        const responseBody = JSON.parse(await response.text());
    
        expect(response.status()).toBe(201);
        expect(responseBody.message).toBe("Successfully saved.");
    })

    //setString Failure
    test('1) POST Request - setString Failure', async ({request}) => {
        const response = await request.post(`${baseUrl}/string/set`, {
            data:{
                string1:null
            }
        })
        const responseBody = JSON.parse(await response.text());
    
        expect(response.status()).toBe(400);
        expect(responseBody.message).toBe("Invalid input.");
    })
    
    //getString Success
    test('2) GET Request - getString Success', async ({request}) => {
    
        const response1 = await request.post(`${baseUrl}/string/set`, {
            data:{
                string2:"value2"
            }
        })
        const responseBody1 = JSON.parse(await response1.text());
    
        expect(response1.status()).toBe(201);
        expect(responseBody1.message).toBe("Successfully saved.");
    
        const response2 = await request.get(`${baseUrl}/string/get/string2`);
        const responseBody2 = JSON.parse(await response2.text());
    
        expect(response2.status()).toBe(200);
        expect(responseBody2.data).toBe("value2");
    });

    //getString Failure
    test('2) GET Request - getString Failure', async ({request}) => {
    
        const response = await request.get(`${baseUrl}/string/get/notexist`);
        const responseBody = JSON.parse(await response.text());
    
        expect(response.status()).toBe(400);
        expect(responseBody.message).toBe("The requested data does not exist.");
    });
    
    //getStringLength Success
    test('3) GET Request - getStringLength Success', async ({request}) => {
    
        const response1 = await request.post(`${baseUrl}/string/set`, {
            data:{
                string3:"value3"
            }
        })
        const responseBody1 = JSON.parse(await response1.text());
    
        expect(response1.status()).toBe(201);
        expect(responseBody1.message).toBe("Successfully saved.");
    
        const response2 = await request.get(`${baseUrl}/string/strlen/string3`);
        const responseBody2 = JSON.parse(await response2.text());
    
        expect(response2.status()).toBe(200);
        expect(responseBody2.data).toBe(6);
    
    });

    //getStringLength Failure
    test('3) GET Request - getStringLength Failure', async ({request}) => {
    
        const response = await request.get(`${baseUrl}/string/strlen/notexist`);
        const responseBody = JSON.parse(await response.text());
    
        expect(response.status()).toBe(400);
        expect(responseBody.message).toBe("The requested data does not exist, unable to determine its length.");
    
    });
    
    //deleteString Success
    test('4) POST Request - deleteString Success', async ({request}) => {
    
        const response1 = await request.post(`${baseUrl}/string/set`, {
            data:{
                string4:"value4"
            }
        })
        const responseBody1 = JSON.parse(await response1.text());
    
        expect(response1.status()).toBe(201);
        expect(responseBody1.message).toBe("Successfully saved.");
    
        const response2 = await request.post(`${baseUrl}/string/getdel`, {
            data:{
                key:"string4"
            }
        })
        const responseBody2 = JSON.parse(await response2.text());
        
        expect(response2.status()).toBe(200);
        expect(responseBody2.data).toBe("value4");
    })

    //deleteString Failure
    test('4) POST Request - deleteString Failure', async ({request}) => {
    
        const response = await request.post(`${baseUrl}/hash/hdel`, {
            data:{
                key:"notexist"
            }
        })
        const responseBody = JSON.parse(await response.text());
        
        expect(response.status()).toBe(400);
        expect(responseBody.message).toBe("The data requested to be deleted does not exist.");
    })

})






