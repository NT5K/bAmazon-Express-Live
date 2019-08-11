
//===========================================================================
// populate departments drop down

// array to populate the department drop down
const departmentsArray = ["Automotive", "Electronics & Accessories", "Furniture", "Home", "Office & Small Business",
    "Lighting & Decor", "Women's Apparel", "Men's Apparel", "Boy's Clothing", "Girl's Clothing",
    "Baby", "Pets", "Food and Beverages", "Beauty & Personal Care", "Health & Wellness",
    "Household Essentials", "Luggage & Travel", "Sports & Outdoors"]
// console.log(departmentsArray)

// populate the department drop down with data from departmentsArray
departmentsArray.forEach(data => {
    // console.log(data)
    $("#department").prepend('<option value="' + data + '">' + data + '</option>')
});


//===========================================================================

// AJAX calls located in each html document!

//===========================================================================
// table to populate "ItemDiv" with data

const tableData = (data) => {
    return '<tr>' +
        '<th scope="row">' + data.id + '</th>' +
        '<td>' + data.product_name + '</td>' +
        '<td>' + data.department_name + '</td>' +
        '<td>$' + data.price + '</td>' +
        '<td>' + data.stock_quantity + '</td>' +
        '</tr>'
}

//===========================================================================
// forEach loop to append all data to table, depending on the json

// gets data from json and the div to append table to, passes data to tableData()
const appendToTable = (request, div) => {
    request.forEach(data => {
        // console.log(data)
        $(div).append(tableData(data))
    });
}

//===========================================================================
    // variables

// bamazon-express.heroku.com/
const currentURL = window.location.origin;

// last row id
const lastId = $.get(currentURL + "/fromdatabaselastrow", (request) => { return request[0].id })

//===========================================================================
// add new item to the database button submit

$(".new-item").on("submit", (event) => {
    // preventDefault on a submit event.
    event.preventDefault();

    var newItem = {
        product: $("#product").val().trim(),
        department: $("#department").val().trim(),
        price: $("#price").val().trim(),
        quantity: $("#quantity").val().trim()
    };
    const i = newItem
    const quantity = i.quantity
    const product = i.product
    const price = i.price
    const department = i.department

    // validation
    if (quantity > 200 || quantity <= 0 ||
         product.length > 255 || Number(price) <= 0 ||
          Number(price) > 10000 || department === 'Choose...') {

        // redirect to the error page 
        return location.href = currentURL + "/error";

    } else {
        
        // Send the POST request.
        $.ajax("/posttodatabase", {
            type: "POST",
            data: newItem
        }).then( () => {
            // redirect to success page
            location.href = currentURL + "/newItemSuccess";
        });
    }
});

//===========================================================================
// update quantity button submit

$(".update-quantity").on("submit", (event) => {
    // preventDefault on a submit event.
    event.preventDefault();

    const updateQuantity = {
        id: $("#id").val().trim(),
        quantity: $("#quantity").val().trim()
    };
    const id = updateQuantity.id
    const quantity = updateQuantity.quantity

    // validation
    if (id > lastId || id <= 0 || quantity > 200 || quantity <= 0) {
        return location.href = currentURL + "/error";

    } else {

    // Send the PUT request.
        $.ajax("/addquantity", {
            type: "PUT",
            data: updateQuantity
        }).then( () => {
            // redirect to success page
            location.href = currentURL + "/addinventorysuccess";
            }
        );
    }
})
//===========================================================================
// delete a item :(

$(".delete-item").on("submit", (event) => {
    // preventDefault on a submit event.
    event.preventDefault();

    const itemId = { id : $("#id").val().trim() } 
    const ID = itemId.id

    // WONT LET ME VALIDATE?????!!
    // if ( ID > lastId ) {
    //     return location.href = currentURL + "/error";
    // } else {

        // Send the DELETE request.
        $.ajax("/delete", {
            type: "DELETE",
            data: itemId
        }).then( () => {
            // redirect to success page
            console.log(ID)
            $("#errorDiv").html("<h3 style = 'color: red;'> OMG <br>you just deleted item number " + ID +
                                    "!!!!!!!!<h3><h6>how could you..</h6>")
        });
    // }
})

