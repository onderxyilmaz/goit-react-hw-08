import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/filters/slice';
import { selectFilter } from '../redux/contacts/selectors';

export const Filter = () => {
    const dispatch = useDispatch();
    const filter = useSelector(selectFilter);

    return (
        <label>
            Kişilerde Ara
            <input
                type="text"
                value={filter}
                onChange={e => dispatch(setFilter(e.target.value))}
            />
        </label>
    );
}; 