# Notes App Challenge

## Description
This is a full-stack application consisting of a React frontend and a NestJS backend, with PostgreSQL as the database. The project also includes Docker for containerization.
It was a challenge for a Trainee/Junior Engineer position at [Ensolvers](https://www.ensolvers.com/).

## Technologies used
![Docker](https://img.shields.io/badge/docker-%232496ED.svg?style=for-the-badge&logo=docker&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgresql-%23336791.svg?style=for-the-badge&logo=postgresql&logoColor=white) 
![Node.js](https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white) 
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white) 
![Prisma](https://img.shields.io/badge/prisma-%23000000.svg?style=for-the-badge&logo=prisma&logoColor=white) 
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) 
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) 
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) 
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) 
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)


## Live Deployed Version
### 🔗 [Visit the live site here](https://fedelopez17.github.io/notes-app-nestjs/)

## Installation Prerequisites

Before running the project, ensure you have the following tools installed:

- **Node.js** version 22.14.0
- **npm** version 11.2.0
- **Docker** (to run the PostgreSQL container)

## Installation

### 1. Clone the Repository

First, clone the repository to your local machine and change to it:

```bash
git clone https://github.com/FedeLopez17/notes-app-nestjs.git
cd notes-app-nestjs
```

### 2. Running the Project

Make the setup script executable and run it to set up the PostgreSQL database, backend, and frontend:

```bash
chmod +x setup.sh
./setup.sh
```

## What the setup script does:

Starts the PostgreSQL container using Docker.

Installs backend dependencies (NestJS).

Runs Prisma migrations and seeds the database.

Installs frontend dependencies (React).

Builds and start both the backend and frontend.

## Thoughts on the Project
This project was a lot of fun to work on, though it was also quite stressful due to the three-day time constraint, the challenge of learning new technologies, and the added pressure of an employment opportunity at stake. The assignment suggested NestJS as a possible option since they wanted a backend structured into distinct layers, and NestJS naturally enforces that architecture. Despite not being familiar with it, I decided to use NestJS.

Most of my time was spent diving into the documentation for NestJS and other technologies, which meant I didn’t fully start writing the project until the last day, adding to the pressure. However, during the first two days, I worked on proof-of-concept implementations with NestJS and other tools, which helped me gain a better understanding of the stack.

## What I Learnt
- The basics of NestJS and why such an opinionated framework can make a lot of sense in a company context. I really loved working with NestJS and appreciated how its structure enforces good practices.  
- How a clear deadline can push you to tenfold your productivity. Having only three days forced me to prioritize efficiently, make quick decisions, and stay focused on delivering a working product. I might start experimenting with setting time constraints for future projects.
- I've been working on a project where the backend serves HTML files directly via a template engine, so changing the paradigm to a REST service with a separate frontend was a great opportunity to revise and practice different technologies, as well as reinforce the benefits of decoupling frontend and backend.  
- The importance of balancing research and implementation when working under tight deadlines. I spent a significant amount of time reading documentation and watching tutorials, which helped me understand the technologies better, but also meant that I started coding later than I should have.  
- How to set up and integrate a full-stack application using NestJS, PostgreSQL, Prisma, and Docker. While I had some experience with databases and ORMs, working with Prisma and setting up everything in a containerized environment was a valuable learning experience.

## Potential Improvements and Future Features
- **User Management & Authorization**: Add functionality for user accounts and authorization, and associate notes with specific users.
- **App Expansion**: Explore the possibility of expanding the app or evolving it into something more than just a basic notes app.
- **Testing**: Implement unit and integration tests for backend services and route controllers, as well as for the frontend app to ensure proper functionality and coverage.
- **UI Improvements**: Enhance the UI to make it more visually appealing and user-friendly.
- **Responsiveness**: Improve responsiveness to ensure the app works well on all devices and across different screen sizes.
