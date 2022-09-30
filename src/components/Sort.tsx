import React from 'react';
import { useDispatch } from 'react-redux';
import { setSort } from '../redux/filter/slice';
import { Sort, SortPropertyEnum } from "../redux/filter/types"

// export type SortItem = {
//   name: string;
//   sortProperty: SortPropertyEnum;
// }
type PopupClick = MouseEvent & { path: Node[]; }

export const sortList: Sort[] = [
  { name: 'популярностиDESC', sortProperty: SortPropertyEnum.RATING_DESC },
  { name: 'популярностиASC', sortProperty: SortPropertyEnum.RATING_ASC },
  { name: 'ценеDESC', sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: 'ценеASC', sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: 'алфавитуDESC', sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: 'алфавитуASC', sortProperty: SortPropertyEnum.TITLE_ASC },
];

type SortPopupProps = {
  value: Sort;
}

const SortPopup: React.FC<SortPopupProps> = React.memo(({ value }) => {
  const dispatch = useDispatch();

  // const sort = useSelector((store) => store.filter.sort);
  //тоже самое
  // const sort = useSelector(selectSort);

  const sortRef = React.useRef<HTMLDivElement>(null);

  const [open, setOpen] = React.useState(false);

  const onClickListItem = (obj: Sort) => {
    // console.log(obj);
    dispatch(setSort(obj));
    setOpen(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      //настройка типов
      const _event = event as PopupClick;

      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setOpen(false);
        // console.log('click');
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => document.body.removeEventListener('click', handleClickOutside);
  });
  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{value.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj) => (
              <li
                onClick={() => onClickListItem(obj)}
                key={obj.name}
                className={value.sortProperty === obj.sortProperty ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
export default SortPopup;
