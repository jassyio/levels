import React, { useState, useEffect } from 'react';
import NetworkTable from './NetworkTable';
import BalanceCard from './BalanceCard';
import Layout from './Layout';

export default function Mainpage() {
  // State for storing network data
  const [networkData, setNetworkData] = useState({
    inviteesLevel1: [],
    inviteesLevel2: [],
    inviteesLevel3: [],
    earningsLevel0: 0,
    earningsLevel1: 0,
    earningsLevel2: 0,
    earningsLevel3: 0,
    totalEarnings: 0,
    balance: 0,
    withdrawals: 0,
    status: 'pending',
  });

  // Fetch user network on component mount
  useEffect(() => {
    const fetchUserNetwork = async () => {
      const res = await fetch('/api/user/inviteeLevels');
      const data = await res.json();
      setNetworkData(data); // Save the network data in state
      // console.log(data);
    };

    fetchUserNetwork();
  }, []); // Empty array means this effect runs once on component mount

  return (
    <div>
      <Layout>
        <BalanceCard
          balance={networkData.balance}
          status={networkData.status}
        />
        <NetworkTable networkData={networkData} />
      </Layout>
    </div>
  );
}
