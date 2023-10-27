import { useSearchParams } from 'react-router-dom';
import Utils from '../utils/utils';

const useQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = Object.fromEntries(searchParams);

  const setQuery = (search) => {
    const newQuery = Utils.deleteEmptyKeys(search);
    setSearchParams(newQuery, { replace: true });
  };

  return {
    query,
    setQuery,
  };
};

export default useQuery;
