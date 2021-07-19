# Taxi App

(**EN** | [RU](https://github.com/petrovi4/taxi/blob/main/README_rus.md "По-русски"))


The application is a template for managing a taxi company.

Functionality:
- add a car
- add a driver
- link the car to the driver
- search for a car with the output of information about the car and drivers associated with the found cars

## Implementation

I decided to choose the following libraries and technologies as implementation tools:
- **TypeScript** as the main programming language
- **Nest.js** is a very cool modern framework for an efficient and scalable backend implementation
- **Next.js** is a popular convenient React framework that, with its simplicity in learning and implementation, provides many useful features - for example, server rendering
- **GraphQL** - because it is a very flexible and powerful way of communicating backend and frontend
- **TypeORM**. I usually use Sequelize, but TypeORM is also a very popular ORM, and I wanted to explore its capabilities by applying it to this project
- **MySql**. It is also not a default database for me (usually, I use PostgreSQL). This task does not use any special DBMS features, so why not
- The entire application is assembled into a single **Docker** container, which is convenient to deploy on a new server, use and update
- And finally, the entire application is collected in a **single repository**. This is not a monorepo for several projects, but a single project with a very cool integration of Nest.js and Next.js. Details can be found in [this](https://medium.com/geekculture/nestjs-react-next-js-in-one-mvc-repo-for-rapid-prototyping-faed42a194ca) article. A project in the form of a single repository makes it easy to deploy, there is no need to configure the backend and frontend separately - one repository, one project, one deployment. Of course, in the source code, the backend and frontend are logically divided into different folders, TypeScript and ESLint allow us to work comfortably on such a project, and in the future, if necessary, we can easily divide the backend and frontend into two repositories.