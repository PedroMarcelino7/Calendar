import styles from './Activity.module.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function Activity() {
    return (
        <div className={styles.activity_card}>
            <div>
                <h1>Title</h1>
                <h3>xx/xx/xxxx</h3>
            </div>

            <div className={styles.options_box}>
                <MoreVertIcon sx={{
                    fontSize: '2.5rem',
                }} />
            </div>
        </div>
    )
}