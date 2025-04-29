import { AppDispatch, RootState } from "@redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";


// hook igual a useDispath pero lo tipamos para saber que va a retornar una función con el tipo AppDispatch
export const useAppDispatch: () => AppDispatch = useDispatch;

// versión de useSelector pero con tipado
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;