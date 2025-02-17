"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useUser } from "@/app/context/UserContext";


export default function DashboardLayout({ children }) {

  const router = useRouter(); // Initialize router
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { user, loading } = useUser();
  if (loading) return <p>Loading...</p>;
  

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "GET" });
    router.push("/login"); // Redirect to login after logout
  };


  // Extract page name from the path
  const currentPage = pathname.split("/").pop() || "Good Morning";

  return (
    <>
      {/* Sidebar */}
      <div className={`sidebar border-end ${isSidebarOpen ? "open" : "closed"}`} id="sidebar">
        <div className="d-flex justify-content-start align-items-center mb-4">
        <Image src="/assets/img/LogoProxenio.png" width={45} height={45} alt="Logo" />
          {isSidebarOpen && (
            <Link className="navbar-brand ps-1 fs-5 fw-medium color-maroon" href="/admin" >
              Proxenio </Link>
            
          )}
        </div>

        <div className="sidebar-menu d-flex flex-column justify-content-center">
          <SidebarLink href="/moderator" icon="bi-house-door" label="Dashboard" pathname={pathname} />
          <SidebarLink href="/moderator/users" icon="bi-people" label="Users" pathname={pathname} />
          <SidebarLink href="/moderator/matches" icon="bi-heart" label="Matches" pathname={pathname} />
          <SidebarLink href="/moderator/payments" icon="bi-currency-dollar" label="Payments" pathname={pathname} />
          <SidebarLink href="/moderator/content" icon="bi-file-text" label="Content" pathname={pathname} />
          <SidebarLink href="/moderator/profile" icon="bi-person" label="Profile" pathname={pathname} />
          <SidebarLink href="/moderator/setting" icon="bi-gear" label="Settings" pathname={pathname} />
          <a onClick={handleLogout} className="menu-item">
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

                    <Image src="/assets/img/user.png" width={60} height={60}
                        className="rounded-pill border me-3 img-fluid" alt="user" />
                    <div className="text-start me-5">
                        
                    </div>
                   
                    <ul className="navbar-nav bg-light ms-5">
                        <li className="nav-item dropdown">
                            <a className="nav-link bg-white" id="navbarDropdown" href="#" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
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

// Sidebar Link Component
function SidebarLink({ href, icon, label, pathname }) {
  const active = pathname === href ? "active" : "";
  return (
    <Link href={href} className={`menu-item ${active}`}>
      <i className={`bi ${icon}`}></i> <span>{label}</span>
    </Link>
  );
}
