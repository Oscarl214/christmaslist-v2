'use client';
import React from 'react';
import { Card, CardBody } from '@nextui-org/react';
import Image from 'next/image';
import { SlPresent } from 'react-icons/sl';
import Jack from '../../../public/Jack.gif';
import { CiLink } from 'react-icons/ci';

interface Item {
  description: string;
  link: string | null;
}

interface Member {
  id: string;
  name: string;
  profilePic: string;
  list2023: string[];
  list2024: Item[];
  info: string[];
}

interface MemberInfoProps {
  member: Member | null;
}

const FullList: React.FC<MemberInfoProps> = ({ member }) => {
  if (!member) {
    return (
      <div className="flex justify-center flex-col items-center h-full">
        <p className="text-3xl text-center">No member data available.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center mb-6">
        {/* Add a title or member name here if needed */}
      </div>
      <div className="w-full max-w-4xl mx-auto overflow-auto border rounded-lg p-4 bg-gray-50 shadow-md">
        {member.list2024 && member.list2024.length > 0 ? (
          <Card className="shadow-lg">
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-left bg-white rounded-lg border-collapse">
                <thead className="bg-gray-200 text-gray-600 uppercase text-sm font-sans">
                  <tr>
                    <th className="p-4">
                      <SlPresent className="text-orange-500 text-lg" />
                    </th>
                    <th className="p-4">Gift</th>
                    <th className="p-4 text-center">Link</th>
                  </tr>
                </thead>
                <tbody>
                  {member.list2024.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-red-500 text-black"
                    >
                      <td className="p-4 flex items-center gap-2">
                        {index + 1}{' '}
                      </td>
                      <td className="p-4 font-medium text-gray-800 font-mono">
                        {item.description}
                      </td>
                      <td className="p-4 text-center">
                        {item.link ? (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            <CiLink className="inline-block mr-1 text-lg" />
                          </a>
                        ) : (
                          <span className="text-gray-500">
                            No link provided
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ) : (
          <div className="flex justify-center flex-col items-center h-full">
            <p className="text-3xl text-center">
              Please add your first Wish Item!
            </p>
            <Image
              src={Jack}
              alt="Animated GIF"
              width={500}
              height={500}
              unoptimized={true}
              className="rounded-sm mt-4"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FullList;
