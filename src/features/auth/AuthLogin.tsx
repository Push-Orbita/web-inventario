import { AuthForm } from '@features/auth/components/AuthForm';
import { AuthLayout } from '@layout/AuthLayout';
import 'primeicons/primeicons.css';



const AuthLogin = () => {
    return (
        <AuthLayout
            //   fondo={fondo}
            Form={<AuthForm />}
        />
    )
}

export default AuthLogin;


