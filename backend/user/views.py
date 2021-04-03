from django.shortcuts import render
from .forms import AppUserCreationForm, AppUserLoginForm

# Create your views here.
def AppUserCreationView(request):
    form = AppUserCreationForm(request.POST or None)

    if form.is_valid():
        form.save()
    context = {'form': form}
    return render(request, 'user/appusercreation.html', context)
    #ilisdan pang html ani

def AppUserLoginView(request):
    form = AppUserLoginForm(request.POST or None)
    
    if form.is_valid():
        #log in user
        #return to main page
        pass
    context = {'form': form}
    
    else:
        form = AppUserLoginForm()
    
    return render(request, 'use/appuserlogin.html', context) 
    #kani pd
