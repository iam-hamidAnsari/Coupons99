// Function to toggle display of custom category input
function toggleCustomCategory(select) {
    var customCategoryDiv = document.getElementById('customCategory');
    if (select.value === 'others') {
        customCategoryDiv.style.display = 'block';
    } else {
        customCategoryDiv.style.display = 'none';
    }
}

// Event handling for user icon to toggle hover content
document.addEventListener('DOMContentLoaded', function () {
    var userIcon = document.querySelector('.user-icon');
    userIcon.addEventListener('click', function () {
        var hoverContent = this.querySelector('.hover-content');
        var isDisplayed = window.getComputedStyle(hoverContent).display !== 'none';
        hoverContent.style.display = isDisplayed ? 'none' : 'block';
    });
});

// Fetching All Coupons and handling the click event on the action button
$(document).ready(function () {
    function redeemCoupon(coupon) {
        console.log(coupon);
        window.location.href = 'Data.html?couponId=' + coupon.id;
    }

    $.ajax({
        url: "http://localhost:8080/findall",
        type: "POST",
        success: function (coupons) {
            var container = $('#coupons-container');
            container.empty();

            coupons.forEach(function (coupon) {
                var div = $('<div>').addClass('coupon');
                div.append($('<h3>').text(coupon.couponTitle));
                if (coupon.imageUrl) {
                    div.append($('<img>').attr("src", "coupon99/CouponImages/" + coupon.imageUrl));
                }
                div.append($('<h3>').text("₹" + coupon.price));
                div.append($('<p>').text(coupon.description));
                var actionButton = $('<button>')
                    .addClass('action-button get-coupon-button')
                    .text('Get this Coupon')
                    .on('click', function () { redeemCoupon(coupon); });
                div.append(actionButton);
                container.append(div);
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error loading coupons: ", textStatus, errorThrown);
        }
    });
});

// Handling the coupon addition form submission
$("#Addcoupon").submit(function (event) {
    event.preventDefault();
    var formData = new FormData(this);
    $.ajax({
        url: "http://localhost:8080/AddCoupon",
        type: "POST",
        processData: false,
        contentType: false,
        data: formData,
        success: function () {
            alert("Coupon Added Successfully");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Something went wrong");
            console.error(jqXHR, textStatus, errorThrown);
        }
    });
});

// Handling the registration form submission
$("#registration-form").submit(function (event) {
    event.preventDefault();
    var usersData = {
        username: $("#reg-username").val(),
        password: $("#reg-password").val(),
        email: $("#email").val(),
        number: $("#number").val()
    };
    $.ajax({
        url: "http://localhost:8080/Register",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(usersData),
        success: function (response) {
            alert(response ? "Registered Successfully" : "Something went wrong");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(jqXHR, textStatus, errorThrown);
        }
    });
});

// Handling the login form submission
$("#login-form").submit(function (event) {
    event.preventDefault();

    // Collect username and password from form inputs
    var username = $("#login-username").val();
    var password = $("#login-password").val();

    // Send the data using POST method within the request body for security
    $.ajax({
        url: "http://localhost:8080/Login",
        type: "POST",
        contentType: "application/json", // Set the content type to JSON
        data: JSON.stringify({ username: username, password: password }), // Send data as JSON string
        success: function (user) {
            if (user && password === user.password) {
                $('#is-logged-in').val('true'); // Update login status
                alert("Welcome " + user.username);
                $('#loginModal').modal('hide'); // Close the login modal
                buyNow(); // Proceed to checkout or next action
            } else {
                // Handle incorrect credentials
                alert("Invalid Username or Password");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status === 404) {
                alert("User not found. Please register.");
            } else if (jqXHR.status === 401) {
                alert("Incorrect username or password.");
            } else {
                // Handle other ajax errors
                alert("Error during request: " + textStatus + ". Please try again.");
            }
            console.error("Error details:", jqXHR, textStatus, errorThrown);
        }
    });
});


// Search Coupons based on user input
$("#searchInput").on('input', function () {
    var query = $(this).val();
    $.ajax({
        url: "http://localhost:8080/Search?query=" + query,
        type: "GET",
        success: function (coupons) {
            var container = $('#coupons-container');
            container.empty();

            coupons.forEach(function (coupon) {
                var div = $('<div>').addClass('coupon');
                div.append($('<h3>').text(coupon.couponTitle));
                if (coupon.imageUrl) {
                    div.append($('<img>').attr("src", "coupon99/CouponImages/" + coupon.imageUrl));
                }
                div.append($('<h3>').text("₹" + coupon.price));
                div.append($('<p>').text(coupon.description));
                var actionButton = $('<button>')
                    .addClass('action-button get-coupon-button')
                    .text('Get this Coupon')
                    .on('click', function () { redeemCoupon(coupon); });
                div.append(actionButton);
                container.append(div);
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error loading coupons: ", textStatus, errorThrown);
        }
    });
});
