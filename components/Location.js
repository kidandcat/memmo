import { useEffect, useState } from 'react';
import styles from '../styles/Location.module.css'
import Resident from './Resident'

export default function Location({ dimension, location }) {
    const [collapsed, setCollapsed] = useState(true);

    useEffect(() => {
        document.querySelectorAll('.Alien').forEach(e => new rive.Rive({
            src: 'alien.riv',
            canvas: e,
            autoplay: true,
        }))
        document.querySelectorAll('.Human').forEach(e => new rive.Rive({
            src: 'human.riv',
            canvas: e,
            autoplay: true,
        }))
        document.querySelectorAll('.Robot').forEach(e => new rive.Rive({
            src: 'robot.riv',
            canvas: e,
            autoplay: true,
        }))
    }, [])

    return (
        <div className={styles.locationContainer}>
            <div
                key={location.code}
                className={styles.card}
                style={{
                    background: dimension.color
                }}
                onClick={(event) => {
                    event.stopPropagation()
                    setCollapsed(!collapsed)
                }}
            >
                <h3>{location.name}</h3>
                <div className={styles.stats}>
                    <div>
                        <h4>Type:</h4>
                        <h5>{location.type}</h5>
                        <h4>Dead:</h4>
                        <h5>{location.Dead || 0}</h5>
                        <h4>Alive:</h4>
                        <h5>{location.Alive || 0}</h5>
                        <h4>Guests:</h4>
                        <h5>{location.guests || 0}</h5>
                    </div>
                    <div>
                        <canvas className="Human" width="30" height="30"></canvas>
                        <h5>{location.Human || 0}</h5>
                        <canvas className="Robot" width="30" height="30"></canvas>
                        <h5>{location.Robot || 0}</h5>
                        <canvas className="Alien" width="30" height="30"></canvas>
                        <h5>{location.Alien || 0}</h5>
                    </div>
                </div>
            </div>
            {!collapsed && <div className={styles.wrap}>
                {location.residents.map(
                    resident => <Resident resident={resident} />
                )}
            </div>}
        </div>
    )
}