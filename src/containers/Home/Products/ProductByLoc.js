import React, { Component } from "react";
import axios from "axios";
import SingleProduct from "./SingleProduct/SingleProduct";
import api from "../../../routes/api";

class ProductByLoc extends Component {
    state = { products: [] };

    getProductsByLocation = async () => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            console.log(latitude, longitude)
            fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=e644884795da4d949ddb38a5a89e2c97`)
                .then(response => response.json())
                .then(data => {
                    console.log(data.results[0].components.state_district)

                    const url = api.developmentServer + "/api/products-by-loc/" + data.results[0].components.state_district;
                    axios
                        .get(url, {
                            headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
                        })
                        .then((res) => {
                            console.log(res.data);
                            if (res.data.responseType) {
                                console.log(res.data.results)
                                this.setState({ products: res.data.results })
                            }
                        })
                        .catch((err) => console.log(err));
                });
        })
    };
    componentWillMount() {
        this.getProductsByLocation();
    }
    render() {
        return (
            <div className="d-flex flex-row row overflow-auto">
                {this.state.products.length > 0 ? (
                    <h2 id="electronics" className="mt-5 mb-2 text-start">Products Near You</h2>
                ):null}
                {this.state.products.map((product) => (
                    <div className="col-3">
                        <SingleProduct
                            key={product.id}
                            cid={product.id}
                            src={product.image}
                            ctext={product.name}
                            cbrand={product.brand}
                            cprice={product.price}
                        />
                    </div>
                ))}
            </div>
        );
    }
}

export default ProductByLoc;
