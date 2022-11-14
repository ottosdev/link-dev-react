import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../services/firebaseConnection";
export default function Private({ children }) {
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);

  async function ckeckLogin() {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email,
        };

        localStorage.setItem("@detailUser", JSON.stringify(userData));
        setLoading(false);
        setSigned(true);
      } else {
        setLoading(false);
        setSigned(false);
      }
    });
  }
  useEffect(() => {
    ckeckLogin();
  }, []);

  if (loading) {
    return <div></div>;
  }
  if (!signed) {
    return <Navigate to="/login" />;
  }

  return children;
}
