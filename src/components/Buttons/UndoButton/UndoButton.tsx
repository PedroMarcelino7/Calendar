import styles from './UndoButton.module.css'

interface Props {
    text: string
}

export default function UndoButton({ text }: Props) {
    return (
        <button className={styles.button}>
            {text}
        </button>
    )
}