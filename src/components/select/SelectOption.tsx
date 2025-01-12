import { useCallback } from 'react';
import { RawOptionType } from '../interface';
import styles from './SelectOption.module.css';

type Props = {
  label: string;
  value: RawOptionType;
  onSelect: (value: any) => void;
  isSelected: boolean;
};

export function SelectOption(props: Props) {
  const { label, value, onSelect, isSelected } = props;

  const handleCheckboxChange = useCallback(() => {
    onSelect({ label, value });
  }, [label, value, onSelect]);

  const checkboxElement = (
    <input
      type="checkbox"
      id={value.toString()}
      checked={isSelected}
      onChange={handleCheckboxChange}
    />
  );

  return (
    <li className={styles.option}>
      {checkboxElement}
      <label htmlFor={value.toString()}>{label}</label>
    </li>
  );
}
