import DesktopSidebar from "@/components/Sidebar/DesktopSidebar";
import NxtPro from "@/providers/NxtPro";
import RctQry from "@/providers/RctQry";
import ReduxToolkit from "@/providers/ReduxToolkit";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <NxtPro>
    <Toaster/>
      <ReduxToolkit>
        <RctQry>
          <DesktopSidebar>
            <Component {...pageProps} />
          </DesktopSidebar>
        </RctQry>
      </ReduxToolkit>
    </NxtPro>
  );
}
