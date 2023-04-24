const btn = document.querySelector('.btn__shop');
const modal__hide = document.querySelector('.modal__hide');
let Data = '';
let select = document.querySelector('.shop__select');
let filterData = '';
let hide__product = document.querySelector('.hide__product');
let findedId = '';
let cartArray = [];
let modal__footer = document.querySelector('.modal__footer');
let cart__count = document.querySelector('.cart__count');

modal__footer.addEventListener('click',cartEmpty);

document.addEventListener('DOMContentLoaded', ()=>{
    cartArray = JSON.parse(localStorage.getItem('Carrito')) || [];
    details__modal();
})

btn.addEventListener('mouseover', ()=>{
    modal__hide.classList.toggle("modal__show");
    modal__footer.classList.toggle("modal__footer__show");
})

axios.get('https://ecommercebackend.fundamentos-29.repl.co/')
  .then(function (response) {
      printGet(response.data)
      Data = response.data
  })
  .catch(function (error) {
    console.log(error);
});

select.addEventListener('click',()=>{

    select.addEventListener("change", () => {

        switch (select.value) {
            case "todos":
                printGet(Data.sort((a,b) => a.id - b.id))
            break;

            case "shirt":
                filterData = Data.filter( (e) => e.category=='shirt')
                  printGet(filterData)
            break;

            case "sweater":
                filterData = Data.filter( (e) => e.category=='sweater')
                printGet(filterData)
            break;

            case "hoddie":
                filterData = Data.filter( (e) => e.category=='hoddie')
                printGet(filterData)
            break;

            case "priceLowFisrt":
                printGet(Data.sort((a,b) => a.price - b.price))
            break;

            case "priceHightFisrt":
                printGet(Data.sort((a,b) => b.price - a.price))
            break;
        }
    })
})

function printGet(r) {

    let contenedor = "";
    r.forEach(element => {
        contenedor += `
        <div class="product" id="${element.id}">
        <div class="product__img"    id="${element.id}">
                <img src="${element.image}" alt="" id="${element.id}">
            </div>
            <div class="product__name" id="${element.id}">
                <p id="${element.id}">${element.name}</p>
            </div>
            <div class="colors" id="${element.id}">
                <div class="blue"></div>
                <div class="red"></div>
            </div>
            <div class="product__price" id="${element.id}">
                <p>$${element.price.toFixed(2)}</p>
            </div>
        </div>
             `
    });
    document.querySelector('.product__list').innerHTML = contenedor;
}

document.querySelector('.product__list').addEventListener('click',function(e) {

    findedId = Data.find((f)=> f.id == e.target.id)
    product__modal(findedId)
    hide__product.classList.toggle("show__product");
})

function product__modal(r){

    let contenedor = "";
    contenedor += `
        <div class="product__modal">
            <div class="product__img__modal" >
                <div class="back-image"></div>
                <img src="${r.image}" alt="" >
            </div>
                <div class="inf">
                    <div class="product__name__modal">
                        <p > ${r.name}</p>
                    </div>
                    <div class="product__description__modal">
                        <p>${r.description}</p>
                    </div>
                <div class="category__price">
                    <div class="product__category__modal">
                        <p>Categoria: ${r.category}</p>
                    </div>
                    <div class="product__price__modal">
                        <p>Precio: $${r.price.toFixed(2)}</p>
                    </div>
                </div>
                <div class="product__modal__buttons">
                    <button class="add__car__button"  id="${r.id}"> Añadir al Carrito <i class="fa-solid fa-cart-plus"></i></button>
                    <button class="buy__button" id="${r.id}"> Comprar</button>
                    <button class="exit__button_1 exit__button">x</button>
                </div>
            </div>
        </div>
        `
        hide__product.innerHTML = contenedor;
}

hide__product.addEventListener('click', (event) => {
    if(event.target.classList.contains('add__car__button')){
        cartAdd(event.target.id)
        hide__product.classList.toggle("show__product");
    }
})

hide__product.addEventListener('click', (event) => {
    if(event.target.classList.contains('buy__button')){
        findedId = Data.find((f)=> f.id == event.target.id)
        customers_information(findedId);
    }
})

hide__product.addEventListener('click', (event) => {
    if(event.target.classList.contains('exit__button')){
        hide__product.classList.toggle("show__product");
    }
})

hide__product.addEventListener('click', (event) => {
    if(event.target.classList.contains('pay__button')){
        alert('Ha comprado el producto')
    }
})

function cartAdd(id){
    if(cartArray.some((e) => e.id == id)){
        let t = Data.find((e) => e.id == id)
        t.amount++
    }else{
        let t = (Data.find((e) => e.id == id))
         t.amount = 1
         cartArray.push(t)
    }
    details__modal()
}

function cartEmpty(){
    cartArray = cartArray.filter((e) => e.id == 0)
    details__modal()
}

function details__modal(){

    let contenedor = "";
    cartArray.forEach(element => {
        contenedor += `
        <div class="lateral__modal">
            <div class="lateral__img">
                <img src="${element.image}" alt="">
            </div>
            <div class="lateral__inf">
                <div class="lateral__name">
                    <p>${element.name}</p>
                </div>
                <div class="lateral__amount">
                    <p>Cantidad: ${element.amount}</p>
                </div>
                <div class="lateral__price">
                    <p>$${element.price.toFixed(2)}</p>
                </div>
            </div>
            <div class="lateral__delete">
                <button class="delete__button">
                    <i class="fa-regular fa-trash-can" id="${element.id}">
                </i></button>
            </div>
        </div>
    `
    });

  modal__hide.innerHTML = contenedor;
  document.querySelector('.cart__count').innerHTML = cartArray.length

  if(cartArray.length == 0){
    cart__count.innerHTML = ''
    cart__count.classList.remove("cart__count__disappear");
  }else if(cartArray.length != 0){
    cart__count.classList.add("cart__count__disappear");
  }
  storage();
}

function storage(){
    localStorage.setItem('Carrito',JSON.stringify(cartArray))
}

modal__hide.addEventListener('click', (event) => {
    if(event.target.classList.contains('fa-trash-can')){
        cartArray = cartArray.filter((p) => p.id != event.target.id)
    }
    details__modal()
})

function customers_information(r){
    let contenedor = "";
    contenedor += `
            <div class="customer__modal">
                <div class="title_customer">
                     <h2>Datos Personales</h2>
                </div>
                <div class="personal_inf">
                    <input type="text" placeholder="Nombres">
                    <input type="text" placeholder="Apellidos">
                    <input type="text" placeholder="Correo">
                </div>
                <div class="title_shipping">
                    <h3>Datos de envio</h3>
                </div>
                <div class="personal_shipping">
                    <input type="text" placeholder="Direccion de envio">
                    <input type="text" placeholder="Ciudad">
                    <input type="text" placeholder="Codigo postal">
                </div>
                <div class="title_resume">
                    <h3>Resumen del pedido</h3>
                </div>
                <div class="customers_resume">
                    <div class="subtotal"> <p>Subtotal:</p> <p>$${r.price.toFixed(2)}</p> </div>
                    <div class="shipping"> <p>Envio:</p>   <p>$${(r.price/3).toFixed(2)}</p> </div>
                    <div class="total"> <p>Total:</p>   <p>$${(r.price/3 + r.price).toFixed(2)}</p></div>                                      
                </div>
                <div class="customers_button">
                <button class="pay__button">Pagar</button>
                <button class="exit__button">Salir</button>
            </div>
            </div>
         `
         hide__product.innerHTML = contenedor;
}