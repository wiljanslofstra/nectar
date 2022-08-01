- [ ] Connected sites (https://mailchimp.com/developer/marketing/api/connected-sites/list-connected-sites/)
- [ ] Members
  - [ ] Sync tags (https://mailchimp.com/developer/marketing/api/list-member-tags/add-or-remove-member-tags/)

## E-commerce

- [x] Customers etc. only available when store feed is defined.
  - [ ] Get store by ID (https://mailchimp.com/developer/marketing/api/ecommerce-stores/list-stores/)
    - [ ] If store does not exist, add store (https://mailchimp.com/developer/marketing/api/ecommerce-stores/add-store/)
  - [ ] PUT customers (https://mailchimp.com/developer/marketing/api/ecommerce-customers/add-or-update-customer/)
  - [ ] Products
    - [ ] List products
    - [ ] Create an PUT or POST batch for products
  - [ ] Orders
    - [ ] List orders
    - [ ] Create an PUT or POST batch for orders
  - [ ] Carts
    - [ ] List carts
    - [ ] Create an PUT or POST batch for carts

- Customers
  - PUT /ecommerce/stores/{store_id}/customers/{customer_id}
    - store_id => required
    - customer_id => required
  - 
