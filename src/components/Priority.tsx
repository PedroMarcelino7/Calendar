import * as React from 'react';
import { styled } from '@mui/material/styles';
import Rating, { IconContainerProps } from '@mui/material/Rating';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';

const StyledRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
        color: theme.palette.action.disabled,
    },
}));

const customIcons: {
    [index: string]: {
        icon: React.ReactElement;
        label: string;
    };
} = {
    1: {
        icon: <FlagRoundedIcon color="success" />,
        label: 'Priority: 1',
    },
    2: {
        icon: <FlagRoundedIcon color="info" />,
        label: 'Priority: 2',
    },
    3: {
        icon: <FlagRoundedIcon color="inherit" />,
        label: 'Priority: 3',
    },
    4: {
        icon: <FlagRoundedIcon color="warning" />,
        label: 'Priority: 4',
    },
    5: {
        icon: <FlagRoundedIcon color="error" />,
        label: 'Priority: 5',
    },
};

function IconContainer(props: IconContainerProps) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
}

interface Props {
    name: string,
    value?: number
}

export default function Priority({ name, value }: Props) {
    return (
        <StyledRating
            name={name}
            defaultValue={value ? value : 1}
            IconContainerComponent={IconContainer}
            getLabelText={(value: number) => customIcons[value].label}
            highlightSelectedOnly
        />
    );
}
