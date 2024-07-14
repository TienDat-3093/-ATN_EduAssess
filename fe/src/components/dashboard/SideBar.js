import { NavLink } from "react-router-dom";
export default function SideBar() {
  const navLinkStyle = {
    display: 'block',
    padding: '0px 15px',
    color: '#007bff',
    textDecoration: 'none',
    transition: 'background-color 0.2s, color 0.2s',
    fontStyle: 'normal',
};

const navLinkHoverStyle = {
    backgroundColor: '#f8f9fa',
    color: '#0056b3',
};

const navLinkActiveStyle = {
    fontWeight: 'bold',
    color: '#0056b3',
    backgroundColor: '#e9ecef',
    
};

return (
    <div className="col-lg-3 sidebar">
        <div className="sidebar-box bg-white p-4 ftco-animate fadeInUp ftco-animated">
            <h3 className="heading-sidebar">Management</h3>
            <form action="#" className="browse-form">
                <label htmlFor="option-category-2">
                    <NavLink
                        to="/dashboard/my-exams"
                        className="nav-link"
                        style={({ isActive }) => isActive ? {...navLinkStyle, ...navLinkActiveStyle} : navLinkStyle}
                        onMouseEnter={e => {
                            if (!e.currentTarget.classList.contains('active')) {
                                e.currentTarget.style = { ...navLinkStyle, ...navLinkHoverStyle }
                            }
                        }}
                        onMouseLeave={e => {
                            if (!e.currentTarget.classList.contains('active')) {
                                e.currentTarget.style = navLinkStyle
                            }
                        }}
                    >
                        My Exams
                    </NavLink>
                </label>
                <br />
                <label htmlFor="option-category-2">
                    <NavLink
                        to="/dashboard/my-exams/exam-results"
                        className="nav-link"
                        style={({ isActive }) => isActive ? {...navLinkStyle, ...navLinkActiveStyle} : navLinkStyle}
                        onMouseEnter={e => {
                            if (!e.currentTarget.classList.contains('active')) {
                                e.currentTarget.style = { ...navLinkStyle, ...navLinkHoverStyle }
                            }
                        }}
                        onMouseLeave={e => {
                            if (!e.currentTarget.classList.contains('active')) {
                                e.currentTarget.style = navLinkStyle
                            }
                        }}
                    >
                        My exam results
                    </NavLink>
                </label>
                <br />
                <label htmlFor="option-category-2">
                    <NavLink
                        to="/dashboard/questions"
                        className="nav-link"
                        style={({ isActive }) => isActive ? {...navLinkStyle, ...navLinkActiveStyle} : navLinkStyle}
                        onMouseEnter={e => {
                            if (!e.currentTarget.classList.contains('active')) {
                                e.currentTarget.style = { ...navLinkStyle, ...navLinkHoverStyle }
                            }
                        }}
                        onMouseLeave={e => {
                            if (!e.currentTarget.classList.contains('active')) {
                                e.currentTarget.style = navLinkStyle
                            }
                        }}
                    >
                        Questions
                    </NavLink>
                </label>
                <br />
            </form>
        </div>
    </div>
);
}
