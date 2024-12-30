
import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/common/Sidebar";
import EmployeeProvider from "@/provider/Provider";

export default function RootLayout({ children }) {
  return (

        <div className="flex flex-col h-screen">
          <Navbar className='flex-grow-0'></Navbar>
          <div className="flex md:flex-row flex-col flex-grow overflow-hidden">
            <Sidebar></Sidebar>
            <EmployeeProvider>
            {children}
            </EmployeeProvider>
          </div>
        </div>
  );
}
