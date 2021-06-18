from django_filters import rest_framework as filters

from .models import Product


class ProductFilter(filters.FilterSet):
    min_price = filters.NumberFilter(field_name='price', lookup_expr='gte')
    max_price = filters.NumberFilter(field_name='price', lookup_expr='lte')
    min_sold = filters.NumberFilter(field_name='sold', lookup_expr='gte')
    max_sold = filters.NumberFilter(field_name='sold', lookup_expr='lte')

    class Meta:
        model = Product
        fields = (
            'user__username',
            'category__name',
            'sold_count',
            'min_price',
            'max_price',
            'min_sold',
            'max_sold'
        )