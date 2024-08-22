import styles from './EditActivity.module.css'

import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

import SubmitButton from '../../Buttons/SubmitButton/SubmitButton'
import Priority from '../../Priority'
import Status from '../../Status'
import { useState } from 'react'
import { LinearProgress } from '@mui/material'

interface Data {
    title: string,
    date: string,
    dateEnd: string | null,
    description: string,
    priority: string,
    status: string
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

interface Props {
    handleCloseModal: () => void,
    activity: Activity | undefined,
    getActivities: (filter: string) => Promise<void>
}

export default function EditActivity({ handleCloseModal, activity, getActivities }: Props) {
    const [title, setTitle] = useState<string>(activity?.ACTIVITY_TITLE || '')
    const [date, setDate] = useState<string>(activity?.ACTIVITY_DATE || '')
    const [dateEnd, setDateEnd] = useState<string>(activity?.ACTIVITY_DATE_END || '')
    const [description, setDescription] = useState<string>(activity?.ACTIVITY_DESCRIPTION || '')
    const [priority, setPriority] = useState<number>(activity?.ACTIVITY_PRIORITY || 0)
    // const [status, setStatus] = useState<number>(activity?.ACTIVITY_STATUS || 0)
    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = async (data: Data) => {
        setLoading(true)

        try {
            const response = await fetch('http://localhost:3001/activity/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: activity?.ACTIVITY_ID,
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
            getActivities('date')

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
                        Edit activity
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
                        <input
                            className={styles.input}
                            type="date"
                            name='date'
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <input
                            className={styles.input}
                            type="date"
                            name='dateEnd'
                            value={dateEnd}
                            onChange={(e) => setDateEnd(e.target.value)}
                        />
                    </div>

                    <input
                        className={styles.input}
                        type="text"
                        placeholder='Title'
                        name='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        className={styles.input}
                        placeholder='Descrição'
                        rows={5}
                        name='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <div className={styles.date_container}>
                        <Priority name={'priority'} value={priority} onChange={setPriority} />
                        <Status name={'status'} />
                    </div>

                    <SubmitButton text='Edit activity' />
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