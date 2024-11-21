# @hidrasoft-meta-sdk/core

The **Core Module** is the foundational part of the project. It contains essential logic, fundamental services, and reusable tools that support the rest of the system.

## Features of the Core Module

- **Modularity**: Designed to integrate seamlessly with other modules.
- **Scalability**: Implements design patterns to support growth without compromising structure.
- **Centralized Configuration**: All essential configurations are unified in one place.
- **Written in TypeScript**: Leverages static typing and robust development practices.

## Project Setup

### `tsconfig.json` Highlights

The project is configured with the following key options:

- **Target**: `es2016` to ensure compatibility with modern JavaScript environments.
- **Module**: `commonjs` for compatibility with Node.js modules.
- **Strict Mode**: Enabled to enforce stricter type checking.
- **ES Module Interoperability**: `esModuleInterop` is enabled for better compatibility with CommonJS modules.
- **Skip Library Check**: `skipLibCheck` is set to avoid unnecessary type checking of `.d.ts` files.

## Installation

To install the module, use the following command:

```bash
npm install @hidrasoft-meta-sdk/core
```
## Usage
### Importing the Module
You can import and use the module as follows:

```typescript
import { MetaApiClient } from '@hidrasoft-meta-sdk/core';

// Example usage
const client = new MetaApiClient({ apiKey: 'your-api-key' });
const data = await client.fetchData('endpoint');
console.log(data);
```

### Authentication Modules
The Core Module includes various authentication classes for handling different types of tokens:

* **App Token:** `AppAuthentication`
* **Client Token:** `ClientAuthentication`
* **Page Access Token:** `PageAuthentication`
* **System User Token:** `SystemUserAuthentication`
* **User Token:** `UserAuthentication`

Example:

```typescript
import { PageAuthentication } from '@hidrasoft-meta-sdk/core';

const pageAuth = new PageAuthentication('your-page-token');
const pageInfo = await pageAuth.getPageInfo();
console.log(pageInfo);
```

## Folder Structure
The Core Module has the following folder structure:

```lua
core/
├── src/
│   ├── auth/
│   │   ├── AppAuthentication.ts
│   │   ├── ClientAuthentication.ts
│   │   ├── PageAuthentication.ts
│   │   ├── SystemUserAuthentication.ts
│   │   └── UserAuthentication.ts
│   ├── clients/
│   │   └── MetaApiClient.ts
│   ├── config/
│   │   └── index.ts
│   ├── utils/
│   │   └── helpers.ts
│   └── index.ts
├── tests/
│   └── core.test.ts
├── package.json
└── tsconfig.json
```

## Running Tests
To run tests for the module, use the following command:

```bash
npm test
```

## Contributing
We welcome contributions! Please follow the guidelines in the [CONTRIBUTING.md]() file.

## License
This project is licensed under the MIT License. See the LICENSE file for details.