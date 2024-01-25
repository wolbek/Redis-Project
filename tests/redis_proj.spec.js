import { test, expect } from "@playwright/test";
const baseurl = "http://localhost:3000";

test.describe.parallel("List Api Testing ", async () => {

  //for len  
  test("GET REQUEST - list len when listkey is present", async ({ request }) => {
    const response = await request.get(`${baseurl}/list/len/list1`);
    
    const repsonse_body = JSON.parse(await response.text());
    console.log(response)
    console.log(repsonse_body)
    expect(response.status()).toBe(200);

  });

  test("GET REQUEST - list len when listkey is absent",async ({ request }) => {
    const response = await request.get(`${baseurl}/list/len/list8`);
    
    const repsonse_body = JSON.parse(await response.text());
    console.log(response.status())
    console.log(repsonse_body)
    expect(response.status()).toBe(401)
    expect(repsonse_body).toBe('listkey not present in list')
    
  })

  test.only("POST REQUEST - Adding element to the left side" , async({request})=>{
    const response = await request.post(`${baseurl}/list/lpush/list1`,  {
        "value" : "sixth_val"
    })
    const repsonse_body = JSON.parse(await response.text());
    console.log(response.status())
    console.log(repsonse_body)
    expect(response.status()).toBe(200)
    expect(repsonse_body.message).toBe('Element added to leftmost side.')
  })

});
