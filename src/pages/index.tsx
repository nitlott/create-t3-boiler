import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>zylex.se</title>
        <meta name="description" content="not much" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"></meta>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <link rel="manifest" href="manifest.json"/>
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <button className="border-[1px] border-black p-2 font-bold" onClick={() => router.push('/api/auth/signin')}>Login</button>
      </main>

    </>
  );
};

export default Home;
