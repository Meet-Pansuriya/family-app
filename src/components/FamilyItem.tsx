import React from 'react';
import { Family } from '../types';

interface FamilyItemProps {
  family: Family;
}

const FamilyItem: React.FC<FamilyItemProps> = ({ family }) => {
  return (
    <div>
      <h3>{family.headOfFamily}'s Family</h3>
      <p>Members: {family.members.length}</p>
    </div>
  );
};

export default FamilyItem;