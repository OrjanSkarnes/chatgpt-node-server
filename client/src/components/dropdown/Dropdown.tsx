import React from 'react';
import './Dropdown.scss';
// import options json
import optionsJson from './options.json';

interface Option {
    value: string;
    label: string;
}

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
    //   options: Option[];
    Change: (option: Option | undefined) => void;
}

const Dropdown: React.FC<Props> = ({ Change, ...props }) => {
    const options = optionsJson.options;

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // get the value and label of the selected option
        const selectedOption = options.find(
            (option) => option.value === e.target.value
        );
        Change(selectedOption);
    };
    return (
        <select className="dropdown" {...props} onChange={handleChange}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Dropdown;
