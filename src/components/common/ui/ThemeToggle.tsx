import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '@redux/slices/uiSlices/uiSlice';
import { RootState } from '@redux/store/store';

export const ThemeToggle: React.FC = () => {
    const dispatch = useDispatch();
    const isDarkTheme = useSelector((state: RootState) => state.ui.theme);

    const handleToggle = () => {
        dispatch(toggleTheme());
    };

    return (
        <button onClick={handleToggle}>
            {isDarkTheme ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
        </button>
    );
};