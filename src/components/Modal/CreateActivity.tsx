import { LinearProgress } from '@mui/material'
import SubmitButton from '../Buttons/SubmitButton'
import Priority from '../Priority'
import Status from '../Status'
import styles from './CreateActivity.module.css'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { useState } from 'react'

interface Data {
    title: string,
    date: string,
    dateEnd: string | null,
    description: string,
    priority: string,
    status: string
}

interface Props {
    handleCloseModal: () => void,
    selectedDate: string,
    setSelectedDate: any,
    getActivies: (filter: string) => Promise<void>
}

export default function CreateActivity({ handleCloseModal, selectedDate, setSelectedDate, getActivies }: Props) {
    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = async (data: Data) => {
        setLoading(true)

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
                    priority: parseInt(data.priority),
                    status: parseInt(data.status)
                }),
            })

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const result = await response.json();
            setLoading(false)
            handleCloseModal()
            getActivies('priority')

            console.log('Success:', result);
        } catch (err: any) {
            console.log('Error:', err)
        }
    }

    return (
        <div className={styles.modal_container}>
            <div className={styles.modal_box}>
                <div className={styles.header}>
                    <h1 className={styles.title}>
                        Create activity
                    </h1>

                    <div
                        onClick={handleCloseModal}
                    >
                        <CloseRoundedIcon sx={{ fontSize: '2.5rem' }} />
                    </div>
                </div>



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
                        <input className={styles.input} type="date" name='date' value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                        <input className={styles.input} type="date" name='dateEnd' />
                    </div>

                    <input className={styles.input} type="text" placeholder='Title' name='title' />
                    <textarea className={styles.input} placeholder='Descrição' rows={5} name='description' />

                    <div className={styles.date_container}>
                        <Priority name={'priority'} />
                        <Status name={'status'} />
                    </div>

                    <SubmitButton text='Create activity' />
                </form>

                {loading &&
                    <div className={styles.loading_bar}>
                        <LinearProgress sx={{ height: '10px' }} />
                    </div>
                }
            </div>
        </div>
    )
}