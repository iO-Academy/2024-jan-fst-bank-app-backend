# 2024-jan-fst-bank-app-backend

## API DOCUMENTATION  
***

### Register User

* **URL:**  
    /register
* **Method:**  
    POST
* **URL Params**  
    **Required:**  
    There are no required URL params  
  **Optional:**  
  There are no optional URL params  
* **Body Data:**  
  **Required:**  
    ```
    {
        "firstName":"x",
        "lastName":"y",
        "passcode":"z",
        "email":"email@email.com"
    }
    ```
* **Success Response:**  
  **Code:** 201  
  **Content:**  
    ```
    {"message": "Successfully registered user."}
    ```
* **Error Response:**  
  **Code:** 400 BAD REQUEST  
  **Content:**
    ```
    {"message": "Invalid register data", "data":[]}
    ```
  **Code:** 500 SERVER ERROR  
  **Content:**
    ```
    {"message": "Unexpected Error", "data":[]}
    ```
  ### User login

* **URL:**  
  /login
* **Method:**  
  POST
* **URL Params**  
  **Required:**  
  There are no required URL params  
  **Optional:**  
  There are no optional URL params
* **Body Data:**  
  **Required:**
    ```
    {
        "customer_number":"x",
        "passcode":"y",
    }
    ```
* **Success Response:**  
  **Code:** 200  
  **Content:**
    ```
    {"message": "Login successful.",
      "data": {},
      "token": "x"}
    ```
* **Error Response:**  
  **Code:** 401 UNAUTHORIZED 
  **Content:**
    ```
    {"message": "User does not exist"}
    ```
  **Code:** 500 SERVER ERROR  
  **Content:**
    ```
    {"message": "Unexpected Error", "data":[]}
    ```
  ### Get Accounts

* **URL:**  
  /user/:id
* **Method:**  
  GET
* **URL Params**  
  **Required:**  
  Customer number  
  **Optional:**  
  There are no optional URL params
* **Body Data:**  
  **Required:**
    There is no required body data
* **Success Response:**  
  **Code:** 200  
  **Content:**
    ```
    {"success": true",
      "accounts": []}
    ```
* **Error Response:**  
  **Code:** 403 UNAUTHORIZED
  **Content:**
    ```
    {"message": "Invalid token"}
    ```
  **Code:** 500 SERVER ERROR  
  **Content:**
    ```
    {"message": "Unexpected Error", "data":[]}
    ```