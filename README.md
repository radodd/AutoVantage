# CarCar

Team:

* Max Wang - Sales
* Ethan Flores - Service

## Design

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

The Sales microservice works with 4 models defined in the project:
AutomobileVO, Sale, Customer, and Salesperson.

AutomobileVO Model: This is a value object that uses the poller located in the sales_rest directory to gather data on the automobiles in the inventory. The sales microservice is polling for the VIN number of automobiles, as well as it's status on being sold or not.

Sale: This is a model that represents a sale in the database. It must contain information on the Salesperson who made the sale, the Customer who purchased the automobile, the Automobile being sold (referenced by it's VIN), as well as the price it is being sold for.

Customer: This is a model that represents a customer in the database. It must contain information on the customer, such as their first name, last name, phone number, and address.

Salesperson: This is a model that represents a salesperson in the database. All sales will be connects to a salesperson, which can allow for a user of this application to check the sales history of a salesperson. The model must contain information on the Salesperson such as first name, last name, and their employee id.

When recording a new Sale, the poller must check the VIN number of the car to access it, and then check if it has been sold or not because you cannot sell a car that has already been sold! The poller connects the Sales microservice and the Inventory microservice because the Sales microservice is dependent on having this information available to be able to contribute it's own data.

API Endpoints and Accessing Through Insomnia:

Customer:
API Requests-
| Action       | Method | URL |
|--------------|--------|-----|
List Customers | GET    | http://localhost:8090/api/customers/
Create Customer| POST   | http://localhost:8090/api/customers/
Delete Customer| DELETE | http://localhost:8090/api/customers/id/
Customer Detail| GET    | http://localhost:8090/api/customers/id/

To Create a Customer - Send this structured JSON BODY:
{
	"first_name": "Gwen",
	"last_name": "Stacy",
	"phone_number": "4804065666",
	"address": "712 S Mountain Ave"
}

Return Value of Creating a Customer -
{
	"customer": {
		"first_name": "Gwen",
		"last_name": "Stacy",
		"phone_number": "4804065666",
		"address": "712 S Mountain Ave",
		"id": 4
	}
}

Return Value of Listing All Customers -
{
	"customers": [
		{
			"first_name": "Miles",
			"last_name": "Morales",
			"phone_number": "4804065666",
			"address": "712 S Mountain Ave",
			"id": 1
		},
		{
			"first_name": "Aunt",
			"last_name": "May",
			"phone_number": "4804065666",
			"address": "712 S Mountain Ave",
			"id": 3
		},
		{
			"first_name": "Gwen",
			"last_name": "Stacy",
			"phone_number": "4804065666",
			"address": "712 S Mountain Ave",
			"id": 4
		},
		{
			"first_name": "Ben",
			"last_name": "Parker",
			"phone_number": "4805500398",
			"address": "819 S Queens St",
			"id": 5
		}
	]
}

To Delete/View A Customer - Use the GET/DELETE Details API Endpoint
http://localhost:8090/api/customers/id/

(Use the Customer "id" to reference deleting/viewing a specific customer)

If properly deleted, it should return:
{
	"delete": true
}

else it should return:
{
	"delete": false
}


Salesperson:
API Requests-
| Action            | Method | URL |
|-------------------|--------|-----|
List Salespeople    | GET    | http://localhost:8090/api/salespeople/
Create a Salesperson| POST   | http://localhost:8090/api/salespeople/
Salesperson Detail  | GET    | http://localhost:8090/api/salespeople/id/
Delete a Salesperson| DELETE | http://localhost:8090/api/salespeople/id/

To create a Salesperson - Send this structured JSON BODY:
{
	"first_name": "Peter",
	"last_name": "Parker",
	"employee_id": 1
}

Return Value of Creating a Salesperson -
{
	"salesperson": {
		"first_name": "Peter",
		"last_name": "Parker",
		"employee_id": 1,
		"id": 9
	}
}

Return Value of Listing All Salespeople -
{
	"salespeople": [
		{
			"first_name": "Peter",
			"last_name": "Parker",
			"employee_id": "1",
			"id": 9
		},
		{
			"first_name": "Max",
			"last_name": "Wang",
			"employee_id": "15",
			"id": 10
		},
		{
			"first_name": "Fred",
			"last_name": "Bowen",
			"employee_id": "81",
			"id": 11
		}
	]
}

To Delete/View A Salesperson - Use the GET/DELETE Details API Endpoint
http://localhost:8090/api/salespeople/id/
(Use the Salesperson "id" to reference for deleting/viewing a specific salesperson)

If properly deleted, it should return:
{
	"delete": true
}

else it should return:
{
	"delete": false
}



Sale:
API Requests-
| Action            | Method | URL |
|-------------------|--------|-----|
List all Sales      |   GET  | http://localhost:8090/api/sales/
Record a new Sale   | POST   | http://localhost:8090/api/sales/
Delete a Sale       | DELETE | http://localhost:8090/api/sales/id/
Get Sale Details    | GET    | http://localhost:8090/api/sales//id/

To Create/Record a Sale - Send this structured JSON BODY:
(For Customer and Salesperson, use "id" not "employee_id")
{
"price": "30,000",
"customer": 4,
"salesperson": 6,
"automobile": "1C3CC5FB2AN120174"
}

Return Value of Creating a New Sale -
{
	"sale": {
		"automobile": {
			"vin": "1C3CC5FB2AN120174",
			"sold": true
		},
		"customer": {
			"first_name": "Gwen",
			"last_name": "Stacy",
			"phone_number": "4804065666",
			"address": "712 S Mountain Ave",
			"id": 4
		},
		"salesperson": {
			"first_name": "Peter",
			"last_name": "Parker",
			"employee_id": "3",
			"id": 6
		},
		"price": "30,000",
		"id": 4
	}
}

To Delete/View Details of a Sale - Use the GET/DELETE Details API Endpoint
http://localhost:8090/api/sales//id/
(Use the Sale "id" to reference deleting/viewing a specific Sale)

If properly deleted, it should return:
{
	"delete": true
}

else it should return:
{
	"delete": false
}

