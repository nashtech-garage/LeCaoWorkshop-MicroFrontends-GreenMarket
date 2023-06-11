import React, { Fragment, useEffect, useState } from "react";
import Styles from "../../root.module.css";
import { useSearchParams, Link } from "react-router-dom";
import BlogDetailInfoService from "../../services/BlogDetailInfoService"

export default function BlogDetailInfo() {
    const [shopDetailInfo, setShopDetailInfo] = useState<IBlogDetailInfo>({
        images_urls: [],
    });

    const [searchParams] = useSearchParams()
    const [activeImage, setActiveImage] = useState<string>();
    const [activeTab, setActiveTab] = useState<string>('details');
    const queryParameters = new URLSearchParams(window.location.search)
    const id = +queryParameters.get("id")

    const imgSrc = (url) => `${process.env.API_ENDPOINT}/${url}`;
    useEffect(() => {
        BlogDetailInfoService.getBlogDetailInfoById(id)
            .then((data) => {
                console.log(data)
                setShopDetailInfo(data);
                setActiveImage(data.images_urls[0]);
            })
            .catch((exception) => {
                console.error(`${process.env.APP_NAME}: ${exception}`);
            });
    }, [searchParams]);

    return (
        <section>
            <div>
                {shopDetailInfo.title}
            </div>
        </section>
    );
}