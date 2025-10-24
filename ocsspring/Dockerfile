# --- Stage 1: Build with Maven ---
FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copy only what we need to build (speeds up caching)
COPY pom.xml .
COPY src ./src

# Build JAR (skip tests for faster local builds; remove -DskipTests for CI with tests)
RUN mvn -B clean package -DskipTests

# --- Stage 2: Runtime image ---
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# Copy packaged jar. Adjust filename if your artifactId/version changes in pom.xml
COPY --from=build /app/target/onlinecatalogsystem-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
