document.addEventListener("DOMContentLoaded",() => {

    const sneakers = {
        name : "trial",
        "v":1
    }

    const navIcons = document.querySelectorAll(".nav-icons");
    const featuredCards = document.getElementById("featured-cards");
    const cartDetails = document.getElementById("cart-details");
    console.log(navIcons);
    navIcons.forEach((icon) => {
        console.log(icon);
        icon.addEventListener("click",() => {
            icon.classList.toggle("nav-icon-clicked")
        })
    })

    navIcons[1].addEventListener("click",() => {
        console.log("clicked");
        cartDetails.classList.toggle("display")
    })

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'e3e1ca0d55msh272fb872733a7b1p11855cjsnbe399f4e2f4e',
                'X-RapidAPI-Host': 'shoes-collections.p.rapidapi.com'
            }
        };
        
        //api end point used to populate db
        //fetch('https://shoes-collections.p.rapidapi.com/shoes', options)
        

        fetch('http://localhost:3000/data')
            .then(response => response.json())
            .then(data => {
                const sneakers = data.sneakers;

                //populate the db.json
                // fetch("http://localhost:3000/data",{
                //     method:"POST",
                //     headers:{
                //         "Content-Type":"application/json",
                //         "Accept":"application/json"
                //     },
                //     body: JSON.stringify({
                //         sneakers
                //     })
                // }).then(res => res.json()).then(data => console.log(data));

                sneakers.map(({description,id,image,name,price,quantity}) => {
                    const article = document.createElement("article");
                    article.classList.add("card");
                    const figure = document.createElement("figure");
                    figure.classList.add("card-image");
                    const img = document.createElement("img");
                    img.src = image;
                    img.alt = name;
                    img.classList.add("img");
                    const span = document.createElement("span");
                    span.classList.add("like");
                    const i = document.createElement("i");
                    i.classList.add("fa-solid");
                    i.classList.add("fa-heart");
                    span.appendChild(i);
                    figure.appendChild(img);
                    figure.appendChild(span);

                    span.addEventListener("click",() => {
                        span.classList.toggle("like-clicked")
                    })

                    const anotherArticle = document.createElement("article");
                    anotherArticle.classList.add("shoe-name-price");
                    const h2 = document.createElement("h2");
                    h2.classList.add("shoe-name");
                    h2.textContent = name;

                    const h4 = document.createElement("h4");
                    h4.classList.add("shoe-price");
                    h4.textContent = `$${price}`;

                    const btn = document.createElement("button");
                    btn.classList.add("add-cart-btn");
                    btn.textContent = "Add to cart"

                    btn.addEventListener("click",() => {
                        console.log("clicked");
                        let quantity = 1;
                        let shoePrice = 0;
                        const cartElement = document.createElement("article");
                        cartElement.classList.add("cart-element");
                        const cartElementHeader = document.createElement("div");
                        cartElementHeader.classList.add("cart-element-header");
                        const shoeName = document.createElement("h4");
                        shoeName.textContent = name;
                        const trashSpan = document.createElement("span");
                        const trashIcon = document.createElement("i");
                        trashIcon.classList.add("fa-solid");
                        trashIcon.classList.add("fa-trash");

                        trashSpan.addEventListener("click",(e) => {
                            console.log(cartElement);
                            cartElement.remove();
                        })

                        const quantityPrice = document.createElement("div");
                        quantityPrice.classList.add("quantity-price");
                        const quantityDiv = document.createElement("div");
                        quantityDiv.classList.add("quantity");

                        const quantityIcons = document.createElement("span");
                        quantityIcons.classList.add("quantity-icons");
                        const minusSpan = document.createElement("span");
                        const minus = document.createElement("i");
                        minus.classList.add("fa-solid");
                        minus.classList.add("fa-minus");

                        minusSpan.addEventListener("click",() => {
                            quantity--;
                            quantityP.textContent = `x${quantity}`;
                            shoePrice = quantity * price;
                            priceP.textContent = `$${shoePrice}`;
                        })

                        const plusSpan = document.createElement("span");
                        const plus = document.createElement("i");
                        plus.classList.add("fa-solid");
                        plus.classList.add("fa-plus");

                        plusSpan.addEventListener("click",() => {
                            quantity++;
                            quantityP.textContent = `x${quantity}`;
                            shoePrice = quantity * price;
                            priceP.textContent = `$${shoePrice}`;
                        })

                        const quantityP = document.createElement("p");
                        quantityP.textContent = `x${quantity}`;
                        const priceP = document.createElement("p");;
                        priceP.textContent = `$${price}`;
                        const hr = document.createElement("hr");
                        hr.classList.add("line");
                        
                        cartElementHeader.appendChild(shoeName);
                        trashSpan.appendChild(trashIcon);
                        cartElementHeader.appendChild(trashSpan);
                        quantityDiv.appendChild(quantityP);
                        
                        minusSpan.appendChild(minus);
                        quantityIcons.appendChild(minusSpan);
                        plusSpan.appendChild(plus);
                        quantityIcons.appendChild(plusSpan);
                        quantityDiv.appendChild(quantityIcons)
                        quantityPrice.appendChild(quantityDiv);
                        quantityPrice.appendChild(priceP);
                        
                        cartElement.appendChild(cartElementHeader);
                        cartElement.appendChild(quantityPrice);
                        cartElement.appendChild(hr);

                        cartDetails.appendChild(cartElement);
                    })

                    anotherArticle.appendChild(h4);
                    anotherArticle.appendChild(btn)
                    

                    article.appendChild(figure);
                    article.appendChild(h2);
                    article.appendChild(anotherArticle);

                    featuredCards.appendChild(article);

                })
            })
            .catch(err => console.error(err));
})

//description,id,image,name,price,quantity