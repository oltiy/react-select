import { Option } from './interface';

export function defaultFilterOpts(
  options: Option[],
  inputValue: string
): Option[] {
  const lowerCaseInputValue = inputValue.toLowerCase();
  const updatedOptions = options.filter((option) =>
    option.label.toLowerCase().includes(lowerCaseInputValue)
  );
  return updatedOptions;
}

export function getOnChangeFunction(
  onChange: (values: Option[]) => void,
  isSelected: (option: Option) => boolean | undefined,
  isMultiselect: boolean,
  selectedOptions: Option[]
): (option: Option | undefined, isMultiselect: boolean) => void {
  if (isMultiselect) {
    return (option?: Option) => {
      if (!option) {
        if (selectedOptions.length === 0) {
          onChange([...selectedOptions]);
        } else {
          onChange([]);
        }
        return;
      }

      const currentValues = new Set();

      if (isSelected(option)) {
        const updatedOptions = selectedOptions.filter(
          (prevOption) => prevOption.value !== option.value
        );

        onChange(Array.from(updatedOptions) as Option[]);
      } else {
        currentValues.add(option);
        onChange([...selectedOptions, option]);
      }
    };
  }

  return (option?: Option) => {
    if (isSelected(option!)) {
      onChange([]);
      return;
    }
    onChange([option!]);
  };
}
