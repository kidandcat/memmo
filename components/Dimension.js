import { useState } from 'react';
import styles from '../styles/Dimension.module.css'
import { withOpacity } from "../data/utils";
import Location from './Location';

export default function Dimension({ dimension }) {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <div
            key={dimension.name}
            className={styles.dimension}
            style={{
                background: withOpacity(dimension.color, 0.4),
            }}
            onClick={() => setCollapsed(!collapsed)}
        >
            <h2>{dimension.name}</h2>
            {!collapsed && <div className={styles.locationsContainer}>
                {dimension.locations.map(
                    location => <Location
                        location={location}
                        dimension={dimension}
                    />
                )}
            </div>}
        </div>
    )
}