"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BsPencil   } from "react-icons/bs";

import Image from "next/image";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [useremail, setUserEmail] = useState(null);
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("/api/auth/update-profile", { method: "GET" });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user.username);
        setUserEmail(data.user.email);
      }
    };

    fetchProfile();
  }, [router]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/update-profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Password Update");
      setPassword(""); // Clear password field after update
    } else {
      alert(data.error);
    }
  };


  return (
    <>
    <div className="row">
        <div className="col-md-12">
            <div className="card shadow-sm p-3 border-0">
                
                <Image src="/assets/img/user.png" width={110} height={110} className="rounded-pill border m-2 img-fluid" alt="profile" />
          
                <div className="text-start p-2 mb-4">
                    <h5 className="mb-1">{user}</h5>
                    <p className="mb-0 text-muted">{useremail}</p>
                </div>
                <form onSubmit={handleUpdate}>
                <div className="table-responsive p-2 rounded-4">
                    <table className="table">
                        <tbody>
 
                            <tr className="bg-lightgray align-middle ">
                            
                                <td className="bg-lightgray">Password</td>
                                <td className="text-black bg-lightgray"><input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} /> </td>
                                <td className="text-end align-middle bg-lightgray">
                                    <button type="submit" className="btn btn-md " title="View Update">
                                         <BsPencil />
                                    </button>
                                </td>
                               
                            </tr>
                        </tbody>
                    </table>
                </div>
                </form>
            </div>
        </div>
    </div>

    
    </>
  );
}
