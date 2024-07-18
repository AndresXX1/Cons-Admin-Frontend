import { Route, Routes } from "react-router-dom";
import LogIn from "@pages/LogIn";
import Home from "@pages/Home";
import Setting from "@pages/Setting";
import Notifications from "@pages/Notifications";
import EditContent from "@pages/EditContent";
import Products from "@pages/Products";
import Users from "@pages/Users";
import Sidebar from "@components/Sidebar";
import { useLocation } from "react-router-dom";

const App = (): JSX.Element => {
  const location = useLocation();

  const showSidebar = location.pathname !== "/";

  return (
    <div className="flex h-full">
      {showSidebar && <Sidebar />}
      <Routes>
        <Route index element={<LogIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/products" element={<Products />} />
        <Route path="/edit-content" element={<EditContent />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </div>
  );
};
export default App;
