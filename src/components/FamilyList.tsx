import React from 'react';
import { Family } from '../types';
import FamilyItem from './FamilyItem';

interface FamilyListProps {
  families: Family[];
  onAddFamily: () => void;
}

const FamilyList: React.FC<FamilyListProps> = ({ families, onAddFamily }) => {
  return (
    <div>
      <h2>Family List</h2>
      {families.map((family) => (
        <FamilyItem key={family.id} family={family} />
      ))}
      <button onClick={onAddFamily}>Add Family</button>
    </div>
  );
};

export default FamilyList;