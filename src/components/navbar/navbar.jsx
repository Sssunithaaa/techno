import "./navbar.css";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo.svg" alt="" />
        <span>DASHBOARD</span>
      </div>
      <div className="icons">
        <img src="/search.svg" alt="" className="icon" />
        <img src="/app.svg" alt="" className="icon" />
        <img src="/expand.svg" alt="" className="icon" />

        <div className="user">
          <img src="stan lee.svg" alt="" />
          <span>TECHNO</span>
        </div>

        <img src="/settings.svg" alt="" className="icon" />
      </div>
    </div>
  );
};
export default Navbar;
