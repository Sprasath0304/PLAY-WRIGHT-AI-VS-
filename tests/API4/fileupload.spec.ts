

import {test,expect, request} from '@playwright/test'

import fs from 'fs';
import Ajv from 'ajv'; 

test.describe.serial('upload file ',()=>{

// send request and get the response 
 
let uploadtextfile ='';

test('uploading the file', async ({ request }) => {

  const response = await request.post(
    'https://api.escuelajs.co/api/v1/files/upload',
    {
      multipart: {
        file: {
          name: 'MYDHEEN BEEVI B.pdf',
          mimeType: 'application/pdf',
          buffer: fs.readFileSync('./specs/Upload/new.pdf')
        }
      }
    }
  );

  expect(response.status()).toBe(201);

  const responsebody = await response.json();

   uploadtextfile = responsebody.filename;

  console.log('Uploaded file:', uploadtextfile);
})


    test('Download Text File', async ({ request }) => {

        const response = await request.get(
            `https://api.escuelajs.co/api/v1/files/${uploadtextfile}`
        );

        expect(response.status()).toBe(200);

        const fileContent = await response.text();

        // expect(fileContent).toContain('welcome to Palywright with TypeScript');
    });





})