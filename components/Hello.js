import Link from 'next/link';
import Layout from './Layout';
// components/Hello.js
export default function Hello() {
  return (
    <Layout title="landing Page">
      <div className='page-1'>
        <Link id='p_1 ' href="pages/login.js"> </Link>

      </div>
    </Layout>
  );
}
