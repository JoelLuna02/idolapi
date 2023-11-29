# IdolAPI

[![IdolAPI](https://idolapi.vercel.app/api/assets/Screenshot_20231129_000020.png)](https://idolapi.vercel.app)

![GitHub forks](https://img.shields.io/github/forks/JoelLuna02/idolapi)
![GitHub Repo stars](https://img.shields.io/github/stars/JoelLuna02/idolapi?color=00ff00)
![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/JoelLuna02/idolapi/IdolServer)
![GitHub License](https://img.shields.io/github/license/JoelLuna02/idolapi)



IdolAPI is a RESTful API based on the VTuber agency Isrealí Idol Corp. Here you will have access
to information about your favorite vtubers, staff, songs, etc., in addition to having access to
images. Remember that for more information you can consult the documentation, where you can access
how this API works and its available methods.

## Setup local project ![Node.js](https://img.shields.io/badge/Node.js-v18.16.5-brightgreen) ![npm](https://img.shields.io/badge/npm-v9.5.1-blue)

- Once the repository is cloned, install the packages using npm. 
    ```bash
    # Also try npm install
    npm i --save
    ```

- Then define the variables in a `.env` file
    ```sh
    # Use it to connect with Prisma
    POSTGRES_PRISMA_URL="postgresql:/<yourusername>:<yourpassword>@localhost:5432/<yourdatabase>?pgbouncer=true&connect_timeout=15"
    # Use it for direct connection
    POSTGRES_URL_NON_POOLING="postgresql:/<yourusername>:<yourpassword>@localhost:5432/<yourdatabase>"
    # Defines a secret key for JWT authentication
    TOKEN_SECRET="<YOUR_TOKEN>"
    ```

- And finally, start the local server.
    ```bash
    # Start the development environment.
    npm run dev
    # Start the production environment
    npm run start
    ```

### Copyright

Idol and all images, characters and names are trademarks of [Idol Virtual Talents Ltd](https://www.idol-company.com/).
This project follows the [derivative works guidelines](https://www.idol-company.com/tos) set out in the terms and
conditions. If there is any irregularity, contact the administrator. Its use for commercial purposes is prohibited.
​

**Remember to follow the creator**:

![X (formerly Twitter) Follow](https://img.shields.io/twitter/follow/JoelLuna20302?style=flat-square&label=Follow+me+on+Twitter)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue)](https://www.linkedin.com/in/hector-joel-luna-984b6224b)
![GitHub](https://img.shields.io/github/followers/JoelLuna02?label=My+Profile)
