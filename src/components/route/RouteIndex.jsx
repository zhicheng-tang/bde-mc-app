import React from 'react';
import { Link } from 'react-router-dom';

function RouteIndex({ route }) {
  return (
    <dl>
      <dt>
        <h3>{route.name}</h3>
      </dt>
      {route.children.map((child) => (
        <dd key={child.key}>
          <Link to={child.path}>{child.name}</Link>
        </dd>
      ))}
    </dl>
  );
}

export default RouteIndex;
