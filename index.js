
var productosAgregados=[]
urlMenu='https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json'

  function promesa(url) { return new Promise( function(resolve, reject) 
    {
      let req = new XMLHttpRequest();
      req.open('GET',url)
      req.onload = function(){
        if(req.status == 200){
          resolve(req.response);
         }
        else{
          reject(Error(req.statusText));
         }
       }
      req.onerror = function() {
        reject(Error("Network Error"));
      };
      req.send()


   });
  }

promesa(urlMenu).then(function(response){
    var menu = JSON.parse(response);
    menu.forEach(cat=>{
        cat.products.forEach(element => {
            let cards = document.getElementById(cat.name+'Cards')
            let card = document.createElement('div')
            card.classList.add('card')
            let image = document.createElement('img')
            image.classList.add('card-img-top')
            image.setAttribute('src', element.image)
    
            let body = document.createElement('div')
    
            body.classList.add('card-body')
            let title = document.createElement('h5')
            title.classList.add('card-title')
            nodeTitle = document.createTextNode(element.name)
            title.appendChild(nodeTitle)
    
            let descript = document.createElement('p')
            descript.classList.add('card-text')
            nodeDescript = document.createTextNode(element.description)
            descript.appendChild(nodeDescript)

            let priceProduct = document.createElement('p')
            priceProduct.classList.add('card-body')
            priceProduct.classList.add('font-weight-bold')
            nodePrice = document.createTextNode('$'+element.price)
            priceProduct.appendChild(nodePrice)

            let button = document.createElement('button')
            button.classList.add('btn')
            button.classList.add('btn-dark')
            button.addEventListener('click', function(){addToCar(element)});
            nodeButton = document.createTextNode('Add to car')
            button.appendChild(nodeButton)
            
            
            body.appendChild(title)
            body.appendChild(descript)
            body.appendChild(priceProduct)
            body.appendChild(button)
    
            card.appendChild(image)
            card.appendChild(body)
    
            cards.appendChild(card)
        });

    })

})

function addToCar(element){
    product = productosAgregados.findIndex(prod=>prod.name==element.name)
    if( product == -1 ){
        product = element
        product['Qty']=1
        productosAgregados.push(product)
    }
    else{
        productosAgregados[product]['Qty'] = productosAgregados[product]['Qty'] + 1
        
    }
    updateCar()
}
function updateCar(){
    numProd=0
    productosAgregados.forEach(element=>{
        numProd += element['Qty']
    })
    size = document.getElementById('SizeCar')
    node = document.createTextNode(numProd+' items')
    size.replaceChild(node, size.childNodes[0])

}
function checkout(){
    document.getElementById('Menu').classList.add('invisible')
    document.getElementById('Car').classList.remove('invisible')
    
    table = document.getElementById('CarTable')
    table.innerHTML=''
    let i = 1
    total = 0
    productosAgregados.forEach(element=>{
        let row = document.createElement('tr')
        let col = document.createElement('th')
        let index = document.createTextNode(i+'')
        col.appendChild(index)
        row.appendChild(col)

        let qty = document.createElement('td')
        let nodeQty = document.createTextNode(element['Qty'])
        qty.appendChild(nodeQty)
        row.appendChild(qty)

        let name = document.createElement('td')
        let nodeName = document.createTextNode(element['name'])
        name.appendChild(nodeName)
        row.appendChild(name)
        
        let price = document.createElement('td')
        let nodePrice = document.createTextNode(element['price'])
        price.appendChild(nodePrice)
        row.appendChild(price)
        
        let amount = document.createElement('td')
        let nodeAmount = document.createTextNode( element['Qty']* element['price'] )
        total = total + element['Qty']* element['price']
        amount.appendChild(nodeAmount)
        row.appendChild(amount)
        table.appendChild(row)
        i = i + 1
    })
    let totalNode = document.createTextNode('Total: $'+total)
    document.getElementById('Total').innerHTML=''
    document.getElementById('Total').appendChild(totalNode)
    

}

function cancel(){
    productosAgregados=[]
    addMore()
}
function addMore(){
    document.getElementById('Car').classList.add('invisible')
    document.getElementById('Menu').classList.remove('invisible')
}
function confirm(){
    console.log(productosAgregados)  
}

