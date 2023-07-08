import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ProductList from "./ProductList";
import { useEffect } from "react";
import { fetchFilters, fetchProductsAsync, productSelectors, setProductParams } from "./catalogSlice";
import { Box, Grid, Pagination, Paper, Typography } from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import CheckboxButtons from "../../app/components/CheckboxButtons";
import AppPagination from "../../app/components/AppPagination";

const sortOptions = [
  {value: 'name', label: 'Alphabetical'},
  {value: 'priceDesc', label: 'Price - High to low'},
  {value: 'price', label: 'Price - Low to high'}
]

export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const {productsLoaded, status, filtersLoaded, brands, types, productParams, metaData} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
      if(!productsLoaded)
        dispatch(fetchProductsAsync());
      }, [productsLoaded]);
      
    useEffect(() => {
        if(!filtersLoaded)
          dispatch(fetchFilters());
    }, [filtersLoaded]);
    
    if(status.includes('pending') || !metaData)
      return <LoadingComponent message='Loading products...' />

    return (
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <Paper sx={{mb: 2}}>
              <ProductSearch />
            </Paper>

            <Paper sx={{mb: 2, p: 2}}>
              <RadioButtonGroup
                selectedValue={productParams.orderBy}
                options={sortOptions}
                onChange={(event) => dispatch(setProductParams({orderBy: event.target.value}))}
              />
            </Paper>

            <Paper sx={{mb: 2, p: 2}}>
              <CheckboxButtons 
                items={brands}
                checked={productParams.brands}
                onChange={(items: string[]) => dispatch(setProductParams({brands: items}))}
              />
            </Paper>

            <Paper sx={{mb: 2, p: 2}}>
              <CheckboxButtons 
                  items={types}
                  checked={productParams.types}
                  onChange={(items: string[]) => dispatch(setProductParams({types: items}))}
                />
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <ProductList products={products} />
          </Grid>

          <Grid item xs={3} />
          <Grid item xs={9}>
            <AppPagination 
              metaData={metaData}
              onPageChange={(page: number) => dispatch(setProductParams({pageNumber: page}))}  
            />
          </Grid>
        </Grid>
    )
}