import { Divider } from 'primereact/divider';
import { useAppSelector } from '@hooks/reduxHook';

const PersonalInfo = () => {
    const { userNombre } = useAppSelector((state) => state.auth);
    console.log(userNombre)
    return (
        <>
            <div className="grid">
                <div className="col-12 text-center">
                    <h5>Información personal</h5>
                </div>
            </div>
            <div className="grid">
                <div className="col-12 md:col-6 ">
                    <p>
                        Nombre:
                    </p>
                    <p>
                        <strong>{userNombre}</strong>
                    </p>
                </div>
                <div className="col-12 md:col-6">
                    <p>
                        Email:
                    </p>
                    <p>
                        <strong>nahuel14321@gmail.com</strong>
                    </p>
                </div>
                <Divider />
            </div>
        </>
    )
}

export default PersonalInfo
