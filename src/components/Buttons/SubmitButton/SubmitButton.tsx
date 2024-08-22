import styles from './SubmitButton.module.css'

interface Props {
    text: string
}

export default function SubmitButton({ text }: Props) {
    return (
        <button type="submit" className={styles.button}>
            {text}
        </button>
    )
}