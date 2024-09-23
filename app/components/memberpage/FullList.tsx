import React from 'react';
import { Card, CardBody } from '@nextui-org/react';

import Image from 'next/image';

import Jack from '../../../public/Jack.gif';

interface Member {
  id: string;
  name: string;
  profilePic: string;
  list2023: string[];
  list2024: string[];
  info: string[];
}

interface MemberInfoProps {
  member: Member;
}

const FullList: React.FC<MemberInfoProps> = ({ member }) => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center ">
        {/* <Image
          src={Santa}
          height={50}
          width={50}
          alt="Stocking"
          onClick={onOpen}
          className="cursor-pointer"
        /> */}

        {/* <p className="m-2 text-4xl">{member.name}&apos;s Wish List</p> */}
      </div>
      <div className="w-auto h-auto overflow-auto border rounded-lg p-6">
        {member?.list2024 && member.list2024.length > 0 ? (
          member.list2024.map((item, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <Card className="">
                <CardBody className="flex justify-center items-center">
                  <ul className="font-sans list-inside w-full">
                    <li
                      className="p-1 text-center marker:text-[#0077ff] text-xl"
                      key={index}
                    >
                      {item}
                    </li>
                  </ul>
                </CardBody>
              </Card>
            </div>
          ))
        ) : (
          <div className="flex justify-center flex-col items-center h-full ">
            <p className="text-3xl text-center">
              Please add your first Wish Item!
            </p>
            <Image
              src={Jack}
              alt="Animated GIF"
              width={500}
              height={500}
              unoptimized={true}
              className="rounded-sm"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FullList;
