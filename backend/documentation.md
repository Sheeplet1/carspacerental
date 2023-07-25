# 3900w11bsegmentationfault Backend Documentation

## API

### Auth

<details>
  <summary><code>POST</code> <code><b>/auth/register</b></code> <code>(registers a new user)</code></summary>

##### Parameters

> | name             | type | data type | description   |
> |------------------|------|-----------|---------------|
> | Register Details | body | Object    | New User data |
>
> Register Details:
> ```
> {
>     "email": "example@email.com",
>     "password": "example_password"
>     "first_name": "example_first"
>     "last_name": "example_last"
>     "phone_number": "0412345678"
> }
> ```

##### Responses

> | http code | response                      |
> |-----------|-------------------------------|
> | `200`     | `{ "token": str(ObjectId) }`  |
> | `400`     | `{ "error": "_ is required"}` |

</details>

<details>
  <summary><code>POST</code> <code><b>/auth/login</b></code> <code>(logs in an existing user)</code></summary>

##### Parameters

> | name          | type | data type | description     |
> |---------------|------|-----------|-----------------|
> | Login Details | body | Object    | Login User data |
>
> Login Details:
> ```
> {
>     "email": "example@email.com",
>     "password": "example_password"
> }
> ```

##### Responses

> | http code | response                                  |
> |-----------|-------------------------------------------|
> | `200`     | `{ "token": str(ObjectId) }`              |
> | `400`     | `{ "error": "Invalid email or password"}` |

</details>

<details>
  <summary><code>POST</code> <code><b>/auth/register/admin</b></code> <code>(registers a new admin)</code></summary>

##### Parameters

> | name             | type | data type | description   |
> |------------------|------|-----------|---------------|
> | Register Details | body | Object    | New User data |
>
> Register Details:
> ```
> {
>     "email": "example@email.com",
>     "password": "example_password"
>     "first_name": "example_first"
>     "last_name": "example_last"
>     "phone_number": "0412345678"
> }
> ```

##### Responses

> | http code | response                      |
> |-----------|-------------------------------|
> | `200`     | `{ "token": str(ObjectId) }`  |
> | `400`     | `{ "error": "_ is required"}` |

</details>

### User

<details>
  <summary><code>GET</code> <code><b>/user/{user_id}</b></code> <code>(gets information on the given user)</code></summary>

##### Parameters

> | name      | type | data type | description   |
> |-----------|------|-----------|---------------|
> | `user_id` | path | string    | User ObjectId |

##### Responses

> | http code | response                        |
> |-----------|---------------------------------|
> | `200`     | User Data Object                |
> | `400`     | `{ "error": "Invalid user id"}` |
>
> User Data Object:
> ```
> {
>     "_id": "6496e8e2876de3535cf3aa02",
>     "bookings": [],
>     "email": "example@gmail.com",
>     "first_name": "example_first",
>     "last_name": "example_last",
>     "listings": [],
>     "phone_number": "0412345678",
>     "vehicle_details": [],
>     "payment_details": [],
>     "reviews": [],
>     "revenue": 0,
>     "is_admin": False,
> }
> ```

</details>

<details>
  <summary><code>GET</code> <code><b>/user/profile</b></code> <code>(gets information on the current user)</code></summary>

##### Parameters

> | name            | type   | data type | description      |
> |-----------------|--------|-----------|------------------|
> | `Authorization` | header | string    | "Bearer {token}" |

##### Responses

> | http code | response         |
> |-----------|------------------|
> | `200`     | User Data Object |
> | `401`     | `Unauthorized`   |
>
> User Data Object:
> ```
> {
>     "_id": "6496e8e2876de3535cf3aa02",
>     "bookings": [],
>     "email": "example@gmail.com",
>     "first_name": "example_first",
>     "last_name": "example_last",
>     "payment_details": {
>       TODO
>     },
>     "listings": [],
>     "phone_number": [
>         "0412345678"
>     ],
>     "reviews": [],
>     "revenue": 0
> }
> ```

</details>

<details>
  <summary><code>PUT</code> <code><b>/user/profile</b></code> <code>(updates information on the current user)</code></summary>

##### Parameters

> | name            | type   | data type | description               |
> |-----------------|--------|-----------|---------------------------|
> | `Authorization` | header | string    | "Bearer {token}"          |
> | Update Info     | body   | object    | Information to be updated |
>
> Update Info Example:
> ```
> {
>     "first_name": "new_first_name",
>     "last_name": "new_last_name"
> }
> ```
> _Note: for array typed fields, you must send the whole array to update_

##### Responses

> | http code | response                                       |
> |-----------|------------------------------------------------|
> | `200`     | `{}`                                           |
> | `401`     | `Unauthorized`                                 |
> | `400`     | `{ "error": "Cannot update <key>" }`           |
> | `400`     | `{ "error": "Invalid update key" }`            |
> | `400`     | `{ "error": "Update value has invalid type" }` |

</details>

<details>
  <summary><code>DELETE</code> <code><b>/user/profile</b></code> <code>(deletes the current user)</code></summary>

##### Parameters

> | name            | type   | data type | description               |
> |-----------------|--------|-----------|---------------------------|
> | `Authorization` | header | string    | "Bearer {token}"          |

##### Responses

> | http code | response                                       |
> |-----------|------------------------------------------------|
> | `200`     | `{}`                                           |
> | `401`     | `Unauthorized`                                 |

</details>

### Listings

<details>
  <summary><code>GET</code> <code><b>/listings</b></code> <code>(gets all listings)</code></summary>

##### Parameters

> | name   | type   | data type | description |
> |--------|--------|-----------|-------------|
> | `None` |        |           |             |

##### Responses

> | http code | response                         |
> |-----------|----------------------------------|
> | `200`     | `{ "listings": Listings Array }` |
>
> Listing Details:
> ```
> {
>   listing_id: ....
>   address: {
>     "formatted_address": "Sydney NSW, Australia",
>     "streetNumber": "",
>     "street": "",
>     "city": "",
>     "state": "NSW",
>     "postcode": "",
>     "country": "Australia",
>     "lat": -33.8688197,
>     "lng": 151.2092955,
>     "place_id": "ChIJP3Sa8ziYEmsRUKgyFmh9AQM"
>   },
>   type: 'Carport / Driveway / Garage / Parking Lot',
>   max_vehicle_size: 'Bike / Hatchback / Sedan / 4WD/SUV / Van / Truck',
>   access_type: 'None / Boom Gate / Key / Passcode / Permit / Remote / Ticket / Swipe Card',
>   ev_charging: true / false,
>   description: 'This is a description',
>   instructions: 'This is the instructions',
>   casual_booking: true / false,
>   monthly_booking: true / false,
>   pricing: {
>     "hourly_rate": 100,
>     "monthly_rate": 1000,
>   }
>   photos: [image1, image2, image3]
>   "availability": {
>     "is_24_7": true / false,
>     "start_time": "08:00",
>     "end_time": "17:00",
>     "available_days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
>   }
>   "safety_features": ["CCTV", "On-site security", "Well lit"],
>   "amenities": ["Restrooms", "Nearby shopping", "Charging station"],
> }
> ```

</details>

<details>
  <summary><code>POST</code> <code><b>/listings/new</b></code> <code>(adds a new listing)</code></summary>

##### Parameters

> | name             | type   | data type | description      |
> |------------------|--------|-----------|------------------|
> | `Authorization`  | header | string    | "Bearer {token}" |
> | New Listing Info | body   | object    | Listing Object   |
>
> Update Info Example:
> ```
> {
>     "address": {
>         TODO
>     },
>     "price": 100,
>     "space_type": "Driveway",
>     "max_size": "SUV",
>     "description": "Listing Description",
>     "access_type": "Key Card",
>     "images": [
>         "Base64 Encoded Image"
>     ],
>     "features": [
>         "Electric Vehicle Charging"
>     ],
> }
> ```

##### Responses

> | http code | response                                   |
> |-----------|--------------------------------------------|
> | `200`     | `{}`                                       |
> | `401`     | `Unauthorized`                             |
> | `400`     | `{ "error": "Valid <field> is required" }` |

</details>

<details>
  <summary><code>GET</code> <code><b>/listings/{listing_id}</b></code> <code>(gets a specific listing)</code></summary>

##### Parameters

> | name         | type  | data type     | description      |
> |--------------|-------|---------------|------------------|
> | `listing_id` | path  | str(ObjectId) | Listing ObjectId |

##### Responses

> | http code | response                            |
> |-----------|-------------------------------------|
> | `200`     | Listing Information Object          |
> | `401`     | `Unauthorized`                      |
> | `400`     | `{ "error": "Invalid listing id" }` |
>
> Listing Info Example:
> ```
> {
>     "_id": str(ObjectId())
>     "provider": str(ObjectId())
>     "address": {
>         TODO
>     },
>     "hourly_price": 5,
>     "daily_price": 120,
>     "space_type": "Driveway",
>     "max_size": "SUV",
>     "description": "Listing Description",
>     "access_type": "Key Card",
>     "images": [
>         "Base64 Encoded Image"
>     ],
>     "features": [
>         "Electric Vehicle Charging"
>     ],
> }
> ```

</details>

<details>
  <summary><code>PUT</code> <code><b>/listings/{listing_id}</b></code> <code>(updates a specific listing)</code></summary>

##### Parameters

> | name         | type  | data type     | description      |
> |--------------|-------|---------------|------------------|
> | `listing_id` | path  | str(ObjectId) | Listing ObjectId |
> | Update Info  | path  | str(ObjectId) | Listing ObjectId |
>
> Update Info Example:
> ```
> {
>     "daily_price": 6,
>     "space_type": "Garage",
> }
> ```
> _Note: for array typed fields, you must send the whole array to update_

##### Responses

> | http code | response                            |
> |-----------|-------------------------------------|
> | `200`     | `{}`                                |
> | `401`     | `Unauthorized`                      |
> | `400`     | `{ "error": "Invalid listing id" }` |

</details>

<details>
  <summary><code>DELETE</code> <code><b>/listings/{listing_id}</b></code> <code>(deletes a specific listing)</code></summary>

##### Parameters

> | name         | type  | data type     | description      |
> |--------------|-------|---------------|------------------|
> | `listing_id` | path  | str(ObjectId) | Listing ObjectId |

##### Responses

> | http code | response       |
> |-----------|----------------|
> | `200`     | `{}`           |
> | `401`     | `Unauthorized` |

</details>

### Bookings

<details>
  <summary><code>POST</code> <code><b>/listings/book</b></code> <code>(creates new booking)</code></summary>

##### Parameters

> | name             | type | data type | description      |
> |------------------|------|-----------|------------------|
> | Booking Details  | body | Object    | New booking data |
>
> Booking Details:
> ```
> {
>     "consumer": ObjectId(6496e8e2876de3535cf3aa02)
>     "listing_id": ObjectId(6496e8e2876de3535cf3aa02)
>     "start_time": '2022-01-01T00:00:00'
>     "end_time": '2022-01-23T00:00:00'
>     "price": 100.0,
>     "recurring": '' or 'daily' or 'weekly' or 'biweekly' or 'monthly'
> }
> ```

##### Responses

> | http code | response                          |
> |-----------|-----------------------------------|
> | `200`     | `{ "token": str(ObjectId) }`      |
> | `400`     | `{ "error": "_ is required"}`     |
> | `400`     | `{ "error": "Invalid time slot"}` |

</details>

<details>
  <summary><code>GET</code> <code><b>/bookings/{booking_id}</b></code> <code>(gets a specific booking)</code></summary>

##### Parameters

> | name         | type  | data type     | description      |
> |--------------|-------|---------------|------------------|
> | `booking_id` | path  | str(ObjectId) | Booking ObjectId |

##### Responses

> | http code | response                            |
> |-----------|-------------------------------------|
> | `200`     | Booking Information Object          |
> | `401`     | `Unauthorized`                      |
> | `400`     | `{ "error": "Invalid booking id" }` |
>
> Booking Info Example:
>
> ``` Python
> {
>     "_id": str(ObjectId())
>     "consumer": str(ObjectId())
>     "listing_id": str(ObjectId())
>     "start_time": '2022-01-01T00:00:00'
>     "end_time": '2022-01-23T00:00:00'
>     "price": 100.0
>     "parent": str(ObjectId())
>     "child": str(ObjectId())
>     "exclusions": [ObjectId(), ObjectId()]
> }
> ```
>
</details>

<details>
  <summary><code>PUT</code> <code><b>/bookings/{booking_id}</b></code> <code>(updates a specific booking</code></summary>

##### PARAMETERS

> | name         | type  | data type     | description      |
> |--------------|-------|---------------|------------------|
> | `booking_id` | path  | str(ObjectId) | Booking ObjectId |
> | Update Info  | path  | str(ObjectId) | Booking ObjectId |
>
> Update Info Example:
>
> ``` Python
> {
>     "price": 200.0
>     "start_time": '2022-01-01T00:00:00'
>     "end_time": '2022-01-03T02:00:00'
> }
> ```

##### Responses

> | http code | response                            |
> |-----------|-------------------------------------|
> | `200`     | `{ 'booking_id': ObjectId() }`      |
> | `401`     | `Unauthorized`                      |
> | `400`     | `{ "error": "Invalid _" }`          |

</details>

<details>
  <summary><code>DELETE</code> <code><b>/bookings/{booking_id}</b></code> <code>(deletes/cancels a specific booking)</code></summary>

##### Parameters

> | name         | type  | data type     | description      |
> |--------------|-------|---------------|------------------|
> | `booking_id` | path  | str(ObjectId) | Booking ObjectId |
> | `data`       | json  | string        | see example      |
>
> Data Info Example:
>
> ``` Python
> {
>       "start_time": '2022-01-01T10:00:00',
>       "end_time": '2022-01-01T11:00:00,
>       "type": 'single' or 'future'
> }
> ```
>
> Type - user wants to either delete a single or future instance

##### Responses

> | http code | response       |
> |-----------|----------------|
> | `200`     | `{}`           |
> | `401`     | `Unauthorized` |

</details>

<details>
  <summary><code>GET</code> <code><b>/profile/completed-bookings</b></code> <code>(gets user's completed bookings)</code></summary>

##### Parameters

> | name            | type   | data type | description               |
> |-----------------|--------|-----------|---------------------------|
> | `Authorization` | header | string    | "Bearer {token}"          |

##### Responses

> | http code | response                    |
> |-----------|-----------------------------|
> | `200`     | `{}` or `[{booking_infos}]` |

</details>

## Database

### UserAccount

| Field                 | Type     | Example                              |
| --------------------- | -------- | ------------------------------------ |
| `_id`                 | ObjectId | ObjectId(6496e8e2876de3535cf3aa02)   |
| `email`               | string   | "user@email.com"                     |
| `password`            | string   | _hashed password string_             |
| `first_name`          | string   | "first"                              |
| `last_name`           | string   | "last"                               |
| `phone_number`        | string   | "0412345678"                         |
| `payment_details`     | Array    | [TODO]                               |
| `bookings`            | Array    | [ObjectId(6496e8e2876de3535cf3aa02)] |
| `reviews`             | Array    | [ObjectId(6496e8e2876de3535cf3aa02)] |
| `listings`            | Array    | [ObjectId(6496e8e2876de3535cf3aa02)] |
| `revenue`             | float    | 200.0                                |
| `is_admin`            | bool     | False                                |
| `vehicle_details`     | Array    | ['Toyota Corolla']                   |

### Listings

| Field           | Type     | Example                            |
| -------------   | -------- | -----------------------------------|
| `_id`           | ObjectId | ObjectId(6496e8e2876de3535cf3aa02) |
| `provider`      | ObjectId | ObjectId(6496e8e2876de3535cf3aa02) |
| `address`       | Object   | {TODO}                             |
| `hourly_price`  | float    | 5.0                                |
| `daily_price`   | float    | 100.0                              |
| `space_type`    | string   | "Driveway"                         |
| `max_size`      | string   | "SUV"                              |
| `description`   | string   | "Listing Description"              |
| `access_type`   | string   | "Key Card"                         |
| `images`        | Array    | ["Base64 encoded image"]           |
| `features`      | Array    | ["Electric Charging"]              |

### Bookings

| Field         | Type       | Example                            |
| ------------- | ---------- | -----------------------------------|
| `_id`         | ObjectId   | ObjectId(6496e8e2876de3535cf3aa02) |
| `consumer`    | ObjectId   | ObjectId(6496e8e2876de3535cf3aa02) |
| `listing`     | ObjectId   | ObjectId(6496e8e2876de3535cf3aa02) |
| `start_time`  | str        | 2022-01-01T00:00:00                |
| `end_time`    | str        | 2022-01-05T00:00:00                |
| `price`       | float      | 100.0                              |
| `parent`      | ObjectId   | ObjectId(6496e8e2876de3535cf3aa02) |
| `child`       | ObjectId   | ObjectId(6496e8e2876de3535cf3aa02) |
| `exclusions`  | [ObjectId] | [ObjectId(), ObjectId()]           |

### Reviews (TODO)

    - reviewId (primary key)
    - carSpaceId (foreign key referencing CarSpaces)
    - userId (foreign key referencing Users)
    - review
    - rating
    - timestamp
