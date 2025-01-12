import styles from './Form.module.css';
import { Select } from '../select/Select';
import { FormSelect, Option } from '../interface';
import { useState } from 'react';

export const initialFormState: FormSelect = {
  name: '',
  email: '',
  singleSelect: null,
  multiSelect: null,
};

export function Form() {
  const [formData, setFormData] = useState<FormSelect>(initialFormState);

  return (
    <div className={styles.formContainer}>
      <form
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
          console.log(formData);
          setFormData(initialFormState);
        }}
      >
        <div className={styles.formGroup}>
          <label>Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            required
          />
        </div>
        <label>Single Select</label>
        <Select
          placeholderSearch="Search..."
          multiSelect={false}
          value={formData.singleSelect}
          onChangeSelect={(value) =>
            setFormData((prev) => ({ ...prev, singleSelect: value as Option }))
          }
        />
        <label>Multi Select</label>
        <Select
          placeholderSearch="Search..."
          multiSelect={true}
          value={formData.multiSelect}
          onChangeSelect={(value) =>
            setFormData((prev) => ({ ...prev, multiSelect: value as Option[] }))
          }
        />

        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
}
