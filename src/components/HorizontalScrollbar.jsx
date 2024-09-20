import React, { useContext } from 'react';

import BodyPart from './BodyPart';






const HorizontalScrollbar = ({ data, bodyPart, setBodyPart, handleSearch, setSearch }) => {
    return (
      <div className="horizontal-scrollbar">
        {data.map((item) => (
          <BodyPart
            key={item}
            item={item}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            handleSearch={handleSearch}
            setSearch={setSearch}
          />
        ))}
      </div>
    );
  };

export default HorizontalScrollbar;
