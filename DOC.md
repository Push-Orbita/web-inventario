```
src/router/RouterJs.tsx
```

**Suspense**: componente que sirve para mostrar algo temporal (un "loader", spinner, etc.) mientras se carga un componente que es "lazy".

**ComponentType**: tipo de dato de TypeScript que representa cualquier tipo de componente (funcional o de clase).

**lazy**: función que permite cargar componentes de manera diferida (solo cuando se necesiten). Esto se llama "code splitting" o "carga perezosa".

**LazyExoticComponent**: tipo de dato que representa un componente cargado con lazy().

```
src/redux/store/store.ts
```

## redux-persist: 
Librería que guarda (persiste) el estado de nuestro store del Redux el localStorage u otro tipo de almacenamiento local. Permite que el estado se mantenga incluso si se cierra el navegador o se cierra la ventana del navegador.

__Funciones__:

**persistReducer**: transforma un reducer normal en uno que puede guardar y cargar su estado desde el almacenamiento (por ejemplo localStorage).

**persistStore**: crea un persistor, que se usa para iniciar el proceso de persistencia cuando arranca la app.