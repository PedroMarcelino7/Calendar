import styles from './EditActivity.module.css'

import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

import SubmitButton from '../../Buttons/SubmitButton'
import Priority from '../../Priority'
import Status from '../../Status'
import { useEffect } from 'react'

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
    activity: Activity | undefined
}

export default function EditActivity({ handleCloseModal, activity }: Props) {
    const handleSubmit = async (data: Data) => {        
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

            console.log('Success:', result);
        } catch (err: any) {
            console.log('Error:', err)
        }
    }

    useEffect(() => {
        console.log(activity)
    }, [])

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
                        <input className={styles.input} type="date" name='date' value={activity?.ACTIVITY_DATE} />
                        <input className={styles.input} type="date" name='dateEnd' value={activity?.ACTIVITY_DATE_END} />
                    </div>

                    <input className={styles.input} type="text" placeholder='Title' name='title' value={activity?.ACTIVITY_TITLE} />
                    <textarea className={styles.input} placeholder='Descrição' rows={5} name='description' />

                    <div className={styles.date_container}>
                        <Priority name={'priority'} />
                        <Status name={'status'} />
                    </div>

                    <SubmitButton text='Edit activity' />
                </form>
            </div>
        </div >
    )
}