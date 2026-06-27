# Lieferanten Portal

B2B Supplier Portal for `TechSolutions GmbH`

TechSolutions GmbH is a tech company which provides tech services. It needs to buy things from outside companies like:

- Dell (laptops)
- Logitech (keyboards)
- Bosch (industrial equipment)
- Siemens (electronics)

Those outside companies are called **Suppliers (Lieferanten)**.

So the portal is owned by **TechSolutions GmbH**.

                     LieferantenPortal

                     TechSolutions GmbH
                              │
          ----------------------------------------
          │                                      │
    Company Employees                   External Suppliers

---

## Roles

### 1. Admin

Works for TechSolutions.

Responsible for managing the whole system.

Can

- create employee accounts
- approve supplier registrations
- view all requests
- manage users

### 2. Company Employee (Procurement Officer)

Works for TechSolutions.

This is the person who actually wants to buy something.

Example:

> "Our design team needs 20 new monitors."

He logs into the portal and creates a purchase request.

```
Need:
20 Dell Monitors
Budget: €5000
Priority: High
```

### 3. Supplier

Represents an external company.

Example:

```
Dell Germany
or
Logitech Europe
```

The supplier DOES NOT edit TechSolutions.

Instead, they edit **their own supplier profile**.

```
Supplier Profile
Company Name
Address
VAT Number
Contact Person
Certificates
Description
```

---

## Overall Workflow

The MVP:

```

Employee creates purchase request
↓
Employee selects supplier
↓
Admin reviews
↓
Supplier sees assigned request
↓
Supplier marks request

Accepted or Rejected
↓
Employee sees updated status
```

---

## Database Mental Picture

```
        User
    ┌────┴────┐
    │         │
Profile     Role
    │
    │
---------------------
│                   │
Employee        Supplier
                    │
                    │
               PurchaseRequest

```

## ERD

```
User
----
id
email
password
role

1 ─── 1 Profile

1 ─── N PurchaseRequest


Profile
-------
id
userId
name
avatar


Supplier
--------
id
companyName
email
phone
vatNumber
address
status

1 ─── N PurchaseRequest


PurchaseRequest
---------------
id
title
description
priority
status
createdById
supplierId
createdAt
updatedAt
```

### Relationships

**Role** 1-N **User** 1-1 **Profile**

**User(Employee)** 1-N **PurchaseRequest**

**Supplier** 1-N **PurchaseRequest**

---

## State of the art maintained in the project

- Express modular architecture
- Controllers → Services → Prisma
- JWT
- RBAC
- CRUD
- Pagination
- Search
- Filtering
- Protected Next.js pages
- SSR/CSR data fetching
- PostgreSQL relations
- Clean code
