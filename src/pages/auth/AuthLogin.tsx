import { AuthLayout } from "@layout/AuthLayout";
import { AuthForm } from '@features/auth/components/AuthForm';


const AuthLogin = () => {
    return (
        <AuthLayout Form={<AuthForm />} />
    )
}

export default AuthLogin;