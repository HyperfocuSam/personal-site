import React from 'react';
import Table from './Table';
import data from '../../data/stats/personal';

const PersonalStats = () => (
  <>
    <h3>AICBO | the 1-1 AI tutoring project</h3>
    <Table data={data} />
  </>
);

export default PersonalStats;
