import React, { useEffect, useState } from 'react';
import { Menu } from '@headlessui/react';
import { signOut, useSession, getSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AdsPlayer from './adsPlayer'; // Import your adsPlayer.js component
import Uploader from '../pages/uploader'; // Import your uploader.js component

export default function Layout({ title, children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showUploader, setShowUploader] = useState(false); // State to control displaying uploader content
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      setSession(session);
      setLoading(false);
    });
  }, [router.asPath]);

  const logoutClickHandler = () => {
    signOut({ callbackUrl: '/login' });
  };

  const toggleUploader = () => {
    setShowUploader(!showUploader);
  };

  return (
    <>
      <Head>
        <title>{title ? title + ' - Levels' : 'Levels'}</title>
        <meta name="description" content="Mynet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='App'>
        <header>
          <nav className='Nav'>
            <Link className="text-lg font-bold" href="/">
              Levels
            </Link>

            {loading ? (
              'Loading..'
            ) : session?.user ? (
              <Menu as="div" className="relative inline-block z-60">
                <Menu.Button className="text-blue-600 mr-4">
                  {session.user.name}
                </Menu.Button>
                <Menu.Items className="absolute card bg-white opacity-100 right-5 w-40 origin-top-right">
                  <Menu.Item>
                    <p>placeholder</p>
                  </Menu.Item>
                  <Menu.Item>
                    <a
                      className="dropdown-link"
                      href="#"
                      onClick={logoutClickHandler}
                    >
                      Logout
                    </a>
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            ) : (
              <>
                <Link id="link" className="p-2" href="/login">
                  Login
                </Link>
                <Link id="link" className="p-2" href="/uploader">
                  upload
                </Link>
              </>
            )}
          </nav>
        </header>
        <div className='body'>
          {/* Display AdsPlayer component when on the home page */}
          {router.pathname === '/' && !showUploader && <AdsPlayer />}
          {showUploader && <Uploader />}
        </div>
        <div>
          watch short videos and earn
        </div>
        <main className="container m-auto mt-4 px-4">
          {children}
        </main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p>Copyright © levels 2024 </p>
        </footer>
      </div>
    </>
  );
}
