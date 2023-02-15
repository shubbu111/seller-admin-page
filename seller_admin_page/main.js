var totalValue = 0;
function saveToStorage(event){
    event.preventDefault();

    let product = {
        sellingPrice : document.getElementById('price').value,
        productName : document.getElementById('name').value
    }

    // save to local storage
    let product_serialized = JSON.stringify(product);
    localStorage.setItem(product.productName, product_serialized);

    //save to crudcrud
    axios.post("https://crudcrud.com/api/3f3bbe1a0f234b58b67a8518c65647b9/product", product)
    .then((response) => {
        showNewProductOnScreen(response.data);
    })
    .catch((err) => {
        document.body.innerHTML = document.body.innerHTML + '<h4>Something Went Wrong</h4>'
    })

    let sellingPrice = document.getElementById('price').value
    let totalValueElement = document.getElementById("totalvalue");
    totalValue += sellingPrice;
    totalValueElement.innerHTML = "Total Value: Rs:" + totalValue;

    // clear the Page
    document.getElementById('price').value = "";
    document.getElementById('name').value = "";

}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/3f3bbe1a0f234b58b67a8518c65647b9/product")
    .then((response) => {
        for(let i=0; i< response.data.length; i++) {
            showNewProductOnScreen(response.data[i]);
        }
    })
    .catch((err) => console.log(err));
});

function showNewProductOnScreen(product){
    const d = document.getElementById('ul')
    const li = `<li id= '${product._id}'>'${product.sellingPrice}','${product.productName}'
    <button onclick = "deleteProduct('${product._id}')">Delete Product</button>
    </li>`
    
    d.innerHTML = d.innerHTML + li;

}

function  deleteProductFromCrud(productid) {
    let child = document.getElementById(productid);
    let parent = document.getElementById('ul');
    parent.removeChild(child);

    let sellingPrice = document.getElementById('price').value;
    let totalValueElement = document.getElementById("totalvalue");
    totalValue -= sellingPrice;
    totalValueElement.innerHTML = "Total Value Rs: " + totalValue;
}

function deleteProduct (productid){
    axios.delete(`https://crudcrud.com/api/3f3bbe1a0f234b58b67a8518c65647b9/product/${productid}`)
    .then((response) => {
        deleteProductFromCrud(productid);
    })
    .catch((err) => console.log(err))
}

