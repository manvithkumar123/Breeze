import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import { LogoutApi } from "../../Api/Users";
import { toast } from "react-toastify";

interface SidebarProps {
  setSidebarOpen: (value: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setSidebarOpen }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await LogoutApi();
      if (response.data.status === "success") {
        toast.success(response?.data?.output);
      } else {
        toast.error(response?.data?.output);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong during logout.");
    }
  };


  return (
    <div className="sidebar-page">
      <div className="logo-img-sidebar">
        <div className="sidebar-img-background">
          <img
            src="https://res.cloudinary.com/dvd8yytqv/image/upload/v1761615781/logo_hjlrqy.png"
            alt="logo"
          />
        </div>
      </div>

      <div className="sidebar-navigations-container">
        <label onClick={() => { navigate("/"); setSidebarOpen(false); }}>
          <i className="fa-solid fa-house"></i>
          <h3>Home</h3>
        </label>
        <label onClick={() => { navigate("/news-page"); setSidebarOpen(false); }}>
          <i className="fa-solid fa-newspaper"></i>
          <h3>News</h3>
        </label>
        <label onClick={() => { navigate("/login"); setSidebarOpen(false); }}>
          <i className="fa-solid fa-right-to-bracket"></i>
          <h3>Login</h3>
        </label>
        <label onClick={() => { navigate("/register"); setSidebarOpen(false); }}>
          <i className="fa-solid fa-user-plus"></i>
          <h3>Signup</h3>
        </label>
        <label onClick={() => { handleLogout(); setSidebarOpen(false); }}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          <h3>Logout</h3>
        </label>
      </div>
    </div>
  );
};

export default Sidebar;