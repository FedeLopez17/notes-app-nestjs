import { Outlet } from "react-router";
import Header from "./components/Header";

function App() {
  return (
    <section>
      <Header />
      <Outlet />
    </section>
  );
}

export default App;
