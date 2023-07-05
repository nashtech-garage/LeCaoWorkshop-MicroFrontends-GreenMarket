export default function addProductToShoppingCart(product) {
    const currentUser = JSON.parse(localStorage.getItem('auth-user') ?? "{}");

    let currentUserId = currentUser.sub;
    let currentUserName = currentUser.email;

    const channel = new BroadcastChannel('CART_HEADER_CHANNEL');

    if (!currentUserId) {
        channel.postMessage({});
        channel.close();
        return;
    }

    const localStorageKey = currentUserId;
    const discount = product.discount;
    const price = product.price;

    const newCartItem = {
        id: product.id,
        price: (discount <= 0 || discount > 100) ? price : price * (1 - (discount > 1 ? discount / 100 : discount)),
        quantity: 1,
        name: product.name,
        image_link: product.main_image_url
    };

    let shoppingCart = JSON.parse(localStorage.getItem(localStorageKey) ?? "{}");
    if (Object.keys(shoppingCart).length === 0) {
        shoppingCart = {
            cart_data: [newCartItem],
            discount_codes: [],
            total: 0,
            user_id: currentUserId,
            user_name: currentUserName
        };
    } else {
        const cardProduct = shoppingCart.cart_data.find(p => p.id === product.id);
        if (cardProduct) {
            newCartItem.quantity += cardProduct.quantity;
            shoppingCart.cart_data = shoppingCart.cart_data.filter(p => p.id !== product.id);
        }
        shoppingCart.cart_data.push(newCartItem);
    }

    shoppingCart.total = shoppingCart.cart_data.reduce((sum, item) => {
        return (item && item.price && item.quantity)
            ? sum + (item.price * item.quantity)
            : sum;
    }, 0);

    localStorage.setItem(localStorageKey, JSON.stringify(shoppingCart));

    channel.postMessage({
        type: 'ADD_CART_ITEM', path: window.location.href
    });
    channel.close();
}