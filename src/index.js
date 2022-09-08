document.addEventListener("DOMContentLoaded",() => {

    const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'e3e1ca0d55msh272fb872733a7b1p11855cjsnbe399f4e2f4e',
                'X-RapidAPI-Host': 'shoes-collections.p.rapidapi.com'
            }
        };
        
        //api end point used to populate db
        //fetch('https://shoes-collections.p.rapidapi.com/shoes', options).then(res => res.json()).then(sneakers => {
            //populate the db.json
                // fetch("http://localhost:3000",{
                //     method:"POST",
                //     headers:{
                //         "Content-Type":"application/json",
                //         "Accept":"application/json"
                //     },
                //     body: JSON.stringify({
                //         sneakers
                //     })
                // }).then(res => res.json()).then(data => console.log(data));
        // })

    const navIcon = document.querySelector(".nav-icons");
    console.log(navIcon);
    const featuredCards = document.getElementById("featured-cards");
    const cartDetails = document.getElementById("cart-details");
    const contactForm = document.getElementById("contact-form");
    const contactName = document.getElementById("name");
    const contactEmail = document.getElementById("email");
    const contactMessage = document.getElementById("message");

    contactForm.addEventListener("submit",(e) => {
        fetch("http://localhost:3000/messages",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body: JSON.stringify({
                "name": contactName.value,
                "email":contactEmail.value,
                "message": contactMessage.value
            })
        }).then(res => res.json()).then(data => {
            console.log(data);
            contactForm.reset();
        })
    })

    navIcon.addEventListener("click",() => {
        navIcon.classList.toggle("nav-icon-clicked")
        cartDetails.classList.toggle("display")
    })

    fetch("http://localhost:3000/cart").then(res => res.json()).then(data => {
        data.map(({name,price,quantity,id}) => {
            console.log(name);
            let shoePrice = quantity * price;

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

                        trashSpan.addEventListener("click",() => {
                            cartElement.remove();
                          
                            fetch(`http://localhost:3000/cart/${id}`,{
                                method:"DELETE",
                                headers:{
                                    "Content-Type":"application/json",
                                    "Accept":"application/json"
                                }
                            }).then(res => res.json()).then(data => console.log(data))
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
                            let newQuantity = quantity - 1;
                          
                            fetch(`http://localhost:3000/cart/${id}`,{
                                method:"PATCH",
                                headers:{
                                    "Content-Type":"application/json",
                                    "Accept":"application/json"
                                },
                                body: JSON.stringify({
                                    "quantity":newQuantity
                                })
                            }).then(res => res.json()).then(data => {
                                shoePrice = newQuantity * price;
                                quantityP.textContent = `x${newQuantity}`;
                                priceP.textContent = `$${shoePrice}`;
                            })
                        })

                        const plusSpan = document.createElement("span");
                        const plus = document.createElement("i");
                        plus.classList.add("fa-solid");
                        plus.classList.add("fa-plus");

                        plusSpan.addEventListener("click",() => {
                            let newQuantity = quantity + 1;
                          
                            fetch(`http://localhost:3000/cart/${id}`,{
                                method:"PATCH",
                                headers:{
                                    "Content-Type":"application/json",
                                    "Accept":"application/json"
                                },
                                body: JSON.stringify({
                                    "quantity":newQuantity
                                })
                            }).then(res => res.json()).then(data => {
                                shoePrice = newQuantity * price;
                                quantityP.textContent = `x${newQuantity}`;
                                priceP.textContent = `$${shoePrice}`;
                            })
                        })

                        const quantityP = document.createElement("p");
                        quantityP.textContent = `x${quantity}`;
                        const priceP = document.createElement("p");;
                        priceP.textContent = `$${shoePrice}`;
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
    })

        
        
        fetch('http://localhost:3000/sneakers')
            .then(response => response.json())
            .then(sneakers => {
                render(sneakers)
            })
        .catch(err => {
            fetch('https://shoes-collections.p.rapidapi.com/shoes', options).then(res => res.json()).then(sneakers => {
                render(sneakers)
            })
        });
        

        const render = function(sneakers){
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

                const btnDesktop = document.createElement("button");
                btnDesktop.classList.add("add-cart-btn");
                btnDesktop.classList.add("desktop");
                btnDesktop.textContent = "Add to cart"

                const btnMobile = document.createElement("button");
                btnMobile.classList.add("add-cart-btn");
                btnMobile.classList.add("mobile");
                const cart = document.createElement("i");
                cart.classList.add("fa-solid");
                cart.classList.add("fa-cart-shopping");
                btnMobile.appendChild(cart);

                const buttons = [btnDesktop, btnMobile];

                buttons.forEach((button) => {
                    button.addEventListener("click",() => {

                        fetch("http://localhost:3000/cart",{
                            method:"POST",
                            headers:{
                                "Content-Type":"application/json",
                                "Accept":"application/json"
                            },
                            body: JSON.stringify({
                                "name":name,
                                "price":price,
                                "quantity":quantity
                            })
                        }).then(res => res.json()).then(data => {
                            console.log(data);
                        })
                    })
                })

                anotherArticle.appendChild(h4);
                anotherArticle.appendChild(btnMobile)
                anotherArticle.appendChild(btnDesktop)
                

                article.appendChild(figure);
                article.appendChild(h2);
                article.appendChild(anotherArticle);

                featuredCards.appendChild(article);

            })
        }
})