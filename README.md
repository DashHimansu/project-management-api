/**Project Management API**\

A simple Node.js + Express + MySQL REST API for managing projects.

1️ Setup Instructions
Install Dependencies
npm install

Environment Variables

Create a .env file in the root directory:

PORT=3000

Database Setup

Database configuration is defined in:

config/db.js


Current configuration:

host: "localhost",
user: db username,
password: db p/w,
database: "project_api"

Create Database

Make sure MySQL is running and create the database:

CREATE DATABASE project_api;


The application will automatically create the projects table on startup.

Run the Application
npm run server


Server runs at:

http://localhost:3000


Test endpoint:

GET http://localhost:3000/test

2️ API Documentation

Base URL:

http://localhost:3000/api/v1/project/create

* Create Project

POST 

Request Body
{
  "name": "Website Redesign",
  "clientName": "Rudratek",
  "status": "active",
  "startDate": "2026-02-15",
  "endDate": "2026-03-30"
}

Valid Status Values

active

on_hold

completed

* Get All Projects

GET /api/v1/project/getall

Returns all non-deleted projects.

* Get Project By ID

GET /api/v1/project/:id

* Update Project

PUT /api/v1/project/:id

Example:

{
  "status": "completed"
}


Status transitions are validated in the model.

* Delete Project (Soft Delete)

DELETE /api/v1/project/:id

Sets deleted = TRUE.

3️ Assumptions and Trade-offs
Assumptions

MySQL is installed locally.

Database credentials are hardcoded in db.js.

No authentication is required.

Soft delete is preferred over permanent deletion.

Status is restricted using MySQL ENUM and model validation.

Trade-offs

DB credentials are not stored in .env.

No pagination implemented.

No authentication or authorization.

No automated tests included.

Basic error handling only.

No production-level security hardening.

4️ AI Usage (Mandatory Disclosure)
Tools Used

ChatGPT (OpenAI)

Purpose

Debugging MySQL and status validation issues


Fixing ENUM and data truncation errors

Improving validation logic

Structuring CRUD operations properly

What Was Modified or Rejected

Modified project status validation to match database ENUM

Adjusted state transition logic

Rejected switching entire project to ES Modules

Simplified error handling structure

Fully Understood Parts

Express server setup

Async server bootstrap process

MySQL connection pooling

Table initialization logic

CRUD operations

Model validation rules

Status transition logic

Soft delete implementation

Route → Controller → Service architecture

Partially Understood

Advanced production deployment strategies

Scaling and performance optimization

Enterprise-level security hardening

I am able to explain the entire codebase if required.
