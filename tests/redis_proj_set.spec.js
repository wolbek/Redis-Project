import { test, expect } from "@playwright/test";
const baseurl = "http://localhost:3000";

test.describe.parallel("Set Api Testing ", async () => {
  //for smembers success
  test("GET REQUEST - Set members when setkey is present", async ({
    request,
  }) => {
    const response1 = await request.post(`${baseurl}/set/sadd/set8`, {
      data: {
        value: ["akshay","dbz","onepiece"],
      },
    })
    const response = await request.get(`${baseurl}/set/smembers/set8`);

    const response_body = JSON.parse(await response.text());

    console.log(response_body);
    expect(response.status()).toBe(200);
  });

  //for setkey absent
  test("GET REQUEST -  when setkey is absent", async ({ request }) => {
    const response = await request.get(`${baseurl}/set/smembers/set17`);

    const response_body = JSON.parse(await response.text());

    console.log(response_body);
    expect(response.status()).toBe(400);
    expect(response_body.message).toBe("setkey not found");
  });

  //removing ele frm set
  test("POST REQUEST - Removing the element from set", async ({ request }) => {
    const response1 = await request.post(`${baseurl}/set/sadd/set8`, {
      data: {
        value: "akshay",
      },
    });
    
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


  //adding element to set
  test("POST REQUEST - Adding element to set", async ({ request }) => {
    const response = await request.post(`${baseurl}/set/sadd/set8`, {
      data: {
        value: ["ashwin"],
      },
    });
    const response_body = JSON.parse(await response.text());
    // console.log(response_body);
    expect(response.status()).toBe(201);
    expect(response_body.message).toBe("Members added to the set successfully");
  })



  //removing val which is not in set
  test("POST REQUEST - Removing the element which is not in set", async ({ request }) => {
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
    const response2 = await request.post(`${baseurl}/set/sadd/set8`, {
      data: {
        value: ["srk"],
      },
    });
    const response3 = await request.post(`${baseurl}/set/sadd/set10`, {
      data: {
        value: ["demoval"],
      },
    });

    const response_body2 = JSON.parse(await response2.text());
    // console.log(response_body);
    expect(response2.status()).toBe(201);
    expect(response_body2.message).toBe("Members added to the set successfully");
    const response = await request.post(`${baseurl}/set/smove/set8/set10`, {
      data: {
        value: "srk",
      },
    });
    const response_body = JSON.parse(await response.text());
    console.log(response_body);
    expect(response.status()).toBe(201);
    expect(response_body.message).toBe('Member moved successfully');
  })







  



  


});
