from rest_framework import generics, status
from rest_framework.response import Response
from .models import RiskFlag
from .serializers import RiskFlagSerializer, RiskFlagUpdateSerializer


class RiskFlagListView(generics.ListCreateAPIView):
    queryset = RiskFlag.objects.all().order_by('-created_at')
    serializer_class = RiskFlagSerializer


class RiskFlagDetailView(generics.RetrieveUpdateAPIView):
    queryset = RiskFlag.objects.all()
    serializer_class = RiskFlagUpdateSerializer

    def patch(self, request, *args, **kwargs):
        # allow frontend to mark reviewed or set an action; we just record reviewed via a simple field on the model
        instance = self.get_object()
        # naive: if frontend sends reviewed or action, we'll ignore action but accept reviewed
        reviewed = request.data.get('reviewed')
        if reviewed is not None:
            instance.reviewed = bool(reviewed)
            instance.save()
        return Response(RiskFlagSerializer(instance).data, status=status.HTTP_200_OK)
