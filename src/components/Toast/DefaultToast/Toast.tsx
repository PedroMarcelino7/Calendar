import styles from './Toast.module.css'
import CloseIcon from '@mui/icons-material/Close';
import { LinearProgress } from '@mui/material'
import { useEffect, useState } from 'react';
import UndoButton from '../../Buttons/UndoButton/UndoButton';

interface Props {
    handleCloseToast: () => void,
    action: string,
    unarchiveActivity: () => void
}

export default function Toast({ handleCloseToast, action, unarchiveActivity }: Props) {
    const [progress, setProgress] = useState<number>(0)

    const updateProgress = () => {
        setTimeout(() => {
            if (progress > 100) {
                setProgress(0)
                handleCloseToast()
            } else {
                setProgress(progress + 3)
            }
        }, 200);
    }

    const handleUnarchiveActivity = () => {
        unarchiveActivity()
        handleCloseToast()
    }

    useEffect(() => {
        updateProgress()
    }, [progress])

    return (
        <div className={styles.toast_container}>
            {action !== 'archive' &&
                <div className={styles.close} onClick={handleCloseToast}>
                    <CloseIcon />
                </div>
            }

            <div className={styles.content_box}>
                <div className={styles.title}>
                    Atividade arquivada com sucesso!
                </div>

                {action === 'archive' &&
                    <div
                        className={styles.button_box}
                        onClick={handleUnarchiveActivity}
                    >
                        <UndoButton text='Undo' />
                    </div>
                }
            </div>

            <div className={styles.progress}>
                <LinearProgress variant='determinate' value={progress} />
            </div>
        </div>
    )
}