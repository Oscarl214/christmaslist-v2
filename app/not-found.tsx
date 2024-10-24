import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
const NotFoundPage = () => {
  return (
    <div className="flex justify-center flex-col  items-center h-screen bg-white">
      <Image
        height={400}
        width={400}
        src={
          'https://christmaslist21.s3.us-east-2.amazonaws.com/SantaGifgif.gif'
        }
        className="h-screen w-screen absolute"
        alt="cat error 404"
      />
      <h1 className="z-20 text-green-500 text-7xl text-center">
        MERRY CHRISTMAS! NOW GET BACK TO WORK!
      </h1>
      <Link
        className="btn z-20 border-2 font-mono border-yellow-500 bg-transparent hover:bg-green-500 text-white"
        href={'/users'}
      >
        Back to Fam
      </Link>
    </div>
  );
};

export default NotFoundPage;
