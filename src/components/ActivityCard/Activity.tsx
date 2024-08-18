import styles from './Activity.module.css'

import { useState } from 'react';

import ArchiveIcon from '@mui/icons-material/Archive';
import EditIcon from '@mui/icons-material/Edit';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';

interface Props {
    activity: Activity
}

interface Activity {
    ACTIVITY_CREATE_AT: string,
    ACTIVITY_DATE: string,
    ACTIVITY_DATE_END: string,
    ACTIVITY_DESCRIPTION: string,
    ACTIVITY_ID: number,
    ACTIVITY_PRIORITY: number,
    ACTIVITY_STATUS: number,
    ACTIVITY_TITLE: string,
    ACTIVITY_ACTIVE: boolean
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

    const getPiorityColor = (priority: number) => {
        if (priority === 1) {
            return '#2E7D32'
        } else if (priority === 2) {
            return '#0288D1'
        } else if (priority === 3) {
            return '#FAAF00'
        } else if (priority === 4) {
            return '#ED6C02'
        } else if (priority === 5) {
            return '#D14040'
        }
    }

    const [openCardId, setOpenCardId] = useState<number | null>(null);

    const handleCardClick = (id: number) => {
        setOpenCardId(openCardId === id ? null : id);
    }

    return (
        <div
            onClick={() => handleCardClick(activity.ACTIVITY_ID)}
            className={styles.activity_card_container}
            style={{
                border: `2px solid ${getBorderColor(activity.ACTIVITY_STATUS)}`,
                borderBottom: `10px solid ${getBorderColor(activity.ACTIVITY_STATUS)}`
            }}
        >
            <div
                className={styles.activity_card}
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
            </div>

            <div
                className={styles.activity_content}
                style={{
                    display: openCardId === activity.ACTIVITY_ID ? 'block' : 'none'
                }}
            >
                <div className={styles.description}>
                    <p>{activity.ACTIVITY_DESCRIPTION}</p>
                </div>
            </div>

            <div className={styles.priority}>
                <FlagRoundedIcon sx={{ color: getPiorityColor(activity.ACTIVITY_PRIORITY) }} />
            </div>

            <div className={styles.options_box}>
                <ArchiveIcon />
                <EditIcon onClick={() => console.log('edit')} />
            </div>
        </div>
    )
}