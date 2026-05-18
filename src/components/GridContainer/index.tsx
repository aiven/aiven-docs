import React from 'react';
import styles from './styles.module.css';

const GridContainer = ({children, columns = 2}) => {
  const gridStyle = {
    '--grid-columns': columns,
  } as React.CSSProperties;

  return (
    <div className={styles.gridContainer} style={gridStyle}>
      {children}
    </div>
  );
};

export default GridContainer;
