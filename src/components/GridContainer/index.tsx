import React from 'react';
import styles from './styles.module.css';

const GridContainer = ({children, columns = 2}) => {
  const gridStyle = {
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
  };

  return (
    <div className={styles.gridContainer} style={gridStyle}>
      {children}
    </div>
  );
};

export default GridContainer;
