'use client'
import { NextPage } from "next";
import { FormEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";


const SignInForm: NextPage<{}> = ({}) => {
  const { status, data } = useSession();

  const router = useRouter();
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    if (userInfo.email !== "") {
      // validate your user info
      e.preventDefault();
      const res = await signIn("credentials", {
        email: userInfo.email,
        password: userInfo.password,
        redirect: false,
      });
      console.log(res);
      router.push("/home");
    }
  };
  useEffect(() => {
    if (status === "authenticated") router.replace("/home");
  }, [status]);

  if (status === "unauthenticated")
    return (
      <div className="flex justify-center mb-11 mt-11 w-[100%] text-white rounded-r-[3px]">
        <form className="py-[0px] px-[30px]" onSubmit={handleSubmit}>
          <h1 className="text-[18px] text-center">
            <b>Login to Witchyherbs!</b>
          </h1>
          <input
            className="block p-[5px] border-[1px] rounded-r-[3px] mt-[15px] text-black font-bold"
            value={userInfo.email}
            onChange={({ target }) =>
              setUserInfo({ ...userInfo, email: target.value })
            }
            type="email"
            placeholder="Email"
            autoComplete="on"
            name="username"
          />
          <input
            className="block p-[5px] border-[1px] rounded-r-[3px] mt-[15px] text-black font-bold"
            value={userInfo.password}
            onChange={({ target }) =>
              setUserInfo({ ...userInfo, password: target.value })
            }
            type="password"
            placeholder="Password"
            autoComplete="on"
            name="current-password"
          />
          <input
            className="block p-[5px] border-[1px] rounded-r-[3px] mt-[15px] font-bold"
            type="submit"
            value="Login"
          />
          <a
            className="block p-[5px] border-[1px] rounded-r-[3px] mt-[15px] whitespace-nowrap w-[75px] font-bold"
            type="submit"
            onClick={() => router.push("/auth/signup")}>
            {" "}
            Sign up
          </a><br/>
        </form>
      </div>
    );
  return <div>Loading...</div>;

};
export default SignInForm; 
