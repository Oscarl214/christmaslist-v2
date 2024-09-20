'use client';
import React from 'react';
import { Card, CardBody, CardHeader } from '@nextui-org/react';

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

const Info: React.FC<MemberInfoProps> = ({ member }) => {
  return (
    <div>
      <Card>
        <CardHeader>Important Info</CardHeader>
        <CardBody className="h-[1px] hover:h-auto">
          {member?.info && member.info.length > 0 ? (
            member.info.map((item, index) => (
              <ul key={index} className="font-sans list-disc list-inside">
                <li className="p-1 marker:text-[#0077ff]">{item}</li>
              </ul>
            ))
          ) : (
            <p className="text-black"> No Info available</p>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default Info;
