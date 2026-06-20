from rest_framework import generics
from .models import Transaction, Vendor
from .serializers import TransactionSerializer, VendorSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from businesses.models import Business


class TransactionListView(generics.ListAPIView):
    queryset = Transaction.objects.all().order_by('-timestamp')
    serializer_class = TransactionSerializer


class VendorListCreateView(APIView):
    def get(self, request, *args, **kwargs):
        # optional ?business_id=1 to filter
        business_id = request.query_params.get('business_id')
        qs = Vendor.objects.all().order_by('-added_at')
        if business_id:
            qs = qs.filter(business_id=business_id)
        data = VendorSerializer(qs, many=True).data
        return Response(data)

    def post(self, request, *args, **kwargs):
        business = request.data.get('business')
        address = request.data.get('address')
        if not business or not address:
            return Response({'detail':'missing fields'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            b = Business.objects.get(pk=business)
        except Business.DoesNotExist:
            return Response({'detail':'business not found'}, status=status.HTTP_404_NOT_FOUND)
        v = Vendor.objects.create(business=b, address=address)
        return Response(VendorSerializer(v).data, status=status.HTTP_201_CREATED)
