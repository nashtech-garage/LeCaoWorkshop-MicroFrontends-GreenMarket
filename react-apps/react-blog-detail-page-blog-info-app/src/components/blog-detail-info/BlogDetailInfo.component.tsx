import React, { Fragment, useEffect, useState } from "react";
import Styles from "../../root.module.css";
import { useSearchParams, Link } from "react-router-dom";
import BlogDetailInfoService from "../../services/BlogDetailInfoService";

export default function BlogDetailInfo() {
  const [blogDetailnfo, setblogDetailnfo] = useState<IBlogDetailInfo>({});

  const [searchParams] = useSearchParams();
  const [activeImage, setActiveImage] = useState<string>();
  const queryParameters = new URLSearchParams(window.location.search);
  const id = +queryParameters.get("id");

  const imgSrc = (url) => `${process.env.API_ENDPOINT}/${url}`;
  const imgAuthor = `${process.env.API_ENDPOINT}/img/blog/details/details-author.jpg`;

  useEffect(() => {
    BlogDetailInfoService.getBlogDetailInfoById(id)
      .then((data) => {
        setblogDetailnfo(data);
        setActiveImage(data.images_url);
      })
      .catch((exception) => {
        console.error(`${process.env.APP_NAME}: ${exception}`);
      });
  }, [searchParams]);

  return (
    <section>
      <div className={`${Styles["blog-details"]}`}>
        <div className="container">
          <div className="row">
            <div
              className={`${Styles.blog__details__text} col-lg-12 col-md-12`}
            >
              <img src={imgSrc(activeImage)} alt=""></img>
              <h3>{blogDetailnfo.title}</h3>
              <p>{blogDetailnfo.description}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="row">
                <div className="col-md-6">
                  <div className={` ${Styles.blog__details__author__pic} `}>
                    <img src={imgAuthor}></img>
                  </div>
                  <div className={`${Styles.blog__details__author__text}`}>
                    <h6>{blogDetailnfo.created_by}</h6>
                    <span>Admin</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className={`${Styles.blog__details__widget}`}>
                    <ul>
                      <li>
                        <span>Categories: </span>
                        <a>Food</a>
                      </li>
                      <li>
                        <span>Tags: </span>
                        <a>{blogDetailnfo.tags}</a>
                      </li>
                      <li className={`${Styles.blog__details__social}`}>
                        <a href="#">
                          <i className="fa fa-facebook"></i>
                        </a>
                        <a href="#">
                          <i className="fa fa-twitter"></i>
                        </a>
                        <a href="#">
                          <i className="fa fa-instagram"></i>
                        </a>
                        <a href="#">
                          <i className="fa fa-pinterest"></i>
                        </a>
                      </li>
                    </ul>
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
