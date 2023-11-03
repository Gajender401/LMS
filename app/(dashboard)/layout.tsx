import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const DashboardLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-full bg-white">
      <Navbar />

      <div className="dash-board flex flex-row">

        <div className="hidden lg:w-1/4 xl:w-1/5 lg:flex ">
          <div className="left-side ml-8 mr-4 mt-10 mb-8">
            <Sidebar />
            <div className="ml-4">
              <div className="mt-4 md:mt-0 -ml-10 pt-2 pb-2">
                <a href="">
                  <img
                    src="/Group 1410097013.png"
                    alt="" width="280px" height="230px"
                  />
                </a>
              </div>
              <div className="mt-8 mb-8">
                <a
                  href=""
                  className="flex flex-row items-center text-gray-200 hover:text-white transition duration-200 ease-in-out"
                >
                  <img src="/Mask group.png" alt="" />
                  <span className="font-medium text-lg ml-2">Settings</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="right-side w-full lg:w-3/4 xl:w-4/5 mr-4 lg:mr-8 ml-4 mt-20 md:mt-10 mb-8">
          {children}
        </div>

      </div>
    </div>
  );
}

export default DashboardLayout;