"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useUser } from "@/app/context/UserContext";
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function UserLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { currentUser, loading } = useUser();

    const handleLogout = async () => {
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
            });

            if (!res.ok) throw new Error("Logout failed");

            // Redirect user to login page after logout
            router.push("/login");
        } catch (error) {
            console.error(error.message);
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev); // Toggle the sidebar state
      };
    

    const currentPage = pathname.split("/").pop() || "Dashboard";
    if (loading) return <p>Loading...</p>;

    return (
        <>
        <button className="toggle-btn" id="toggleSidebar" onClick={toggleSidebar}>
        <i className="bi bi-list"></i> {/* Hamburger icon */}
      </button>

            {/* Sidebar */}
            <div className={`sidebar border-end ${isSidebarOpen ? "show" : ""}`} id="sidebar">
                <div className="d-flex justify-content-start align-items-center mb-4">
                    <Image src="/assets/img/LogoProxenio.png" width={45} height={45} alt="Logo" />
                    {isSidebarOpen && (
                        <Link className="navbar-brand ps-1 fs-5 fw-medium color-maroon" href="/user">
                            Proxenio
                        </Link>
                    )}
                </div>

                <div className="sidebar-menu d-flex flex-column">
                    <SidebarLink href="/user/explore" icon="bi-people" label="Explore Profile" pathname={pathname} />
                    <SidebarLink href="/user/myprofile" icon="bi-heart" label="My Profile" pathname={pathname} />
                    <SidebarLink href="/user/matches" icon="bi-currency-dollar" label="My Matches" pathname={pathname} />
                    <SidebarLink href="/user/settings" icon="bi-gear" label="Settings" pathname={pathname} />

                    <a href="#" onClick={handleLogout} className="menu-item">
                        <i className="bi bi-box-arrow-right"></i>
                        <span>Logout</span>
                    </a>
                </div>
            </div>

            {/* Content */}
            <div className="content" id="content">
                <main>
                    <div className="row align-items-center mb-5">
                        <div className="col-md-6">
                            <div className="d-flex align-items-center fs-4">
                                <span className="fw-semibold text-capitalize">{currentPage}</span>
                            </div>
                        </div>
                        <div className="col-md-6 d-none d-md-flex justify-content-end align-items-center">
                            <Image
                                src={
                                    loading
                                        ? "/assets/img/loading.gif" // Use a loading indicator if necessary
                                        : currentUser?.profilePicture
                                            ? currentUser.profilePicture
                                            : "/assets/img/user.png"
                                }
                                width={50}
                                height={50}
                                className="rounded-pill border me-3 "
                                alt="user"
                            />
                            <div className="text-start me-5">
                                <h5 className="mb-0 text-muted">
                                    {loading ? "Loading..." : currentUser?.username || "Guest"}
                                </h5>
                                <p className="mb-0 text-muted">
                                    {loading ? "Loading..." : currentUser?.email || "No Email"}
                                </p>

                            </div>

                            <ul className="navbar-nav bg-light ms-5">
                                <li className="nav-item dropdown">
                                    <a className="nav-link bg-white" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="bi bi-globe-americas fs-3"></i>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" href="#!">English</a></li>
                                        <li><a className="dropdown-item" href="#!">Greek</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {children}
                </main>
            </div>
        </>
    );
}

function SidebarLink({ href, icon, label, pathname }) {
    const isActive = pathname === href;

    return (
        <Link href={href} className={`menu-item ${isActive ? "active" : ""}`}>
            <i className={`bi ${icon}`}></i>
            <span>{label}</span>
        </Link>
    );
}
