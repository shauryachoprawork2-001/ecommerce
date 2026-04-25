# Step 1: Build React (Vite)
FROM node:18 AS frontend
WORKDIR /app
COPY ecommerce/package*.json ./
RUN npm install
COPY ecommerce/ .
RUN npm run build

# Step 2: Build Spring Boot (Gradle)
FROM gradle:8.5-jdk17 AS backend
WORKDIR /app
COPY ecommerce/ .
RUN chmod +x gradlew
RUN ./gradlew build -x test

# Step 3: Run app
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copy backend jar
COPY --from=backend /app/build/libs/*.jar app.jar

# Copy frontend build INTO Spring Boot static folder
COPY --from=frontend /app/dist /app/static

EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
