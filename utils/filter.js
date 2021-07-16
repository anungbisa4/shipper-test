import queryString from "query-string";
import slugify from "slugify";

export function truncate(text, length, clamp) {
  text = text || "";
  clamp = clamp || "...";
  length = length || 30;

  if (text.length <= length) return text;

  var tcText = text.slice(0, length - clamp.length);
  var last = tcText.length - 1;

  while (last > 0 && tcText[last] !== " " && tcText[last] !== clamp[0])
    last -= 1;

  // Fix for case when text dont have any `space`
  last = last || length - clamp.length;

  tcText = tcText.slice(0, last);

  return tcText + clamp;
}

export function queryParams(value, type) {
  if (type === "hash") {
    return queryString.parse(location.hash)?.[value];
  }
  return queryString.parse(location.search)?.[value];
}

export function slug(value = "undefined") {
  return slugify(value, { lower: true });
}

export function onlyTypeNumber(event) {
  const char = String.fromCharCode(event.keyCode);
  const regex = /^[0-9,\b][0-9,\b]*$/;
  if (!regex.test(char)) {
    event.preventDefault();
  }
}

export function calcOrder(product, shipping, order, orderType) {
  let priceShipping = 0,
    priceProduct = 0,
    weight = 0,
    quantity = 0,
    totalInvoice = 0,
    totalShippingCost = 0,
    totalPrice = 0,
    productName = "";

  if (orderType === "42") {
    try {
      priceShipping = parseInt(shipping?.price);
      priceProduct = product?.Price;
      weight = product?.Weight;
      quantity = order?.quantity;
      productName = order?.detail_package?.PackageName;

      totalShippingCost = Math.ceil(weight * quantity) * priceShipping;
      totalPrice = priceProduct * quantity;
      totalInvoice = totalShippingCost + priceProduct * quantity;
    } catch (err) {
      throw err;
    }
  }

  if (orderType === "minipack") {
    const minipack = order?.order_minipack;
    priceProduct = minipack?.total_amount;
    quantity = null;
    totalShippingCost = null;
    totalPrice = minipack?.total_amount;
    totalInvoice = minipack?.total_amount;
    productName = minipack?.product_name;
  }

  return {
    price: priceProduct,
    quantity: quantity,
    totalShippingCost: totalShippingCost,
    totalPrice: totalPrice,
    totalInvoice: totalInvoice,
    productName: productName,
  };
}

export const handleLinkProduct = (id, title) => {
  if (id === "121" || title === "minipack") {
    return `/minipack/${id}/minipack-subscription`;
  }
  return `/product/${id}/${title}`;
};

export function checkProperties(obj) {
  return Object.values(obj).some((x) => x === null || x === "");
}

export function orderCreate(type) {
  if (type === "minipack") {
    let response = null;
    try {
    } catch (err) {
      console.log(err);
    }
    return response;
  }
}
