const btn = document.querySelector('.btn__shop');
const modal__hide = document.querySelector('.modal__hide');
let Data = '';
let select = document.querySelector('.shop__select');
let filterData = '';
let hide__product=  document.querySelector('.hide__product');
let cartArray = [];

btn.addEventListener('click', ()=>{
    modal__hide.classList.toggle("modal__show");
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
                //hice que lo traiga por default de menos a mayor
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
    console.log(r)
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
/////
let findedId = '';

document.querySelector('.product__list').addEventListener('click',function(e) {

    findedId = Data.find((f)=> f.id == e.target.id)
     product__modal(findedId)

    hide__product.classList.toggle("show__product");
    // body.classList.toggle("body_dark");
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
                <div class="colors">
                    <div class="blue"></div>
                    <div class="red"></div>
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
        alert(event.target.id)
        hide__product.classList.toggle("show__product");
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
  
  if(cartArray.length == 0)
  document.querySelector('.cart__count').innerHTML = ''
}

modal__hide.addEventListener('click', (event) => { 
    if(event.target.classList.contains('fa-trash-can')){
        // alert(event.target.id)
        cartArray = cartArray.filter((p) => p.id != event.target.id)
    }
    details__modal()
})

