import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.scss";
import welcome from "../../assets/images/pablo-sign-in.png";
import { LogoIcon } from "../icons";
import Btn from "../Button";
import { IUser } from "../../types/components/core";
import { getUsersApi } from "../../api";

function LogInPage() {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let user: string | null = localStorage.getItem("user");
    if (user) {
      navigate("/users");
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await getUsersApi();
      const user = res?.data?.result?.filter(
        (user: IUser) => user.email === emailRef?.current?.value
      );

      let payload = {
        email: emailRef?.current?.value,
        password: passwordRef?.current?.value,
        avatar: "",
      };
      if (user.length) {
        payload.email = user[0].email;
        payload.avatar = user[0].profile.avatar;
      }
      localStorage.setItem("user", JSON.stringify(payload));
      setLoading(false);
      navigate("/users");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="landing">
      <header>
        <div className="logo">
          <LogoIcon />
        </div>
      </header>
      <div className="box1">
        <div>
          <div className="img_wrapper">
            <img src={welcome} alt="sign in " />
          </div>
        </div>
      </div>
      <div className="box2">
        {isForgotPassword ? (
          <div className="forgotP">
            <div className="welcome">
              <h1>Welcome!</h1>

              <p>
                Note: You can log in with a random <br /> Email and Password
              </p>

              <p>
                e.g Email: yusuftosco66@gmail.com.com, <br /> Password: use any
                random password
              </p>
              <div style={{ marginTop: "10px" }}>
                <Btn
                  title="LOG IN"
                  primary
                  action={() => setIsForgotPassword(false)}
                />
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleLogin}>
            <div>
              <div className="welcome">
                <h1>Welcome!</h1>
                <p>Enter details to login.</p>
                {error && (
                  <p className="error">Something went wrong try again</p>
                )}
              </div>
              <div className="inputGroup">
                <input
                  placeholder="Email"
                  type="email"
                  required
                  ref={emailRef}
                />
              </div>
              <div className="inputGroup">
                <input
                  placeholder="Password"
                  type={isShow ? "text" : "password"}
                  required
                  ref={passwordRef}
                />
                <button
                  onClick={() => setIsShow(!isShow)}
                  type="button"
                  className="showPassword"
                >
                  SHOW
                </button>
              </div>
              <button
                className="forgotPassword"
                onClick={() => setIsForgotPassword(true)}
              >
                FORGOT PASSWORD?
              </button>
              <Btn
                disabled={false}
                name="pay"
                title={loading ? "LOADING..." : "LOG IN"}
                primary
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default LogInPage;
