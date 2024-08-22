import styles from './Toast.module.css'
import CloseIcon from '@mui/icons-material/Close';
import { LinearProgress } from '@mui/material'
import { useEffect, useState } from 'react';

interface Props {
    handleCloseToast: () => void
}

export default function Toast({ handleCloseToast }: Props) {
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

    useEffect(() => {
        updateProgress()
    }, [progress])

    return (
        <div className={styles.toast_container}>
            <div className={styles.close} onClick={handleCloseToast}>
                <CloseIcon />
            </div>
            <div className={styles.title}>
                Atividade arquivada com sucesso!
            </div>

            <div className={styles.progress}>
                <LinearProgress variant='determinate' value={progress} />
            </div>
        </div>
    )
}