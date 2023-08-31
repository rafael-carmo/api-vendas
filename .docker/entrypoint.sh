#!/bin/bash

npm install
npm run typeorm migration:run -- -d src/shared/infra/typeorm/index.ts
npm run dev
