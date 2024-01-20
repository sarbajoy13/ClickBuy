import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from "reactstrap";

function HomeCarousel(){
  return(
     <div
      className="pt-5 d-flex px-2"
      style={{
        height: "d-flex flex-row row overflow-auto",
        background: "rgb(2,0,36)",
        background:
          "grey",
        width: "100vw",
      }}
    >



    <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="/slid1.jpg" class="d-block w-200" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <h5 className="textcolor-gray font-weight-bold">Join US NOW</h5>
        <p>T/c applicable</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="/2.jpg" class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <h4 className="text-black font-weight-bold">UpTo 70% SALE</h4>
        <p>on limited items</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="/3.jpg" class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <h4 className="text-black font-weight-bold">Upto 50% SALE</h4>
        <p>on limited items</p>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
</div>


    );
}

export default HomeCarousel;
