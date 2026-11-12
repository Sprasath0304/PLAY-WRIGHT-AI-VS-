
import {test,expect, request}from '@playwright/test'

import dotenv from 'dotenv';
import path from 'path';
import { existsSync } from 'fs';

const envpath = 'D:/PLAY WRIGHT AI (VS)/.env';

console.log('File exists:', existsSync(envpath));

const envresult = dotenv.config({
    path: envpath
});

console.log('Dotenv error:', envresult.error);
console.log('Loaded variables:', Object.keys(envresult.parsed || {}));

import { Buffer } from 'buffer';


test.describe('API Authenication', () =>{

test('1. no authenciation',async({request})=>{

// step 1 get request

    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1')

    // verify the status code

expect(response.status()).toBe(200)

// read response body

const responsebody = await response.json();

console.log(responsebody);


expect  (responsebody.userId).toBe(1)

expect (responsebody.id).toBe(1)

expect(responsebody).toHaveProperty('title')

expect(responsebody).toHaveProperty('body')

    })
    // Basic auth
    // https://postman-echo.com/basic-auth
    // username : postnam
    //password :postword


    test('2 basic authentiacation', async({request})=>{

const username =process.env.BASIC_AUTH_USERNAME;
const password =process.env.BASIC_AUTH_PASSWORD;

console.log('Username:', process.env.BASIC_AUTH_USERNAME);
console.log('Password loaded:', !!process.env.BASIC_AUTH_PASSWORD);
const base64credential = Buffer.from(`${username}:${password}`).toString('base64');

console.log('encoding string',base64credential);


const response = await request.get('https://postman-echo.com/basic-auth',{

   headers: {
                Authorization: `Basic ${base64credential}`
    }

});

expect(response.status()).toBe(200);

const responsebody =await response.json();

console.log(responsebody);

expect(responsebody.authenticated).toBe(true);

    })

    // API Key
test('openweather',async({request})=>{

const apikey = process.env.OPENWEATHER_API_KEY;


    const city = "Delhi";


const response = await request.get ('https://api.openweathermap.org/data/2.5/weather',
    

 {

    params:
    
    {

        q:"Delhi",
        appid:apikey!,
  },
    

})

expect(response.status()).toBe(200)

const weatherdata = await response.json();
console.log(weatherdata)

expect(weatherdata.name).toBe(city)

expect(weatherdata).toHaveProperty('weather');

expect(weatherdata).toHaveProperty('main');



    })


test("Beareartokenauthenciation",async({request})=>
{

    const token = process.env.GITHUB_TOKEN


console.log('Token exists:', !!token);
console.log('Token length:', token?.length);


  const response=  await request.get('https://api.github.com/user/repos',
        {

            headers:{

            Authorization: `Bearer ${token}`,

     Accept: 'application/vnd.github+json',

     'X-GitHub-Api-Version': '2022-11-28'
            }
        }
    );

    expect(response.status()).toBe(200);

    const res =await response.json();

    console.log(res)


})

})