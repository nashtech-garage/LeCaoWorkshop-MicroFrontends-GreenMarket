import React, {useEffect, useState} from "react";
import Styles from "../../root.module.css";
import {Link} from "react-router-dom"
import BannerService from "../../services/BannerService"

export default function HeroBanner() {
    const [bannerInfo, setBannerInfo] = useState<IBannerInfo>({});
    const bgStyleImage = {
        backgroundImage: `url(${process.env.API_ENDPOINT}/${bannerInfo?.ImageLink})`
    }
    const bgStyleColor = {
        backgroundColor: "#f5f5f5"
    }
    
    useEffect(() => {
        BannerService.getBannerInfo()
            .then((data) => setBannerInfo(data))
            .catch((exception) => {
                console.error(`${process.env.APP_NAME}: ${exception}`);
            });
    }, []);
    
    return (
        <div className={`${Styles.hero__item} ${Styles.set__bg}`} style={bannerInfo?.ImageLink ? bgStyleImage : bgStyleColor}>
            <div className={Styles.hero__text}>
                <span>{bannerInfo?.CategoryName}</span>
                <h2>{bannerInfo?.Title}</h2>
                <p>{bannerInfo?.Content}</p>
                <Link to={`/shops`} className={Styles.primary__btn}>SHOP NOW</Link>
            </div>
        </div>
    );
}