import Priority from '../Priority'
import Status from '../Status'
import styles from './CreateActivity.module.css'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

interface Data {
    title: string,
    date: string,
    dateEnd: string | null,
    description: string,
    priority: number,
    status: number
}

export default function CreateActivity() {
    const handleSubmit = async (data: Data) => {
        try {
            const response = await fetch('http://localhost:3001/activity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: data.title,
                    date: data.date,
                    dateEnd: data.dateEnd,
                    description: data.description,
                    priority: data.priority,
                    status: data.status
                }),
            })

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const result = await response.json();

            console.log('Success:', result);
        } catch (err: any) {
            console.log('Error:', err)
        }
    }

    return (
        <div className={styles.modal_container}>
            <div className={styles.modal_box}>
                <div className={styles.close_container}>
                    <CloseRoundedIcon sx={{ fontSize: '2.5rem' }} />
                </div>

                <h1>CreateActivity</h1>

                <form
                    onSubmit={(event) => {
                        event.preventDefault()

                        const formElements = event.currentTarget.elements as any

                        const data: Data = {
                            title: formElements.title.value,
                            date: formElements.date.value,
                            dateEnd: formElements.dateEnd.value,
                            description: formElements.description.value,
                            priority: formElements.priority.value,
                            status: formElements.status.value
                        };

                        handleSubmit(data)
                    }}
                    className={styles.form_container}
                >
                    <div className={styles.date_container}>
                        <input type="date" name='date' />
                        <input type="date" name='dateEnd' />
                    </div>

                    <input type="text" placeholder='Title' name='title' />
                    <textarea placeholder='Descrição' rows={5} name='description' />

                    <div className={styles.date_container}>
                        <Priority name={'priority'} />
                        <Status name={'status'} />
                    </div>

                    <button type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}