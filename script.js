let modalkey = 0
let cart = []
let modalQt = 1;

const c = (e) => document.querySelector(e);
const cs = (e) => document.querySelectorAll(e);
// listagem das pizzas

pizzaJson.map((item, index)=>{
    let pizzaItem = c(".models .pizza-item").cloneNode(true);
    
    pizzaItem.setAttribute("data-key", index)
    pizzaItem.querySelector(".pizza-item--img img").src = item.img
    pizzaItem.querySelector(".pizza-item--price").innerHTML = `R$ ${item.price.toFixed(2)}`
    pizzaItem.querySelector(".pizza-item--name").innerHTML = item.name
    pizzaItem.querySelector(".pizza-item--desc").innerHTML = item.description
    pizzaItem.querySelector("a").addEventListener("click",(event)=>{
        event.preventDefault();
        let key = event.target.closest(".pizza-item").getAttribute("data-key");
        modalQt = 1;
        modalkey =key;
        c(".pizzaBig img").src = pizzaJson[key].img
        c(".pizzaInfo h1").innerHTML = pizzaJson[key].name;
        c(".pizzaInfo--desc").innerHTML = pizzaJson[key].description;
        c(".pizzaInfo--actualPrice").innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        c(".pizzaInfo--size.selected").classList.remove("selected");
        cs(".pizzaInfo--size").forEach((size, sizeIndex)=>{
            if(sizeIndex == 2){
                size.classList.add("selected")
            }
            size.querySelector("span").innerHTML = pizzaJson[key].sizes[sizeIndex]
        })

        c(".pizzaInfo--qt").innerHTML = modalQt

        c(".pizzaWindowArea").style.opacity = "0"
        c(".pizzaWindowArea").style.display = "flex"
        setTimeout(()=>{
            c(".pizzaWindowArea").style.opacity = "1"
        }, 200)
    })

    c('.pizza-area').append(pizzaItem)
    
});
// eventos do modal

function closeModal(){
    c(".pizzaWindowArea").style.opacity = "0"
    setTimeout(()=>{
        c(".pizzaWindowArea").style.display = "none"
    }, 500)
    
}
// tentei a propriedade forEach porem nao tava conseguindo fechar o modal  mobile
c(".pizzaInfo--cancelButton").addEventListener("click", closeModal)
c(".pizzaInfo--cancelMobileButton").addEventListener("click", closeModal)


c(".pizzaInfo--qtmais").addEventListener("click",()=>{
    modalQt++;
    c(".pizzaInfo--qt").innerHTML = modalQt
    

})
c(".pizzaInfo--qtmenos").addEventListener("click",()=>{
    if (modalQt > 1){
        modalQt--;
        c(".pizzaInfo--qt").innerHTML = modalQt
    }
    
})

cs(".pizzaInfo--size").forEach((size, sizeIndex)=>{
   size.addEventListener("click", (e)=>{
    c(".pizzaInfo--size.selected").classList.remove("selected");
    size.classList.add("selected");
   })
})
// adicionando carrinho
c(".pizzaInfo--addButton").addEventListener("click",()=>{

    let size = parseInt(c(".pizzaInfo--size.selected").getAttribute("data-key"))
    let identifier = pizzaJson[modalkey].id + "@" +size;
    let key = cart.findIndex((item)=>{
        return item.identifier == identifier;
    })
    if(key > -1) {
        cart[key].qt += modalQt;
    }else{
    cart.push({
        identifier,
        id:pizzaJson[modalkey].id,
        size,
        qt:modalQt
        
    })};
    closeModal();
});
