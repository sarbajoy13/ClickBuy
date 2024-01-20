import React, { Component } from "react";
import {Link} from 'react-router-dom';
function Footer(){
	return(
		<section className="selection footer bg-dark text-white">
			<div className="container">
				<div className="row">
					<div className="col-md-4">
						<hr></hr>
						<h6>Company Information</h6>
						<hr></hr>
						<p>
							If you would like to experience the best of online shopping in India, you are at the right place.
							ClickBuy is the ultimate destination for Fashion , Lifestyle and Electronic Appliances , being host to a wide array of merchandise products .
							It is time to redefine your style statement with our treasure-trove of trendy items.
							You can shop online at ClickBuy from the comfort of your home and get your favourites delivered right to your doorstep.
						</p>
					</div>
					<div className="col-md-4">
						<hr></hr>
						<h6>Social Media</h6>
						<hr></hr>
						<div><p><a href="https://www.instagram.com/clickbuy1300/" target="_blank">Instagram  </a><img src="insta.png" height="20px" width="20px"/></p></div>

						<div><p><a href="https://www.facebook.com/profile.php?id=100081470573459" target="_blank">Facebook  </a><img src="fb.png" height="25px" width="25px"/></p></div>

						<div><p><a href="https://twitter.com/ClickBuy13" target="_blank">Twitter  </a><img src="twitter.png" height="25px" width="25px"/></p></div>
				
					</div>
					<div className="col-md-4">
						<hr></hr>
						<h6>Contact Information</h6>
						<hr></hr>
						<div><p className="text-white mb1">143/1 parmar road bhadrakali</p></div>
						<div><p className="text-white mb1">+91 6290495505</p></div>
						<div><p className="text-white mb1">+91 9432568538</p></div>
						<div><p className="text-white mb1">sarbajoy13chatterjee@gmail.com</p></div>
					</div>
				</div>
			</div>
		</section>

		);
}

export default Footer;