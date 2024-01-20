import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import HomeCarousel from "./HomeCarousel/HomeCarousel";
import Products from "./Products/Products";
import PendingProducts from "./PendingProducts/PendingProducts";
import { withRouter } from "react-router";
import ProductByLoc from "./Products/ProductByLoc";
import styles from "./home.module.css"
class Home extends Component {
  state = {
    user: JSON.parse(localStorage.getItem("user")),
    scroll: false,
    slider: false
  };
  componentDidMount(){
    setTimeout(()=>{
      this.setState({scroll: true});
    }, 12000);
  }
  render() {
    return (
      <div className={styles.homeback}
      style={{height:"overflow-auto" , marginTop:"100px"}}>
      {this.state.user && this.state.user.role === "admin" ? (
          <div>
            <PendingProducts />
          </div>
        ) : (
          <div 
            style={{
           
              height: "overflow-auto",
            }}
          >
            <HomeCarousel />
          </div>
        )}
      <div className="my-5 pt-5 container-lg overflow-auto">
        
        {this.state.scroll  ? <marquee>
          <div className="d-flex flex-row justify-content-around">
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/25ec4cf7-caaa-49d7-a158-9501d02586681653740219966-Handbags-_-Accessories.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/f06d77ae-1345-456f-8020-e8497d7ef8fd1653740219960-Formal-Shoes.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/20e31f01-61e0-4fe7-8e64-28b974cdde391653740219952-Dresses.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/e0625d0c-cb1d-4964-8baa-c54136ae3ac21653740219972-Shirts.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/d222b575-ba04-4314-86c1-01f33ae786e41653740219986-Tops-_-Tees.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/37439625-5641-4719-852e-9d8a11a8bf571653740219992-Traditional-Sarees.jpg"/>
           
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/25ec4cf7-caaa-49d7-a158-9501d02586681653740219966-Handbags-_-Accessories.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/f06d77ae-1345-456f-8020-e8497d7ef8fd1653740219960-Formal-Shoes.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/20e31f01-61e0-4fe7-8e64-28b974cdde391653740219952-Dresses.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/e0625d0c-cb1d-4964-8baa-c54136ae3ac21653740219972-Shirts.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/d222b575-ba04-4314-86c1-01f33ae786e41653740219986-Tops-_-Tees.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/37439625-5641-4719-852e-9d8a11a8bf571653740219992-Traditional-Sarees.jpg"/>
            
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/25ec4cf7-caaa-49d7-a158-9501d02586681653740219966-Handbags-_-Accessories.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/f06d77ae-1345-456f-8020-e8497d7ef8fd1653740219960-Formal-Shoes.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/20e31f01-61e0-4fe7-8e64-28b974cdde391653740219952-Dresses.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/e0625d0c-cb1d-4964-8baa-c54136ae3ac21653740219972-Shirts.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/d222b575-ba04-4314-86c1-01f33ae786e41653740219986-Tops-_-Tees.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/37439625-5641-4719-852e-9d8a11a8bf571653740219992-Traditional-Sarees.jpg"/>
           
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/25ec4cf7-caaa-49d7-a158-9501d02586681653740219966-Handbags-_-Accessories.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/f06d77ae-1345-456f-8020-e8497d7ef8fd1653740219960-Formal-Shoes.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/20e31f01-61e0-4fe7-8e64-28b974cdde391653740219952-Dresses.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/e0625d0c-cb1d-4964-8baa-c54136ae3ac21653740219972-Shirts.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/d222b575-ba04-4314-86c1-01f33ae786e41653740219986-Tops-_-Tees.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/37439625-5641-4719-852e-9d8a11a8bf571653740219992-Traditional-Sarees.jpg"/>
           
           <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/25ec4cf7-caaa-49d7-a158-9501d02586681653740219966-Handbags-_-Accessories.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/f06d77ae-1345-456f-8020-e8497d7ef8fd1653740219960-Formal-Shoes.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/20e31f01-61e0-4fe7-8e64-28b974cdde391653740219952-Dresses.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/e0625d0c-cb1d-4964-8baa-c54136ae3ac21653740219972-Shirts.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/d222b575-ba04-4314-86c1-01f33ae786e41653740219986-Tops-_-Tees.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/37439625-5641-4719-852e-9d8a11a8bf571653740219992-Traditional-Sarees.jpg"/>
            
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/25ec4cf7-caaa-49d7-a158-9501d02586681653740219966-Handbags-_-Accessories.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/f06d77ae-1345-456f-8020-e8497d7ef8fd1653740219960-Formal-Shoes.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/20e31f01-61e0-4fe7-8e64-28b974cdde391653740219952-Dresses.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/e0625d0c-cb1d-4964-8baa-c54136ae3ac21653740219972-Shirts.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/d222b575-ba04-4314-86c1-01f33ae786e41653740219986-Tops-_-Tees.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/37439625-5641-4719-852e-9d8a11a8bf571653740219992-Traditional-Sarees.jpg"/>
            
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/25ec4cf7-caaa-49d7-a158-9501d02586681653740219966-Handbags-_-Accessories.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/f06d77ae-1345-456f-8020-e8497d7ef8fd1653740219960-Formal-Shoes.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/20e31f01-61e0-4fe7-8e64-28b974cdde391653740219952-Dresses.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/e0625d0c-cb1d-4964-8baa-c54136ae3ac21653740219972-Shirts.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/d222b575-ba04-4314-86c1-01f33ae786e41653740219986-Tops-_-Tees.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/37439625-5641-4719-852e-9d8a11a8bf571653740219992-Traditional-Sarees.jpg"/>
            
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/25ec4cf7-caaa-49d7-a158-9501d02586681653740219966-Handbags-_-Accessories.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/f06d77ae-1345-456f-8020-e8497d7ef8fd1653740219960-Formal-Shoes.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/20e31f01-61e0-4fe7-8e64-28b974cdde391653740219952-Dresses.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/e0625d0c-cb1d-4964-8baa-c54136ae3ac21653740219972-Shirts.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/d222b575-ba04-4314-86c1-01f33ae786e41653740219986-Tops-_-Tees.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/37439625-5641-4719-852e-9d8a11a8bf571653740219992-Traditional-Sarees.jpg"/>
            
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/25ec4cf7-caaa-49d7-a158-9501d02586681653740219966-Handbags-_-Accessories.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/f06d77ae-1345-456f-8020-e8497d7ef8fd1653740219960-Formal-Shoes.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/20e31f01-61e0-4fe7-8e64-28b974cdde391653740219952-Dresses.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/e0625d0c-cb1d-4964-8baa-c54136ae3ac21653740219972-Shirts.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/d222b575-ba04-4314-86c1-01f33ae786e41653740219986-Tops-_-Tees.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/37439625-5641-4719-852e-9d8a11a8bf571653740219992-Traditional-Sarees.jpg"/>
           





          </div>
        </marquee> : <div  className="d-flex flex-row justify-content-around overflow-auto">

            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/25ec4cf7-caaa-49d7-a158-9501d02586681653740219966-Handbags-_-Accessories.jpg"/>

            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/f06d77ae-1345-456f-8020-e8497d7ef8fd1653740219960-Formal-Shoes.jpg"/>

            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/20e31f01-61e0-4fe7-8e64-28b974cdde391653740219952-Dresses.jpg"/>

            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/e0625d0c-cb1d-4964-8baa-c54136ae3ac21653740219972-Shirts.jpg"/>

            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/d222b575-ba04-4314-86c1-01f33ae786e41653740219986-Tops-_-Tees.jpg"/>
            <img src="https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/28/37439625-5641-4719-852e-9d8a11a8bf571653740219992-Traditional-Sarees.jpg"/>

          </div>}
          <hr/>
        
        
        <div>
          <ProductByLoc />
        </div>
        <div>
          <Products category="electronics" />
        </div>
        <div>
          <Products category="clothing" />
        </div>
        <div>
          <Products category="accessories" />
        </div>
        </div>
      {this.state.user.role === "buyer" && <div className={styles.sliderhome}>
        {!this.state.slider ? <div className={styles.sliderclose} onClick={() => this.setState({slider: true})}>
          <h1 className="text-center">Flat70%OFF</h1>
        </div>
         :
         <div className={styles.slideropen}>
          <span className="text-center" onClick={() => this.setState({slider: false})}>></span>
       
          <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/katariy/Monsoon/D47087108_INWLD_Monsoon_Carnival_Graphics_-header_PC_2nd.jpg"/>
          
        </div>
      }
      </div>
    }
      </div>
    );
  }
}

export default withRouter(Home);
