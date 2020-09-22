

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
    console.log(menu)
    console.log(menu[4].name)
    menu.forEach(cat=>{
        console.log(cat.name)
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

