import React, { useEffect, useState } from 'react';
import { Menu } from '@headlessui/react';
import { signOut, useSession, getSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AdsPlayer from './adsPlayer'; // Import your adsPlayer.js component
import Uploader from '../pages/uploader'; // Import your uploader.js component
import Intro from './intro.js'; // Import the Intro component

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
        <link rel="icon" href="/home-185-16.png" /> {/* Correct image path */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

      </Head>

      <div className="App">
      <header>
      <nav className="Nav flex items-center justify-between">
            {/* User Name (Separated) */}
            <div className="mr-auto">
              <div className="website-name cursor-pointer">LEVELS</div>
            </div>

            {/* Icons Container (Flexbox for Equal Spacing) */}
            <div className="icons flex items-center">
              <div className="p-2 cursor-pointer" onClick={() => router.push('/')}>
                <img src="/home-185-16.png" alt="Home" className="home-icon cursor-pointer" />
                <span className="home-text cursor-pointer">Home</span>
              </div>

              {/* Add similar elements for Login, Upload, etc. */}
              <div className="p-2 cursor-pointer" onClick={() => router.push('/login')}>
                <img src="/icons/menu-215-16.png" alt="Login" />
                <span>Login</span>
              </div>
              <div className="p-2 cursor-pointer" onClick={() => toggleUploader()}> {/* Assuming toggleUploader function */}
                <img src="/icons/upload-49-16.png" alt="Upload" />
                <span>Upload</span>
              </div>
            </div>
          </nav>
        </header>

        {/* Flex Container for Carousel and Main Section */}
        <div className="flex-container">

          {/* Carousel Component */}
          <Carousel />

          {/* Main Content Section */}
          <main className="main">
          <Intro /> {/* Render the Intro component here */}
          {children}
        </main>
        </div>

        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p>Copyright © levels 2024 </p>
        </footer>
      </div>
    </>
  );
}
function Carousel() {
  const [images, setImages] = useState([
    '/images/thumb16 (1).jpg',
    '/images/thumb16 (7).jpg',
    '/images/thumb16 (5).jpg',
    '/images/thumb16 (2).jpg',
    '/images/thumb16 (6).jpg',
    '/images/thumb16 (4).jpg',
    '/images/thumb16 (3).jpg',
    '/images/thumb16.jpg',

  ]); // Preload image paths

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedImages, setDisplayedImages] = useState([]);

  // Randomly select 4 unique images from the full set (Improved logic)
  const shuffleImages = () => {
    const shuffledImages = [...images].sort(() => Math.random() - 0.5);
    const selectedImages = shuffledImages.slice(0, 4); // Select first 4 for display
    setDisplayedImages(selectedImages);
  };

  useEffect(() => {
    // Shuffle images on initial render and at regular intervals
    shuffleImages();
    const intervalId = setInterval(() => shuffleImages(), 5000); // Change interval as needed

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % displayedImages.length;
    setCurrentIndex(nextIndex);
  };

  return (
    <div className="caurosel-container">
      {displayedImages.map((imageUrl, index) => (
        <img
          key={imageUrl} // Add unique key for React optimization
          src={imageUrl}
          alt={`Image ${index + 1}`}
          className={`carousel-image ${index === currentIndex ? 'active' : ''}`}
        />
      ))}
    </div>
  );
}




// Add styles for the flex container (optional)
