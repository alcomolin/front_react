
# Frontend ReactJs

Se creo una SPA con ReactJs consumiendo un Api Rest de Yii2 por medio de axios, con el fin de poder implementar un CRUD de productos, utilizando un modal para el ingreso de datos de cada producto tanto al momento de crear como de editar.

## Appendix

* Se important los plugins que seran utilizados en la aplicacion, tales como Bootstrap, Font-awesome en el archivo: 
    #### src\index.js
#
* Se definieron las rutas del componente para mostrar el listado de producto, en el archivo: 
    #### src\App.js
#
* Se se crearon las funciones para las alertas en el archivo: 
    #### src\functions.js
#
* Se crearon la vista general y el consumo de funciones de la SPA, asi mismo como las peticiones al Backend en el componente ShowProducts:
    #### src\components\ShowProducts.js
#
* Se definio el ActiveQuery en el archivo: 
    #### models\ProductQuery.php
## Deployment

Para desplegar este proyecto, ejecute

* Asegurarse que Yii2 este en ejecucion:
  Iniciar una aplicacion que simule un servidor web con la carpeta del Backend.
* Iniciar React:
```bash
  npm start
```
* Probar la la Api Rest con este link:
  #### [Inciar React App](http://localhost:3000/)

## Authors

- [@Alejandro Correa Molina](https://github.com/alcomolin)

