import React, {useEffect, useState} from "react";
import Styles from "../../root.module.css";
import {Link} from "react-router-dom"
import ShopDetailService from "../../services/ShopDetailService"

export default function ProductDetail() {
    const [shopDetailInfo, setShopDetailInfo] = useState<IShopDetailInfo>({});
    const bgStyleImage = {
        backgroundImage: `url(${process.env.API_ENDPOINT}/${shopDetailInfo?.ImageLink})`
    }
    const bgStyleColor = {
        backgroundColor: "#f5f5f5"
    }
    
    useEffect(() => {
        ShopDetailService.getShopDetailInfo()
            .then((data) => setShopDetailInfo(data))
            .catch((exception) => {
                console.error(`${process.env.APP_NAME}: ${exception}`);
            });
    }, []);
    
    return (
        <div className={`${Styles.hero__item} ${Styles.set__bg}`} style={shopDetailInfo?.ImageLink ? bgStyleImage : bgStyleColor}>
            <div className={Styles.hero__text}>
                <span>{shopDetailInfo?.CategoryName}</span>
                <h2>{shopDetailInfo?.Title}</h2>
                <p>{shopDetailInfo?.Content}</p>
                <Link to={`/shops`} className={Styles.primary__btn}>SHOP NOW</Link>
            </div>
        </div>
    );
}