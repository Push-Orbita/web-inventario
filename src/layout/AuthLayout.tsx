
interface Props {
    fondo?: any;
    Form: any
}
export const AuthLayout = ({ Form }: Props) => {
    return (
        <main className='p-input-filled' style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            padding: '2rem 5rem 2rem 5rem',
            transition: 'margin-left .2s',
            justifyContent: 'center',
            // backgroundColor: 'black'
        }}>
            <div className="grid justify-content-center">
                <div className="grid col-12 lg:col-4 sm:h-full md:h-auto" >
                    {Form}
                </div>
            </div>

        </main>
    )
}