# eBank Management Application - Frontend

Welcome to the frontend repository of the eBank Management Application, a comprehensive web platform for bank management. This project is part of the "Enterprise Component Architecture" course. It leverages Angular for a dynamic and responsive user interface, interacting with the backend via GraphQL.

## Table of Contents
- [Introduction](#introduction)
- [Objectives](#objectives)
- [Technical Stack](#technical-stack)
- [Setup and Installation](#setup-and-installation)
- [Features](#features)

## Introduction

This repository hosts the frontend component of the eBank Management Application, designed to manage various banking operations effectively. The application focuses on user-friendly interfaces for authentication, client management, account operations, and transaction services.

## Objectives

- To provide a robust frontend for the eBank Management Application.
- To implement dynamic web interfaces using Angular.
- To ensure secure communication with the backend using GraphQL.
- To adhere to modern web development best practices.

## Technical Stack

- **Frontend Framework:** Angular
- **Communication:** GraphQL for interacting with the backend services.
- **Security:** Integration with backend JWT authentication via Spring Security.
- **Design Patterns:** Emphasis on modular and maintainable code using Angular's component-based architecture.

## Setup and Installation

Instructions for setting up and running the frontend locally:
1. Clone the repository.
2. Install necessary dependencies using `npm install`.
3. Start the development server using `ng serve`.
4. Navigate to `http://localhost:4200/` to view the application.

## Features

The frontend supports the following functionalities:
1. **User Authentication:** Allows users to log in as either CLIENT or AGENT_GUICHET.
2. **Client Management:** Admins can add new clients and manage existing ones.
3. **Account Operations:** Admins can open new bank accounts for clients.
4. **Dashboard:** Clients can view their account details and recent transaction history.
5. **Transactions:** Enables clients to perform financial transfers to other accounts.
