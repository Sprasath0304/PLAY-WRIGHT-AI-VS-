

import {test, expect} from "@playwright/test"

const Baseurl = "https://restful-booker.herokuapp.com";

// test("get booking", async({request})=>{

// const bookingid =1


// const response = await request.get(`${Baseurl}/booking/${bookingid}`)
// const responseBody= await response.json();

// console.log(responseBody)
// // vaildate status / response

// expect(response.status()).toBe(200);
// expect(response.statusText()).toBe("OK");


// })

// query parameter

test("get booking", async({request})=>{

const firstName = "jim";

const lastName = "Brown";


const response = await request.get(`${Baseurl}/booking`,{params:

   { firstName,
lastName
   }
})
const responseBody= await response.json();

console.log(responseBody)
// vaildate status / response

expect(response.status()).toBe(200);
expect(response.statusText()).toBe("OK");

// verify that booking id should be a number and should be greater than 0

for (const item of responseBody){

    expect(item).toHaveProperty("bookingid")
    expect(typeof item.bookingid).toBe("number")
    expect (item.bookingid).toBeGreaterThan(0)
}

})
