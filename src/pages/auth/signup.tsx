"use client";
import { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import router from "next/router";
import { FormEventHandler, useEffect, useState } from "react";

// interface Props {}

// const SignIn: NextPage = (props:any): JSX.Element => {
export default function SignUp() {
  const { status, data } = useSession();
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const router=useRouter()
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // validate your user info
    e.preventDefault();
    // router.push('/home')
  };
  useEffect(() => {
    if (status === "authenticated") router.replace("/home");
  }, [status]);

  if (status === "unauthenticated")
  return (
    <div className="absolute flex-col items-center bg-bakGrund w-screen h-screen justify-items-center md:text-left content-center">
      <div className="flex justify-center w-[100%] text-white font-glory">
      <div className="flex justify-center mt-11 mb-11 w-[100%] text-white rounded-r-[3px]">
        <form className="py-[0px] px-[15px]" action="/api/signup" method="post">
          <h1 className="text-[18px] text-center"><b>Sign up!</b></h1>
          <input
            name="email"
            className="block p-[5px] border-[1px] rounded-r-[3px] mt-[15px] text-black font-bold"
            value={userInfo.email}
            onChange={({ target }) =>
              setUserInfo({ ...userInfo, email: target.value })
            }
            type="email"
            placeholder="Email"
            autoComplete="on"
          />
          <input
            name="password"
            className="block p-[5px] border-[1px] rounded-r-[3px] mt-[15px] text-black font-bold"
            value={userInfo.password}
            onChange={({ target }) =>
              setUserInfo({ ...userInfo, password: target.value })
            }
            type="password"
            placeholder="Password"
            autoComplete="on"
          />
          <input className="block p-[5px] border-[1px] rounded-r-[3px] mt-[15px] font-bold" type="submit" value="Signup" />
          <br/>
        </form>
      </div>
</div>
    </div>
  );
  return <div>Loading...</div>;

}
