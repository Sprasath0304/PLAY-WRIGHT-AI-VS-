import{test,expect}from"@playwright/test";
import fs from 'fs';

const URL = "https://restful-booker.herokuapp.com";

test("Creating booking with json data",async({request})=>{
    // static payload for creating a booking
const jsonPath = "tests/API2/postbody.json";
const requestpayload = JSON.parse(fs.readFileSync(jsonPath,'utf-8'));
// send a postt request

const response =await request.post(`${URL}/booking`,{data:requestpayload});
const responseBody =await response.json()

console.log(responseBody);

// validate the response status code

expect(response.status()).toBe(200);
expect(response.statusText()).toBe("OK");

// validate the response body

expect(responseBody).toHaveProperty("bookingid");
expect(responseBody).toHaveProperty("booking");
expect(responseBody.bookingid).toEqual(expect.any(Number));

// validate the booking fields in the response body


const bookingData =  responseBody.booking;
expect(bookingData).toMatchObject({

firstname :requestpayload.firstname,
lastname:requestpayload.lastname,
totalprice:requestpayload.totalprice,
depositpaid:requestpayload.depositpaid,
additionalneeds:requestpayload.additionalneeds,

});


//validate the booking dates

expect(bookingData.bookingdates).toMatchObject({

    checkin:requestpayload.bookingdates.checkin,
    checkout:requestpayload.bookingdates.checkout
});
})