import styles from './Toast.module.css'
import CloseIcon from '@mui/icons-material/Close';

interface Props {
    handleCloseToast: () => void
}

export default function Toast({ handleCloseToast }: Props) {
    return (
        <div className={styles.toast_container}>
            <div className={styles.close} onClick={handleCloseToast}>
                <CloseIcon />
            </div>
            <div className={styles.title}>
                Atividade arquivada com sucesso!
            </div>
        </div>
    )
}