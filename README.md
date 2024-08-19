Este proyecto está desarrollado en Nest.js y Next.js

para levantar el servidor que corre en el puesto 8000 es necesario usar el comando: npm run start:dev

para levantar el front que corre en el puesto 3000 es necesario usar el comando:  npm run dev

en el .env.example se encuentra el formato de las variables de entorno del backend, de las cuales es importante aclarar que el AUTH_TOKEN es el token proporcionado por themoviedb.org para acceder a su API

Para el tema de envio de correo electrónicos es necesario crear una cuenta de correo en mailtrap, la cuenta que se vincule con este correo es la única que puede recibir correos de la misma y por ende la única que va a funcionar para comprobar la funcionalidad del envio de correos desde el API, ya sea para confirmar correo en el registro o para cambiar la contraseña

la base de datos corre en mysql, solo cuenta con una tabla que básicamente lleva registro de todo lo relacionado con el usuario

En cuanto a en que mejoraría el proyecto, me gustaría haber podido una mejor funcionalidad al tema del envio de correos, por cuestión de recursos y tiempo no hice una funcionalidad que sirviera con cualquier correo, me gustaría haber terminado las funcionalidades que me faltaron y haberle podido dedicar mas tiempo a casos de pruebas en los que el proyecto pueda fallar como el envio de correos vacios, validación de campos, etc

Muchas gracias por la oportunidad, también por temas ded tiempo no hice la documentación en swagger pero cualquier tipo de duda o inquietud que tengan con el proyecto respondo a mi correo personal (matbui.mbt@gmail.com) 

adjunto backlog del proyecto 
https://www.notion.so/5a02747213d54c9080219a9bf6b3581d?v=0e24c189f0e14139923c04be11312b86&pvs=4
