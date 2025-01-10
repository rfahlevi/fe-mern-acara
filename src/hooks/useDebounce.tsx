import { useRef } from "react";

const useDebounce = () => {
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const debounce = (func: Function, delay: number) => {
    // Jika user sedang mengetik, maka clearTimeout nya
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    // Jika user sudah tidak mengetik selama waktu delay, maka jalankan function nya
    debounceTimeout.current = setTimeout(() => {
      func();
      debounceTimeout.current = null;
    }, delay);
  };

  return debounce;
};

export default useDebounce;
