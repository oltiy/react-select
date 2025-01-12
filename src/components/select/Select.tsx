import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { Option } from '../interface';
import { SelectOption } from './SelectOption';
import styles from './Select.module.css';
import { defaultFilterOpts, getOnChangeFunction } from '../function ';

const options: Option[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 1, label: 'One' },
  { value: 2, label: 'Two' },
];

export const useDropdownState = () => {
  const [open, setOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return { open, toggleOpen };
};

type Props = {
  multiSelect: boolean;
  onChangeSelect: (value: Option[] | Option | null) => void;
  value: Option[] | Option | null;
  placeholderSearch: string;
};

export function Select(props: Props) {
  const { multiSelect, onChangeSelect, value, placeholderSearch } = props;
  const { open, toggleOpen } = useDropdownState();
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCheckedAll, setIsCheckedAll] = useState(false);

  const isSelected = useCallback(
    (option: Option) =>
      selectedOptions.some((opt) => opt.value === option.value),
    [selectedOptions]
  );
  const statusSelect = selectedOptions.length === options.length;
  const handleChange = getOnChangeFunction(
    (newOptions) => {
      setSelectedOptions(newOptions);
    },
    isSelected,
    multiSelect,
    selectedOptions
  );

  const updateSearchTerm = useCallback((searchValue: string) => {
    const filtered = defaultFilterOpts(options, searchValue);
    setSearchTerm(searchValue);
    setFilteredOptions(filtered);
  }, []);

  const toggleAllChecked = useCallback(() => {
    if (!isCheckedAll) {
      setSelectedOptions(options);
    } else {
      setSelectedOptions([]);
    }
    setIsCheckedAll(!isCheckedAll);
  }, [isCheckedAll, options]);

  useEffect(() => {
    if (value === null) {
      setSelectedOptions([]);
      setIsCheckedAll(false);
    }
  }, [value]);

  useEffect(() => {
    statusSelect ? setIsCheckedAll(true) : setIsCheckedAll(false);
    if (onChangeSelect) {
      if (multiSelect) {
        onChangeSelect(selectedOptions);
      } else {
        onChangeSelect(selectedOptions[0] || null);
      }
    }
  }, [selectedOptions]);

  return (
    <div className={styles.tooltip}>
      <div className={styles.selectLabel} onClick={toggleOpen}>
        <label>{selectedOptions.map((op) => op.label).join(', ')}</label>
        <span
          className={`${styles.arrow} ${open ? styles.arrowUp : ''}`}
        ></span>
      </div>

      {open && (
        <span className={styles.tooltipText}>
          <input
            type="text"
            placeholder={placeholderSearch}
            value={searchTerm}
            onChange={(e) => updateSearchTerm(e.target.value)}
          />

          <ul>
            {multiSelect && (
              <li role="checkbox" className={styles.option}>
                <input
                  id="allCheckbox"
                  type="checkbox"
                  checked={statusSelect}
                  onChange={toggleAllChecked}
                />

                <label htmlFor="allCheckbox">
                  {statusSelect ? 'Deselect All' : 'Select All'}
                </label>
              </li>
            )}
            {filteredOptions.map((opt) => (
              <div key={opt.value}>
                <SelectOption
                  label={opt.label}
                  value={opt.value!}
                  onSelect={(opt) => handleChange(opt, multiSelect)}
                  isSelected={
                    multiSelect
                      ? statusSelect
                        ? isCheckedAll
                        : isSelected(opt)
                      : isSelected(opt)
                  }
                />
              </div>
            ))}
          </ul>
        </span>
      )}
    </div>
  );
}
