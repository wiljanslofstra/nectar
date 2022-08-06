# Nectar

Nectar is CLI application to sync data to marketing tools like Mailchimp, ActiveCampaign and Spotler using feeds.

**Why?**

- Using some of the APIs can be error prone.
  - For example, when you push an order to Mailchimp before you've synced the product (or it didn't sync because of an error), you will get errors. Which is as it should be, but to implement it in your application means you've te keep track of whats in the marketing tool, handle retries, queue in the right order, etc.
- Implementing all endpoints can be labor intensive. And switching tools can be a lot of work.
  - I've noticed clients wanting to switch from one tool to the other. Sometimes because it doesn't fit, sometimes because they grow out of it and other times because they think something else is better. Nectar tries to create a universal interface which syncs to multiple services without reimplementing APIs.

**Implementation status**

Some of the APIs are not yet implemented. Other APIs might not be available for all tools.

|           | Mailchimp | Spotler | ActiveCampaign |
|-----------|-----------|---------|----------------|
| Members   | ✅         | ❌       | ❌              |
| Site      | ✅         | ❌       | ❌              |
| Customers | ✅         | ❌       | ❌              |
| Store     | ✅         | ❌       | ❌              |
| Products  | ✅         | ❌       | ❌              |
| Orders    | ✅         | ❌       | ❌              |
| Carts     | ❌         | ❌       | ❌              |

## Usage

Create feeds for your data. For examples you can look in the [testStubs folder](./src/testStubs/).
You can find all available properties in the [TypeScript types folder](./src/types/).

Update [config.ts](./src/config.ts) (this will change in the future). For example:

```typescript
const config: Config = {
  reader: new JsonReader(),
  readerPaths: {
    members: 'https://www.mywebsite.com/nectar-feeds/members.json',
    site: 'https://www.mywebsite.com/nectar-feeds/site.json',
    store: 'https://www.mywebsite.com/nectar-feeds/store.json',
    customers: 'https://www.mywebsite.com/nectar-feeds/customers.json',
    products: 'https://www.mywebsite.com/nectar-feeds/products.json',
    orders: 'https://www.mywebsite.com/nectar-feeds/orders.json',
    carts: 'https://www.mywebsite.com/nectar-feeds/carts.json',
  },
  writers: [
    new MailchimpWriter(new Mailchimp('key123')),
  ],
};
```

> ℹ️ All feeds are optional (although you might want to sync something). If you only want to
> sync members, you can choose to only implement the members feed.

> ⚠️ To sync customers, products, orders and carts. You've to implement the store feed. A
> store is required to sync e-commerce data.

## Build

```bash
npm install
npm run start
```

## Test

```bash
npm install

# Once
npm run start
npm run test

# Watch
npm run watch
npm run test-watch
```
