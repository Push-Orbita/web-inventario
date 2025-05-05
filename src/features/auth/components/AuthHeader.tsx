// import logo from '../../../assets/img/auth/logo.svg';
// import { Image } from "primereact/image"
import { t } from "i18next"
import { lang } from "../../../langs"


export const AuthHeader = () => {
    return (
        <>
            <div className="flex align-items-center  mt-5">
                {/* <Image src={logo} alt="Image" width="100" /><p className="ml-3 text-4xl font-bold text-500">{t(lang.common.appName)}</p> */}
            </div>
            <div className="flex flex-column  m-2">
                <p className="text-2xl font-semibold text-500">
                    {t(lang.login.common.welcome_message)}
                </p>
                <p className="text-xl text-700">
                    {t(lang.login.messages.loginToNext)}
                </p>
            </div>
        </>
    )
}
