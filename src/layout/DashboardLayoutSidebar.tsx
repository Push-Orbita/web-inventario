import AppSidebar from "./AppSidebar";
import { AppTopbar } from "./AppTopbar";

interface Props {
    children?: React.ReactNode
}

const DashboardLayoutSidebar = ({ children }: Props) => {
    return (
        <>
            <div className="layout-static layout-wrapper p-input-filled">
                <AppTopbar />
                <div className="layout-sidebar">
                    <AppSidebar />
                </div>
                <div className="layout-main-container">
                    <div className="layout-main">
                        {children}
                    </div>
                </div>
            </div>
        </>

    );
};

export default DashboardLayoutSidebar;