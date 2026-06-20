from django.db import models
from businesses.models import Business

class RiskFlag(models.Model):
    business = models.ForeignKey(Business, on_delete=models.CASCADE, related_name='risk_flags')
    transaction_tx = models.CharField(max_length=66, blank=True, null=True)
    reason = models.CharField(max_length=255)
    reviewed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
