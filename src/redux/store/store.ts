import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
// import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage"; // almacenamiento por defecto (localStorage)

import uiSlice from "../slices/uiSlices/uiSlice";


const persistUiConfig = {
    key: "ui", // como se guardará en el localStorage
    storage // donde se guarda
}

// comentamos esto hasta que implementemos auth
// const persistAuthConfig = {
//     key: "auth",
//     storage,
// };

export const store = configureStore({ // creamos el store
    reducer: {
        ui: persistReducer<ReturnType<typeof uiSlice>>(persistUiConfig, uiSlice),
        // auth: persistReducer<ReturnType<typeof authSlice>>(
        //     persistAuthConfig,
        //     authSlice
        // ),
    }, middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false // desactivamos el chequeo de serializabilidad
        })
});

// inicializamos redux-persist para que comience a guardar/cargar el estado del store
export const persistor = persistStore(store);

// tipo que representa el estado global de mi store
export type RootState = ReturnType<typeof store.getState>;

// tipo que representa el dispatch
export type AppDispatch = typeof store.dispatch;