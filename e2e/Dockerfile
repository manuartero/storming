# Tag MUST match the exact @playwright/test version in package.json.
ARG PW_VERSION=1.63.0
FROM mcr.microsoft.com/playwright:v${PW_VERSION}-noble

WORKDIR /work
ENV CI=1

COPY package*.json ./
RUN npm ci --ignore-scripts --no-audit --no-fund

COPY . .

# args after the service name go to the Playwright CLI: npm run test:e2e -- --grep "full round"
ENTRYPOINT ["npx", "playwright", "test", "--config", "e2e/playwright.config.ts"]
CMD []
