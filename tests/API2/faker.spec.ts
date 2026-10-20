import { fa, faker } from "@faker-js/faker";
import{test,expect}from"@playwright/test";
import{DateTime} from 'luxon';
const URL = "https://restful-booker.herokuapp.com";

test("Creating booking with json data",async({request})=>{



const firstname =faker.person.firstName();
const lastName =faker.person.lastName();
const totalprice = faker.number.int({min:100,max:500})
const depositpaid = faker.datatype.boolean();

const checkin = DateTime.now().toFormat("yyyy-mm-dd")

const  checkout =DateTime.now().plus({day:5}).toFormat("yyyy-MM-dd")

const additionalneeds = "super bowl"


const requestpayload = {
firstname :firstname,
lastName : lastName,
totalprice :totalprice,
depositpaid:depositpaid,
bookingData:{

    checkin:checkin,
    checkout : checkout,
},

additionalneeds:additionalneeds

};

    // static payload for creating a booking
// const jsonPath = "tests/API2/postbody.json";
// const requestpayload = JSON.parse(fs.readFileSync(jsonPath,'utf-8'));
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