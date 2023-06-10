for (let i = 0; i < products.length; i++) {
  let product = await Product.findById(products[i]._id);
  if (product.pricing.length === 1) {
    product.pricing = [
      {
        name: "Basic",
        price: 2000,
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam ipsum et eaque voluptatem quo natus, enim repudiandae at odio doloremque, velit minima in debitis quam fuga asperiores molestiae voluptates! Vel non iure quos quasi iste inventore soluta est tenetur quibusdam.`,
      },
      {
        name: "Standard",
        price: 4000,
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam ipsum et eaque voluptatem quo natus, enim repudiandae at odio doloremque, velit minima in debitis quam fuga asperiores molestiae voluptates! Vel non iure quos quasi iste inventore soluta est tenetur quibusdam.`,
      },
      {
        name: "Premium",
        price: 6000,
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam ipsum et eaque voluptatem quo natus, enim repudiandae at odio doloremque, velit minima in debitis quam fuga asperiores molestiae voluptates! Vel non iure quos quasi iste inventore soluta est tenetur quibusdam.`,
      },
    ];
    await product.save(); // save the updated item in the database
  }
  filteredProducts.push(product);
}
