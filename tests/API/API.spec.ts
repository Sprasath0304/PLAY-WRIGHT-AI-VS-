import{test,expect}from"@playwright/test";


const URL = "https://restful-booker.herokuapp.com";

test("Creating booking with static data",async({request})=>{
    // static payload for creating a booking
let booking ={
    "firstname" : "Jim",
    "lastname" : "Brown",
    "totalprice" : 111,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "Breakfast"
}

// send a postt request

const response =await request.post(`${URL}/booking`,{data:booking});
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


const bookingData = await responseBody.booking;
expect(bookingData).toMatchObject(booking);


//validate the booking dates

expect(bookingData.bookingdates).toMatchObject(booking.bookingdates);
})