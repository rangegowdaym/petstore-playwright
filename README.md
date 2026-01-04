# API Test Automation Framework

A robust, enterprise-grade API test automation framework built with Rest Assured, Spring Boot, Java, TestNG, Cucumber, and Allure reporting, featuring secure secret management via Azure Key Vault and MySQL database validation.

## 🏗️ Architecture Overview

```
├── src/test/java/com/automation/api/
│   ├── config/              # Spring configuration & Key Vault integration
│   ├── runners/             # TestNG + Cucumber runners
│   ├── steps/               # Cucumber step definitions
│   ├── spec/                # Rest Assured specifications & request builders
│   ├── utils/               # Utilities (Key Vault, DB, helpers)
│   ├── listeners/           # Allure & TestNG listeners
│   └── models/              # POJOs & DTOs
├── src/test/resources/
│   ├── features/            # Cucumber feature files
│   ├── application-test.yml # Test configuration
│   └── testdata/            # Test data JSON files
├── build.gradle             # Dependencies & build configuration
└── .github/workflows/       # CI/CD pipelines
```


## 🚀 Key Features

- ✅ **BDD with Cucumber** - Readable, maintainable test scenarios
- ✅ **Rest Assured** - Fluent API testing with built-in validations
- ✅ **Spring Boot DI** - Clean dependency injection and configuration
- ✅ **TestNG Parallel Execution** - Fast test execution with thread safety
- ✅ **Azure Key Vault Integration** - Secure secret management (zero secrets in code)
- ✅ **MySQL Validation** - Database state assertions and cleanup
- ✅ **Allure Reporting** - Rich test reports with request/response attachments
- ✅ **CI/CD Ready** - GitHub Actions workflow included
- ✅ **Environment Agnostic** - Works locally and in CI with managed identities

## 📋 Prerequisites

- Java 17+
- Gradle 7.5+ (or use included wrapper)
- MySQL 8.0+
- Azure Key Vault (for secret management)
- Docker (optional, for local MySQL)

## 🔧 Setup Instructions

### 1. Local Development Setup

#### Clone and Build
```bash
git clone https://github.com/rangegowdaym/api-test-automation.git
cd api-test-automation
./gradlew clean build -x test
```

#### Set Up Local MySQL
```bash
docker run --name mysql-test \
  -e MYSQL_ROOT_PASSWORD=rootpassword \
  -e MYSQL_DATABASE=testdb \
  -p 3306:3306 \
  -d mysql:8.0
```

#### Environment Variables (Local Development Fallback)
If Azure Key Vault is not available, set these environment variables:

```bash
export API_BASE_URL=https://jsonplaceholder.typicode.com
export API_KEY=your-local-api-key
export DB_URL=jdbc:mysql://localhost:3306/testdb
export DB_USERNAME=root
export DB_PASSWORD=rootpassword
```

### 2. Azure Key Vault Setup

#### Create Key Vault & Secrets
```bash
# Create resource group
az group create --name rg-test-automation --location eastus

# Create Key Vault
az keyvault create \
  --name kv-api-automation \
  --resource-group rg-test-automation \
  --location eastus

# Add secrets
az keyvault secret set --vault-name kv-api-automation --name api-base-url --value "https://api.example.com"
az keyvault secret set --vault-name kv-api-automation --name api-key --value "your-api-key"
az keyvault secret set --vault-name kv-api-automation --name db-url --value "jdbc:mysql://prod-db:3306/appdb"
az keyvault secret set --vault-name kv-api-automation --name db-username --value "dbuser"
az keyvault secret set --vault-name kv-api-automation --name db-password --value "dbpassword"
```

#### Grant Access (Local Development)
```bash
# Login to Azure
az login

# Grant yourself access
az keyvault set-policy \
  --name kv-api-automation \
  --upn your-email@company.com \
  --secret-permissions get list
```

#### Configure Application
Update `src/test/resources/application-test.yml`:

```yaml
azure:
  keyvault:
    enabled: true
    vault-uri: https://kv-api-automation.vault.azure.net/
```

### 3. Running Tests

#### Run All Tests
```bash
./gradlew test
```

#### Run Specific Tags
```bash
./gradlew test -Dcucumber.filter.tags="@smoke"
./gradlew test -Dcucumber.filter.tags="@regression and not @skip"
```

#### Run with Specific Environment
```bash
./gradlew test -Dspring.profiles.active=qa
```

#### Parallel Execution
Configure in `src/test/resources/testng.xml`:
```xml
<suite name="API Test Suite" parallel="methods" thread-count="5">
```

### 4. View Allure Reports

#### Generate Report
```bash
./gradlew allureReport
./gradlew allureServe
```

This will open the report in your default browser.

## 🔐 Secret Management

### Priority Order
1. **Azure Key Vault** (if enabled and accessible)
2. **Environment Variables** (fallback for local development)
3. **application-test.yml** (non-sensitive defaults only)

### Azure Authentication Methods
The framework uses `DefaultAzureCredential` which tries in order:
1. Environment variables (AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_CLIENT_SECRET)
2. Managed Identity (in Azure environments)
3. Azure CLI (for local development after `az login`)
4. IntelliJ/VS Code Azure plugins

### Best Practices
- ⚠️ Never commit secrets to version control
- ✅ Use Azure Key Vault in CI/CD
- ✅ Use Managed Identity for Azure-hosted runners
- ✅ Use environment variables only for local development

## 🧪 Writing Tests

### Example Feature File
```gherkin
@regression @api
Feature: User Management API

  Background:
    Given the API is available

  @smoke @database
  Scenario: Create new user and validate in database
    Given I have a new user payload with email "test@example.com"
    When I send a POST request to "/users"
    Then the response status code should be 201
    And the response should contain field "id"
    And the user should exist in the database with email "test@example.com"
    And I clean up the test user from database
```

### Example Step Definition
```java
@When("I send a POST request to {string}")
public void sendPostRequest(String endpoint) {
    response = requestSpec
        .body(requestPayload)
        .post(endpoint);
    
    AllureRestAssured.attachRequestResponse(response);
}
```

## 🔄 CI/CD Integration

### GitHub Actions
The workflow in `.github/workflows/ci.yml`:
- Runs on push/PR to main
- Sets up Java 17
- Configures MySQL service
- Authenticates to Azure using OIDC
- Runs tests in parallel
- Publishes Allure report as artifact
- Optionally deploys to Allure server

### Required GitHub Secrets
```
AZURE_CLIENT_ID
AZURE_TENANT_ID
AZURE_SUBSCRIPTION_ID
KEY_VAULT_NAME
```

### Federated Identity Setup
```bash
az ad app federated-credential create \
  --id $APP_ID \
  --parameters credential.json
```

## 📊 Test Reporting

### Allure Features
- Request/Response bodies attached automatically
- SQL queries and results attached
- Step-by-step execution details
- Categorization by feature/suite
- Trend analysis across builds
- Environment information

### Custom Attachments
```java
@Step("Validate user in database")
public void validateUser(String email) {
    String query = "SELECT * FROM users WHERE email = ?";
    Allure.addAttachment("SQL Query", query);
    // ... execute and attach results
}
```

## 🏗️ Database Management

### Test Data Strategy
- Use unique identifiers (UUID, timestamps)
- Clean up test data in `@After` hooks
- Support transaction rollback where possible
- Separate test database from production

### Example Cleanup
```java
@After("@database")
public void cleanupTestData() {
    databaseUtils.deleteTestUsers();
    databaseUtils.resetSequences();
}
```

## ⚙️ Configuration

### Environment-Specific Config
Create multiple profile files:
- `application-test.yml` (default)
- `application-qa.yml`
- `application-staging.yml`

### Overriding Properties
```bash
./gradlew test \
  -Dspring.profiles.active=qa \
  -Dapi.timeout=5000 \
  -Ddb.pool.size=10
```

## 🐛 Troubleshooting

### Key Vault Access Issues
```
Error: PERMISSION_DENIED when accessing Key Vault
```
**Solution:** Ensure you've run `az login` and have proper access policy

### MySQL Connection Issues
```
Error: Communications link failure
```
**Solution:** Check MySQL is running and port 3306 is accessible

### Parallel Execution Failures
```
Error: Thread safety issues
```
**Solution:** Ensure ThreadLocal usage for RestAssured specs and DB connections

## 📚 Additional Resources

- [Rest Assured Documentation](https://rest-assured.io/)
- [Cucumber Best Practices](https://cucumber.io/docs/guides/10-minute-tutorial/)
- [Allure Framework](https://docs.qameta.io/allure/)
- [Azure Key Vault Java SDK](https://docs.microsoft.com/en-us/java/api/overview/azure/security-keyvault-secrets-readme)

## 🤝 Contributing

1. Create feature branch from `main`
2. Write tests for new functionality
3. Ensure all tests pass: `./gradlew test`
4. Submit PR with Allure report attached

## 📝 License

MIT License - see LICENSE file for details
```