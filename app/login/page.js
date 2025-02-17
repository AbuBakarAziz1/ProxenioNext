"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmail(email.trim()); // Remove spaces if any
    setPassword(password.trim());

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Redirect based on role
      if (data.role === "admin") {
        router.push("/admin");
      } else if (data.role === "moderator") {
        router.push("/moderator");
      } else {
        router.push("/user");
      }

      // // Store JWT token securely (prefer using cookies via API)
      // document.cookie = `token=${data.token}; path=/; `;

      // // Redirect user based on role
      // if (data.role === "admin") {
      //   router.push("/admin");
      // } else if (data.role === "moderator") {
      //   router.push("/moderator");
      // } else {
      //   router.push("/user");
      // }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }

  };

  return (
    <>
      <div className="bg-gradient min-vh-100 d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            {/* Logo Section */}
            <div className="col-lg-4 d-flex flex-column justify-content-center align-items-center text-center">
              <img
                src="assets/img/LogoProxenio.png"
                alt="Logo"
                className="img-fluid"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
              <h3 className="color-maroon mt-3 fs-40 fw-semibold">Proxenio</h3>
              <p className="color-maroon mt-1 fs-24">
                Find True Love with <br /> Proxenio.net
              </p>
            </div>

            <div className="col-lg-5">
              <div className="card border-0 rounded-5 p-5 p-lg-7">
                <div className="mb-2">
                  <h3 className="text-left font-weight-light my-2">Sign In</h3>
                </div>
                <div className="mb-2">
                  <form onSubmit={handleLogin}>
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                      />
                      <label htmlFor="inputEmail">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                      />
                      <label htmlFor="inputPassword">Password</label>
                    </div>

                    <div className="d-flex align-items-center justify-content-between mt-4 mb-0">



                      <Link href="/auth/forgot-password" className="small text-maroon">
                        Forgot Password?
                      </Link>

                      <button className="btn bg-maroon text-white px-5" type="submit" >
                        Sign in
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}
