import styles from './Activity.module.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface Props {
    activity: Activity
}

interface Activity {
    ACTIVITY_CREATE_AT: string,
    ACTIVITY_DATE: string,
    ACTIVITY_DATE_END: string,
    ACTIVITY_DESCRIPTION: string,
    ACTIVITY_ID: number,
    ACTIVITY_PRIORITY: string,
    ACTIVITY_STATUS: string,
    ACTIVITY_TITLE: string,
}

export default function Activity({ activity }: Props) {
    return (
        <div className={styles.activity_card}>
            <div>
                <h1>{activity.ACTIVITY_TITLE}</h1>
                <h3>{activity.ACTIVITY_DATE}</h3>
            </div>

            <div className={styles.options_box}>
                <MoreVertIcon sx={{
                    fontSize: '2.5rem',
                }} />
            </div>
        </div>
    )
}