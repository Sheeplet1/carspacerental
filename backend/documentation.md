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
>     "completed_bookings": [],
>     "current_bookings": [],
>     "email": "example@gmail.com",
>     "first_name": "example_first",
>     "last_name": "example_last",
>     "listings": [],
>     "phone_number": [
>         "0412345678"
>     ],
>     "reviews": []
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
>     "completed_bookings": [],
>     "current_bookings": [],
>     "email": "example@gmail.com",
>     "first_name": "example_first",
>     "last_name": "example_last",
>     "payment_information": {
>       TODO
>     },
>     "listings": [],
>     "phone_number": [
>         "0412345678"
>     ],
>     "reviews": []
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
>     "price": 200,
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

## Database

### UserAccount

| Field                 | Type     | Example                              |
| --------------------- | -------- | ------------------------------------ |
| `_id`                 | ObjectId | ObjectId(6496e8e2876de3535cf3aa02)   |
| `email`               | string   | "user@email.com"                     |
| `password`            | string   | _hashed password string_             |
| `first_name`          | string   | "first"                              |
| `last_name`           | string   | "last"                               |
| `phone_number`        | Array    | ["0412345678"]                       |
| `payment_information` | Object   | {TODO}                               |
| `current_bookings`    | Array    | [ObjectId(6496e8e2876de3535cf3aa02)] |
| `completed_bookings`  | Array    | [ObjectId(6496e8e2876de3535cf3aa02)] |
| `reviews`             | Array    | [ObjectId(6496e8e2876de3535cf3aa02)] |
| `listings`            | Array    | [ObjectId(6496e8e2876de3535cf3aa02)] |

### Listings

| Field         | Type     | Example                            |
| ------------- | -------- | -----------------------------------|
| `_id`         | ObjectId | ObjectId(6496e8e2876de3535cf3aa02) |
| `provider`    | ObjectId | ObjectId(6496e8e2876de3535cf3aa02) |
| `address`     | Object   | {TODO}                             |
| `price`       | float    | 100                                |
| `space_type`  | string   | "Driveway"                         |
| `max_size`    | string   | "SUV"                              |
| `description` | string   | "Listing Description"              |
| `access_type` | string   | "Key Card"                         |
| `images`      | Array    | ["Base64 encoded image"]           |
| `features`    | Array    | ["Electric Charging"]              |

### Bookings (TODO)

    - bookingId (primary key)
    - carSpaceId (foreign key referencing CarSpaces)
    - userId (foreign key referencing Users)
    - startTime
    - endTime
    - cost
    - payment status
    - booking status

### Reviews (TODO)

    - reviewId (primary key)
    - carSpaceId (foreign key referencing CarSpaces)
    - userId (foreign key referencing Users)
    - review
    - rating
    - timestamp

