# Bamazon
An Amazon-like CLI project for class. View and "purchase" products as a customer, or view update inventory as a manger.
## Technologies
- MySQL
- Node
  - mysql
  - inquirer
## Installation
1. Clone or download the repository. Run `npm install` to get load the required dependencies.
2. Run the SQL commands included in the store-setup.sql file to generate a MySQL database.
3. Create a .env file in the root of the directory, and add `DB_PASSWORD=[your MySQL password]`.
4. In your CLI, run `node bamazonCustomer` to view the customer interface.
5. Or, run `node bamazonManager` to view the manager interface.
