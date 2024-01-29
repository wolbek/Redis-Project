import { test, expect } from "@playwright/test";
const baseurl = "http://localhost:3000";

test.describe.parallel("List Api Testing ", async () => {
  //for len success
  test("GET REQUEST - list len when listkey is present", async ({
    request,
  }) => {
    const response1 = await request.post(`${baseurl}/list/lpush/list1`, {
      data:{
        value: "seventh_val"
      }
    });

    const response = await request.get(`${baseurl}/list/len/list1`);

    const response_body = JSON.parse(await response.text());

    expect(response.status()).toBe(200);
  });

  //for len failure
  test("GET REQUEST - list len when listkey is absent", async ({ request }) => {
    const response1 = await request.post(`${baseurl}/list/lpush/list1`, {
      data:{
        value: "seventh_val"
      }
    });


    const response = await request.get(`${baseurl}/list/len/list8`);

    const response_body = JSON.parse(await response.text());

    expect(response.status()).toBe(400);
    expect(response_body).toBe("listkey not present in list");
  });

  //for lpush success
  test("POST REQUEST - Adding element to the left side", async ({
    request,
  }) => {
    const response = await request.post(`${baseurl}/list/lpush/list1`, {
      data:{
        value: "first_val"
      }
    });
    const response_body = JSON.parse(await response.text());

    expect(response.status()).toBe(201);
    expect(response_body.message).toBe("Element added to leftmost side.");
  });

  //for rpush success , when value is empty
  test("POST REQUEST - Adding an empty element", async ({ request }) => {
    const response = await request.post(`${baseurl}/list/rpush/list1`, {
      data:{
        value: ""
      }
      
    });
    const response_body = JSON.parse(await response.text());
    // console.log(response_body)
    expect(response.status()).toBe(400);
    expect(response_body.message).toBe("Value is absent");
  });

  //for lpop success
  test("GET REQUEST - Removing an element from left side", async ({
    request,
  }) => {
    const response1 = await request.post(`${baseurl}/list/lpush/list1`, {
      data:{
        value: "second_val"
      }
    });

    const response = await request.get(`${baseurl}/list/lpop/list1`);
    const response_body = JSON.parse(await response.text());
    expect(response.status()).toBe(201);
    expect(response_body.message).toBe("Element removed from leftmost side");
  });

  
});
