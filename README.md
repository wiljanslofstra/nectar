# Nectar

Nectar is CLI application to sync data to mail tools like Mailchimp, ActiveCampaign and Spotler using feeds.

**Why?**

- Using some APIs can be error prone.
  - For example, when you push an order to Mailchimp before you've synced the product (or it didn't sync because of an error), you will get errors. Which is as it should be, but to implement it in your application means you've to keep track of what's in the mail tool, handle retries, queue in the right order, etc.
- Implementing all endpoints can be labor intensive. And switching tools can be a lot of work.
  - I've noticed clients wanting to switch from one tool to the other. Sometimes because it doesn't fit, sometimes because they grow out of it and other times because they think something else is better. Nectar tries to create a universal interface which syncs to multiple services without reimplementing APIs.
- And for me to learn a bit more of TypeScript.

**Implementation status**

Some APIs are not yet implemented. Other APIs might not be available for all tools.

|           | Mailchimp | Spotler | ActiveCampaign |
|-----------|-----------|---------|----------------|
| Members   | ✅         | ✅       | ✅              |
| Site      | ✅         | ❌       | ❌              |
| Customers | ✅         | ❌       | ❌              |
| Store     | ✅         | ❌       | ❌              |
| Products  | ✅         | ❌       | ❌              |
| Orders    | ✅         | ❌       | ❌              |
| Carts     | ✅         | ❌       | ❌              |

## Usage

Create feeds for your data. For examples, you can take a look in the [testStubs folder](./src/testStubs/).
You can find all available properties in the [TypeScript types folder](./src/types/).

> ⚠️ To sync customers, products, orders and carts. You've to implement the store feed. A
> store is required to sync e-commerce data.

### Call Express server

Start server:

```bash
npm run start
node ./build/server.js
# Default is port 3000. To start on another port:
# PORT=8000 node ./build/server.js
```

`POST` to `127.0.0.1:3000/sync` with a config JSON. For example:

```json
{
  "paths": {
    "members": "https://www.example.com/feeds/members.json",
    "site": "https://www.example.com/feeds/site.json",
    "store": "https://www.example.com/feeds/store.json",
    "customers": "https://www.example.com/feeds/customers.json",
    "products": "https://www.example.com/feeds/products.json",
    "orders": "https://www.example.com/feeds/orders.json"
  },
  "writers": {
    "mailchimp": {
      "key": "12345678987654321123456789876543-us14"
    },
    "activeCampaign": {
      "accountName": "wiljanslofstra",
      "token": "123456789876543212345678987654321"
    },
    "spotler": {
      "host": "https://restapi.mailplus.nl/integrationservice-1.1.0",
      "key": "123456789876543212345678987654321",
      "secret": "123456789876543212345678987654321"
    }
  }
}
```

It's your job to call this API periodically.

### Call locally

1. Update `config.ts` with your feeds and change to `StubReader` into `JsonReader`, to allow remote fetching.
2. Build the project `npm run start`
3. Run `node ./build/src/cli.js`

## Build & Test

Install:

```bash
npm install
```

Build once into the `/build` directory:

```bash
npm run start
```

Run the tests once:

```bash
npm run test
```

To run the build and tests on code changes:

```bash
npm run watch
npm run test-watch
```

## Roadmap

- [ ] Implement ActiveCampaign
- [ ] Implement Spotler
- [ ] Implement Hubspot
- [ ] Implement Mailchimp carts
- [ ] Implement Mailchimp member tags
