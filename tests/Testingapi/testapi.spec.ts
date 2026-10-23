
import { test , expect, request } from "@playwright/test";
import fs from 'fs';


function readJson(filepath:string){

return JSON.parse(fs.readFileSync(filepath,'utf-8'))

}

const baseurl = "https://jsonplaceholder.typicode.com"

test("creating new Api Testing",async({request})=>{


   const postpayload = await readJson("./tests/Testingapi/post.json")

    const postresponse  =await request .post(`${baseurl}/posts`,{data:postpayload,})

const postlevel =await postresponse.json();

const id = "15"

console.log("newpost",postlevel);


// validate the response status code

expect(postresponse.status()).toBe(201);
expect(postresponse.statusText()).toBe("Created");

// get validate

    const getresponse  =await request.get(`${baseurl}/posts/${id}`);

    const getlevel = await getresponse.json();

    console.log("getpost", getlevel)


    expect(getresponse.status()).toBe(200)

    expect (getresponse.statusText()).toBe("OK")


    // patch 

   const patchpayload = await readJson("./tests/Testingapi/patch.json")

   const patchresponse =await request.patch (`${baseurl}/posts/${id}`,
    {
        headers:{
"Content-Type": "application/json",


        },data:patchpayload,
    }
 );

   expect (patchresponse.status()).toBe(200);

expect (patchresponse.statusText()).toBe("OK")


const patchupdatebooking =await patchresponse.json()

console.log("partial update booking",patchupdatebooking)


    // update 
 const updatepayload = await readJson("./tests/Testingapi/put.json")

   const updateresponse =await request.patch (`${baseurl}/posts/${id}`,
    {
        headers:{
"Content-Type": "application/json",


        },data:updatepayload,
    }
 );

   expect (updateresponse.status()).toBe(200);

expect (updateresponse.statusText()).toBe("OK")


const updatebooking =await updateresponse.json()
console.log(" fullupdate booking",updatebooking)

    // Delete

    
const deleteresponse = await request.delete(`${baseurl}/posts/${id}`,

{ headers : {

    "Content-Type": "application/json",

}

}); 

expect (deleteresponse.status()).toBe(200)

expect (deleteresponse.statusText()).toBe("OK")

console.log("bboking detail are delete")

})

