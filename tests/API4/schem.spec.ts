

import {test,expect, request} from '@playwright/test'

import Ajv from 'ajv'; 

test("schem validation",async({request})=>{

// send request and get the response 

const response= await request.get('https://mocktarget.apigee.net/json')

const responsebody = await response.json();

console.log(responsebody)

// step:2 define the schema

    const schema = {
        "type": "object",
        "properties": {
            "firstName": {
                "type": "string"
            },
            "lastName": {
                "type": "string"
            },
            "city": {
                "type": "string"
            },
            "state": {
                "type": "string"
            }
        },
        "required": [
            "firstName",
            "lastName",
            "city",
            "state"
        ]
    }


    // step 3:

    const ajv = new Ajv()
   const validate = ajv.compile(schema)// returns a vaildator
const isvaild =validate(responsebody)

expect(isvaild).toBeTruthy()

})