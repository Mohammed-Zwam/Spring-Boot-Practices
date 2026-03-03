import type { ChangeEvent } from "react";
import {
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    InputAdornment,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import type { SelectChangeEvent } from "@mui/material";
import type { Category } from "../../types/category";

type ProductsFiltersProps = {
    categories: Category[];
    setSearchTerm: (term: string) => void;
    setCategory: (category: Category) => void;
    setSortDirection: (direction: "asc" | "desc") => void;
    searchTerm: string;
    category: Category;
    sortDirection: "asc" | "desc";
    setPage: (page: number) => void;
};

export default function ProductsFilters({
    categories,
    setSearchTerm,
    setCategory,
    setSortDirection,
    searchTerm,
    category,
    sortDirection,
    setPage
}: ProductsFiltersProps) {


    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        setPage(1);
    };

    const handleCategoryChange = (e: SelectChangeEvent) => {
        const value = e.target.value;
        console.log(value)
        const categoryObj = categories.find(cat => cat.name === value);
        if (categoryObj) setCategory(categoryObj);
        else setCategory({} as Category);
        setPage(1);
    };

    const handleSortChange = (e: SelectChangeEvent) => {
        const value = e.target.value as "asc" | "desc";
        setSortDirection(value);
        setPage(1);
    };

    return (
        <Box
            sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
            }}
            className="products-filters"
        >


            <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                    labelId="category-label"
                    value={category.name}
                    label="Category"
                    onChange={handleCategoryChange}
                >
                    <MenuItem value="">All</MenuItem>
                    {categories.map((cat) => (
                        <MenuItem key={cat.id} value={cat.name}>
                            {cat.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                placeholder="Search products"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{ minWidth: 200 }}
                style={{ width: "calc(100% - 420px)" }}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    },
                }}
            />

            <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
                <InputLabel id="sort-label">Sort by price</InputLabel>
                <Select
                    labelId="sort-label"
                    value={sortDirection}
                    label="Sort by price"
                    onChange={handleSortChange}
                >
                    <MenuItem value="asc">Low to High</MenuItem>
                    <MenuItem value="desc">High to Low</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
