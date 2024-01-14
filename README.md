# IdolAPI

<!-- [![IdolAPI](https://idolapi.vercel.app/api/assets/Screenshot_20231129_000020.png)](https://idolapi.vercel.app) -->

![GitHub forks](https://img.shields.io/github/forks/JoelLuna02/idolapi.svg)
![GitHub Repo stars](https://img.shields.io/github/stars/JoelLuna02/idolapi.svg?color=00ff00)
![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/JoelLuna02/idolapi/IdolServer.svg)
[![GitHub License](https://img.shields.io/github/license/JoelLuna02/idolapi.svg)](https://github.com/JoelLuna02/idolapi/blob/IdolServer/LICENSE)

IdolAPI is a RESTful API based on the VTuber agency Isrealí Idol Corp. Here you will have access
to information about your favorite vtubers, staff, songs, etc., in addition to having access to
images. Remember that for more information you can consult the documentation, where you can access
how this API works and its available methods.

## Setup local project ![Node.js](https://img.shields.io/badge/Node.js-v18.16.5-brightgreen.svg) ![npm](https://img.shields.io/badge/npm-v9.5.1-blue.svg)

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

    You can see the REST API documentation from [here](https://idolapi.vercel.app/docs).

## Copyright

**© 2020 Copyright: IdolAPI, created by Hector Joel Luna**. Idol and all images, characters and names are trademarks of [Idol Virtual Talents Ltd](https://www.idol-company.com/).
This project follows the [derivative works guidelines](https://www.idol-company.com/tos) set out in the terms and
conditions. If there is any irregularity, contact the administrator. Its use for commercial purposes is prohibited.
​
## Support this project ![Ko-fi](https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white)

 Please consider supporting us, no matter how big or small the contribution is. It would help us a lot to continue keeping this API with its data updated and protected from any malicious attack.

 <a href="https://ko-fi.com/G2G7M1GBM" target="_blank" style="padding-left: 1rem">
    <img height="56" style="border: 0px; height: 56px" src="https://storage.ko-fi.com/cdn/kofi5.png?v=3" border="0" alt="Buy Me a Coffee at ko-fi.com" />
</a>

---

**Remember to follow the creator**:

[![X (formerly Twitter) Follow](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/JoelLuna20302)
[![Instagram (Follow me)](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/joelluna_2002)
[![LinkedIn (View profile)](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/hector-joel-luna-984b6224b/)

**Contact**

[![Outlook](https://img.shields.io/badge/Microsoft_Outlook-0078D4?style=for-the-badge&logo=microsoft-outlook&logoColor=white)](mailto:hectorjoelluna@outlook.com.ar)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:hectorjoelluna1234@gmail.com)
