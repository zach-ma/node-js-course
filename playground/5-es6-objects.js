//////////////////////////
// object property shorthand
const name = "Andrew";
const userAge = 27;
const user = {
  name, // shorthand syntax
  age: userAge,
  location: "Philadelphia",
};
console.log(user);

//////////////////////////
// object destructuring
const product = {
  label: "Red notebook",
  price: 3,
  stock: 201,
  salePrice: undefined,
};

// Too much code!
// const label = product.label;
// const stock = product.stock;

const { label: productLabel, price, stock, xxxx, rating = 5 } = product;
console.log(productLabel); // rename variable
console.log(price);
console.log(xxxx); // undefined
console.log(rating); // default value

const transaction = (type, { label, stock = 0 } = {}) => {
  console.log(type, label, stock);
};
transaction("order", product);
transaction("order");
