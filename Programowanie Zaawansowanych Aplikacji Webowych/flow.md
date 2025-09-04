```mermaid
%% Karta pracy – Node.js
graph TD
  A[Projekt Node.js]
  B[npm install express]
  C[package.json dependencies]
  D[node_modules/express]
  E[server.js require 'express']
  F[npm run start]
  G[Działający serwer Express]

  A -->|instalacja| B
  B --> C
  C --> D
  A -->|pisz kod| E
  E -->|uruchom| F
  F --> G

