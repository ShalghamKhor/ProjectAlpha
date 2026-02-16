# ProjectAlpha

#Core Domain model
  ## User
  - id
  - name
  - email
  - passwordHash
  - rating
  - walletBalance
  - createdAt

## Item
- id
- ownerId (User)
- title
- description
- category
- priceForSale
- pricePerDay (rental)
- depositAmount
- status (AVAILABLE, RENTED, SOLD)
- location
- createdAt

## SaleOrder
- id
- buyerId
- itemId
- totalAmount
- platformFee
- paymentStatus
- orderStatus
- createdAt

## RentalOrder
- id
- renterId
- itemId
- startDate
- endDate
- depositAmount
- totalRentalCost
- status (REQUESTED, APPROVED, ACTIVE, COMPLETED, CANCELLED)

## Review
- id
- reviewerId
- reviewedUserId
- itemId
- rating
- comment

## Message
- id
- senderId
- receiverId
- content
- timestamp



