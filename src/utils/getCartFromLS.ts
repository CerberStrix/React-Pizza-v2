
interface ICart {
  items: []
  totalPrice: number
  totalCount: number
}

export const getCartFromLS = (): ICart => {
  const json = localStorage.getItem('cart');
  if (json != null) {
    return JSON.parse(json);
  } else {
    return {
      items: [],
      totalPrice: 0,
      totalCount: 0
    };
  }
};
