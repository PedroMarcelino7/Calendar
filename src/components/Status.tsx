import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
    name: string
}

export default function Status({ name }: Props) {
    const [status, setStatus] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value);
    };

    return (
        <FormControl sx={{ minWidth: 120, width: '100%' }} size="small">
            <InputLabel>Status</InputLabel>
            <Select
                value={status}
                label="Status"
                onChange={handleChange}
                name={name}
            >
                <MenuItem value="" disabled></MenuItem>
                <MenuItem value={1}>Pending</MenuItem>
                <MenuItem value={2}>In Progress</MenuItem>
                <MenuItem value={3}>Finished</MenuItem>
            </Select>
        </FormControl>
    );
}
