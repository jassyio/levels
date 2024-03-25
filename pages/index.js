// pages/index.js
import Head from 'next/head';
import Hello from '../components/hello';
import Mainpage from '../components/Mainpage';
import Layout from '../components/Layout';
import { useSession } from 'next-auth/react';
import Uploader from '../pages/uploader';

export default function Home() {
  const { data: session } = useSession();
  // return <Layout title="Home">{session ? <Mainpage /> : <Hello />}</Layout>;
  return <>{session ? <Mainpage /> : <Hello />}</>;
}
