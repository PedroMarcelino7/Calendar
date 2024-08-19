import styles from './Loading.module.css'

import { CircularProgress } from '@mui/material'

const Loading = () => {
  return (
    <div className={styles.loading_container}>
      <CircularProgress />
    </div>
  )
}

export default Loading