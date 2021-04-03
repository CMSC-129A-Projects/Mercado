from django import forms
from .models import AppUser

class AppUserCreationForm(forms.ModelForm):
    class Meta:
        model = AppUser
        fields = '__all__'