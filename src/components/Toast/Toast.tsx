import styles from './Toast.module.css'
import CloseIcon from '@mui/icons-material/Close';

export default function Toast() {
    return (
        <div className={styles.toast_container}>
            <div className={styles.close}>
                <CloseIcon />
            </div>
            <div className={styles.title}>
                Atividade arquivada com sucesso!
            </div>
        </div>
    )
}