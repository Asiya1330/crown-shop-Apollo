import { gql, useQuery } from '@apollo/client';
import { createContext, useState, useEffect } from 'react';

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

export const CategoriesContext = createContext({
  categoriesMap: {},
});

const COLLECTIONS = gql`
query hehe{
  collections {
    id
    title
    items   {
      id
      name
      price
      imageUrl
    }
  }
}
`

export const CategoriesProvider = ({ children }) => {
  const { loading, error, data } = useQuery(COLLECTIONS)
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    if (data) {
      const categoryArray = data['collections'];
      const categoriesMapData = categoryArray.reduce((acc, category) => {
        const { title, items } = category;
        acc[title.toLowerCase()] = items;
        return acc;
      }, {})
      setCategoriesMap(categoriesMapData)
    }
  }, [data]);

  const value = { categoriesMap, loading, error };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
