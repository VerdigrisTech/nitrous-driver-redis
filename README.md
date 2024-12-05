# nitrous-driver-redis

[![Version][version-badge]][npm-url]
[![Node Version][node-badge]][node-url]
[![Build Status][build-status-badge]][github-workflows-url]
[![Code Coverage][codecov-badge]][codecov-url]
[![License][license-badge]](LICENSE.md)

Redis driver for nitrous.js.

## Usage

This is a plugin to [nitrous.js][nitrous-js]. Make sure it is already installed
as a dependency to your project.

### Getting started

To use this driver, run:

```bash
npm install --save @verdigris/nitrous-driver-redis
```

Then in your code, import the package:

#### JavaScript

```javascript
const { Cache } = require("@verdigris/nitrous");
const Redis = require("@verdigris/nitrous-driver-redis");
const options = {
  url: "redis://localhost:6379/0",
};
const cache = new Cache(new Redis(options));
```

#### TypeScript

```typescript
import { Cache } from "@verdigris/nitrous";
import Redis from "@verdigris/nitrous-driver-redis";

const options = {
  url: "redis://localhost:6379/0",
};

const cache = new Cache(new Redis(options));
```

### Accessing underlying Redis client

The driver exposes the underlying Redis client through `client` property:

#### JavaScript

```javascript
const Redis = require("@verdigris/nitrous-driver-redis");
const redis = new Redis({ url: "redis://localhost:6379/0" });

// Call raw Redis LOLWUT command: https://redis.io/commands/lolwut
redis.client.lolwut((version) => console.log(version));
```

#### TypeScript

```typescript
import Redis from "@verdigris-nitrous-driver-redis";
const redis = new Redis({ url: "redis://localhost:6379/0" });

// Call raw Redis LOLWUT command: https://redis.io/commands/lolwut
redis.client.lolwut((version) => console.log(version));
```

For more information on the Redis client, see:
[Node Redis documentation][node-redis-docs].

---

Copyright © 2020-2024 Verdigris Technologies Inc. All rights reserved.

[npm-url]: https://www.npmjs.com/package/@verdigris/nitrous-driver-redis?activeTab=versions
[version-badge]: https://img.shields.io/npm/v/@verdigris/nitrous-driver-redis?style=for-the-badge
[node-badge]: https://img.shields.io/node/v/@verdigris/nitrous-driver-redis?style=for-the-badge
[node-url]: https://nodejs.org/en/about/releases/
[build-status-badge]: https://shields.verdigris.co/github/actions/workflow/status/verdigristech/nitrous-driver-redis/test.yaml?logo=github&style=for-the-badge
[github-workflows-url]: https://github.com/VerdigrisTech/nitrous-driver-redis/actions
[codecov-badge]: https://img.shields.io/codecov/c/github/verdigristech/nitrous-driver-redis?logo=codecov&style=for-the-badge
[codecov-url]: https://codecov.io/gh/VerdigrisTech/nitrous-driver-redis
[license-badge]: https://img.shields.io/github/license/verdigristech/nitrous-driver-redis?style=for-the-badge
[nitrous-js]: https://www.npmjs.com/package/@verdigris/nitrous
[node-redis-docs]: https://github.com/NodeRedis/node-redis
