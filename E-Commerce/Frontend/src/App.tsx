import { useEffect, useState } from 'react';
import './App.css'
import ProductsContainer from './components/ProductsContainer/ProductsContainer'
import ProductsFilters from './components/ProductsFilters/ProductsFilters'
import type { Product } from './types/product';
import { getProductsPage, getProductsPageByCategoryId, getProductsPageBySearchTerm } from './api/product-endpoints';
import type { Category } from './types/category';
import { getAllCategories } from './api/category-endpoints';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<Category>({} as Category);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesResponse = await getAllCategories();
      setCategories(categoriesResponse);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let productsResponse;
      if (searchTerm.length != 0) 
        productsResponse = await getProductsPageBySearchTerm(searchTerm, page - 1, 9, sortDirection);
      else if (category.name && category?.name.length != 0)
        productsResponse = await getProductsPageByCategoryId(category.id, page - 1, 9, sortDirection);
      else
        productsResponse = await getProductsPage(page - 1, 9, sortDirection);

      setProducts(productsResponse.content);
      setTotalPages(productsResponse.totalPages);
      setLoading(false);
    };
    fetchData();
  }, [category, page, sortDirection, searchTerm]);






  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setLoading(true);
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <ProductsFilters
        categories={categories}
        setSearchTerm={setSearchTerm}
        setCategory={setCategory}
        setSortDirection={setSortDirection}
        searchTerm={searchTerm}
        category={category}
        sortDirection={sortDirection}
        setPage={setPage}
      />
      <hr />
      <br />
      <ProductsContainer
        products={products}
        page={page}
        totalPages={totalPages}
        loading={loading}
        handleChange={handleChange}
      />
    </>
  )
}

export default App
