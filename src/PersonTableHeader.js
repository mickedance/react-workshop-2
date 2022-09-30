import React from 'react';

const PersonTableHeader = () => {
    return (
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
    );
};

export default PersonTableHeader;