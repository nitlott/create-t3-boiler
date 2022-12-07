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
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <button className="border-[1px] border-black p-2 font-bold" onClick={() => router.push('/api/auth/signin')}>Login</button>
      </main>

    </>
  );
};

export default Home;
