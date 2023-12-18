import React from 'react';
import avatar from '../../assets/admin_assets/img/user.jpg';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
function Sidebar() {
    const pathname = usePathname();
    return (
        <div className="sidebar pe-4 pb-3">
            <nav className="navbar bg-light navbar-light">
                <a href="index.html" className="navbar-brand mx-4 mb-3">
                    <h3 className="text-primary"><i className="fa fa-hashtag me-2"></i>Portfolio</h3>
                </a>
                <div className="d-flex align-items-center ms-4 mb-4">
                    <div className="position-relative">
                        <Image className="rounded-circle" src={avatar} alt="" style={{ "width": "40px", "height": "40px" }} />
                        <div
                            className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1">
                        </div>
                    </div>
                    <div className="ms-3">
                        <h6 className="mb-0">Soumya Manna</h6>
                        <span>Admin</span>
                    </div>
                </div>
                <div className="navbar-nav w-100">
                    <Link href="/admin/dashboard" className={`nav-item nav-link ${pathname == '/admin/dashboard' ? 'active' : ''}`}><i
                        className="fa fa-tachometer-alt me-2"></i>Dashboard</Link>
                    <Link href="/admin/content-management-system" className={`nav-item nav-link ${pathname == '/admin/content-management-system' ? 'active' : ''}`}><i className="fa fa-th me-2"></i>CMS</Link>
                    <Link href="/admin/about" className={`nav-item nav-link ${pathname == '/admin/about' ? 'active' : ''}`}><i className="fas fa-info-circle me-2"></i>About</Link>

                    <div className="nav-item dropdown">
                        <a href="/" onClick={(e) => { e.preventDefault() }} className={`nav-link dropdown-toggle ${pathname == '/admin/blog/list-blog' || pathname == '/admin/blog/add-blog' ? 'active show' : ""}`} data-bs-toggle="dropdown"><i
                            className="fa fa-laptop me-2"></i>Blog</a>
                        <div className={`dropdown-menu bg-transparent border-0 ${pathname == '/admin/blog/list-blog' || pathname == '/admin/blog/add-blog' ? 'show' : ""}`}>
                            <Link href="/admin/blog/list-blog" className={`dropdown-item ${pathname == '/admin/blog/list-blog' ? 'active' : ''}`}>Blog List</Link>
                            <Link href="/admin/blog/add-blog" className={`dropdown-item ${pathname == '/admin/blog/add-blog' ? 'active' : ''}`}>New Blog</Link>
                        </div>
                    </div>
                    <div className="nav-item dropdown">
                        <a href="/" onClick={(e) => { e.preventDefault() }} className={`nav-link dropdown-toggle ${pathname == '/admin/portfolio' || pathname == '/admin/portfolio/add-portfolio' ? 'active show' : ""}`} aria-expanded="true" data-bs-toggle="dropdown"><i
                            className="fa fa-briefcase me-2"></i>Portfolio</a>
                        <div className={`dropdown-menu bg-transparent border-0 ${pathname == '/admin/portfolio' || pathname == '/admin/portfolio/add-portfolio' ? 'show' : ""}`}>
                            <Link href="/admin/portfolio" className={`dropdown-item ${pathname == '/admin/portfolio' ? 'active' : ''}`}>Portfolio List</Link>
                            <Link href="/admin/portfolio/add-portfolio" className={`dropdown-item ${pathname == '/admin/portfolio/add-portfolio' ? 'active' : ''}`}>Add Portfolio</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Sidebar;
