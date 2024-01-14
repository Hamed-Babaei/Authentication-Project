import React, { useEffect, useState } from "react";
import Link from "next/link";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignIn,
  faSignOut,
  faSolarPanel,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userAuth = async () => {
      const res = await fetch("/api/auth/me");
      if (res.status === 200) {
        setIsLoggedIn(true);
      }
    };
    userAuth();
  }, []);
  return (
    <div className="container">
      <aside className="sidebar">
        <h3 className="sidebar-title">Sidebar</h3>

        <ul className="sidebar-links">
          <>
            {isLoggedIn ? (
              <>
                <li>
                  <Link href="/dashboard">
                    <span>
                      <FontAwesomeIcon icon={faBars} />
                    </span>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <span>
                      <FontAwesomeIcon icon={faSignOut} />
                    </span>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/signin">
                    <span>
                      <FontAwesomeIcon icon={faSignIn} />
                    </span>
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link href="/signup">
                    <span>
                      <FontAwesomeIcon icon={faSignIn} />
                    </span>
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </>

          {/* User is login & admin */}
          {/* <li>
            <Link href="/p-admin">
              <span>
                <FontAwesomeIcon icon={faSolarPanel} />
              </span>
              Admin panel
            </Link>
          </li> */}
        </ul>
        <img className="wave" src="/Images/wave.svg" alt="wave" />
      </aside>
      <main className="main"></main>
    </div>
  );
}

export default Index;
