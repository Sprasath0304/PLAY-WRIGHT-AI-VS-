
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

})

