import React, { useCallback } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { useSelector } from 'react-redux';
import { sortList } from '../components/Sort';

// import { SearchContext } from '../App';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { RootState, useAppDispatch } from '../redux/store';
import { SearchPizzaParams, Pizza } from "../redux/pizza/types"
import { FilterSliceState } from '../redux/filter/types';



const Home: React.FC = () => {
  const navigate = useNavigate();

  // const dispatch = useDispatch();применяем новый хук  useAppDispatch()
  const dispatch = useAppDispatch();

  //проверка что данные сохранились в redux
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  //destructurization
  const { categoryId, sort, currentPage, searchValue } = useSelector((state: RootState) => state.filter);

  const sortType = sort.sortProperty;

  const { items, status } = useSelector((state: RootState) => state.pizza);

  const pzs = items.map((pizza: Pizza) => (
    <PizzaBlock key={pizza.id} {...pizza} />
  ));
  const sceletons = [...Array(6)].map((_, index) => <Skeleton key={index} />);

  const getPizzas = async () => {
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    // console.log("Category", categoryId);
    const search = searchValue ? `&search=${searchValue}` : '';
    // console.log('Search', search)
    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage,
      }),
    );
  };
  //если был первый рендер, то проверяем параметры URL и сохраняем в Redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      // console.log("params", params)
      const sort = sortList.find((obj) => obj.sortProperty === params.sort);
      const prms = params as unknown as FilterSliceState;
      dispatch(
        setFilters({
          searchValue: prms.searchValue,
          categoryId: Number(prms.categoryId),
          currentPage: prms.currentPage,
          sort: sort || sortList[0],
        }),
      );
      // if (sort?.sortProperty) {
      //   dispatch(setFilters({ ...params, sort }))
      // }

      //проверка что данные сохранились в redux
      isSearch.current = true;
      // console.log("isSearch", isSearch.current)
      // console.log("isSearch Mounted", isMounted.current)
    }
  }, []);
  // console.log(isSearch.current);
  //если был первый рендер, то получаем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
      // console.log("getPizzas", isSearch.current)
      // console.log("getPizzas Mounted", isMounted.current)
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  // useEffect for query-string
  //если был первый рендер и изменили параметры
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort: sort.sortProperty,
        categoryId,
        currentPage,
        searchValue,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage, searchValue]);

  // useCallback -устраняет перерисовку
  const onChangeCategory = useCallback((id: number) => {
    // console.log(id);
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={onChangeCategory}
        />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Pizza error 500</h2>
          <p>ничего не получили</p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? sceletons : pzs.length ? pzs : <h3>"Ничего нет"</h3>}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;
   // ...params,
          // sort,