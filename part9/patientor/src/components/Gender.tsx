import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

type GenderProps = {
    gender: string | undefined;
};

const Gender = ({ gender }: GenderProps) => {
    if (!gender) return <></>;

    if (gender == "female") {
        return (
            <div className="gender-icon"> 
                <FemaleIcon /> 
            </div>
        );
    }

    return (
            <div className="gender-icon">
                <MaleIcon /> 
            </div>
    );
};

export default Gender;
