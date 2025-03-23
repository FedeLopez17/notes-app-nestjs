import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function LayoutWithHeader() {
  return (
    <section>
      <Header />
      <Outlet />
    </section>
  );
}

export default LayoutWithHeader;
