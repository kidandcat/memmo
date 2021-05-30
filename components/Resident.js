import styles from '../styles/Resident.module.css'
import { withOpacity } from '../data/utils';

export default function Resident({ resident }) {
    return (
        <div
            key={resident.name}
            className={styles.profile}
        >
            <h1>{resident.name}</h1>
            <div
                className={styles.info}
                style={{
                    background: withOpacity(getColorByStatus(resident.status), 0.3)
                }}
            >
                <img src={resident.image} />
                <div className={styles.data}>
                    <h5>{resident.species}</h5>
                    <h5>{resident.gender}</h5>
                </div>
            </div>
        </div>
    )
}


function getColorByStatus(status) {
    switch (status) {
        case 'Dead': return 'rgb(145, 33, 33)';
        case 'Alive': return 'rgb(60, 168, 35)';
        default: return 'rgb(219, 219, 219)';
    }
}