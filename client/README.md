# PARKING CLIENT

En el front describiremos que tecnologias se usaron especificamente

## Tecnologias

- react-hook-form
- react-icons
- nextAuth v15
- axios
- taildwindCss

## CONTEXTO : useContext

Por motivos de que queria algo nativo y que no tuviese casi ninguna dependencia externa utilize todo lo mas NATIVO POSIBLE EN REACT , entonces para poder centralizar mis parkings en un solo lado como "UNICA FUENTE DE LA VERDAD" , utilize `useContext` un hook nativo de react capaz de manejar esttados globales , solo necesitaba envolver la app en un "Provider", muy similar a `REDUX`

Tengo dos Contextos

- parkings: contexto general para manejar parkings y sus FILTROS
- authentication: este context menja todo sobre la authentication  
   y authorization

## FRAMEWORK CSS

utilice `taildwind css` junto a las librerias oficiales junto a `MERAKI-UI`

### NEXTAUTH_SECRET

este clave secreta debe ser algo dificil de encontrar. yo solo a modo descriptivo voy a demostrar que la genere con el comando

#### nssl rand -base64 64 :

`DquqM+FU88DSJUQuap7PKDdl9ea9BhKSVce06NDmFAm44YPgUbPnn5OeKq36Dobr
  mn9lbrOrK6ZhXvSFN2YVCg==`

## Descripcion

- En el front es lo mas parecido a un dashboard de admin dado a que
  el sistema solo lo gestiona un empleado /dueño / admin - , el sistema muestra una lista de parkings generados y opera con filtros de busqueda por matricula , filtros para buscar por tipo de vehiculo(MOTO,AUTO,BICI,UTILITARIO) , por estado de vehiculo (finalizado o en proceso)y por orden (ultimos /primeros).
  El sistema tambien permite el ingreso de un vehiculo y el egreso del mismo .. en la tabla de vehiculos desglosara el detalle del mismo , visualizando su matricula , tipo de vehiculo horario de ingreso costos etc . El encargado de sistema podra buscar filtrar y egresar vehiculo como demande de forma arbitraria.

- El sistema cuanta con otras opciones como configuracion de perfil cuenta  
  del usuario que esta registrado puddiendo mostrar su perfil y otros detalles a modificar

- Por ultimo y no menos importante el sistema tiene un apartado administrador que solo podra ser accedido por el dueño o usuarios autorzados donde se podra modificar las tarifas , crear usuarios(empleados) y otras opciones mas .

- Como ultimo detalle y pensado para poder integrar un sistema de pago se creara un apartadop de `contratos`, estos abarcaran los clientes que tengan cuenta abonada mensual/quincenal pudiendo generar las operaciones crud correspondientes sobre los miembros del parking y poder efectuar el cobro de la mensualidad
