

/*
 * API Mocking  & Network interception Demo

https://demo.playwright.dev/api-mocking/
https://demo.playwright.dev/api-mocking/api/v1/fruits
 */

import { test, expect } from '@playwright/test';


//Example 1: Mocking API response

test('Mocking API response', async ({ page }) => {

  // Step 1: Intercept the API URL pattern before navigating

  //https://demo.playwright.dev/api-mocking/api/v1/fruits
  await page.route("**/api/v1/fruits", async (route) => {

    const fakeresjson = [
      { name: 'XYZ', id: 1 },
      { name: 'ABC', id: 2 }
    ];
    // Step 2: Fulfill the request with your mock data
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(fakeresjson) // converts Javascript object into JSON
    })
  })
  // Step 3: Go to the page and verify the UI displays the mocked data

  await page.goto('https://demo.playwright.dev/api-mocking');
  await expect(page.getByText('XYZ')).toBeVisible();
  await expect(page.getByText('ABC')).toBeVisible();
})


//Example 2: Mocking API response using API request  
//❌ We cannot mock directly API request  - Not supported in Playwright using 'request' fixture

test('Mock API response', async ({ request }) => {

  const response = await request.get('https://demo.playwright.dev/api-mocking/api/v1/fruits')

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const fruits = await response.json();
  console.log('Fruits:', fruits);
})

// example

test('Modify a live API response', async ({ page }) => {

  // Intercept the API request
  await page.route('**/api/v1/fruits', async (route) => {

    // 1. Fetch the actual response from the server
    const response = await route.fetch();

    // 2. Convert the response to JSON
    const jsonBody = await response.json();
    console.log(jsonBody);

    // 3. Modify the response
    jsonBody.push({ id: 100,  name: 'XYZ'});

    console.log(jsonBody)

    // 4. Return the modified response
    // Fulfill the route with the modified response
    await route.fulfill({
      response,
      json: jsonBody
    });
  });

  // Navigate after registering the route
  await page.goto('https://demo.playwright.dev/api-mocking');

  // Verify the modified response is rendered
  await expect(page.getByText('XYZ')).toBeVisible();
});

// 5 networking interception -     

test ('blocking of the images',async({page})=>{


await page.route("**/*.{png,jpg,jpeg,gif,svg,webp}",async(route)=>{
console.log(route.request().url())
await route.abort()
})



await page.goto('https://demoblaze.com/');

console.log('Page loaded');

    const response = await page.reload();

    console.log('Reload status:', response?.status());

    await expect(page).toHaveURL('https://demoblaze.com/');


})
