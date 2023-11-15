# NestJS + KafkaJS Starter Template

This repository serves as a starter template for building applications using NestJS with KafkaJS modules integrated. It provides an initial setup, making it easier to get started with Kafka in a NestJS application.

## 🚀 Getting Started

### Prerequisites

- Node.js (version as specified in nest.js)
- A Confluent kafka and schema registry configuration (see .env.example)

### Installation

```
npm install

# create and update .env file
cp .env.example .env

# update with necessary config values
```

### Sequence Diagram

```mermaid
sequenceDiagram
    title: Tenant Registration

    actor  User
    participant NestApp as Nest µService
    box rgb(255, 255, 211) Kafka Topics
    participant KafkaTopic_Registrations as Registrations
    participant KafkaTopic_Tenants as Tenants
    participant KafkaTopic_Users as Users
    end
    User->>NestApp: Registration Form (http)
    NestApp->>KafkaTopic_Registrations: Create Registration (Pending)
    KafkaTopic_Registrations-->>NestApp: Consume Register_Pending

    NestApp->>KafkaTopic_Tenants: Create Tenant
    KafkaTopic_Tenants-->>NestApp: Consume Tenant_Created

    NestApp->>KafkaTopic_Registrations: Update Registration (Preparing)
    KafkaTopic_Registrations-->>NestApp: Consume Register_Preparing

    NestApp->>KafkaTopic_Users: Create User
```

