# Database

```
UserAccount:
    - accountId (primary key)
    - username
    - password
    - confirmed/verified?

UserProfile:
    - profileId (primary key)
    - accountId (foreign key referencing UserAccount)
    - full name
    - car details
    - contact information (phone number, email address)
    - payment information (bsb, acc. no, etc)
    - preferences
    - bookings (foreign key referencing Bookings)
    - ratings/reviews (foreign key referencing Reviews)
    - car listings (foreign key referencing CarSpaces)

CarSpaces:
    - spaceID (primary key)
    - Provider (foreign key referencing Users)
    - Address
    - Type of car space (car port, driveway, garage, parking lot)
    - Max vehicle size (bike/motorcycle, hatchback, sedan, 4WD/SUV, van)
    - Access type (none, boom gate, key, passcode, permit, remote, ticket, swipe card)
    - Description
    - Availability status
    - Pricing (daily, weekly, monthly)
    - Additional Features like electric charging (wall, type1/2, CHAdeMO)

Bookings:
    - bookingId (primary key)
    - carSpaceId (foreign key referencing CarSpaces)
    - userId (foreign key referencing Users)
    - startTime
    - endTime
    - cost
    - payment status
    - booking status

Reviews:
    - reviewId (primary key)
    - carSpaceId (foreign key referencing CarSpaces)
    - userId (foreign key referencing Users)
    - review
    - rating
    - timestamp
```

# API


