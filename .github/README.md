
# User Management API

A simple user management API that allows the following operations:

1. Register a user account
2. Log in to a user account
3. Fetch account information of logged in user



## Installation

1. Clone the project

```bash
  git clone "https://github.com/0-BSCode/cs3105-backend-exercise"
```

2. Install dependencies
```bash
  npm ci
```

3. Set up environment variables in the `.env` file
| **Variable**         | **Description**                                                                                             |
|----------------------|-------------------------------------------------------------------------------------------------------------|
| PORT                 | Port that the express app will run on (e.g. `5000`) |
| SALT_ROUNDS          | Number of salt rounds bcrypt will use for hashing (e.g. `10`)                                               |
| JWT_SECRET           | The secret used to sign JWT's (e.g. `my-secret`)                                                            |
| JWT_EXPIRES_IN       | The amount of time it will take for the JWT to expire (e.g. `10m`)                                          |
| COOKIE_MAX_AGE       | The amount of time (in milliseconds) that the cookie will last (e.g. `300000`)                              |
| COOKIE_NAME          | The name to give the cookies set (e.g. `cookie`)                                                            |
| RATE_LIMIT_WINDOW_MS | The time frame (in milliseconds) where requests are checked for rate limiting (e.g. `15000`)                |
| RATE_LIMIT_MAX       | The maximum number of requests allowed within the time frame specified by `RATE_LIMIT_WINDOW_MS` (e.g. `5`) |

4. Run the app
```bash
  # Run develop build
  npm run dev

  # Run production build
  npm run build
  npm run start
```

5. Head to the `/docs` endpoint to play around using Swagger.