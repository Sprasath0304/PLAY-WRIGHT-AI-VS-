// create booking --> booking od 

// booking id --> get the booking (option)

// booking id + request payload (json) --> partial update the booking (patch)

// booking id + request  payload (json) --> full update the booking (put)

//booking id --> delete the booking 


import {test,expect, request} from "@playwright/test";
import fs from 'fs';

function readJson(filepath:string){

    return JSON.parse(fs.readFileSync(filepath,'utf-8'));

}

const Baseurl = "https://restful-booker.herokuapp.com";

test("Creating creating ,get and update a booking record", async({request})=>{

// step 1: Createe a new booking using a Post request

const createbookingdata = readJson("./tests/API2/postbody.json");

const createresponse = await request.post(`${Baseurl}/booking`,{data:createbookingdata})

const createdbooking = await createresponse.json();
const bookingid = createdbooking.bookingid

// step 2 (optional) : get the created booking using GET request 

const getresponse = await request.get(`${Baseurl}/booking/${bookingid}`);

const bookingdetails = await getresponse.json();

//
console.log("booking details before update:",bookingdetails)

 //step3  create the token

const tokendata = readJson("./tests/API3/tokenbody.json")

const tokenresponse = await request.post(`${Baseurl}/auth`,{ data:tokendata, })

// vaildation status / response 

expect (tokenresponse.status()).toBe(200)

expect (tokenresponse.statusText()).toBe("OK")


const tokenjson = await tokenresponse.json();

const token = tokenjson.token

console.log ("Token generate:",token)

expect(token).toBeTruthy();

//Step 4  put / patch / delete 

const partialupdate = readJson("./tests/API3/patchrequest.json")

const updateresponse = await request.patch(`${Baseurl}/booking/${bookingid}`,

{
    headers:{
"Content-Type": "application/json",
        "Cookie":`token=${token}`,

    },

    data:partialupdate,    

});

// validate status code 

expect (updateresponse.status()).toBe(200);

expect (updateresponse.statusText()).toBe("OK")


const partialupdatebooking =await updateresponse.json()

console.log("partial update booking",partialupdatebooking)

// step 5 : Full update 


const fullupdate = readJson("./tests/API3/Fullupdate.json")

const fullupdateresponse = await request.put(`${Baseurl}/booking/${bookingid}`,

{
    headers:{
"Content-Type": "application/json",
        "Cookie":`token=${token}`,

    },

    data:fullupdate,    

});

// validate status code 

expect (fullupdateresponse.status()).toBe(200);

expect (fullupdateresponse.statusText()).toBe("OK")


const fullupdatebooking =await fullupdateresponse.json();

console.log(" fullupdate booking",fullupdatebooking)

// step 6 : delete booking

const deleteresponse = await request.delete(`${Baseurl}/booking/${bookingid}`,

{ headers : {

    "Content-Type": "application/json",
        "Cookie":`token=${token}`,
}

});

expect (deleteresponse.status()).toBe(201)

expect (deleteresponse.statusText()).toBe("Created")

console.log("bboking detail are delete")

})