import React from 'react';
import puffins from 'images/puffins.webp'
import styles from './index.module.scss';

export default function Title() {
    return (
        <div>
            <h1 className={styles.mainTitle}>Lazy title component with output styles</h1>
            <img src={puffins} alt={'alt'}/>
        </div>
    )
}