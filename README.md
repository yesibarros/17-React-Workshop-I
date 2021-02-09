# React II

## Intro

### Objetivo

Para este workshop, nos vamos a concentrar en rutas del front-end usando React Router. React Router provee una abstracción poderosa y elegante para cambiar las vistas que actualmente estamos haciendo con logica condicional en nuestro JSX. La mayor parte de este workshop va ser refactorear código existente.

El único "feature" que vamos a añadir incluye ver a una artista: en vez de renderear los albumes y las canciones del artista simultaneamente en la misma vista, vamos a tener "tabs" para ALBUMS y SONGS, por lo que el usuario va a ver cada uno a la vez. Notece que el URL cambiará a medida que cambiamos el estado.


### Single Page Applications

Con la aparición de AJAX, la web se ha convertido en una plataforma para single-page applications. Dichas aplicaciones no refrescan y en cambio dinamicamente remplazan el contenido para simular cambios de página.

Para desarrolladores web, estos cambios han traido nuevas oportunidades como tambien nuevos desafíos. En cierta forma, la forma de trabajo del desarrolador de la vieja web era genial. Podías cambiar las páginas con `<a href="...">`. Para enviar data, enviabas un form. A medida que SPAs se convierten en la norma, la experiencia de usuario mejoro, mientras que la de los desarrolladores se deterioro. Estas cosas las notas facilmente en grandes proyectos con JQuery.

Frameworks de JavaScript mas comprensivos nacieron de este ambiente. Crecieron para incluir herramientas y patrones que resuelven desafios de manejar navegación en un sitio.

### React Router

[`React Router`](https://reacttraining.com/react-router/) es una de esas herramientas, una librería de terceros de React que nos permite establecer "rutas" en nuestra aplicación frontend que trenderice distintos componentes mientras actualizamos la URL. Con función para ir para atrás y todo!

A través de `react-router` tenemos "rutas". En su forma mas simple, una ruta es una combinación de dos cosas, un URL y un component. En lo que nosotros respecta es un tipo de regla de nuestra aplicación: cuando la URL matchea, el componente ejecuta su método render.

Y para ser claros, `react-router` es un 1000% una tecnología frontend. A pesar de que `react-router` interactua con URLs/rutas/navegaciñon, cambia literalmente nada de como funciona nuestro servidor. Para el final de este workshop, nuestra app va a estar dividida, donde alguna de las rutas las maneja el frontend, y otras el backend.

## Empezando

### Punto de Inicio

El punto de inicio [está en este repo](https://github.com/Plataforma5la/18_React_Workshop_II). Forkea el repo, clonalo a tu computadora y corre `npm install`.

### Instalá y cargá

Ahora vamos a hacer `npm install -S react-router react-router-dom`. `-S` es el shortcut de `--save`. El primer paquete `react-router` es donde se encuentra el core de la librería mientras que `react-router-dom` es lo específico para el browser, su contra parte es `react-router-native` que sería para dispositivos móviles.

Para empezar a usar react-router, todo lo que necesitamos hacer es importar el componente que necesitamos en el `index.js`. Veamos un ejemplo...

### Ejemplo

Imaginemos que tenemos dos componentes el primero es bastante simple:

```JSX
// Hola.jsx

import React from 'react';

const Hola = () => <p>Hola</p>;

export default Hola;
```

El segundo un poco más complejo:

```JSX
// App.jsx

import React from 'react';
import Hola from './Hola';
import { Route } from 'react-router-dom';

const App = () => (
  <div>
    <p>Esto es texto normal</p>
    <Route path="/hola" component={Hola} />
  </div>
);

export default App;
```

Aquí podemos ver que el componente esta renderizando un texto pero además esta renderizando un componente `Route`. Este componente va a renderizar el componente `Hola` cuando el path `/hola` matchie con la URL.

Ahora para hacer funcionar esto tenemos que configurarlo de la siguiente manera:

```JSX
// index.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';
import App from './App';

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
```

Aquí estamos encerrando nuestra aplicación dentro del componente `BrowserRouter` que nos va a permitir usar la `history` API del browser.

Fijate en la app de abajo modificando el url lo que ves en la ruta `/` y en la ruta `/hola`.

@sandbox=14jwr579wj


## Construyendo un Router

### Seteando el Router

En nuestro `index.js`, importa `BrowserRouter` como vimos en el ejemplo y colocalo dentro del `ReactDOM.render`.


### Definiendo Nuestra Ruta Principal (/)

La primer path `Route` que deberíamos definir lo que un usuario debería ver cuando van a la ruta principal nuestra de nuestra app (`/`). Tipicamente, el componente que le damos a esta ruta provee el layout que sera común para toda nuestra app. Cada otra ruta va a ser hija de esta ruta principal.

Escribi un `Route` con un path a `/` dentro de `BrowserRouter`. Qué componente deberíamos pasar como el prop `component`? Bien, este componente va a ser el padre de todos los otros componentes en nuestra aplicación... ¿cuál componente estaba haciendo ese rol antes?

|||

Usa el `Main`!

```JSX
<BrowserRouter>
  <Route path="/" component={Main} />
</BrowserRouter>
```

|||

Chequeá lo que hiciste con la solución y asegurate que todo sigue rendereando de la misma forma que lo hacia antes (no va a haber ninguna diferencia visible aún, pero nada debería haberse roto tampoco). Entonces estas listo para continuar!

### Nuestro Encuadre

Nuestro componente `Main` esta seteado para ser el padre de todos los componentes en nuestra aplicación como era antes. Sin embargo, necesitamos identificar el espacio en el método `render` de nuestro componente `Main` donde las rutas hijas van a renderizar eventualmente.

Abrí `Main` y fijate su método `render`. Pensa sibre el cambio de vista que hacemos ahora - que JSX representa el "encuadre" donde nuestro cambio de vista (la "imagen") ocurre? Discutelo con tu compañero, y luego continua leyendo para ver sobre que necesitamos hacer para renderizar esa "imagen".

|||
El componente `Sidebar` y el `Footer` estan siempre presentes a pesar de la vista, por lo tanto ellos y el JSX que los rodea van a ser nuestro "encuadre". Nuestra imagen por lo tanto sera el espacio entre esos div conteniendo la expresión ternaria que condicionalmente renderea los componentes `Album` y `Albums`.
|||

### Rutas Hijas

### `Route` props

Hasta ahora vimos que el componente Route acepta las props `path`, donde ponemos un string con la URL que queremos que matchie, `component` donde le pasamos el componente que queremos que renderice cuando la URL matchea, pero también este acepta otras dos formas de decidir que renderizar. 

La primera y una de las que más vamos a utilizar es `render` esta a diferencia de `component` acepta una función que va a ejecutar y va insertar lo que devuelve dentro de la vista, sin correr `React.createClass` lo que nos va a permitir pasar componentes que no necesitan todas las cosas que otros componentes como `Main` necesitan (ej. lifecycle hooks).

Lo vamos a utilizar principalmente para dos casos:

1. Cuando queremos hacer un inline render:

```JSX
<Route path="/error" render={() => <p>Se encontró un error </p>} />
```

2. El segundo caso va a ser para cuando necesitamos pasarle props a un componente:

```JSX
<Route path="/profile" render={() => <Profile name={user.name} />}>
```

Estos dos ejemplos se pueden hacer sin problema usando el prop `component` pero estamso inecesariamente usando la función `React.createClass` sobre funciones que no lo necesitan.

La segunda forma es `children` este funciona de forma parecida a `render` pero con una particularidad, este siempre renderea lo que le pasemos sin importar si la URL coincide o no. Más adelante veremos con más profundidad esta.


### Colocando la "Imagen" dentro del "Encuadre"

`react-router` es muy intuitivo al momento de agregar rutas. Simplemente colocamos la ruta en el lugar que queremos que se renderice, con su path y su componente y ¡voilà! ya tenemos nuestra ruta funcionando.
Sustituí el ternario y agrega dos rutas, la primera `/albums` y la segunda `/albums/:id` que rendericen nuestros componentes `Albums` y `SingleAlbum`, pasale los props que necesiten.

+++Pasando props
Recorda que para pasar los props vamos a tener usar `render` en vez de `component`.
+++

|||
```JSX
<Route path="/albums" render={() => <Albums albums={albums} selectAlbum={this.selectAlbum} /> } />
<Route path="/albums/:id" render={() => <SingleAlbum selectedSong={selectedSong} start={this.start} album={selectedAlbum} />} />
```    
|||

Ahora si vamos a la ruta `/albums` vamos a ver todo funcionando correctamente. Pero si vamos por ejemplo a la ruta `/albums/1`, por ejemplo tenemos un problema. Al parecer el componente `Albums` se sigue renderizando y si vemos el final de la página también seguramente veamos el componente `SingleAlbum`. Esto sucede porque por defecto `react-router` solo va a fijarse si el `path` coincide hasta ese punto con la URL, por lo tanto `/albums/1` coincide con `/albums` y `/albums/:id`. Para evitar este comportamiento simplemente podemos agregarle el prop `exact` a la primera ruta para decirle que solo matchie cuando es exactamente igual.

Ahora ambas rutas nos deberían mostrar el componente correcto. Pero seguimos teniendo un problema, `SingleAlbums` no parece tener ningún album seleccionado, eso lo solucionaremos mas adelante, ahora solucionemos un problema mayor.

### <Redirect>

Ahora tenemos un problema, cuando nos dirijimos a la ruta `/` no hay ningun componente que renderiza, por lo que vamos a querer que cuando alguien vaya a la página principal de nuestra aplicación nos redirija a `/albums`

Para eso vamos a usar el componente `Redirect`. Este componente se puede usar de dos formas. La primera forma es la siguiente:

```JSX
<Redirect to="/albums" />
```

En este caso siempre que este `Redirect` se renderice automaticamente va a redirigir a albumes, esto puede ser problematico si no controlamos cuando este `Redirect` se debería renderizar, pero puede ser muy útil para crear redireccionamientos condicionados, por ejemplo:

```JSX
album ?
    <Album album={album} />
    :
    <Redirect to="/NotFound" />
```

En este ejemplo si tenemos un album devolvemos el componente `Album` pero si no lo redirigimos a la página `/NotFound`. Bastante copado no?

La otra posiblidad es la siguiente:

```JSX
<Redirect from="/" to="/albums" />
```

Aquí le estamos diciendo con el prop `from` que cuando matchee esa ruta redirija a la ruta en el prop `to`, este va ser el caso que nos va a servir para nuestro problema.

Si todo funciona bien, deberías ser ridirijido de `http://localhost:1337/` a `http://localhost:1337/albums`.

Pero tenemos un problema una vez que llegamos a `/albums` parece que entramos en un loop donde nos sigue redirigiendo a `/albums` es mas si abres la consola seguramente veas este error `Warning: You tried to redirect to the same route you're currently on: "/albums"`.

Este error ocurre porque la ruta `/` de nuestro `from` matchea con `/albums` también, algo muy parecido al problema que teniamos con las rutas antes que tuvimos que agregarle el `exact`, pero tristemente el `Redirect` no tiene esta prop, por lo que para solucionar esto vamos a tener que agregar algo mas el `<Switch>`. 

`<Switch>` es un componente de React que va a rodear nuestras rutas, y va a buscar solo la primer coincidencia, algo mas parecido a lo que estabamos acostumbrados con `express`. Una vez que encuentra la primer coincidenci, va a renderizar esa ruta y no va a buscar más. Por lo tanto agrega el `<Switch>` alrededor de las rutas. Ahora el el lugar donde este el `<Redirect>` es importante, te imaginas qué pasaría si estuviese por encima de la ruta de `<Albums>`. 


### Rutas con Parametro

Es momento de setear nuestro ruta de un solo album! La diferencia aquí es que ahora nuestra url va a tomar parametros correspondientes al id del album que queremos ver. Esto es bastante similar a la forma que creamos rutas en Express: `/albums/:id`.

> Ten en cuenta que esta ruta es hermana de la ruta de Albums. El hecho de que el path se construye con `/albums` parece implicar un tipo de relación padre-hijo, pero recuerda que el componente SingleAlbum y el componente Albums aparecen en el mismo espacio. Relaciones padre-hijos son definidas por donde es renderizado el componente en la vista no por el `path` de la ruta.

No hemos usado ninguno hasta ahora, pero el componente `Route` estan dando a los componentes que renderiza algunos props especiales! Cundo tenemos la función del render dentro del prop, esta recibe tres props, `match`, `location` y `history`. Por ahora vamos a usar la primera, así que veamos que hace.

### Prop `match` 

Cuando un `path` matchea la URL se crea un objeto `match` que es pasado como prop al componente que se renderiza. Este objeto tiene las siguientes propiedades:

- `match.url`: Aquí se muestra el url que matcheo con el path, nos sirve para anidar links.
- `match.path`: Aquí se muestra el path de esa ruta, nos sirve para anidar rutas.
- `match.params`: Es un objeto con los valores de los parametros de la ruta, por ejemplo una ruta que tiene `/users/:id` el objeto seria { id: 3 } 
- `match.isExact`: Es un booleano que va ser `true` el url matcheo el path exactamente.

Como vemos podemos usar la propiedad `params` dentro de SingleAlbum para saber el id del album que tenemos que mostrar.
  
### Usando Params

Ve a nuestra definicion de rutas y pasale los props que recibe el método `render` de la ruta `/albums/:id` a un `console.log`, algo asi:

```JSX
<Route path="/albums/:id" render={(props) => console.log(props)} />
```

Luego escribe algo como esto `http://localhost:1337/#/albums/1` en la url. Seguramente recibas un error enorme, pero ignora eso, fijate lo que se loggeo en consola. Vemos otras propiedades del Router. Pero la que nos interesa es `match`, expandila y mira la propiedad `params`, ahi vamos a ver el album id!

Usa la prop `match.params` para enviarle el `albumId` a `SingleAlbum` para que podamos buscar el album apropiado y ponerlo en el estado cuando naveguemos a la ruta. Cómo hacemos esto? De la misma forma que buscamos información cuando un componente carga.

+++Necesito ayuda...
Recuerda que la forma apropiada de buscar información cuando el componente carga es usando `componentDidMount`. Podemos convertir el componente `Album` en una clase y cargar el album usando ese hook.

Seguramente estas pensando... **¿esto no rompe la Ley de el Componente Tonto?** Recordá que la ley dice que un componente debe ser lo mas tonto posible - y desfortunadamente, ahora mismo no tenemos otra forma, así que esta vez lo vamos a pasar. Mas adelante vamos a ver una mejor forma - no te preocupes! 
+++

+++Necesito un poco mas...
Fijate las props que el componente `SingleAlbum` recibe. Seguramente nos esta faltando una prop ahora, necesitamos que también reciba el método `selectAlbum` para que lo podamos usar!
+++

|||
```js
componentDidMount () {
  this.props.selectAlbum(this.props.albumId);
}
```
|||

## Usando Links

### El Componente Link

Actualmente podemos cambiar la vista de nuestra app cambiando la url, pero nuestros usuarios no van a querer hacer eso, ellos quieren apretar links! Es momento de trabajar en el componente `Link` de `react-router` en nuestra app!

El componente `Link` por si mismo es un wrapper sobre el element `<a>` - le pasamos una prop llamada `to` que va a funcionar de forma similar a `href`. Por ejemplo:

```JSX
<Link to="/albums">Go to Albums</Link>
<Link to={`/albums/${album.albumId}`}>Go to an Album</Link>
```

Hasta podes darle estilo a los componentes de la misma forma que los tags `<a>` usando `className` y `style` - se lo va a pasar al `<a>` que renderiza.

### Navegando

Linkemos las cosas! 

- Clickear en un album individual debería cambiarte a la vista del album.
- Clickear "Albums" en el `Sidebar` debería renderizar todos los albumes otra vez.

Seguramente notes algunas cosas copadas a medida que renderices:

- Cuando clickeas un album individual, no necesitas ejecutar la funcion `selectAlbum` en el componente `Albums`! El `componentDidMount` del componente `Album` se va a ocupar de todo cuando cambies la url!
- Ya tampoco necesitas la función `deselectAlbum` para nada! Antes, siel componente `SingleAlbum` o `Albums` se mostraba dependia de si `this.state.currentAlbum.id` era verdadero - ahora se basa en su url!

## Artist

### Agregando Artistas

Practiquemos nuestras habilidades de navegación añadiendo un nuevo feature a Juke - la habilidad de ver nuestra colección de música por artistas! Vamos a crear un nuevo componente `Artists` (plural) para ver la lista de todos los artistas, y luego crear un componente `Artist` (singular) para ver los albumes y canciones de un solo artista. 

### Estado

Lo primero que deberíamos hacer es colocar en nuestro estado la lista de todos los artistas, y un lugar para tener nuestro artista seleccionado. 

|||
```js
{
  // resto del estado...
  artists: [],
  selectedArtist: {},
}
```
|||

### Nuevos Componentes

Nuestra primer tarea es mostrar una lista de los artistas cuando el url matchea `/artists`. Primero, setiemos nuestro nuevo componente `Artists`.

1. Crea un nuevo componente con el siguiente JSX:

```JSX
<div>
  <h3>Artists</h3>
    <div className="list-group">
    {
      props.artists.map(artist => {
        return (
          <div className="list-group-item" key={artist.id}>
            {/* Determinaremos donde linkear luego */}
            <Link to="">{ artist.name }</Link>   
          </div>
        )    
      })
    }
  </div>
</div>
```

2. Deberíamos actualizar nuestro `Sidebar` con un `Link` al nuevo componente:

```JSX
<section>
  <h4 className="menu-item">
    <Link to={/**rellename**/}>ARTISTS</Link>
  </h4>
</section>
```

3. Y por supuesto vamos a necesitar un nuevo `Route` en `Main`. Ahora ve y escribe un `Route` que muestre el componente `Artists` cuando la url sea `/artists`.
4. Finalmente necesitamos conseguir nuestros artistas del servidor. Donde deberíamos hacer el fetch? En el mismo lugar donde hicimos el pedido `axios` para obtener todos nuestros albums! Agrega un nuevo pedido `axios.get` para obtener todos nuestros artistas colocalos en el estado, y envialos como props a el componente `Artist`!

### Ver Uno

Clickear en un elemento `<Link>` en la lista de artistas debería cambiar la url para que sea `/artists/:id` y cambiar la vista para mostrar la información del artista!

1. Crea el componente `Artist` con el siguiente JSX (temporario).

```html
<div>
  <h3>ARTIST NAME</h3>
  <h4>ALBUMS</h4>
  <h4>SONGS</h4>
</div>
```

2. Una vez que eso esta hecho crea una nueva `Route` en `Main.jsx`.
3. Ahora, en tu componente `Artists`, asegurate que el `Link` de cada artista lleva a la url del id de cada uno.

+++Sigo viendo el componente `Artists` cuando cambia la URL
Recordás que el path de las `Route` buscaban la coincidencia de la URL hasta ese punto, y no se fijaban lo que continuaba a menos que agreguemos la prop `exact`. 
+++

Continua una vez que confirmas que clickear en el nombre de un artisa en nuestra lista causa que la url se actualice y nuestra vista cambie para mostrar el componente de arriba.

### Carga uno

Carguemos el resto de la información del artista se debería ver algo así

![screenshot](screenshot4.png)

En orden de conseguir esa información del servidor, vas a necesitar ir a varias rutas: una para el artista, otra para los albumes del artista y otra para las canciones del artista. Deberíamos hacer estos pedidos de la misma forma que pedimos la información  de un solo album, recuerdas lo que hicimos?

+++Cargando la data del artista
Vas a querer ir a `/api/artists/:artistId`, `/api/artists/:artistId/albums` y `/api/artists/:artistId/songs`. Una buena técnica sería usar `Promise.all`, para construir el `selectedArtist` cuando llega toda la información
+++

+++Donde cargar la data
Seguí el patrón de seleccionar un solo album para crear una función `selectArtist` en `Main` que use `axios.get`. Pasa esta función como prop a el componente `Artist`(singular), y toma el id del artista de nuestro `props.match.params` en `componentDidMount`.
+++

También la UI se ve bastante familiar...

+++Aproximación
Los detalles del artistas esta compuesta de la vista de `Albums` y de la vista de `Songs. Podrías copiar y pegar... pero ya sabemos que significa cuando copiamos y pegamos. Quizas deberíamos re-usar nuestros componentes presentacionales? Porque son lindos y tontos, todo lo que necesitamos hacer es importarlo y pasarle las props que necesitan...
+++

## Escribiendo Sub-rutas

### Objetivo

Practiquemos más! Ahora, todos nuestros componentes son técnicamente sub-rutas de la ruta `/`, pero esas rutas pueden también tener sus propias sub rutas! Modifiquemos el componente `Artist`(singluar) para que en vez de mostrar los albumes y las canciones en una vista, primero muestre dos `Link`s, y dependiendo en cual clickie el usuario, mostraremos o los albumes del artista o las canciones del artista.

### Setup

Remplazá el JSX del componente de un artista con algo como esto:

```JSX
return (
  const { selectedArtist } = this.props;
<div>
  <h3>{ selectedArtist.name }</h3>
  <ul className="nav nav-tabs">
    <li><Link to={/**hacer**/}>ALBUMS</Link></li>
    <li><Link to={/**hacer**/}>SONGS</Link></li>
  </ul>
  {/* Aquí vamos a armar nuestras rutas*/}
</div>
)
```

### Albumes del Artista

1. Agrega una nueva ruta dentro del componente `Artist` donde el path sea `/artists/:id/albums`. Pero recuerda algo! Es una mala practica escribir rutas anidadas de esta forma, mejor es usar la propiedad `path` dentro del prop `match` de esta forma si nuestra ruta principal llegase a cambiar, esta se vería modificada automaticamente, y nos evitaría errores, así que usa: `${match.path}/albums` para generar la ruta.
2. Ahora para el Link vamos a hacer algo parecido. Nosotros no sabemos cual va a ser el valor del id en la url para poder crear el link harcodeado, por lo que vamos a usar `match.url` para generar correctamente la url anidada. 

### Canciones del Artista

Haz lo mismo para mostrar las canciones del artista!

## Bonus

### Links Activos

Mira [este ejemplo de la Documentación de react-router](https://reacttraining.com/react-router/web/example/custom-link). Es un gran ejemplo de como agregar Links activos a nuestro sidebar. Intenta implementar lo mismo agregandole la clase active a Link cuando estemos en esa ruta.

### Not Found

Que pasa si tratamos de navegar a una ruta que no existe? Estaría bueno mostrar un mensaje que lleve a los usuarios a donde tienen q ir. [Como podemos especificar una ruta para cuiando no encontramos un match](https://reacttraining.com/react-router/web/example/no-match)?




