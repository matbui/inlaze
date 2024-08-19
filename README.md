This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


Este proyecto watá desarrollado en Nest.js y Next.js

para levantar el servidor que corre en el puesto 8000 es necesario usar el comando npm run start:dev

para levantar el front que corre en el puesto 3000 es necesario usar el comando  npm run dev

en el .env.example se encuentra el formato de las variables de entorno del backend, de las cuales es importante aclarar que el AUTH_TOKEN es el token proporcionado por themoviedb.org para acceder a su API

Para el tema de envio de correo electrónicos es necesario crear una cuenta de correo en mailtrap, la cuenta que se vincule con este correo es la única que puede recibir correos de la misma y por ende la única que va a funcionar para comprobar la funcionalidad del envio de correos desde el API, ya sea para confirmar correo en el registro o para cambiar la contraseña

la base de datos corre en mysql, solo cuenta con una tabla que básicamente lleva registro de todo lo relacionado con el usuario

En cuanto a en que mejoraría el proyecto, me gustaría haber podido una mejor funcionalidad al tema del envio de correos, por cuestión de recursos y tiempo no hice una funcionalidad que sirviera con cualquier correo, me gustaría haber terminado las funcionalidades que me faltaron y haberle podido dedicar mas tiempo a casos de pruebas en los que el proyecto pueda fallar como el envio de correos vacios, validación de campos, etc

Muchas gracias por la oportunidad, también por temas ded tiempo no hice la documentación en swagger pero cualquier tipo de duda o inquietud que tengan con el proyecto respondo a mi correo personal (matbui.mbt@gmail.com) 

adjunto backlog del proyecto 
https://www.notion.so/5a02747213d54c9080219a9bf6b3581d?v=0e24c189f0e14139923c04be11312b86&pvs=4