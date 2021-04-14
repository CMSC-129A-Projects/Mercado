import React from 'react';

function HomePage() {
    return (
        <React.Fragment>
            <h1>Home Page</h1>
            <div class="album py-5 bg-light">
                <div class="container">

                    <div class="pb-3 h5">All Books</div>
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-3">

                        {% for product in products %}

                        <div class="col">
                            <div class="card shadow-sm">
                                <img class="img-fluid" alt="Responsive image" src="{{ product.image.url }}"></img>
                                <div class="card-body">
                                    <p class="card-text">
                                        <a class="text-dark text-decoration-none" href="{{ product.get_absolute_url }}">{{ product_title }}</a>
                                    </p>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <small class="text-muted">9min read</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {% endfor %}  

                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default HomePage;