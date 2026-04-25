# Step 1: Build React
FROM node:18 AS frontend
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend .
RUN npm run build

# Step 2: Build Spring Boot
FROM maven:3.9.6-eclipse-temurin-17 AS backend
WORKDIR /app
COPY backend/pom.xml .
RUN mvn dependency:go-offline
COPY backend .
RUN mvn clean package -DskipTests

# Step 3: Run app
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=backend /app/target/*.jar app.jar
COPY --from=frontend /app/frontend/build ./static
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
