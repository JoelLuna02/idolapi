import React from "react";

const Layout = ({ children, title }) => (
    <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <title>{title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="stylesheet" href="/css/styles.css"></link>
        </head>
        <body>
            <main>{children}</main>
        </body>
    </html>
);

export default Layout;