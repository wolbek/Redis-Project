import { test, expect } from "@playwright/test";
const baseurl = "http://localhost:3000";

test.describe.parallel("List Api Testing ", async () => {
  //for len success
  test("GET REQUEST - list len when listkey is present", async ({
    request,
  }) => {
    const response = await request.get(`${baseurl}/set/smembers/set10`);

    const response_body = JSON.parse(await response.text());

    console.log(response_body);
    expect(response.status()).toBe(200);
  });

  //for listkey absent
  test("GET REQUEST -  when setkey is absent", async ({ request }) => {
    const response = await request.get(`${baseurl}/set/smembers/set17`);

    const response_body = JSON.parse(await response.text());

    console.log(response_body);
    expect(response.status()).toBe(400);
    expect(response_body.message).toBe("setkey not found");
  });


  //adding element to set
  test("POST REQUEST - Adding element to set", async ({ request }) => {
    const response = await request.post(`${baseurl}/set/sadd/set8`, {
      data: {
        value: ["akshay","dbz","onepiece"],
      },
    });
    const response_body = JSON.parse(await response.text());
    // console.log(response_body);
    expect(response.status()).toBe(201);
    expect(response_body.message).toBe("Members added to the set successfully");
  })

  //removing the the value from the set
  test("POST REQUEST - Remvoing the element from set", async ({ request }) => {
    const response = await request.post(`${baseurl}/set/srem/set8`, {
      data: {
        value: "akshay",
      },
    });
    const response_body = JSON.parse(await response.text());
    console.log(response_body);
    expect(response.status()).toBe(201);
    expect(response_body.message).toBe("Members removed from the set successfully ");
  })

  //removing val which is not in set
  test("POST REQUEST - Remvoing the element which is not in set", async ({ request }) => {
    const response = await request.post(`${baseurl}/set/srem/set8`, {
      data: {
        value: "random23",
      },
    });
    const response_body = JSON.parse(await response.text());
    console.log(response_body);
    expect(response.status()).toBe(400);
    expect(response_body.message).toBe('Member not present in set');
  })

  //moving one ele from one set to another
  test("POST REQUEST - Moving one val from one set to another", async ({ request }) => {
    const response = await request.post(`${baseurl}/set/smove/set8/set10`, {
      data: {
        value: "demo8",
      },
    });
    const response_body = JSON.parse(await response.text());
    console.log(response_body);
    expect(response.status()).toBe(401);
    expect(response_body.message).toBe('Member moved successfully');
  })

  //smove when source or destination set is incorrect
  test.only("POST REQUEST - Moving one val when setkey is incorrect", async ({ request }) => {
    const response = await request.post(`${baseurl}/set/smove/set19/set10`, {
      data: {
        value: "demo8",
      },
    });
    const response_body = JSON.parse(await response.text());
    console.log(response_body);
    // expect(response.status()).toBe(401);
    // expect(response_body.message).toBe('Member moved successfully');
  })





  



  


});
