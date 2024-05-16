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