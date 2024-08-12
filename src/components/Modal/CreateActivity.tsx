import styles from './CreateActivity.module.css'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

export default function CreateActivity() {
    return (
        <div className={styles.modal_container}>
            <div className={styles.modal_box}>
                <div className={styles.close_container}>
                    <CloseRoundedIcon sx={{ fontSize: '2.5rem' }} />
                </div>

                <h1>CreateActivity</h1>

                <form action="" className={styles.form_container}>
                    <div className={styles.date_container}>
                        <input type="date" />
                        <input type="date" />
                    </div>

                    <input type="text" placeholder='Title' />
                    <textarea placeholder='Descrição' rows={5} />
                </form>
            </div>
        </div>
    )
}