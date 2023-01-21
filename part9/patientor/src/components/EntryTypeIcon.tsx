import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface EntryTypeIconProps {
    type: string;
}

export const EntryTypeIcon = ({type}: EntryTypeIconProps) => {
    switch(type) {
        case "Hospital":
            return <LocalHospitalIcon />;
        case "OccupationalHealthCare":
            return <WorkIcon />;
        case "HealthCheck":
            return <FavoriteIcon />;
        default:
            return <></>;
    }
};