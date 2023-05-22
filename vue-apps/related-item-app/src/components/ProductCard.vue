<template>
    <div class="product__item">
        <div class="product__item__pic set-bg" :style="{'background-image': 'url('+product.image+')'}">
            <ul class="product__item__pic__hover">
                <li><a href="#"><i class="fa fa-heart"></i></a></li>
                <li><a href="#"><i class="fa fa-retweet"></i></a></li>
                <li><a href="#"><i class="fa fa-shopping-cart"></i></a></li>
            </ul>
        </div>
        <div class="product__item__text">
            <h6>
                <a href="#">
                    {{ product.name }}
                </a>
            </h6>
            <h5>
                $ {{ product.price }}
            </h5>
        </div>
    </div>
</template>
<script>
export default ({
    props: {
        product: {
            required: true,
            type: Object
        }
    }
})
</script>