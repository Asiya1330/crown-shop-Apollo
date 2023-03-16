import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';

import { CategoryContainer, Title } from './category.styles';
import Spinner from '../../components/spinner/spinner.component'
import { gql, useMutation, useQuery } from '@apollo/client';

const GET_CATEGORY = gql`
query($title: String){
  getCollectionsByTitle(title: $title){
    id
    title
    items{
      id
      name
      price
      imageUrl
    }
  }
}
`
const SET_CATEGORY = gql`
mutation($category:Category!){
  addCategory(category: $category){
    id
    title
    items{
      id
      name
      price
      imageUrl
    }
  }
}
`

const Category = () => {
  /************THIS IS HOW MUTATION WORKS!**************** */
  // const categoryObj = {
  //   id: 1232,
  //   title: 'Kids',
  //   items: {
  //     id: 2132,
  //     name: 'romper12',
  //     price: '23',
  //     imageUrl: "https://imageURl.com"
  //   }
  // }
  // const [addCategory, { loading, error, data }] = useMutation(SET_CATEGORY);
  // addCategory({ variables: { category: categoryObj } })
  // console.log(data);
  
  const { category } = useParams();
  const { data, loading, error } = useQuery(GET_CATEGORY, {
    variables: {
      title: category
    }
  })
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (data) {
      const { getCollectionsByTitle: { items } } = data
      setProducts(items);
    }
  }, [category, data]);

  return (
    <Fragment>
      {
        loading ?
          <Spinner /> :
          <>
            <Title>{category.toUpperCase()}</Title>
            <CategoryContainer>
              {products &&
                products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </CategoryContainer>
          </>
      }
    </Fragment>
  );
};

export default Category;
