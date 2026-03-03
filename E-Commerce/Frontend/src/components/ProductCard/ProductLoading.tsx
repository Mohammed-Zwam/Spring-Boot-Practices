import { Skeleton } from "@mui/material";

export default function ProductLoading() {
    return (
        <div className="product-card">
            <Skeleton variant="rectangular" width="100%" height={200} style={{ margin: "-10px 0 0" }} />
            <div style={{ padding: 10 }}>
                <Skeleton width="60%" style={{ margin: "auto" }}   height={40}/>
                <br />
                <Skeleton  height={20}/>
                <Skeleton  height={20}/>
                <br />
                <Skeleton width="90%" style={{ margin: "auto" }}  height={30}/>
            </div>
        </div>
    )
}
