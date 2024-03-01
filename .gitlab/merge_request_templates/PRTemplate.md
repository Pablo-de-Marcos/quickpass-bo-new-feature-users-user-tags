# Pull Request Template

## Que tipo de cambio es el motivo principal de esta PR? (Seleccionar uno, colocarlo en el titulo y borrar esta seccion) Ex: [FEATURE] - New modal recharge

## Checklist Dev ✅

- [x] Mi código sigue los lineamientos de desarrollo del proyecto (Separar logica de la vista, utilizacion de Typescript).

- [x] He hecho una revision de mi propio código.

- [x] He probado mi código y verificado que cumple con diseño Responsive.

- [x] He aplicado accesibilidad a los componentes - pantallas que desarrolle en la tarea.

- [x] He comentado el código en partes que eran necesarias debido a su complejidad o lógica de negocio.

- [ ] En caso de haber agregado assets al proyecto, revisé que no existieran previamente. Pasé dichos assets por el optimizador imágenes (.png, .jpg, .jpeg) recomendado => https://tinypng.com

- [ ] He probado mi código y verificado que la feature/bugfix cumple los requerimientos de la tarea.

## Issues/Tareas 📚

https://gitlab.vortex-it.com/quickpass/quickpass-bo-new/-/tree/feature/users-user-tags

- Implementar buscador de Tags, 
- Implementar funcion Agregar Tag, (verificar que no se agreguen tags repetidos, que el color del nuevo tag se almacene en Hexadecimal, opcion de Tag visible o no, el boton Agregar se observa siempre en la lista de Tags) 
- Agregado de Checkpoint en la lista de usuarios
- Agregado del boton GuardarTag

## Cuál es el comportamiento actual ? (antes de esta PR)

- Sin problema hasta el momento

## Cuál es el comportamiento logrado ?

- Presenta el comportamiento esperado

## Tiene alguna cosa en particular que tener en cuenta? 🤔

- Cuando escribo en el buscador de Tag un tag que no existe y presiono el boton Agregar, el dato que yo escribi no se transfiere al formulario de nuevo Tag, tengo que escribirlo nuevamente
