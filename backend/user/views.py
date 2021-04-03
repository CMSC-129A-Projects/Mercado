from django.shortcuts import render
from .forms import AppUserCreationForm

# Create your views here.
def AppUserCreationView(request):
    form = AppUserCreationForm(request.POST or None)

    if form.is_valid():
        form.save()
    context = {
        'form': form
    }
    return render(request, 'user/appusercreation.html', context)