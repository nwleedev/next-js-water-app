import { useState } from 'react';

const useInput = () => {
  const validator = (e: string) => {
    const isNumber = !isNaN(parseInt(e, 10));
    return isNumber ? true : false;
  };
  const [value, setValue] = useState('');
  const onChange = (e: any) => {
    e.preventDefault();
    const temp = e.target.value as string;
    if (temp.length === 0) {
      setValue('');
      return;
    }
    if (validator(temp[temp.length - 1])) {
      setValue(temp);
    }
    return;
  };
  return {
    value,
    onChange,
  };
};

export default useInput;
