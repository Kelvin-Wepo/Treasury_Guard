from django.urls import path
from .views import TransactionListView, VendorListCreateView

urlpatterns = [
    path('transactions/', TransactionListView.as_view(), name='transaction-list'),
    path('vendors/', VendorListCreateView.as_view(), name='vendor-list-create'),
]
