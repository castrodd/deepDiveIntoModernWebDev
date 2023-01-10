import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Female';

type GenderProps = {
    gender: string;
};

const Gender = ({ gender }: GenderProps) => {
        return (
            <div className="gender-icon">
                {
                    gender == "female" 
                        ? <FemaleIcon /> 
                        : <MaleIcon /> 
                }
            </div>
    );
};

export default Gender;
