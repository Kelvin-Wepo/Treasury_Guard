from rest_framework import serializers
from .models import RiskFlag

class RiskFlagSerializer(serializers.ModelSerializer):
    class Meta:
        model = RiskFlag
        fields = ['id', 'business', 'transaction_tx', 'reason', 'reviewed', 'created_at']

class RiskFlagUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = RiskFlag
        fields = ['id', 'business', 'transaction_tx', 'reason', 'reviewed']
