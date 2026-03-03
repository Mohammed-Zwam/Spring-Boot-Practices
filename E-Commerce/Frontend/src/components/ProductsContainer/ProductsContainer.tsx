import ProductCard from "../ProductCard/ProductCard";
import type { Product } from "../../types/product";
import "./ProductsContainer.css";
import { Pagination, Stack } from "@mui/material";
import ProductLoading from "../ProductCard/ProductLoading";

export default function ProductsContainer({
    products,
    page,
    totalPages,
    loading,
    handleChange
}: { products: Product[], page: number, totalPages: number, loading: boolean, handleChange: (_: React.ChangeEvent<unknown>, value: number) => void }) {


    return (
        <div className="products">
            <div className="products-container">
                {
                    loading ?
                        Array.from({ length: 6 }).map((_, index) => (
                            <ProductLoading key={index} />
                        ))
                        :
                        products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))
                }
            </div>

            <Stack>
                <Pagination
                    count={totalPages}
                    page={page}
                    variant="outlined"
                    color="primary"
                    onChange={handleChange}
                    size="large"
                />
            </Stack>
        </div>

    )
}
