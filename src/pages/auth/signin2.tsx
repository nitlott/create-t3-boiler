"use client";
import { signIn } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import SignInForm from "../../components/signinform";


export default function SignI2n() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // validate your user info
    e.preventDefault();
    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });
    console.log(res);
    router.push("/home");
  };

  return (
    
    <div className="absolute flex-col items-center bg-bakGrund w-screen justify-items-center md:text-left content-center">

<div className="flex justify-center w-[100%] text-white font-glory">


      <SignInForm/>
      
    </div>
    </div>

  );
}
