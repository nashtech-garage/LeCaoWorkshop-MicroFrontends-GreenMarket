import React, { Fragment, useEffect, useState } from "react";
import Styles from "../../root.module.css";
import { Link } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel';
import ShopDetailService from "../../services/ShopDetailService"

export default function ProductDetail() {
    const [shopDetailInfo, setShopDetailInfo] = useState<IShopDetailInfo>({
        images_urls: [],
    });

    const [activeImage, setActiveImage] = useState<string>();
    const [activeTab, setActiveTab] = useState<string>('details');
    const queryParameters = new URLSearchParams(window.location.search)
    const id = +queryParameters.get("id")

    const imgSrc = (url) => `${process.env.API_ENDPOINT}/${url}`;
    useEffect(() => {
        ShopDetailService.getProductById(id)
            .then((data) => {
                console.log(data)
                setShopDetailInfo(data);
                setActiveImage(data.images_urls[0]);
            })
            .catch((exception) => {
                console.error(`${process.env.APP_NAME}: ${exception}`);
            });
    }, [queryParameters]);

    return (
        <section>
            <div className="product-details spad" >
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="product__details__pic">
                            <div className="product__details__pic__item">
                                <img className="product__details__pic__item--large" src={imgSrc(activeImage)} alt="" />
                            </div>
                            <div className="product__details__pic__slider">
                                {shopDetailInfo.images_urls?.length && (
                                    <OwlCarousel className='owl-theme' loop margin={10} items={4}>
                                        {shopDetailInfo.images_urls.map((url, index) => (
                                            <div key={index} className="item" onClick={() => setActiveImage(url)} >
                                                <img src={imgSrc(url)} />
                                            </div>
                                        ))}
                                    </OwlCarousel>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="product__details__text">
                            <h3>{shopDetailInfo.name}</h3>
                            <div className="product__details__rating">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star-half-o"></i>
                                <span>({shopDetailInfo.review_count} reviews)</span>
                            </div>
                            <div className="product__details__price">{shopDetailInfo.price}</div>
                            <p>{shopDetailInfo.description_short}</p>
                            <div className="product__details__quantity">
                                <div className="quantity">
                                    <div className="pro-qty"><span className="dec qtybtn">-</span>
                                        <input type="text" value="1" />
                                        <span className="inc qtybtn">+</span>
                                    </div>
                                </div>
                            </div>
                            <a href="#" className="primary-btn">ADD TO CARD</a>
                            <a href="#" className="heart-icon"><span className="icon_heart_alt"></span></a>
                            <ul>
                                <li><b>Availability</b> <span>{shopDetailInfo.availability ? 'In Stock' : 'Unavailable'}</span></li>
                                <li><b>Shipping</b> <span>01 day shipping. <samp>Free pickup today</samp></span></li>
                                <li><b>Weight</b> <span>{shopDetailInfo.weight} kg</span></li>
                                <li>
                                    <b>Share on</b>
                                    <div className="share">
                                        <a href="#"><i className="fa fa-facebook"></i></a>
                                        <a href="#"><i className="fa fa-twitter"></i></a>
                                        <a href="#"><i className="fa fa-instagram"></i></a>
                                        <a href="#"><i className="fa fa-pinterest"></i></a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="product__details__tab">
                            <ul className="nav nav-tabs" role="tablist">
                                <li className="nav-item">
                                    <a className={`nav-link ${activeTab === 'details' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('details')}
                                        role="button" aria-selected="true">Description</a>
                                </li>
                                <li className="nav-item">
                                    <a className={`nav-link ${activeTab === 'information' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('information')}
                                        role="button" aria-selected="false">Information</a>
                                </li>
                                <li className="nav-item">
                                    <a className={`nav-link ${activeTab === 'review' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('review')}
                                        role="button" aria-selected="false">Reviews <span>(1)</span></a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div
                                    className={`tab-pane ${activeTab === 'details' ? 'active' : ''}`}
                                    id="tabs-1" role="tabpanel">
                                    <div className="product__details__tab__desc">
                                        <h6>Description</h6>
                                        <p>{shopDetailInfo.description}</p>
                                    </div>
                                </div>
                                <div
                                    className={`tab-pane ${activeTab === 'information' ? 'active' : ''}`}
                                    id="tabs-2" role="tabpanel">
                                    <div className="product__details__tab__desc">
                                        <h6>Products Infomation</h6>
                                        <p>{shopDetailInfo.information}</p>
                                    </div>
                                </div>
                                <div
                                    className={`tab-pane ${activeTab === 'review' ? 'active' : ''}`}
                                    id="tabs-3" role="tabpanel">
                                    <div className="product__details__tab__desc">
                                        <h6>Reviews ({shopDetailInfo.review_count})</h6>
                                        <p>Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Vivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Proin eget tortor risus.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}