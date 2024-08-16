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
    ACTIVITY_STATUS: number,
    ACTIVITY_TITLE: string,
}

export default function Activity({ activity }: Props) {
    const getBorderColor = (status: number) => {
        if (status === 1) {
            return 'rgba(254, 151, 5, 1)'
        } else if (status === 2) {
            return 'rgba(5, 105, 255, 1)'
        } else {
            return 'rgba(35, 130, 35, 1)'
        }
    }

    return (
        <div
            className={styles.activity_card}
            style={{
                border: `2px solid ${getBorderColor(activity.ACTIVITY_STATUS)}`,
                borderBottom: `7px solid ${getBorderColor(activity.ACTIVITY_STATUS)}`
            }}
        >
            <div>
                <h1>{activity.ACTIVITY_TITLE}</h1>
                <h3>
                    {(() => {
                        const [year, month, day] = activity.ACTIVITY_DATE.split('-');
                        return `${day}/${month}/${year}`;
                    })()}
                </h3>
            </div>

            <div className={styles.options_box}>
                <MoreVertIcon sx={{
                    fontSize: '2.5rem',
                }} />
            </div>
        </div>
    )
}