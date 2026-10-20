# E-commerce Core Flows — Sauce Demo

## Overview
This document describes five core end-user test scenarios for the Sauce Demo Shopify storefront and how to run the automated spec that encodes the plan.

## Test Scenarios
- **Browse Products:** Verify homepage product listings, open a product, check title/price/images, and confirm "Add to cart" is present.
- **Search & Filter:** Use the site search for a product keyword, assert matching results, and verify filters/tags update results when available.
- **Add to Cart & Update Quantity:** Add product to cart, inspect cart line item (name, unit price, quantity, subtotal), increment quantity and verify subtotal, remove item and verify cart empties.
- **Checkout (Guest flow):** From cart, proceed to checkout; verify checkout form fields (email, shipping address, phone, payment placeholders); fill required fields without submitting payment to verify validation and flow.
- **Account Signup & Login:** Create an account with a test email, verify sign-up success (dashboard or confirmation), sign out and sign back in to confirm authentication.

## Verification Guidance
- Prefer stable selectors (data attributes, links with `/products` or `/cart`).
- Assert visibility and text for headings, CTAs, inputs, and cart lines.
- Do not submit real payments during checkout tests — only verify fields and navigation.

## Automated Spec
- Encoded spec: [tests/ecommerce-core-flows.spec.ts](tests/ecommerce-core-flows.spec.ts)

## Run the tests
1. Install dependencies (if not already):

```bash
npm install
npx playwright install
```

2. Run the specific spec:

```bash
npx playwright test tests/ecommerce-core-flows.spec.ts
```

3. Run all tests:

```bash
npx playwright test
```

## Notes
- The spec file is a single, commented test that outlines the five flows. I can split it into separate, focused tests (one per flow) and run them locally if you want.
