import React from 'react';
import { Pagination } from 'semantic-ui-react';

export default () => {
  return (
    <div className="pagination">
      <Pagination
        boundaryRange={0}
        defaultActivePage={1}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        siblingRange={1}
        totalPages={10}
      />
    </div>
  );
};
