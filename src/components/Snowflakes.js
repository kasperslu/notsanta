import React from 'react';
import { Snowfall, Snowflake } from 'react-snowflakes';

class Snowflakes extends React.PureComponent {
  render() {
    return (
      <Snowfall
        count={40}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: '-1',
        }}
        snowflakeFactory={index => {
          const size = index / 40;
          const w = 5 + 10 * size + 'px';
          return (
            <Snowflake
              speed={.05 + size * 2}
              xSpeedPrc={.3 * size}
              ySpeedPrc={.1 * size}
              style={{
                width: w,
                height: w,
                borderRadius: '50%',
                backgroundColor: 'white',
                opacity: .2 + .8 * size,
                filter: `blur(${Math.round(Math.max(size - .5, 0) * 15)}px)`,
              }}
            />
          );
        }}
      />
    );
  }
};

export default Snowflakes;
