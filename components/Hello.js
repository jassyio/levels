import Link from 'next/link';
import Layout from './Layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Hello() {
  const router = useRouter();
  const { redirect } = router.query;

  const [jackpots, setJackpots] = useState({
    joinersTotal: 0,
    weeklyTotal: 0,
    monthlyTotal: 0,
    annualTotal: 0,
  });

  useEffect(() => {
    fetch('/api/jackpotTotals')
      .then((response) => response.json())
      .then((data) => {
        setJackpots({
          joinersTotal: data.joinersTotal,
          weeklyTotal: data.weeklyTotal,
          monthlyTotal: data.monthlyTotal,
          annualTotal: data.annualTotal,
        });
      });
  }, []);

  return (
    <Layout title="Hello Page">
      <div className="font-sans min-h-screen py-2">
        <div className='caurosel-containerS'>
          {/* Carousel component or content */}
        </div>

        <main className="p-5">
          <section className="jackpots flex justify-between mb-5">
            {['Joiners', 'Weekly', 'Monthly', 'Annual'].map((jackpot) => (
              <div key={jackpot} className="jackpot text-center p-2 border border-gray-300 rounded">
                <h3 className="text-lg font-bold mb-1">{jackpot} Jackpot</h3>
                <p className="text-base">
                  KSH
                  <span id={`${jackpot.toLowerCase()}-jackpot`}>
                    {jackpots[`${jackpot.toLowerCase()}Total`]}
                  </span>
                </p>
                <Link
                  href={`/register?inviteCode=&redirect=${redirect || '/'}`}
                  className="mt-2 inline-block px-5 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-600"
                >
                  Join Now!
                </Link>
              </div>
            ))}
          </section>
        </main>

        {/* New div for videos */}
        <div className="video-container-wrapper">
          <div className="video-container p-5">
            <video controls autoPlay>
              <source src="/sampleAds/test1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="video-container p-5">
            <video controls autoPlay>
              <source src="/sampleAds/test2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="video-container p-5">
            <video controls autoPlay>
              <source src="/sampleAds/test3.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* New div below the p-5 div */}
        <div className="additional-content">
          {/* Your content goes here */}
        </div>

      </div>
    </Layout>
  );
}
