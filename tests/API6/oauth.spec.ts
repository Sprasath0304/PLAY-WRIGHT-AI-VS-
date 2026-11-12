
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { existsSync } from 'fs';
import { request } from 'http';

const envpath = 'D:/PLAY WRIGHT AI (VS)/.env';

console.log('File exists:', existsSync(envpath));

const envresult = dotenv.config({
    path: envpath
});

console.log('Dotenv error:', envresult.error);


const GITHUB_CONFIG ={
Clientid : process.env.Client_ID,
Clientsecret: process.env.Client_SECRET,
Authenticationcode : process.env.GITHUB_AUTHORIZATION_CODE,
Token_url: process.env.GITHUB_TOKEN_URL,
apibaseurl:process.env.GITHUB_API_BASE_URL,
owner:process.env.GITHUB_USERNAME

};

let accesstoken = "";
let reponame ="";
const updatedDescription ='respository created using playwright';

test.describe.serial('oauth authenciation', () =>{

test('access token',async ({request})=>{

const response = await request.post(GITHUB_CONFIG.Token_url, {
    headers: {
        Accept: 'application/json'
    },
    form: {
        client_id: GITHUB_CONFIG.Clientid,
        client_secret: GITHUB_CONFIG.Clientsecret,
        code: GITHUB_CONFIG.Authenticationcode
    }
});


const body =await response.json()

console.log('Status:', response.status());
console.log('OAuth error:', body.error ?? 'No error');
console.log('Access token received:', Boolean(body.access_token));

expect(response.status()).toBe(200)
expect(body.access_token).toBeTruthy();
console.log('acesss token generated successfully')
accesstoken =body.access_token
console.log("token:",accesstoken);

})

test('create respostory',async({request})=>{

    reponame =`playwright-repo-${Date.now()}`;
    
const response = await request.post(
`${GITHUB_CONFIG.apibaseurl}/user/repos`,
{
headers:{
Authorization:`Bearer ${accesstoken}`,
Accept:'application/vnd.github+json'
},
data:{
name:reponame,
description:'respository created using playwright',
private:false
}
});

expect(response.status()).toBe(201);

const body =await response.json()

expect(body.name).toBe(reponame);

console.log('respostory create successfullly')

})

test('get repostory',async({request})=>{

   const response = await request.get(`${GITHUB_CONFIG.apibaseurl}/repos/${GITHUB_CONFIG.owner}/${reponame}`,
        {
            headers:{
Authorization:`Bearer ${accesstoken}`,
Accept:'application/vnd.github+json'

            }
        }
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.name).toBe(reponame);

    expect(body.owner.login).toBe(GITHUB_CONFIG.owner)

    console.log('repository retrived successfully')

})

test('update respository',async({request})=>{

   const response = await request.patch(`${GITHUB_CONFIG.apibaseurl}/repos/${GITHUB_CONFIG.owner}/${reponame}`,
        {
            headers:{
Authorization:`Bearer ${accesstoken}`,
Accept:'application/vnd.github+json'

            },

            data:{

description: updatedDescription,
homepage:'https://playwright.dev',
has_issue:true
}
        }
    );


    expect(response.status()).toBe(200);

const body =await response.json()

expect(body.description).toBe(updatedDescription);

console.log("repository updated")

})

})
