import { useDispatch } from 'react-redux';
import { setFilter } from '../reducers/filterReducer'

const VisibilityFilter = (props) => {
  const dispatch = useDispatch();

  const handleFilterChange = (event) => {
    const filterValue = event.target.value;
    dispatch(setFilter(filterValue));
  };

  return (
    <div>
      <h3>Filter</h3>
      <form>
        <input
          name="filter"
          onChange={handleFilterChange}
        />
      </form>
    </div>
  );
};

export default VisibilityFilter;

